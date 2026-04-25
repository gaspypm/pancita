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
      className="min-h-[112px] rounded-[25px] bg-white/86 p-3 text-left shadow-[0_12px_28px_rgba(70,57,36,0.09)] ring-1 ring-white/72"
      drag
      dragSnapToOrigin
      onClick={() => onFeed(food.id)}
      onDragEnd={(_, info: PanInfo) => onDragFeed(food.id, info.point)}
      whileDrag={{ scale: 1.08, rotate: 2, zIndex: 30 }}
      whileTap={{ scale: 0.98 }}
    >
      <span className="mb-2 grid size-12 place-items-center rounded-2xl bg-[#f3ead7] text-2xl">
        {food.emoji}
      </span>
      <span className="block text-sm font-black text-[#3e432d]">{food.name}</span>
      <span className="mt-1 block text-[11px] font-bold leading-tight text-[#8b806b]">
        {food.description}
      </span>
    </motion.button>
  );
}
