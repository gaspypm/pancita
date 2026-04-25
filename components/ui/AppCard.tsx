import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function AppCard({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-[28px] bg-white/78 p-5 shadow-[0_18px_42px_rgba(92,72,47,0.12)] ring-1 ring-white/65 backdrop-blur",
        className,
      )}
      {...props}
    />
  );
}
