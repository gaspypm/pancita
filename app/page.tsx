"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/store/useAppStore";

export default function IndexPage() {
  const router = useRouter();
  const hasHydrated = useAppStore((state) => state.hasHydrated);
  const isAuthenticated = useAppStore((state) => state.isAuthenticated);

  useEffect(() => {
    if (!hasHydrated) return;
    router.replace(isAuthenticated ? "/home" : "/login");
  }, [hasHydrated, isAuthenticated, router]);

  return (
    <main className="grid min-h-dvh place-items-center bg-[#fff7e9] text-[#617044]">
      <div className="text-center">
        <div className="mx-auto mb-4 size-16 animate-pulse rounded-full bg-[#dce8b9]" />
        <p className="text-sm font-black">Abriendo Pancita...</p>
      </div>
    </main>
  );
}
