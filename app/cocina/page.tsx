"use client";

import { Suspense, useMemo, useState } from "react";
import { Search } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { PancitaScene } from "@/components/character/PancitaScene";
import { RecipeCard } from "@/components/cocina/RecipeCard";
import { AppHeader } from "@/components/layout/AppHeader";
import { MobileShell } from "@/components/layout/MobileShell";
import { AppCard } from "@/components/ui/AppCard";
import { recipes } from "@/data/recipes";
import { useAppStore } from "@/store/useAppStore";

export default function CocinaPage() {
  return (
    <Suspense fallback={null}>
      <CocinaContent />
    </Suspense>
  );
}

function CocinaContent() {
  const searchParams = useSearchParams();
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [showAllManual, setShowAllManual] = useState(false);
  const favoriteRecipes = useAppStore((state) => state.favoriteRecipes);
  const completedRecipes = useAppStore((state) => state.completedRecipes);
  const showAll = showAllManual || searchParams.get("misRecetas") === "1";

  const recommended = recipes[0];
  const secondaryRecipes = recipes.slice(1);
  const visibleRecipes = useMemo(
    () =>
      recipes.filter((recipe) =>
        recipe.title.toLocaleLowerCase("es").includes(query.toLocaleLowerCase("es")),
      ),
    [query],
  );
  const myRecipes = recipes.filter(
    (recipe) =>
      favoriteRecipes.includes(recipe.id) || completedRecipes.includes(recipe.id),
  );

  return (
    <MobileShell className="bg-[#f2edf9]">
      <AppHeader
        action={
          <button
            aria-label="Buscar recetas"
            className="grid size-11 place-items-center rounded-full bg-white/82 text-[#66517c] shadow-[0_10px_24px_rgba(93,73,114,0.1)]"
            onClick={() => setSearchOpen((value) => !value)}
            type="button"
          >
            <Search size={20} />
          </button>
        }
        subtitle="Modo Chef"
        title="Cocina"
      />

      {searchOpen ? (
        <div className="mb-4 flex min-h-12 items-center gap-3 rounded-full bg-white/86 px-4 shadow-[0_12px_26px_rgba(93,73,114,0.09)] ring-1 ring-white/70">
          <Search className="text-[#765c8f]" size={19} />
          <input
            autoFocus
            className="min-w-0 flex-1 bg-transparent text-sm font-bold text-[#3d432d] outline-none placeholder:text-[#9e967f]"
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Buscar recetas..."
            value={query}
          />
        </div>
      ) : null}

      <PancitaScene
        chefMode
        className="mb-5"
        compact
        speech="Te faltan proteínas 💪 ¡Probá alguna de estas recetas!"
      />

      {searchOpen && query ? (
        <section className="space-y-3">
          <h2 className="text-lg font-black text-[#3d432d]">Resultados</h2>
          {visibleRecipes.length > 0 ? (
            visibleRecipes.map((recipe) => <RecipeCard key={recipe.id} recipe={recipe} />)
          ) : (
            <AppCard className="text-center">
              <p className="text-sm font-black">No encontramos recetas con ese nombre.</p>
            </AppCard>
          )}
        </section>
      ) : (
        <>
          <section>
            <p className="mb-3 text-sm font-black uppercase text-[#7b668f]">
              Recomendada para vos
            </p>
            <RecipeCard featured recipe={recommended} />
          </section>

          <section className="mt-6">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-xl font-black text-[#3d432d]">Más recetas</h2>
              <button
                className="rounded-full bg-white/78 px-4 py-2 text-xs font-black text-[#765c8f] shadow-[0_10px_22px_rgba(93,73,114,0.09)]"
                onClick={() => setShowAllManual((value) => !value)}
                type="button"
              >
                Ver todas
              </button>
            </div>
            <div className="space-y-3">
              {(showAll ? recipes : secondaryRecipes).map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          </section>

          <section className="mt-6">
            <h2 className="mb-3 text-xl font-black text-[#3d432d]">Mis recetas</h2>
            {myRecipes.length > 0 ? (
              <div className="space-y-3">
                {myRecipes.map((recipe) => (
                  <RecipeCard key={recipe.id} recipe={recipe} />
                ))}
              </div>
            ) : (
              <AppCard className="text-center">
                <p className="text-sm font-black text-[#3d432d]">
                  Todavía no guardaste recetas.
                </p>
                <p className="mt-1 text-sm font-bold text-[#81745f]">
                  Tocá el corazón en una receta para encontrarla rápido después.
                </p>
              </AppCard>
            )}
          </section>
        </>
      )}
    </MobileShell>
  );
}
