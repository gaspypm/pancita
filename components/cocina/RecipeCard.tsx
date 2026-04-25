"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Clock3, UsersRound } from "lucide-react";
import type { Recipe } from "@/types";
import { cn } from "@/lib/utils";

type RecipeCardProps = {
  recipe: Recipe;
  featured?: boolean;
};

export function RecipeCard({ recipe, featured = false }: RecipeCardProps) {
  return (
    <motion.div whileTap={{ scale: 0.985 }}>
      <Link
        className={cn(
          "block overflow-hidden rounded-[32px] bg-white shadow-[0_16px_40px_rgba(80,62,38,0.08)] ring-1 ring-white/60",
          featured && "rounded-[36px]",
        )}
        href={`/cocina/${recipe.id}`}
      >
        <div
          className={cn(
            "relative flex items-center justify-between p-5",
            featured ? "min-h-[160px]" : "min-h-[120px]",
          )}
          style={{ background: `linear-gradient(135deg, ${recipe.accent}, #fff8e8)` }}
        >
          <div className="max-w-[62%]">
            <span className="mb-2 inline-flex rounded-full bg-white/76 px-3 py-1 text-[11px] font-black text-[#617044]">
              {recipe.tag}
            </span>
            <h3
              className={cn(
                "font-black leading-tight text-[#39402b]",
                featured ? "text-xl" : "text-base",
              )}
            >
              {recipe.title}
            </h3>
          </div>
          <div className="grid size-24 place-items-center rounded-full bg-white/58 text-5xl shadow-[inset_0_-10px_22px_rgba(98,74,40,0.08)]">
            {recipe.emoji}
          </div>
        </div>
        <div className="flex items-center gap-3 px-4 py-3 text-xs font-black text-[#827762]">
          <span className="inline-flex items-center gap-1">
            <Clock3 size={15} />
            {recipe.time}
          </span>
          <span className="inline-flex items-center gap-1">
            <UsersRound size={15} />
            {recipe.portions}
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
