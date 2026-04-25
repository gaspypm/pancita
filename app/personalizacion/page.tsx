"use client";

import { useState } from "react";
import { Sparkles } from "lucide-react";
import { PancitaScene } from "@/components/character/PancitaScene";
import { AppHeader } from "@/components/layout/AppHeader";
import { MobileShell } from "@/components/layout/MobileShell";
import { AccessoryCard } from "@/components/personalizacion/AccessoryCard";
import { AppButton } from "@/components/ui/AppButton";
import { AppCard } from "@/components/ui/AppCard";
import { BottomSheet } from "@/components/ui/BottomSheet";
import { storeAccessories } from "@/data/accessories";
import { formatNumber } from "@/lib/utils";
import { useAppStore } from "@/store/useAppStore";
import type { Accessory } from "@/types";

export default function PersonalizacionPage() {
  const [selectedAccessory, setSelectedAccessory] = useState<Accessory | null>(null);
  const points = useAppStore((state) => state.points);
  const ownedAccessories = useAppStore((state) => state.ownedAccessories);
  const selectedAccessories = useAppStore((state) => state.selectedAccessories);
  const buyAccessory = useAppStore((state) => state.buyAccessory);
  const toggleAccessory = useAppStore((state) => state.toggleAccessory);

  function handleAccessory(accessory: Accessory) {
    if (ownedAccessories.includes(accessory.id)) {
      toggleAccessory(accessory.id);
      return;
    }
    setSelectedAccessory(accessory);
  }

  function buySelectedAccessory() {
    if (!selectedAccessory) return;
    const success = buyAccessory(selectedAccessory.id);
    if (success) setSelectedAccessory(null);
  }

  const ownedStoreAccessories = storeAccessories.filter((accessory) =>
    ownedAccessories.includes(accessory.id),
  );

  return (
    <MobileShell className="bg-[var(--pancita-pink-light)]">
      <AppHeader
        action={
          <div className="inline-flex min-h-11 items-center gap-2 rounded-full bg-white/84 px-4 text-sm font-black text-[#9a6a24] shadow-[0_10px_24px_rgba(132,70,100,0.1)]">
            <Sparkles size={18} />
            {formatNumber(points)} puntos
          </div>
        }
        subtitle="Hacé única a tu Pancita"
        title="Personalización"
      />

      <PancitaScene
        className="mb-5"
        compact
        emotion="feliz"
        selectedAccessories={selectedAccessories}
        speech="Personalizá a Pancita con accesorios únicos."
      />

      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-[22px] font-black text-[var(--pancita-text-dark)] tracking-tight">Accesorios</h2>
          <span className="rounded-full bg-white/76 px-3 py-1 text-xs font-black text-[#aa6f85]">
            {storeAccessories.length}
          </span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {storeAccessories.map((accessory) => (
            <AccessoryCard
              accessory={accessory}
              equipped={selectedAccessories.includes(accessory.id)}
              key={accessory.id}
              onSelect={handleAccessory}
              owned={ownedAccessories.includes(accessory.id)}
            />
          ))}
        </div>
      </section>

      <section className="mt-5">
        {ownedStoreAccessories.length === 0 ? (
          <AppCard className="text-center">
            <p className="text-sm font-black text-[#3d432d]">
              Todavía no compraste accesorios de la tienda.
            </p>
            <p className="mt-1 text-sm font-bold leading-relaxed text-[#81745f]">
              Sumá puntos registrando comidas y completando recetas.
            </p>
          </AppCard>
        ) : (
          <AppCard>
            <p className="text-sm font-black text-[#3d432d]">
              Tenés {ownedStoreAccessories.length} accesorios desbloqueados.
            </p>
            <p className="mt-1 text-sm font-bold leading-relaxed text-[#81745f]">
              Tocá cualquiera para equiparlo o guardarlo.
            </p>
          </AppCard>
        )}
      </section>

      <BottomSheet
        onClose={() => setSelectedAccessory(null)}
        open={Boolean(selectedAccessory)}
        title={selectedAccessory?.name ?? "Accesorio"}
      >
        {selectedAccessory ? (
          <div>
            <div className="mb-5 flex items-center gap-4 rounded-[24px] bg-[#fff5f8] p-4">
              <span
                className="grid size-16 place-items-center rounded-[22px] text-3xl"
                style={{ backgroundColor: `${selectedAccessory.color}22` }}
              >
                {selectedAccessory.icon}
              </span>
              <div>
                <p className="text-lg font-black text-[#3d432d]">
                  {selectedAccessory.name}
                </p>
                <p className="text-sm font-bold text-[#8b806b]">
                  {selectedAccessory.description}
                </p>
                <p className="mt-1 text-sm font-black text-[#a66b1e]">
                  {selectedAccessory.price} puntos
                </p>
              </div>
            </div>
            {points < (selectedAccessory.price ?? 0) ? (
              <p className="mb-4 rounded-[20px] bg-[#fff1d8] p-3 text-sm font-bold leading-relaxed text-[#8a5a1d]">
                Te faltan {(selectedAccessory.price ?? 0) - points} puntos para
                desbloquearlo.
              </p>
            ) : null}
            <div className="grid grid-cols-2 gap-3">
              <AppButton onClick={() => setSelectedAccessory(null)} variant="secondary">
                Cancelar
              </AppButton>
              <AppButton onClick={buySelectedAccessory}>Comprar</AppButton>
            </div>
          </div>
        ) : null}
      </BottomSheet>
    </MobileShell>
  );
}
