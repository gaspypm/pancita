import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function AppCard({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-[32px] bg-white p-5 shadow-[0_16px_40px_rgba(111,127,67,0.08)] ring-1 ring-white/60 backdrop-blur",
        className,
      )}
      {...props}
    />
  );
}
