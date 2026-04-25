"use client";

import { forwardRef } from "react";
import { Utensils } from "lucide-react";

export const FoodDropZone = forwardRef<HTMLDivElement>(function FoodDropZone(_, ref) {
  return (
    <div
      className="mt-3 rounded-[32px] border-2 border-dashed border-[var(--pancita-olive)]/40 bg-[var(--pancita-green-light)]/50 px-4 py-6 text-center shadow-[inset_0_0_24px_rgba(122,145,82,0.06)]"
      ref={ref}
    >
      <div className="mx-auto mb-3 grid size-12 place-items-center rounded-full bg-white text-[var(--pancita-olive)] shadow-sm">
        <Utensils size={20} />
      </div>
      <p className="text-[15px] font-black text-[#667549]">
        Arrastrá la comida acá para dármela
      </p>
    </div>
  );
});
