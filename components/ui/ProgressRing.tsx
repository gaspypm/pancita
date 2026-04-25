import { cn, progressPercent } from "@/lib/utils";

type ProgressRingProps = {
  current: number;
  target: number;
  label: string;
  value: string;
  color?: string;
  className?: string;
};

export function ProgressRing({
  current,
  target,
  label,
  value,
  color = "#6f7f43",
  className,
}: ProgressRingProps) {
  const progress = progressPercent(current, target);

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div
        className="grid size-14 shrink-0 place-items-center rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.06)]"
        style={{
          background: `conic-gradient(${color} ${progress}%, var(--pancita-cream) ${progress}% 100%)`,
        }}
      >
        <div className="grid size-[38px] place-items-center rounded-full bg-white text-xs font-black text-[var(--pancita-text-dark)]">
          {progress}%
        </div>
      </div>
      <div>
        <p className="text-[11px] font-bold uppercase text-[var(--pancita-text-muted)] tracking-wider">{label}</p>
        <p className="text-[15px] font-black text-[var(--pancita-text-dark)]">{value}</p>
      </div>
    </div>
  );
}
