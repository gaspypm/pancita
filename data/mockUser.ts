import type { DailySummary, MacroTargets, UserProfile, WeeklySummary } from "@/types";

export const mockUser: UserProfile = {
  name: "Diego",
  email: "diego@email.com",
  memberSince: "Abril 2024",
  age: "25 años",
  sex: "Masculino",
  height: "175 cm",
  currentWeight: "72 kg",
  activityLevel: "Moderada",
  activityDescription: "Ejercicio 3-5 días por semana",
  goal: "Mantener peso",
  goalDescription: "Sin cambios significativos",
};

export const profileDailyGoals: MacroTargets = {
  kcal: 2000,
  protein: 150,
  carbs: 250,
  fat: 70,
};

export const initialDailySummary: DailySummary = {
  consumed: {
    kcal: 1250,
    protein: 45,
    carbs: 150,
    fat: 38,
  },
  targets: {
    kcal: 2000,
    protein: 80,
    carbs: 250,
    fat: 70,
  },
};

export const weeklySummary: WeeklySummary = {
  averageKcal: 1320,
  protein: { current: 310, target: 560 },
  carbs: { current: 1050, target: 1750 },
  fat: { current: 260, target: 490 },
};
