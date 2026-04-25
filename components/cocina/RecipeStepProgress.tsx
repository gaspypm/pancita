"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

type RecipeStepProgressProps = {
  currentStep: number;
  totalSteps: number;
};

export function RecipeStepProgress({
  currentStep,
  totalSteps,
}: RecipeStepProgressProps) {
  return (
    <div className="flex items-center justify-between gap-1">
      {Array.from({ length: totalSteps }).map((_, index) => {
        const step = index + 1;
        const completed = step < currentStep;
        const active = step === currentStep;

        return (
          <div
            className={cn(
              "grid size-9 place-items-center rounded-full text-xs font-black transition",
              completed && "bg-[#6f7f43] text-white",
              active && "bg-[#6f7f43] text-white shadow-[0_8px_18px_rgba(111,127,67,0.25)]",
              !completed && !active && "bg-[#f1eadc] text-[#8a806b] ring-1 ring-[#d9d0bd]",
            )}
            key={step}
          >
            {completed ? <Check size={16} strokeWidth={3} /> : step}
          </div>
        );
      })}
    </div>
  );
}
