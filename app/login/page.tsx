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
    <main className="min-h-dvh bg-[var(--pancita-cream-strong)]">
      <section className="relative mx-auto flex min-h-dvh w-full max-w-[430px] flex-col bg-[var(--pancita-cream)] px-6 pb-[max(24px,env(safe-area-inset-bottom))] pt-[max(22px,env(safe-area-inset-top))] overflow-hidden">
        
        {/* Warm radial gradient background to simulate a sunny room */}
        <div className="absolute top-0 left-0 right-0 h-[60%] bg-[radial-gradient(ellipse_at_top_center,var(--pancita-yellow)_0%,transparent_70%)] opacity-20 pointer-events-none" />

        <div className="relative flex flex-1 flex-col justify-between z-10">
          <div>
            <div className="mb-4 text-center">
              <p className="text-[42px] font-black leading-none text-[var(--pancita-olive)] tracking-tight">
                PANCITA
              </p>
              <p className="mx-auto mt-3 max-w-[280px] text-[17px] font-bold leading-relaxed text-[var(--pancita-text-muted)]">
                Tu compañero para alimentarte mejor cada día
              </p>
            </div>

            <PancitaScene
              className="mt-5"
              emotion="feliz"
              speech="Pancita crece con vos. Mejores hábitos, mejores días."
            />
          </div>

          <div className="mt-7 space-y-5">
            <div className="grid gap-3.5">
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

            <div className="flex items-center gap-3 text-xs font-black uppercase text-[var(--pancita-text-muted)] tracking-wider">
              <span className="h-[2px] flex-1 bg-[var(--pancita-cream-strong)] rounded-full" />
              o continúa con
              <span className="h-[2px] flex-1 bg-[var(--pancita-cream-strong)] rounded-full" />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <button
                aria-label="Continuar con Google"
                className="grid min-h-[56px] place-items-center rounded-full bg-white text-xl font-black text-[var(--pancita-text-dark)] shadow-[0_10px_24px_rgba(80,61,38,0.06)] ring-1 ring-black/5 transition active:scale-[0.98]"
                onClick={enterApp}
                type="button"
              >
                G
              </button>
              <button
                aria-label="Continuar con Apple"
                className="grid min-h-[56px] place-items-center rounded-full bg-white text-[var(--pancita-text-dark)] shadow-[0_10px_24px_rgba(80,61,38,0.06)] ring-1 ring-black/5 transition active:scale-[0.98]"
                onClick={enterApp}
                type="button"
              >
                <Apple size={24} />
              </button>
              <button
                aria-label="Continuar con Email"
                className="grid min-h-[56px] place-items-center rounded-full bg-white text-[var(--pancita-text-dark)] shadow-[0_10px_24px_rgba(80,61,38,0.06)] ring-1 ring-black/5 transition active:scale-[0.98]"
                onClick={enterApp}
                type="button"
              >
                <Mail size={24} />
              </button>
            </div>
          </div>

          <p className="pt-6 text-center text-xs font-bold text-[var(--pancita-text-muted)] flex items-center justify-center gap-1.5">
            <span className="inline-block w-3 h-3 rounded-full border-2 border-[var(--pancita-olive)] text-[var(--pancita-olive)] flex items-center justify-center text-[8px]">✓</span>
            Tu información está segura con nosotros
          </p>
        </div>
      </section>
    </main>
  );
}
