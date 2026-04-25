import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type AppButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  icon?: ReactNode;
};

const variantClasses = {
  primary:
    "bg-[#6f7f43] text-white shadow-[0_12px_30px_rgba(95,113,59,0.28)] active:bg-[#4f6030]",
  secondary:
    "bg-white/82 text-[#46522f] shadow-[0_10px_28px_rgba(80,65,42,0.1)] ring-1 ring-[#eadfcb]",
  ghost: "bg-transparent text-[#59653f] active:bg-[#efe7d7]",
  danger: "bg-[#f6ded9] text-[#b24738] ring-1 ring-[#efc5bd]",
};

const sizeClasses = {
  sm: "min-h-[44px] px-5 text-sm",
  md: "min-h-[56px] px-6 text-[16px]",
  lg: "min-h-[64px] px-8 text-[18px]",
};

export function AppButton({
  className,
  children,
  variant = "primary",
  size = "md",
  icon,
  type = "button",
  ...props
}: AppButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full font-bold transition duration-200 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-55",
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      type={type}
      {...props}
    >
      {icon}
      {children}
    </button>
  );
}
