"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { AppToast } from "@/components/ui/AppToast";
import { AuthGate } from "./AuthGate";
import { BottomTabs } from "./BottomTabs";

type MobileShellProps = {
  children: React.ReactNode;
  className?: string;
};

export function MobileShell({ children, className }: MobileShellProps) {
  const pathname = usePathname();

  return (
    <AuthGate>
      <div className="min-h-dvh bg-[#eadfca]">
        <main
          className={cn(
            "relative mx-auto min-h-dvh w-full max-w-[430px] overflow-x-hidden bg-[#fff7e9] text-[#3d412d] shadow-[0_0_60px_rgba(65,48,30,0.14)]",
            className,
          )}
        >
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="min-h-dvh px-5 pb-32 pt-[max(18px,env(safe-area-inset-top))]"
            initial={{ opacity: 0, y: 14 }}
            key={pathname}
            transition={{ duration: 0.28, ease: "easeOut" }}
          >
            {children}
          </motion.div>
          <BottomTabs />
          <AppToast />
        </main>
      </div>
    </AuthGate>
  );
}
