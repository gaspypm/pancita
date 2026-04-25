"use client";

import Link from "next/link";
import { Camera, Settings } from "lucide-react";
import { PancitaScene } from "@/components/character/PancitaScene";
import { AppHeader } from "@/components/layout/AppHeader";
import { MobileShell } from "@/components/layout/MobileShell";
import { ProfileField } from "@/components/perfil/ProfileField";
import { AppCard } from "@/components/ui/AppCard";
import { profileDailyGoals } from "@/data/mockUser";
import { formatNumber } from "@/lib/utils";
import { useAppStore } from "@/store/useAppStore";

export default function PerfilPage() {
  const user = useAppStore((state) => state.user);
  const selectedAccessories = useAppStore((state) => state.selectedAccessories);
  const showToast = useAppStore((state) => state.showToast);

  return (
    <MobileShell className="bg-[#fff7e9]">
      <AppHeader
        action={
          <Link
            aria-label="Configurar perfil"
            className="grid size-11 place-items-center rounded-full bg-white/84 text-[#647044] shadow-[0_10px_24px_rgba(76,58,35,0.1)]"
            href="/perfil/configuracion"
          >
            <Settings size={20} />
          </Link>
        }
        title="Mi perfil"
      />

      <AppCard className="mb-5 text-center">
        <div className="relative mx-auto mb-4 max-w-[220px]">
          <PancitaScene
            compact
            emotion="feliz"
            selectedAccessories={selectedAccessories}
          />
          <button
            aria-label="Cambiar foto"
            className="absolute bottom-4 right-4 grid size-11 place-items-center rounded-full bg-[#6f7f43] text-white shadow-[0_10px_22px_rgba(111,127,67,0.25)]"
            onClick={() => showToast("La cámara se conectará más adelante.", "info")}
            type="button"
          >
            <Camera size={19} />
          </button>
        </div>
        <h2 className="text-2xl font-black text-[#3d432d]">{user.name}</h2>
        <p className="mt-1 text-sm font-bold text-[#81745f]">{user.email}</p>
      </AppCard>

      <section className="mb-5">
        <h2 className="mb-3 text-xl font-black text-[#3d432d]">Datos personales</h2>
        <div className="grid grid-cols-2 gap-3">
          <ProfileField label="Edad" value={user.age} />
          <ProfileField label="Sexo" value={user.sex} />
          <ProfileField label="Altura" value={user.height} />
          <ProfileField label="Peso actual" value={user.currentWeight} />
        </div>
      </section>

      <section className="mb-5 space-y-3">
        <ProfileField
          description={user.activityDescription}
          label="Nivel de actividad física"
          value={user.activityLevel}
        />
        <ProfileField
          description={user.goalDescription}
          label="Objetivo"
          value={user.goal}
        />
      </section>

      <AppCard>
        <h2 className="text-xl font-black text-[#3d432d]">Tu meta diaria estimada</h2>
        <div className="mt-4 grid grid-cols-2 gap-3">
          <ProfileField
            className="bg-[#fff7e7]"
            label="Energía"
            value={`${formatNumber(profileDailyGoals.kcal)} kcal`}
          />
          <ProfileField
            className="bg-[#f3f7df]"
            label="Proteínas"
            value={`${formatNumber(profileDailyGoals.protein)} g proteínas`}
          />
          <ProfileField
            className="bg-[#fff0d7]"
            label="Carbohidratos"
            value={`${formatNumber(profileDailyGoals.carbs)} g carbohidratos`}
          />
          <ProfileField
            className="bg-[#fff0f5]"
            label="Grasas"
            value={`${formatNumber(profileDailyGoals.fat)} g grasas`}
          />
        </div>
        <p className="mt-4 text-sm font-bold leading-relaxed text-[#81745f]">
          Estos valores se ajustarán a medida que registres tus comidas y avances.
        </p>
      </AppCard>
    </MobileShell>
  );
}
