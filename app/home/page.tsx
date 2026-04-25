"use client";

import { useState } from "react";
import Link from "next/link";
import { Bell, ChevronDown, UserRound } from "lucide-react";
import { PancitaScene } from "@/components/character/PancitaScene";
import { AppCard } from "@/components/ui/AppCard";
import { ProgressRing } from "@/components/ui/ProgressRing";
import { StatCard } from "@/components/ui/StatCard";
import { MobileShell } from "@/components/layout/MobileShell";
import { weeklySummary } from "@/data/mockUser";
import { formatNumber } from "@/lib/utils";
import { useAppStore } from "@/store/useAppStore";

export default function HomePage() {
  const [expanded, setExpanded] = useState(false);
  const user = useAppStore((state) => state.user);
  const summary = useAppStore((state) => state.dailySummary);
  const lastEmotion = useAppStore((state) => state.lastEmotion);
  const selectedAccessories = useAppStore((state) => state.selectedAccessories);
  const showToast = useAppStore((state) => state.showToast);

  return (
    <MobileShell className="bg-[#fff4df]">
      <header className="mb-4 flex items-center justify-between gap-3">
        <div>
          <p className="text-[27px] font-black leading-tight text-[#3c422c]">
            ¡Hola, {user.name}! 👋
          </p>
          <p className="mt-1 text-sm font-bold text-[#8a7d66]">
            Domingo, 19 de Abril
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            aria-label="Notificaciones"
            className="grid size-11 place-items-center rounded-full bg-white/78 text-[#647044] shadow-[0_10px_24px_rgba(76,58,35,0.1)]"
            onClick={() =>
              showToast("No tenés notificaciones pendientes por ahora.", "info")
            }
            type="button"
          >
            <Bell size={20} />
          </button>
          <Link
            aria-label="Abrir perfil"
            className="grid size-11 place-items-center rounded-full bg-[#6f7f43] text-white shadow-[0_10px_24px_rgba(111,127,67,0.23)]"
            href="/perfil"
          >
            <UserRound size={20} />
          </Link>
        </div>
      </header>

      <PancitaScene
        className="mb-5"
        compact
        emotion={lastEmotion}
        selectedAccessories={selectedAccessories}
      />

      <section className="mb-5">
        <h2 className="mb-3 text-xl font-black text-[#3d432d]">Resumen del día</h2>
        <div className="grid grid-cols-2 gap-3">
          <StatCard
            color="#f0b751"
            current={summary.consumed.kcal}
            icon="🔥"
            label="Energía"
            target={summary.targets.kcal}
            value={`${formatNumber(summary.consumed.kcal)} kcal de ${formatNumber(summary.targets.kcal)}`}
          />
          <StatCard
            color="#6f7f43"
            current={summary.consumed.protein}
            icon="💪"
            label="Proteínas"
            target={summary.targets.protein}
            value={`${formatNumber(summary.consumed.protein)} g proteínas de ${formatNumber(summary.targets.protein)} g`}
          />
          <StatCard
            color="#d8a048"
            current={summary.consumed.carbs}
            icon="🍚"
            label="Carbohidratos"
            target={summary.targets.carbs}
            value={`${formatNumber(summary.consumed.carbs)} g carbohidratos de ${formatNumber(summary.targets.carbs)} g`}
          />
          <StatCard
            color="#ef9db5"
            current={summary.consumed.fat}
            icon="🥑"
            label="Grasas"
            target={summary.targets.fat}
            value={`${formatNumber(summary.consumed.fat)} g grasas de ${formatNumber(summary.targets.fat)} g`}
          />
        </div>
      </section>

      <AppCard>
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-black text-[#3d432d]">
              Resumen de la semana
            </h2>
            <p className="mt-1 text-sm font-bold text-[#81745f]">
              Promedio diario {formatNumber(weeklySummary.averageKcal)} kcal
            </p>
          </div>
          <button
            className="inline-flex min-h-10 items-center gap-1 rounded-full bg-[#eef4d9] px-3 text-xs font-black text-[#617044]"
            onClick={() => setExpanded((value) => !value)}
            type="button"
          >
            Ver más
            <ChevronDown
              className={expanded ? "rotate-180 transition" : "transition"}
              size={16}
            />
          </button>
        </div>
        <div className="space-y-4">
          <ProgressRing
            color="#6f7f43"
            current={weeklySummary.protein.current}
            label="Proteínas"
            target={weeklySummary.protein.target}
            value={`Proteínas ${formatNumber(weeklySummary.protein.current)} g / ${formatNumber(weeklySummary.protein.target)} g`}
          />
          <ProgressRing
            color="#d8a048"
            current={weeklySummary.carbs.current}
            label="Carbohidratos"
            target={weeklySummary.carbs.target}
            value={`Carbohidratos ${formatNumber(weeklySummary.carbs.current)} g / ${formatNumber(weeklySummary.carbs.target)} g`}
          />
          <ProgressRing
            color="#ef9db5"
            current={weeklySummary.fat.current}
            label="Grasas"
            target={weeklySummary.fat.target}
            value={`Grasas ${formatNumber(weeklySummary.fat.current)} g / ${formatNumber(weeklySummary.fat.target)} g`}
          />
        </div>
        {expanded ? (
          <div className="mt-5 rounded-[22px] bg-[#fff7e7] p-4 text-sm font-bold leading-relaxed text-[#776a55]">
            Te faltan proteínas esta semana. Probá una receta simple en Modo Chef
            cuando quieras sumar algo rico.
          </div>
        ) : null}
      </AppCard>
    </MobileShell>
  );
}
