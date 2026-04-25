"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Bell,
  ChevronRight,
  Edit3,
  Goal,
  LockKeyhole,
  LogOut,
  Ruler,
  Shield,
  Trash2,
  UserRound,
  Utensils,
} from "lucide-react";
import { AppHeader } from "@/components/layout/AppHeader";
import { MobileShell } from "@/components/layout/MobileShell";
import { AppButton } from "@/components/ui/AppButton";
import { AppCard } from "@/components/ui/AppCard";
import { BottomSheet } from "@/components/ui/BottomSheet";
import { useAppStore } from "@/store/useAppStore";

const settingsRows = [
  {
    id: "datos",
    title: "Datos personales",
    description: "Editá tu información básica",
    icon: UserRound,
  },
  {
    id: "objetivos",
    title: "Objetivos",
    description: "Ver y modificar tus objetivos",
    icon: Goal,
  },
  {
    id: "preferencias",
    title: "Preferencias alimentarias",
    description: "Alimentos que te gustan o evitas",
    icon: Utensils,
  },
  {
    id: "notificaciones",
    title: "Notificaciones",
    description: "Ajustá tus notificaciones",
    icon: Bell,
  },
  {
    id: "privacidad",
    title: "Privacidad",
    description: "Controlá tu información",
    icon: Shield,
  },
  {
    id: "unidades",
    title: "Unidades",
    description: "kcal, gramos, cm",
    icon: Ruler,
  },
];

export default function ConfiguracionPerfilPage() {
  const router = useRouter();
  const [activeRow, setActiveRow] = useState<(typeof settingsRows)[number] | null>(null);
  const [draftName, setDraftName] = useState("");
  const [deleteOpen, setDeleteOpen] = useState(false);
  const user = useAppStore((state) => state.user);
  const logout = useAppStore((state) => state.logout);
  const showToast = useAppStore((state) => state.showToast);
  const updateProfile = useAppStore((state) => state.updateProfile);

  function handleLogout() {
    logout();
    router.replace("/login");
  }

  function openRow(row: (typeof settingsRows)[number]) {
    if (row.id === "datos") {
      setDraftName(user.name);
    }
    setActiveRow(row);
  }

  function saveMockSetting() {
    if (activeRow?.id === "datos") {
      updateProfile({ name: draftName || user.name });
    } else {
      showToast("Guardamos esta preferencia en tu dispositivo.", "success");
    }
    setActiveRow(null);
  }

  return (
    <MobileShell className="bg-[#fff7e9]">
      <AppHeader
        action={
          <button
            aria-label="Editar perfil"
            className="grid size-11 place-items-center rounded-full bg-white/84 text-[#647044] shadow-[0_10px_24px_rgba(76,58,35,0.1)]"
            onClick={() => openRow(settingsRows[0])}
            type="button"
          >
            <Edit3 size={19} />
          </button>
        }
        showBack
        title="Configuración de perfil"
      />

      <AppCard className="mb-5">
        <div className="flex items-center gap-4">
          <div className="grid size-16 place-items-center rounded-[24px] bg-[#eef4d9] text-[#617044]">
            <UserRound size={28} />
          </div>
          <div className="min-w-0">
            <h2 className="text-xl font-black text-[#3d432d]">{user.name}</h2>
            <p className="truncate text-sm font-bold text-[#81745f]">{user.email}</p>
            <p className="mt-1 text-xs font-black uppercase text-[#9a8c74]">
              Miembro desde {user.memberSince}
            </p>
          </div>
        </div>
      </AppCard>

      <section className="space-y-3">
        {settingsRows.map((row) => {
          const Icon = row.icon;
          return (
            <button
              className="flex min-h-[76px] w-full items-center gap-3 rounded-[25px] bg-white/82 p-4 text-left shadow-[0_12px_28px_rgba(80,61,38,0.09)] ring-1 ring-white/72"
              key={row.id}
              onClick={() => openRow(row)}
              type="button"
            >
              <span className="grid size-11 place-items-center rounded-2xl bg-[#f2eadb] text-[#647044]">
                <Icon size={20} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-black text-[#3d432d]">
                  {row.title}
                </span>
                <span className="mt-1 block text-xs font-bold text-[#81745f]">
                  {row.description}
                </span>
              </span>
              <ChevronRight className="text-[#a6987e]" size={19} />
            </button>
          );
        })}
      </section>

      <section className="mt-5 space-y-3">
        <button
          className="flex min-h-[58px] w-full items-center justify-center gap-2 rounded-full bg-white/84 text-sm font-black text-[#b2573f] shadow-[0_12px_28px_rgba(80,61,38,0.08)]"
          onClick={handleLogout}
          type="button"
        >
          <LogOut size={18} />
          Cerrar sesión
        </button>
        <button
          className="flex min-h-[58px] w-full items-center justify-center gap-2 rounded-full bg-[#f8e2dc] text-sm font-black text-[#b24738] ring-1 ring-[#efc5bd]"
          onClick={() => setDeleteOpen(true)}
          type="button"
        >
          <Trash2 size={18} />
          ¿Querés eliminar tu cuenta?
        </button>
      </section>

      <BottomSheet
        onClose={() => setActiveRow(null)}
        open={Boolean(activeRow)}
        title={activeRow?.title ?? "Configuración"}
      >
        {activeRow ? (
          <div>
            <p className="mb-4 text-sm font-bold leading-relaxed text-[#756852]">
              {activeRow.description}. Guardamos esta preferencia en tu dispositivo.
            </p>
            {activeRow.id === "datos" ? (
              <label className="mb-4 block">
                <span className="mb-2 block text-xs font-black uppercase text-[#9a8c74]">
                  Nombre
                </span>
                <input
                  className="min-h-12 w-full rounded-[18px] bg-white px-4 text-sm font-bold text-[#3d432d] outline-none ring-1 ring-[#eadfcb]"
                  onChange={(event) => setDraftName(event.target.value)}
                  value={draftName}
                />
              </label>
            ) : (
              <div className="mb-4 rounded-[22px] bg-[#fff5e4] p-4 text-sm font-bold leading-relaxed text-[#756852]">
                Elegí tus preferencias con calma. Pancita las va a recordar para
                acompañarte mejor.
              </div>
            )}
            <AppButton className="w-full" onClick={saveMockSetting}>
              Guardar
            </AppButton>
          </div>
        ) : null}
      </BottomSheet>

      <BottomSheet
        onClose={() => setDeleteOpen(false)}
        open={deleteOpen}
        title="Eliminar cuenta"
      >
        <div>
          <div className="mb-4 rounded-[22px] bg-[#f8e2dc] p-4 text-sm font-bold leading-relaxed text-[#9d4637]">
            Esta acción es sensible. Confirmá solo si estás seguro de que querés
            borrar la cuenta.
          </div>
          <div className="grid grid-cols-2 gap-3">
            <AppButton onClick={() => setDeleteOpen(false)} variant="secondary">
              Cancelar
            </AppButton>
            <AppButton
              icon={<LockKeyhole size={18} />}
              onClick={() => {
                setDeleteOpen(false);
                showToast("No eliminamos nada. Tus datos siguen seguros.", "info");
              }}
              variant="danger"
            >
              Confirmar
            </AppButton>
          </div>
        </div>
      </BottomSheet>
    </MobileShell>
  );
}
