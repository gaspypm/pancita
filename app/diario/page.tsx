"use client";

import { useMemo, useRef, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { PancitaScene } from "@/components/character/PancitaScene";
import { FoodCard } from "@/components/diario/FoodCard";
import { FoodDropZone } from "@/components/diario/FoodDropZone";
import { AppHeader } from "@/components/layout/AppHeader";
import { MobileShell } from "@/components/layout/MobileShell";
import { AppCard } from "@/components/ui/AppCard";
import { foods } from "@/data/foods";
import { formatNumber } from "@/lib/utils";
import { useAppStore } from "@/store/useAppStore";

export default function DiarioPage() {
  const [query, setQuery] = useState("");
  const dropZoneRef = useRef<HTMLDivElement>(null);
  const addFood = useAppStore((state) => state.addFood);
  const diaryEntries = useAppStore((state) => state.diaryEntries);
  const selectedAccessories = useAppStore((state) => state.selectedAccessories);
  const lastEmotion = useAppStore((state) => state.lastEmotion);
  const showToast = useAppStore((state) => state.showToast);

  const filteredFoods = useMemo(
    () =>
      foods.filter((food) =>
        food.name.toLocaleLowerCase("es").includes(query.toLocaleLowerCase("es")),
      ),
    [query],
  );

  function feed(foodId: string) {
    addFood(foodId);
  }

  function handleDragFeed(foodId: string, point: { x: number; y: number }) {
    const rect = dropZoneRef.current?.getBoundingClientRect();
    if (!rect) return;
    const isInside =
      point.x >= rect.left &&
      point.x <= rect.right &&
      point.y >= rect.top &&
      point.y <= rect.bottom;

    if (isInside) {
      feed(foodId);
    }
  }

  return (
    <MobileShell className="bg-[#eef6df]">
      <AppHeader
        action={
          <button
            aria-label="Filtros"
            className="grid size-11 place-items-center rounded-full bg-white/82 text-[#647044] shadow-[0_10px_24px_rgba(72,90,52,0.1)]"
            onClick={() => showToast("Probá buscar por nombre para encontrar comidas rápido.", "info")}
            type="button"
          >
            <SlidersHorizontal size={20} />
          </button>
        }
        subtitle="Alimentar a Pancita"
        title="Diario"
      />

      <PancitaScene
        compact
        emotion={diaryEntries.length === 0 ? "hambrienta" : lastEmotion}
        pulseKey={diaryEntries.length}
        selectedAccessories={selectedAccessories}
        speech="¡Tengo mucha hambre! ¿Qué me vas a dar hoy? 😊"
      />
      <FoodDropZone ref={dropZoneRef} />

      <div className="mt-5 flex min-h-12 items-center gap-3 rounded-full bg-white/86 px-4 shadow-[0_12px_26px_rgba(72,90,52,0.09)] ring-1 ring-white/70">
        <Search className="text-[#7a8758]" size={19} />
        <input
          className="min-w-0 flex-1 bg-transparent text-sm font-bold text-[#3d432d] outline-none placeholder:text-[#9e967f]"
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Buscar comida..."
          value={query}
        />
      </div>

      <section className="mt-5">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-black text-[#3d432d]">Comidas</h2>
          <span className="rounded-full bg-white/72 px-3 py-1 text-xs font-black text-[#77835a]">
            {filteredFoods.length}
          </span>
        </div>
        {filteredFoods.length > 0 ? (
          <div className="grid grid-cols-2 gap-3">
            {filteredFoods.map((food) => (
              <FoodCard
                food={food}
                key={food.id}
                onDragFeed={handleDragFeed}
                onFeed={feed}
              />
            ))}
          </div>
        ) : (
          <AppCard className="text-center">
            <p className="text-sm font-black text-[#3d432d]">
              No encontramos esa comida todavía.
            </p>
            <p className="mt-1 text-sm font-bold text-[#81745f]">
              Probá con otro nombre o registrala más adelante.
            </p>
          </AppCard>
        )}
      </section>

      <section className="mt-5">
        <h2 className="mb-3 text-lg font-black text-[#3d432d]">Hoy</h2>
        {diaryEntries.length === 0 ? (
          <AppCard className="text-center">
            <p className="text-sm font-black text-[#3d432d]">
              Todavía no registraste comidas.
            </p>
            <p className="mt-1 text-sm font-bold leading-relaxed text-[#81745f]">
              Arrastrá o tocá una comida para alimentar a Pancita.
            </p>
          </AppCard>
        ) : (
          <div className="space-y-3">
            {diaryEntries.slice(0, 5).map((entry) => (
              <div
                className="flex items-center gap-3 rounded-[24px] bg-white/82 p-3 shadow-[0_10px_24px_rgba(72,90,52,0.08)]"
                key={entry.id}
              >
                <span className="grid size-12 place-items-center rounded-2xl bg-[#f4ead8] text-2xl">
                  {entry.emoji}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-black text-[#3d432d]">
                    {entry.name}
                  </p>
                  <p className="text-xs font-bold text-[#8a806b]">
                    {formatNumber(entry.nutrition.kcal)} kcal · +{entry.points} puntos
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </MobileShell>
  );
}
