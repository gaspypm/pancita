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
        className="grid size-14 shrink-0 place-items-center rounded-full"
        style={{
          background: `conic-gradient(${color} ${progress}%, #efe5d2 ${progress}% 100%)`,
        }}
      >
        <div className="grid size-10 place-items-center rounded-full bg-[#fff8ec] text-xs font-black text-[#55633a]">
          {progress}%
        </div>
      </div>
      <div>
        <p className="text-xs font-bold uppercase text-[#8b806c]">{label}</p>
        <p className="text-sm font-black text-[#3f452d]">{value}</p>
      </div>
    </div>
  );
}
