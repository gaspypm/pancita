import { cn } from "@/lib/utils";

type ProfileFieldProps = {
  label: string;
  value: string;
  description?: string;
  className?: string;
};

export function ProfileField({ label, value, description, className }: ProfileFieldProps) {
  return (
    <div className={cn("rounded-[22px] bg-[#fffaf1] p-4 ring-1 ring-[#efe4d0]", className)}>
      <p className="text-xs font-black uppercase text-[#9a8c74]">{label}</p>
      <p className="mt-1 text-lg font-black leading-tight text-[#3d432d]">{value}</p>
      {description ? (
        <p className="mt-1 text-sm font-bold leading-relaxed text-[#81745f]">
          {description}
        </p>
      ) : null}
    </div>
  );
}
