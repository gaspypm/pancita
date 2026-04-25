"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { PancitaScene } from "@/components/character/PancitaScene";
import { RecipeStepProgress } from "@/components/cocina/RecipeStepProgress";
import { AppHeader } from "@/components/layout/AppHeader";
import { MobileShell } from "@/components/layout/MobileShell";
import { AppButton } from "@/components/ui/AppButton";
import { AppCard } from "@/components/ui/AppCard";
import { recipes } from "@/data/recipes";
import { useAppStore } from "@/store/useAppStore";

export default function RecipeStepsPage() {
  const params = useParams<{ recipeId: string }>();
  const router = useRouter();
  const [stepIndex, setStepIndex] = useState(0);
  const recipe = useMemo(
    () => recipes.find((item) => item.id === params.recipeId),
    [params.recipeId],
  );
  const addRecipeToDiary = useAppStore((state) => state.addRecipeToDiary);
  const favoriteRecipes = useAppStore((state) => state.favoriteRecipes);
  const toggleFavoriteRecipe = useAppStore((state) => state.toggleFavoriteRecipe);
  const showToast = useAppStore((state) => state.showToast);

  if (!recipe || recipe.steps.length === 0) {
    return (
      <MobileShell className="bg-[var(--pancita-cream)]">
        <AppHeader showBack title="Receta no disponible" />
        <AppCard className="text-center">
          <p className="text-sm font-bold leading-relaxed text-[#81745f]">
            Esta receta todavía no tiene pasos guiados.
          </p>
          <AppButton className="mt-4 w-full" onClick={() => router.push("/cocina")}>
            Volver a Cocina
          </AppButton>
        </AppCard>
      </MobileShell>
    );
  }

  const totalSteps = recipe.steps.length;
  const currentStep = recipe.steps[stepIndex];
  const isLastStep = stepIndex === totalSteps - 1;

  function addToDiary() {
    if (!recipe) return;
    addRecipeToDiary(recipe.id);
    router.push("/diario");
  }

  function showSavedRecipes() {
    if (!recipe) return;
    if (!favoriteRecipes.includes(recipe.id)) {
      toggleFavoriteRecipe(recipe.id);
    }
    showToast("Guardamos la receta en Mis recetas.", "success");
    router.push("/cocina?misRecetas=1");
  }

  return (
    <MobileShell className="bg-[var(--pancita-cream)]">
      <AppHeader showBack title={recipe.title} />

      <RecipeStepProgress currentStep={stepIndex + 1} totalSteps={totalSteps} />

      <section
        className="mt-5 grid min-h-[190px] place-items-center rounded-[34px] shadow-[inset_0_-18px_40px_rgba(122,95,58,0.08)]"
        style={{ background: `linear-gradient(135deg, ${recipe.accent}, #fff8e8)` }}
      >
        {isLastStep ? (
          <PancitaScene chefMode compact emotion="motivada" />
        ) : (
          <div className="grid size-28 place-items-center rounded-full bg-white/60 text-6xl shadow-[inset_0_-14px_24px_rgba(83,60,34,0.08)]">
            {recipe.emoji}
          </div>
        )}
      </section>

      <AnimatePresence mode="wait">
        <motion.section
          animate={{ opacity: 1, x: 0 }}
          className="mt-5"
          exit={{ opacity: 0, x: -18 }}
          initial={{ opacity: 0, x: 18 }}
          key={stepIndex}
          transition={{ duration: 0.24 }}
        >
          <p className="mb-2 text-sm font-black uppercase text-[#8b806b]">
            Paso {stepIndex + 1} de {totalSteps}
          </p>
          <h1 className="text-[28px] font-black leading-tight text-[var(--pancita-text-dark)]">
            {currentStep.title}
          </h1>
          <p className="mt-4 text-lg font-bold leading-relaxed text-[#6f624f]">
            {currentStep.instruction}
          </p>

          {!isLastStep ? (
            <AppCard className="mt-5 bg-[#f7f0df]/88">
              <p className="mb-2 text-xs font-black uppercase text-[#9d7a36]">
                Consejo
              </p>
              <p className="text-sm font-bold leading-relaxed text-[#756852]">
                {currentStep.tip}
              </p>
            </AppCard>
          ) : (
            <AppCard className="mt-5 text-center bg-[var(--pancita-lavender)] ring-[var(--pancita-lavender)] shadow-[0_16px_40px_rgba(243,234,251,0.5)]">
              <p className="text-[22px] font-black text-[var(--pancita-text-dark)] tracking-tight">¡Receta completada!</p>
              <p className="mt-1 text-[16px] font-black text-[var(--pancita-text-dark)]">{recipe.title}</p>
              <p className="mt-2 text-sm font-bold leading-relaxed text-[#756852]">
                Hiciste un plato saludable y delicioso 💚
              </p>
            </AppCard>
          )}
        </motion.section>
      </AnimatePresence>

      <div className="sticky bottom-24 mt-6 rounded-[30px] bg-[#fffaf2]/92 p-3 shadow-[0_16px_34px_rgba(65,48,30,0.14)] backdrop-blur">
        {isLastStep ? (
          <div className="grid gap-3">
            <AppButton className="w-full" onClick={addToDiary} size="lg">
              Agregar al diario
            </AppButton>
            <div className="grid grid-cols-2 gap-3">
              <AppButton
                className="w-full"
                onClick={() => router.push("/cocina")}
                variant="secondary"
              >
                Ahora no
              </AppButton>
              <AppButton
                className="w-full"
                onClick={showSavedRecipes}
                variant="secondary"
              >
                Ver en mis recetas
              </AppButton>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            <AppButton
              disabled={stepIndex === 0}
              onClick={() => setStepIndex((value) => Math.max(0, value - 1))}
              variant="secondary"
            >
              Anterior
            </AppButton>
            <AppButton
              onClick={() => setStepIndex((value) => Math.min(totalSteps - 1, value + 1))}
            >
              Siguiente
            </AppButton>
          </div>
        )}
      </div>
    </MobileShell>
  );
}
