"use client";

import type { ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

type BottomSheetProps = {
  open: boolean;
  title: string;
  children: ReactNode;
  onClose: () => void;
};

export function BottomSheet({ open, title, children, onClose }: BottomSheetProps) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 flex items-end justify-center bg-[#2f2b20]/28 px-3"
          exit={{ opacity: 0 }}
          initial={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            animate={{ y: 0 }}
            className="mb-3 w-full max-w-[406px] rounded-[30px] bg-[#fffaf1] p-5 shadow-[0_22px_60px_rgba(48,38,27,0.28)]"
            exit={{ y: 36 }}
            initial={{ y: 56 }}
            onClick={(event) => event.stopPropagation()}
            transition={{ type: "spring", damping: 26, stiffness: 260 }}
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-black text-[#3e432d]">{title}</h2>
              <button
                aria-label="Cerrar"
                className="grid size-10 place-items-center rounded-full bg-[#f2eadc] text-[#5f6946]"
                onClick={onClose}
                type="button"
              >
                <X size={18} />
              </button>
            </div>
            {children}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
