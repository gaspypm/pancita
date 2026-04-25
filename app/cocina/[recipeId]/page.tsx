"use client";

import { useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { Heart, Share2 } from "lucide-react";
import { AppHeader } from "@/components/layout/AppHeader";
import { MobileShell } from "@/components/layout/MobileShell";
import { AppButton } from "@/components/ui/AppButton";
import { AppCard } from "@/components/ui/AppCard";
import { recipes } from "@/data/recipes";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/store/useAppStore";

export default function RecipeDetailPage() {
  const params = useParams<{ recipeId: string }>();
  const router = useRouter();
  const recipe = useMemo(
    () => recipes.find((item) => item.id === params.recipeId),
    [params.recipeId],
  );
  const favoriteRecipes = useAppStore((state) => state.favoriteRecipes);
  const toggleFavoriteRecipe = useAppStore((state) => state.toggleFavoriteRecipe);
  const showToast = useAppStore((state) => state.showToast);

  if (!recipe) {
    return (
      <MobileShell className="bg-[#fff7e9]">
        <AppHeader showBack title="Receta no disponible" />
        <AppCard className="text-center">
          <p className="text-sm font-bold leading-relaxed text-[#81745f]">
            No encontramos esa receta por ahora. Volvé a Cocina para elegir otra.
          </p>
          <AppButton className="mt-4 w-full" onClick={() => router.push("/cocina")}>
            Ir a Cocina
          </AppButton>
        </AppCard>
      </MobileShell>
    );
  }

  const isFavorite = favoriteRecipes.includes(recipe.id);

  async function shareRecipe() {
    if (!recipe) return;
    const shareData = {
      title: recipe.title,
      text: recipe.description,
      url: window.location.href,
    };

    if (navigator.share) {
      await navigator.share(shareData).catch(() => undefined);
      return;
    }

    await navigator.clipboard?.writeText(window.location.href);
    showToast("Copiamos el enlace de la receta.", "success");
  }

  return (
    <MobileShell className="bg-[#fff7e9]">
      <AppHeader
        action={
          <div className="flex gap-2">
            <button
              aria-label="Guardar receta"
              className={cn(
                "grid size-11 place-items-center rounded-full bg-white/84 shadow-[0_10px_24px_rgba(76,58,35,0.1)]",
                isFavorite ? "text-[#ef7e9b]" : "text-[#647044]",
              )}
              onClick={() => toggleFavoriteRecipe(recipe.id)}
              type="button"
            >
              <Heart fill={isFavorite ? "currentColor" : "none"} size={20} />
            </button>
            <button
              aria-label="Compartir receta"
              className="grid size-11 place-items-center rounded-full bg-white/84 text-[#647044] shadow-[0_10px_24px_rgba(76,58,35,0.1)]"
              onClick={shareRecipe}
              type="button"
            >
              <Share2 size={20} />
            </button>
          </div>
        }
        showBack
        title="Cocina"
      />

      <section
        className="mb-5 grid min-h-[220px] place-items-center rounded-[34px] shadow-[inset_0_-18px_40px_rgba(122,95,58,0.08)]"
        style={{ background: `linear-gradient(135deg, ${recipe.accent}, #fff8e8)` }}
      >
        <div className="grid size-32 place-items-center rounded-full bg-white/60 text-7xl shadow-[inset_0_-16px_28px_rgba(83,60,34,0.08)]">
          {recipe.emoji}
        </div>
      </section>

      <section className="mb-5">
        <span className="mb-3 inline-flex rounded-full bg-[#eef4d9] px-3 py-1 text-xs font-black text-[#617044]">
          {recipe.tag}
        </span>
        <h1 className="text-[30px] font-black leading-tight text-[#39402b]">
          {recipe.title}
        </h1>
        <div className="mt-3 flex gap-2 text-xs font-black text-[#7f735f]">
          <span className="rounded-full bg-white/82 px-3 py-2">{recipe.time}</span>
          <span className="rounded-full bg-white/82 px-3 py-2">{recipe.portions}</span>
        </div>
        <p className="mt-4 text-base font-bold leading-relaxed text-[#756852]">
          {recipe.description}
        </p>
      </section>

      <AppCard>
        <h2 className="mb-4 text-xl font-black text-[#3d432d]">Ingredientes</h2>
        <ul className="space-y-3">
          {recipe.ingredients.map((ingredient) => (
            <li
              className="flex items-start gap-3 text-sm font-bold leading-relaxed text-[#5e6645]"
              key={ingredient}
            >
              <span className="mt-1 size-2 rounded-full bg-[#6f7f43]" />
              {ingredient}
            </li>
          ))}
        </ul>
      </AppCard>

      <AppButton
        className="mt-5 w-full"
        onClick={() => router.push(`/cocina/${recipe.id}/pasos`)}
        size="lg"
      >
        Comenzar receta
      </AppButton>
    </MobileShell>
  );
}
