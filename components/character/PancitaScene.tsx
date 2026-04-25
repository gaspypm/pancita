"use client";

import { Canvas } from "@react-three/fiber";
import { AnimatePresence, motion } from "framer-motion";
import { Suspense, useEffect, useMemo, useState } from "react";
import { emotionConfig } from "@/data/emotions";
import { cn } from "@/lib/utils";
import type { Emotion } from "@/types";
import { CharacterEmotionController } from "./CharacterEmotionController";
import { PancitaCharacter } from "./PancitaCharacter";

type PancitaSceneProps = {
  emotion?: Emotion;
  selectedAccessories?: string[];
  chefMode?: boolean;
  speech?: string;
  className?: string;
  compact?: boolean;
  pulseKey?: number | string;
};

export function PancitaScene({
  emotion = "equilibrada",
  selectedAccessories = [],
  chefMode = false,
  speech,
  className,
  compact = false,
  pulseKey,
}: PancitaSceneProps) {
  const [modelAvailable, setModelAvailable] = useState(false);
  const activeEmotion = chefMode ? "motivada" : emotion;
  const config = emotionConfig[activeEmotion];

  useEffect(() => {
    let mounted = true;
    fetch("/models/pancita.glb", { method: "HEAD" })
      .then((response) => {
        if (mounted) setModelAvailable(response.ok);
      })
      .catch(() => {
        if (mounted) setModelAvailable(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  const sceneBackground = useMemo(
    () =>
      chefMode
        ? "linear-gradient(180deg, #efe9fb 0%, #f8efd8 100%)"
        : `radial-gradient(circle at 50% 38%, ${config.glow} 0 30%, transparent 60%), linear-gradient(180deg, #fff6e8 0%, #f8ead8 100%)`,
    [chefMode, config.glow],
  );

  return (
    <CharacterEmotionController emotion={activeEmotion}>
      {(emotionDetails) => (
        <section className={cn("relative", className)}>
          {speech ? (
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              className="mx-auto mb-3 max-w-[300px] rounded-[24px] bg-white/86 px-4 py-3 text-center text-sm font-extrabold leading-relaxed text-[#5d6842] shadow-[0_12px_26px_rgba(80,61,38,0.1)]"
              initial={{ opacity: 0, y: 8 }}
            >
              {speech}
            </motion.div>
          ) : null}
          <motion.div
            animate={{ scale: pulseKey ? [1, 1.04, 1] : 1 }}
            className={cn(
              "relative mx-auto overflow-hidden rounded-[34px] shadow-[inset_0_-18px_40px_rgba(122,95,58,0.08)] ring-1 ring-white/70",
              compact ? "h-[190px]" : "h-[265px]",
            )}
            key={pulseKey}
            style={{ background: sceneBackground }}
            transition={{ duration: 0.46, ease: "easeOut" }}
          >
            {modelAvailable ? (
              <Canvas camera={{ position: [0, 0.2, 4.2], fov: 36 }}>
                <ambientLight intensity={1.8} />
                <directionalLight intensity={1.9} position={[2, 4, 3]} />
                <pointLight color="#ffdca7" intensity={0.8} position={[-2, 1.4, 3]} />
                <Suspense fallback={null}>
                  <PancitaCharacter
                    chefMode={chefMode}
                    emotion={activeEmotion}
                    modelAvailable={modelAvailable}
                    selectedAccessories={selectedAccessories}
                  />
                </Suspense>
              </Canvas>
            ) : (
              <PancitaCharacter
                chefMode={chefMode}
                emotion={activeEmotion}
                modelAvailable={modelAvailable}
                selectedAccessories={selectedAccessories}
              />
            )}
            <AnimatePresence>
              {!modelAvailable ? (
                <motion.span
                  animate={{ opacity: 1 }}
                  className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-white/64 px-3 py-1 text-[10px] font-black uppercase text-[#968870]"
                  exit={{ opacity: 0 }}
                  initial={{ opacity: 0 }}
                >
                  Vista 2.5D
                </motion.span>
              ) : null}
            </AnimatePresence>
          </motion.div>
          {!speech ? (
            <p className="mx-auto mt-3 max-w-[280px] text-center text-xs font-bold leading-relaxed text-[#8c7e68]">
              {emotionDetails.message}
            </p>
          ) : null}
        </section>
      )}
    </CharacterEmotionController>
  );
}
