"use client";

import { forwardRef } from "react";
import { Utensils } from "lucide-react";

export const FoodDropZone = forwardRef<HTMLDivElement>(function FoodDropZone(_, ref) {
  return (
    <div
      className="mt-3 rounded-[28px] border-2 border-dashed border-[#a5b96e] bg-[#f5f8e7]/72 px-4 py-5 text-center shadow-[inset_0_0_24px_rgba(122,145,82,0.12)]"
      ref={ref}
    >
      <div className="mx-auto mb-2 grid size-11 place-items-center rounded-full bg-white text-[#6f7f43]">
        <Utensils size={20} />
      </div>
      <p className="text-sm font-black text-[#667549]">
        Arrastrá la comida acá para dármela
      </p>
    </div>
  );
});
