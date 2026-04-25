"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { storeAccessories, allAccessories } from "@/data/accessories";
import { foods } from "@/data/foods";
import { initialDailySummary, mockUser } from "@/data/mockUser";
import { recipes } from "@/data/recipes";
import { makeId } from "@/lib/utils";
import type {
  Accessory,
  AppToast,
  DailySummary,
  DiaryEntry,
  Emotion,
  UserProfile,
} from "@/types";

type AppState = {
  hasHydrated: boolean;
  isAuthenticated: boolean;
  user: UserProfile;
  points: number;
  dailySummary: DailySummary;
  diaryEntries: DiaryEntry[];
  ownedAccessories: string[];
  selectedAccessories: string[];
  completedRecipes: string[];
  favoriteRecipes: string[];
  lastEmotion: Emotion;
  toast: AppToast | null;
  setHasHydrated: (value: boolean) => void;
  login: () => void;
  logout: () => void;
  showToast: (message: string, tone?: AppToast["tone"]) => void;
  clearToast: () => void;
  addFood: (foodId: string) => void;
  addRecipeToDiary: (recipeId: string) => void;
  buyAccessory: (accessoryId: string) => boolean;
  toggleAccessory: (accessoryId: string) => void;
  toggleFavoriteRecipe: (recipeId: string) => void;
  updateProfile: (patch: Partial<UserProfile>) => void;
};

const noopStorage = {
  getItem: () => null,
  setItem: () => undefined,
  removeItem: () => undefined,
};

function addNutrition(summary: DailySummary, entry: DiaryEntry): DailySummary {
  return {
    ...summary,
    consumed: {
      kcal: summary.consumed.kcal + entry.nutrition.kcal,
      protein: summary.consumed.protein + entry.nutrition.protein,
      carbs: summary.consumed.carbs + entry.nutrition.carbs,
      fat: summary.consumed.fat + entry.nutrition.fat,
    },
  };
}

function resolveAccessory(id: string): Accessory | undefined {
  return allAccessories.find((accessory) => accessory.id === id);
}

function resolveFoodEmotion(
  foodId: string,
  currentEntries: DiaryEntry[],
): Emotion {
  const food = foods.find((item) => item.id === foodId);
  const todayCount = currentEntries.length + 1;
  const recentTreats = currentEntries
    .slice(0, 4)
    .filter((entry) => {
      const loggedFood = foods.find((item) => item.id === entry.itemId);
      return loggedFood?.category === "antojo";
    }).length;

  if (todayCount >= 7) return "sobrealimentada";
  if (food?.category === "antojo" && recentTreats >= 1) return "comiendo_mal";
  if (food?.category === "proteina") return "motivada";
  if (food?.category === "saludable") return "feliz";
  return food?.emotion ?? "satisfecha";
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      hasHydrated: false,
      isAuthenticated: false,
      user: mockUser,
      points: 1250,
      dailySummary: initialDailySummary,
      diaryEntries: [],
      ownedAccessories: ["beanie-verde", "anteojos-redondos"],
      selectedAccessories: ["beanie-verde", "anteojos-redondos"],
      completedRecipes: [],
      favoriteRecipes: [],
      lastEmotion: "equilibrada",
      toast: null,
      setHasHydrated: (value) => set({ hasHydrated: value }),
      login: () =>
        set({
          isAuthenticated: true,
          toast: {
            id: Date.now(),
            message: "¡Qué lindo verte por acá!",
            tone: "success",
          },
        }),
      logout: () =>
        set({
          isAuthenticated: false,
          toast: null,
        }),
      showToast: (message, tone = "info") =>
        set({
          toast: {
            id: Date.now(),
            message,
            tone,
          },
        }),
      clearToast: () => set({ toast: null }),
      addFood: (foodId) => {
        const food = foods.find((item) => item.id === foodId);
        if (!food) {
          get().showToast("No encontramos esa comida por ahora.", "warning");
          return;
        }

        set((state) => {
          const entry: DiaryEntry = {
            id: makeId("food"),
            type: "food",
            itemId: food.id,
            name: food.name,
            emoji: food.emoji,
            nutrition: food.nutrition,
            points: food.points,
            createdAt: new Date().toISOString(),
          };
          const emotion = resolveFoodEmotion(food.id, state.diaryEntries);

          return {
            diaryEntries: [entry, ...state.diaryEntries],
            dailySummary: addNutrition(state.dailySummary, entry),
            points: state.points + food.points,
            lastEmotion: emotion,
            toast: {
              id: Date.now(),
              message: `Sumaste ${food.name} y ganaste ${food.points} puntos.`,
              tone: "success",
            },
          };
        });
      },
      addRecipeToDiary: (recipeId) => {
        const recipe = recipes.find((item) => item.id === recipeId);
        if (!recipe) {
          get().showToast("Esa receta no está disponible por ahora.", "warning");
          return;
        }

        set((state) => {
          const entry: DiaryEntry = {
            id: makeId("recipe"),
            type: "recipe",
            itemId: recipe.id,
            name: recipe.title,
            emoji: recipe.emoji,
            nutrition: recipe.nutrition,
            points: recipe.points,
            createdAt: new Date().toISOString(),
          };

          return {
            diaryEntries: [entry, ...state.diaryEntries],
            dailySummary: addNutrition(state.dailySummary, entry),
            points: state.points + recipe.points,
            completedRecipes: state.completedRecipes.includes(recipe.id)
              ? state.completedRecipes
              : [recipe.id, ...state.completedRecipes],
            lastEmotion: "motivada",
            toast: {
              id: Date.now(),
              message: `Agregaste la receta al diario y ganaste ${recipe.points} puntos.`,
              tone: "success",
            },
          };
        });
      },
      buyAccessory: (accessoryId) => {
        const accessory = storeAccessories.find((item) => item.id === accessoryId);
        if (!accessory?.price) {
          get().showToast("Ese accesorio no está en la tienda por ahora.", "warning");
          return false;
        }

        if (get().ownedAccessories.includes(accessory.id)) {
          get().toggleAccessory(accessory.id);
          return true;
        }

        if (get().points < accessory.price) {
          const missing = accessory.price - get().points;
          get().showToast(`Te faltan ${missing} puntos para desbloquearlo.`, "warning");
          return false;
        }

        set((state) => {
          const selectedWithoutSameSlot = state.selectedAccessories.filter((id) => {
            const equipped = resolveAccessory(id);
            return equipped?.slot !== accessory.slot;
          });

          return {
            points: state.points - accessory.price!,
            ownedAccessories: [...state.ownedAccessories, accessory.id],
            selectedAccessories: [...selectedWithoutSameSlot, accessory.id],
            lastEmotion: "feliz",
            toast: {
              id: Date.now(),
              message: `Compraste y equipaste ${accessory.name}.`,
              tone: "success",
            },
          };
        });

        return true;
      },
      toggleAccessory: (accessoryId) => {
        const accessory = resolveAccessory(accessoryId);
        if (!accessory) {
          get().showToast("No encontramos ese accesorio.", "warning");
          return;
        }

        if (!get().ownedAccessories.includes(accessoryId)) {
          get().showToast("Primero tenés que desbloquear ese accesorio.", "info");
          return;
        }

        set((state) => {
          const isEquipped = state.selectedAccessories.includes(accessoryId);
          if (isEquipped) {
            return {
              selectedAccessories: state.selectedAccessories.filter(
                (id) => id !== accessoryId,
              ),
              toast: {
                id: Date.now(),
                message: `Guardaste ${accessory.name}.`,
                tone: "info",
              },
            };
          }

          const selectedWithoutSameSlot = state.selectedAccessories.filter((id) => {
            const equipped = resolveAccessory(id);
            return equipped?.slot !== accessory.slot;
          });

          return {
            selectedAccessories: [...selectedWithoutSameSlot, accessoryId],
            lastEmotion: "feliz",
            toast: {
              id: Date.now(),
              message: `Equipaste ${accessory.name}.`,
              tone: "success",
            },
          };
        });
      },
      toggleFavoriteRecipe: (recipeId) =>
        set((state) => ({
          favoriteRecipes: state.favoriteRecipes.includes(recipeId)
            ? state.favoriteRecipes.filter((id) => id !== recipeId)
            : [recipeId, ...state.favoriteRecipes],
          toast: {
            id: Date.now(),
            message: state.favoriteRecipes.includes(recipeId)
              ? "Quitaste la receta de favoritos."
              : "Guardaste la receta en favoritos.",
            tone: "success",
          },
        })),
      updateProfile: (patch) =>
        set((state) => ({
          user: { ...state.user, ...patch },
          toast: {
            id: Date.now(),
            message: "Guardamos tus cambios.",
            tone: "success",
          },
        })),
    }),
    {
      name: "pancita-app-state",
      storage: createJSONStorage(() =>
        typeof window === "undefined" ? noopStorage : window.localStorage,
      ),
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        points: state.points,
        dailySummary: state.dailySummary,
        diaryEntries: state.diaryEntries,
        ownedAccessories: state.ownedAccessories,
        selectedAccessories: state.selectedAccessories,
        completedRecipes: state.completedRecipes,
        favoriteRecipes: state.favoriteRecipes,
        lastEmotion: state.lastEmotion,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);
