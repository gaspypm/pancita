"use client";

import { Check, Lock } from "lucide-react";
import type { Accessory } from "@/types";
import { cn } from "@/lib/utils";

type AccessoryCardProps = {
  accessory: Accessory;
  owned: boolean;
  equipped: boolean;
  onSelect: (accessory: Accessory) => void;
};

export function AccessoryCard({
  accessory,
  owned,
  equipped,
  onSelect,
}: AccessoryCardProps) {
  return (
    <button
      className={cn(
        "relative min-h-[140px] rounded-[32px] bg-white p-4 text-left shadow-[0_16px_40px_rgba(91,57,75,0.08)] ring-1 ring-white/60 transition active:scale-[0.98]",
        equipped && "bg-[#fff1f5] ring-[#ef9cb5]",
      )}
      onClick={() => onSelect(accessory)}
      type="button"
    >
      <span
        className="mb-3 grid size-[52px] place-items-center rounded-full text-[28px]"
        style={{ backgroundColor: `${accessory.color}22` }}
      >
        {accessory.icon}
      </span>
      <span className="block text-[15px] font-black leading-tight text-[var(--pancita-text-dark)]">
        {accessory.name}
      </span>
      <span className="mt-1 block text-xs font-black text-[#a47a2e]">
        {accessory.price} puntos
      </span>
      <span
        className={cn(
          "absolute right-3 top-3 grid size-8 place-items-center rounded-full",
          equipped
            ? "bg-[#6f7f43] text-white"
            : owned
              ? "bg-[#eef4d7] text-[#617044]"
              : "bg-[#f1e8da] text-[#9c8c72]",
        )}
      >
        {equipped ? <Check size={16} strokeWidth={3} /> : owned ? <Check size={16} /> : <Lock size={15} />}
      </span>
    </button>
  );
}
