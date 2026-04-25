"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Info, Sparkles } from "lucide-react";
import { useAppStore } from "@/store/useAppStore";

const toneClasses = {
  success: "bg-[#f4f8dc] text-[#4e6334] ring-[#dce8b9]",
  info: "bg-[#f4edf9] text-[#66517c] ring-[#e2d3ef]",
  warning: "bg-[#fff1d8] text-[#8a5a1d] ring-[#f0d39a]",
};

const toneIcons = {
  success: CheckCircle2,
  info: Info,
  warning: Sparkles,
};

export function AppToast() {
  const toast = useAppStore((state) => state.toast);
  const clearToast = useAppStore((state) => state.clearToast);

  useEffect(() => {
    if (!toast) return;
    const timeout = window.setTimeout(clearToast, 3200);
    return () => window.clearTimeout(timeout);
  }, [clearToast, toast]);

  const Icon = toast ? toneIcons[toast.tone] : Info;

  return (
    <AnimatePresence>
      {toast ? (
        <motion.div
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className="pointer-events-none fixed left-1/2 top-[max(14px,env(safe-area-inset-top))] z-50 w-[calc(100%-28px)] max-w-[402px] -translate-x-1/2"
          exit={{ opacity: 0, y: -18, scale: 0.98 }}
          initial={{ opacity: 0, y: -18, scale: 0.98 }}
        >
          <div
            className={`flex items-center gap-3 rounded-full px-4 py-3 text-sm font-bold shadow-[0_14px_34px_rgba(54,42,28,0.16)] ring-1 ${toneClasses[toast.tone]}`}
          >
            <Icon size={18} />
            <span>{toast.message}</span>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
