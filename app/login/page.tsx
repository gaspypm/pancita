"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Apple, Mail } from "lucide-react";
import { PancitaScene } from "@/components/character/PancitaScene";
import { AppButton } from "@/components/ui/AppButton";
import { useAppStore } from "@/store/useAppStore";

export default function LoginPage() {
  const router = useRouter();
  const login = useAppStore((state) => state.login);
  const isAuthenticated = useAppStore((state) => state.isAuthenticated);
  const hasHydrated = useAppStore((state) => state.hasHydrated);

  useEffect(() => {
    if (hasHydrated && isAuthenticated) {
      router.replace("/home");
    }
  }, [hasHydrated, isAuthenticated, router]);

  function enterApp() {
    login();
    router.replace("/home");
  }

  return (
    <main className="min-h-dvh bg-[#eadfca]">
      <section className="mx-auto flex min-h-dvh w-full max-w-[430px] flex-col bg-[#fff7e9] px-6 pb-[max(24px,env(safe-area-inset-bottom))] pt-[max(22px,env(safe-area-inset-top))]">
        <div className="flex flex-1 flex-col justify-between">
          <div>
            <div className="mb-4 text-center">
              <p className="text-[38px] font-black leading-none text-[#5f713b]">
                PANCITA
              </p>
              <p className="mx-auto mt-3 max-w-[280px] text-base font-bold leading-relaxed text-[#746a58]">
                Tu compañero para alimentarte mejor cada día
              </p>
            </div>

            <PancitaScene
              className="mt-5"
              emotion="feliz"
              speech="Pancita crece con vos. Mejores hábitos, mejores días."
            />
          </div>

          <div className="mt-7 space-y-4">
            <div className="grid gap-3">
              <AppButton className="w-full" onClick={enterApp} size="lg">
                Iniciar sesión
              </AppButton>
              <AppButton
                className="w-full"
                onClick={enterApp}
                size="lg"
                variant="secondary"
              >
                Crear cuenta
              </AppButton>
            </div>

            <div className="flex items-center gap-3 text-xs font-black uppercase text-[#9a8d75]">
              <span className="h-px flex-1 bg-[#eadfcb]" />
              o continúa con
              <span className="h-px flex-1 bg-[#eadfcb]" />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <button
                aria-label="Continuar con Google"
                className="grid min-h-13 place-items-center rounded-[22px] bg-white/84 text-lg font-black text-[#4b5437] shadow-[0_10px_24px_rgba(80,61,38,0.09)] ring-1 ring-white/76"
                onClick={enterApp}
                type="button"
              >
                G
              </button>
              <button
                aria-label="Continuar con Apple"
                className="grid min-h-13 place-items-center rounded-[22px] bg-white/84 text-[#4b5437] shadow-[0_10px_24px_rgba(80,61,38,0.09)] ring-1 ring-white/76"
                onClick={enterApp}
                type="button"
              >
                <Apple size={22} />
              </button>
              <button
                aria-label="Continuar con Email"
                className="grid min-h-13 place-items-center rounded-[22px] bg-white/84 text-[#4b5437] shadow-[0_10px_24px_rgba(80,61,38,0.09)] ring-1 ring-white/76"
                onClick={enterApp}
                type="button"
              >
                <Mail size={22} />
              </button>
            </div>
          </div>

          <p className="pt-5 text-center text-xs font-bold text-[#9a8d75]">
            Tu información está segura con nosotros
          </p>
        </div>
      </section>
    </main>
  );
}
