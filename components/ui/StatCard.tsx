import { cn, progressPercent } from "@/lib/utils";

type StatCardProps = {
  label: string;
  value: string;
  current: number;
  target: number;
  icon: string;
  color?: string;
};

export function StatCard({
  label,
  value,
  current,
  target,
  icon,
  color = "#728248",
}: StatCardProps) {
  const progress = progressPercent(current, target);

  return (
    <div className="min-h-[122px] rounded-[32px] bg-white p-4 shadow-[0_16px_40px_rgba(111,127,67,0.08)] ring-1 ring-white/60">
      <div className="mb-3 flex items-center justify-between">
        <span
          className="grid size-10 place-items-center rounded-2xl text-xl"
          style={{ backgroundColor: `${color}24` }}
        >
          {icon}
        </span>
        <span className="text-xs font-black text-[#93866f]">{progress}%</span>
      </div>
      <p className="text-xs font-bold uppercase text-[#8c806a]">{label}</p>
      <p className="mt-1 text-[15px] font-black leading-tight text-[#373d29]">
        {value}
      </p>
      <div className="mt-3 h-2 rounded-full bg-[#efe5d3]">
        <div
          className={cn("h-full rounded-full transition-all duration-500")}
          style={{ width: `${progress}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
}
