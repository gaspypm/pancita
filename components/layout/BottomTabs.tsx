"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpenText, ChefHat, Home, Sparkles, UserRound } from "lucide-react";
import { cn } from "@/lib/utils";

const tabs = [
  { href: "/home", label: "Home", icon: Home },
  { href: "/diario", label: "Diario", icon: BookOpenText },
  { href: "/cocina", label: "Cocina", icon: ChefHat },
  { href: "/personalizacion", label: "Personalización", icon: Sparkles },
  { href: "/perfil", label: "Perfil", icon: UserRound },
];

export function BottomTabs() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Navegación principal"
      className="fixed bottom-[max(12px,env(safe-area-inset-bottom))] left-1/2 z-40 w-[calc(100%-24px)] max-w-[406px] -translate-x-1/2 rounded-[28px] bg-[#fffaf2]/94 p-2 shadow-[0_18px_42px_rgba(59,45,30,0.2)] ring-1 ring-white/80 backdrop-blur-xl"
    >
      <div className="grid grid-cols-5 gap-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const active =
            pathname === tab.href ||
            (tab.href !== "/home" && pathname.startsWith(tab.href));

          let activeBgClass = "bg-[var(--pancita-olive)] text-white";
          let shadowClass = "shadow-[0_10px_20px_rgba(111,127,67,0.24)]";

          if (tab.href === "/cocina") {
            activeBgClass = "bg-[var(--pancita-lavender)] text-[#7b5ea7]";
            shadowClass = "shadow-[0_10px_20px_rgba(243,234,251,0.5)]";
          } else if (tab.href === "/personalizacion") {
            activeBgClass = "bg-[var(--pancita-pink-light)] text-[#c55d78]";
            shadowClass = "shadow-[0_10px_20px_rgba(253,232,236,0.5)]";
          } else if (tab.href === "/diario") {
            activeBgClass = "bg-[var(--pancita-green-light)] text-[#50661b]";
            shadowClass = "shadow-[0_10px_20px_rgba(232,238,209,0.5)]";
          }

          return (
            <Link
              aria-current={active ? "page" : undefined}
              className={cn(
                "relative flex min-h-[64px] flex-col items-center justify-center gap-1 rounded-[32px] text-[10px] font-black transition",
                active
                  ? cn(activeBgClass, shadowClass)
                  : "text-[#8b806b] active:bg-[#f1e7d7]",
              )}
              href={tab.href}
              key={tab.href}
            >
              <Icon size={22} strokeWidth={active ? 2.8 : 2.2} className="z-10" />
              <span className={cn("z-10", tab.label.length > 9 ? "text-[9px]" : undefined)}>
                {tab.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
