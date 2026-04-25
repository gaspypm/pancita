import { cn } from "@/lib/utils";

export function PillBadge({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-full bg-[var(--pancita-lavender)] px-3 py-1 text-xs font-bold text-[var(--pancita-text-dark)]",
        className,
      )}
    >
      {children}
    </span>
  );
}
