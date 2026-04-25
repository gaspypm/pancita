"use client";

import type { ReactNode } from "react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

type AppHeaderProps = {
  title: string;
  subtitle?: string;
  action?: ReactNode;
  showBack?: boolean;
  className?: string;
};

export function AppHeader({
  title,
  subtitle,
  action,
  showBack,
  className,
}: AppHeaderProps) {
  const router = useRouter();

  return (
    <header className={cn("mb-5 flex items-start justify-between gap-3", className)}>
      <div className="flex min-w-0 items-start gap-3">
        {showBack ? (
          <button
            aria-label="Volver"
            className="mt-1 grid size-11 shrink-0 place-items-center rounded-full bg-white/78 text-[#5f6942] shadow-[0_10px_24px_rgba(76,58,35,0.1)]"
            onClick={() => router.back()}
            type="button"
          >
            <ArrowLeft size={20} />
          </button>
        ) : null}
        <div className="min-w-0">
          <h1 className="text-[30px] font-black leading-tight text-[#39402b]">
            {title}
          </h1>
          {subtitle ? (
            <p className="mt-1 text-sm font-bold leading-relaxed text-[#857966]">
              {subtitle}
            </p>
          ) : null}
        </div>
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </header>
  );
}
