import { cn } from "@/lib/utils";

type ProfileFieldProps = {
  label: string;
  value: string;
  description?: string;
  className?: string;
};

export function ProfileField({ label, value, description, className }: ProfileFieldProps) {
  return (
    <div className={cn("rounded-[28px] bg-[#fffaf1] p-4 ring-1 ring-[#efe4d0]", className)}>
      <p className="text-[11px] font-black uppercase text-[var(--pancita-text-muted)] tracking-wider">{label}</p>
      <p className="mt-1 text-lg font-black leading-tight text-[var(--pancita-text-dark)]">{value}</p>
      {description ? (
        <p className="mt-1 text-[13px] font-bold leading-relaxed text-[#81745f]">
          {description}
        </p>
      ) : null}
    </div>
  );
}
