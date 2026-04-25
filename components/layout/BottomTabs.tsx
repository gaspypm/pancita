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

          return (
            <Link
              aria-current={active ? "page" : undefined}
              className={cn(
                "flex min-h-[58px] flex-col items-center justify-center gap-1 rounded-3xl text-[10px] font-black transition",
                active
                  ? "bg-[#6f7f43] text-white shadow-[0_10px_20px_rgba(111,127,67,0.24)]"
                  : "text-[#8b806b] active:bg-[#f1e7d7]",
              )}
              href={tab.href}
              key={tab.href}
            >
              <Icon size={20} strokeWidth={active ? 2.8 : 2.2} />
              <span className={tab.label.length > 9 ? "text-[9px]" : undefined}>
                {tab.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
