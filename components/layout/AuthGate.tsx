"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/store/useAppStore";

export function AuthGate({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const hasHydrated = useAppStore((state) => state.hasHydrated);
  const isAuthenticated = useAppStore((state) => state.isAuthenticated);

  useEffect(() => {
    if (hasHydrated && !isAuthenticated) {
      router.replace("/login");
    }
  }, [hasHydrated, isAuthenticated, router]);

  if (!hasHydrated || !isAuthenticated) {
    return (
      <div className="grid min-h-dvh place-items-center bg-[#fff7e9] text-center text-[#637046]">
        <div>
          <div className="mx-auto mb-4 size-16 animate-pulse rounded-full bg-[#d9e3b2]" />
          <p className="text-sm font-black">Preparando Pancita...</p>
        </div>
      </div>
    );
  }

  return children;
}
