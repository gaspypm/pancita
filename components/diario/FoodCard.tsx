"use client";

import { motion, type PanInfo } from "framer-motion";
import type { Food } from "@/types";

type FoodCardProps = {
  food: Food;
  onFeed: (foodId: string) => void;
  onDragFeed: (foodId: string, point: { x: number; y: number }) => void;
};

export function FoodCard({ food, onFeed, onDragFeed }: FoodCardProps) {
  return (
    <motion.button
      className="min-h-[120px] rounded-[32px] bg-white p-4 text-left shadow-[0_16px_40px_rgba(111,127,67,0.08)] ring-1 ring-white/60"
      drag
      dragSnapToOrigin
      onClick={() => onFeed(food.id)}
      onDragEnd={(_, info: PanInfo) => onDragFeed(food.id, info.point)}
      whileDrag={{ scale: 1.08, rotate: 2, zIndex: 30 }}
      whileTap={{ scale: 0.98 }}
    >
      <span className="mb-2 grid size-12 place-items-center rounded-full bg-[var(--pancita-cream)] text-[26px]">
        {food.emoji}
      </span>
      <span className="block text-[15px] font-black text-[var(--pancita-text-dark)]">{food.name}</span>
      <span className="mt-1 block text-[12px] font-bold leading-tight text-[var(--pancita-text-muted)]">
        {food.description}
      </span>
    </motion.button>
  );
}
