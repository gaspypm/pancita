"use client";

import { useFrame } from "@react-three/fiber";
import { motion } from "framer-motion";
import { useGLTF } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";
import { emotionConfig } from "@/data/emotions";
import type { Emotion } from "@/types";
import { AccessoryLayer } from "./AccessoryLayer";

type PancitaCharacterProps = {
  emotion: Emotion;
  selectedAccessories?: string[];
  chefMode?: boolean;
  modelAvailable?: boolean;
};

type PancitaRenderProps = {
  emotion: Emotion;
  selectedAccessories: string[];
  chefMode: boolean;
};

export function PancitaCharacter({
  emotion,
  selectedAccessories = [],
  chefMode = false,
  modelAvailable = false,
}: PancitaCharacterProps) {
  if (modelAvailable) {
    return (
      <PancitaModel
        chefMode={chefMode}
        emotion={emotion}
        selectedAccessories={selectedAccessories}
      />
    );
  }

  return (
    <PancitaFallback2D
      chefMode={chefMode}
      emotion={emotion}
      selectedAccessories={selectedAccessories}
    />
  );
}

function PancitaModel({ emotion, selectedAccessories, chefMode }: PancitaRenderProps) {
  const gltf = useGLTF("/models/pancita.glb");

  return (
    <group scale={1.35}>
      <primitive object={gltf.scene} />
      <AccessoryLayer chefMode={chefMode} selectedAccessories={selectedAccessories} />
      <EmotionMotion emotion={emotion} />
    </group>
  );
}

function EmotionMotion({ emotion }: { emotion: Emotion }) {
  const ref = useRef<THREE.Group>(null);
  const config = emotionConfig[emotion];

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const elapsed = clock.getElapsedTime();
    ref.current.position.y = Math.sin(elapsed * 1.7) * 0.03;
    ref.current.rotation.z =
      config.animation === "sad" ? Math.sin(elapsed) * -0.02 : Math.sin(elapsed) * 0.02;
  });

  return <group ref={ref} />;
}

function PancitaFallback2D({ emotion, selectedAccessories, chefMode }: PancitaRenderProps) {
  const config = emotionConfig[chefMode ? "motivada" : emotion];
  const isHappy = config.animation === "happy" || config.animation === "motivated";
  const bounceY = isHappy ? [0, -6, 0] : [0, -3, 0];
  const bounceDuration = isHappy ? 1.5 : 2.5;

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
      <motion.div
        animate={{ y: bounceY }}
        className="relative flex flex-col items-center justify-center w-[160px] h-[190px] mt-4"
        transition={{ repeat: Infinity, duration: bounceDuration, ease: "easeInOut" }}
      >
        {/* Soft Contact Shadow under the body */}
        <div className="absolute -bottom-4 w-[110px] h-[16px] rounded-[50%] bg-[#a3947c]/30 blur-[6px]" />

        {/* Back Arms (behind body) */}
        <div
          className="absolute top-[85px] -left-[14px] w-[34px] h-[55px] rounded-[24px] origin-top-right -rotate-12 shadow-[inset_-2px_-4px_8px_rgba(200,130,70,0.3)]"
          style={{ background: "linear-gradient(135deg, #fadcae 0%, #ebb682 100%)" }}
        />
        <div
          className="absolute top-[85px] -right-[14px] w-[34px] h-[55px] rounded-[24px] origin-top-left rotate-12 shadow-[inset_2px_-4px_8px_rgba(200,130,70,0.3)]"
          style={{ background: "linear-gradient(225deg, #fadcae 0%, #ebb682 100%)" }}
        />

        {/* Feet (behind/bottom of body) */}
        <div
          className="absolute -bottom-[8px] left-[35px] w-[32px] h-[22px] rounded-[16px] shadow-[inset_0_-4px_6px_rgba(200,130,70,0.3)]"
          style={{ background: "linear-gradient(180deg, #f1c99d 0%, #dfa56b 100%)" }}
        />
        <div
          className="absolute -bottom-[8px] right-[35px] w-[32px] h-[22px] rounded-[16px] shadow-[inset_0_-4px_6px_rgba(200,130,70,0.3)]"
          style={{ background: "linear-gradient(180deg, #f1c99d 0%, #dfa56b 100%)" }}
        />

        {/* Main Body (Organic Bean Shape) */}
        <div
          className="relative w-full h-full rounded-[48%_48%_45%_45%_/_40%_40%_60%_60%]"
          style={{
            background: "linear-gradient(150deg, #ffe9d2 0%, #f4cd9f 45%, #e1a76c 100%)",
            boxShadow:
              "inset -12px -16px 30px rgba(180, 110, 50, 0.25), inset 8px 12px 24px rgba(255, 255, 255, 0.7), 0 16px 28px rgba(140, 100, 50, 0.12)",
          }}
        >
          {/* Subtle warm highlight */}
          <div className="absolute top-[12%] left-[15%] w-[45px] h-[35px] rounded-[50%] bg-white/50 blur-md rotate-[-25deg]" />

          {/* Belly Button */}
          <div className="absolute bottom-[26%] left-1/2 -translate-x-1/2 w-[8px] h-[5px] rounded-full bg-[#c8874f]/70 shadow-[inset_0_2px_3px_rgba(120,60,20,0.4)]" />

          {/* Face */}
          <div className="absolute top-[36%] left-1/2 -translate-x-1/2 w-[86px] h-[40px]">
            {/* Eyes */}
            <div className="absolute top-0 left-[6px] w-[15px] h-[22px] rounded-[50%] bg-[#221f1b] shadow-[inset_-2px_-2px_4px_rgba(0,0,0,0.6)]">
              {/* Eye Highlight */}
              <div className="absolute top-[3px] right-[3px] w-[5px] h-[8px] rounded-[50%] bg-white opacity-85 rotate-[15deg]" />
            </div>
            <div className="absolute top-0 right-[6px] w-[15px] h-[22px] rounded-[50%] bg-[#221f1b] shadow-[inset_-2px_-2px_4px_rgba(0,0,0,0.6)]">
              <div className="absolute top-[3px] right-[3px] w-[5px] h-[8px] rounded-[50%] bg-white opacity-85 rotate-[15deg]" />
            </div>

            {/* Cheeks */}
            <div className="absolute top-[18px] left-[-8px] w-[20px] h-[12px] rounded-[50%] bg-[#f58d83] blur-[3px] opacity-75 mix-blend-multiply" />
            <div className="absolute top-[18px] right-[-8px] w-[20px] h-[12px] rounded-[50%] bg-[#f58d83] blur-[3px] opacity-75 mix-blend-multiply" />

            {/* Mouth */}
            <Mouth2D face={config.face} />
          </div>
        </div>

        {/* 2D CSS Accessories Overlay */}
        <Accessories2D chefMode={chefMode} selectedAccessories={selectedAccessories} />
      </motion.div>
    </div>
  );
}

function Mouth2D({ face }: { face: string }) {
  if (face === "smile") {
    return (
      <svg className="absolute bottom-[2px] left-1/2 -translate-x-1/2 w-[20px] h-[14px] overflow-visible" viewBox="0 0 20 14">
        {/* Open smiling mouth */}
        <path d="M 2 2 Q 10 16 18 2" fill="#4f392f" />
        <path d="M 6 8 Q 10 14 14 8 Z" fill="#e66868" />
        <path d="M 2 2 Q 10 16 18 2" fill="none" stroke="#4f392f" strokeLinecap="round" strokeWidth="2.5" />
      </svg>
    );
  }
  if (face === "sad" || face === "worried") {
    return (
      <svg className="absolute bottom-[4px] left-1/2 -translate-x-1/2 w-[14px] h-[8px] overflow-visible" viewBox="0 0 14 8">
        <path d="M 2 6 Q 7 0 12 6" fill="none" stroke="#4f392f" strokeLinecap="round" strokeWidth="2.5" />
      </svg>
    );
  }
  if (face === "open") {
    return (
      <div className="absolute bottom-[4px] left-1/2 -translate-x-1/2 w-[10px] h-[12px] rounded-[50%] bg-[#4f392f] shadow-[inset_0_3px_5px_rgba(0,0,0,0.3)]" />
    );
  }
  if (face === "sleepy" || face === "soft") {
    return (
      <svg className="absolute bottom-[4px] left-1/2 -translate-x-1/2 w-[16px] h-[8px] overflow-visible" viewBox="0 0 16 8">
        <path d="M 3 3 Q 8 8 13 3" fill="none" stroke="#4f392f" strokeLinecap="round" strokeWidth="2.5" />
      </svg>
    );
  }
  return null;
}

function Accessories2D({ chefMode, selectedAccessories }: { chefMode: boolean; selectedAccessories: string[] }) {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* CHEF MODE */}
      {chefMode && (
        <>
          {/* Chef Hat */}
          <div className="absolute -top-[55px] left-1/2 -translate-x-1/2 w-[80px] h-[75px] z-20">
            <div className="absolute bottom-0 w-full h-[24px] bg-gradient-to-b from-[#ffffff] to-[#f4f4f4] rounded-[8px_8px_4px_4px] shadow-[0_4px_8px_rgba(0,0,0,0.06),_inset_0_-2px_4px_rgba(0,0,0,0.05)] border-b border-gray-200" />
            <div className="absolute top-[4px] left-[2px] w-[38px] h-[48px] bg-gradient-to-br from-[#ffffff] to-[#f6f6f6] rounded-[50%] shadow-[inset_-2px_-2px_6px_rgba(0,0,0,0.05)]" />
            <div className="absolute top-[-4px] left-[20px] w-[46px] h-[55px] bg-gradient-to-br from-[#ffffff] to-[#fafafa] rounded-[50%] shadow-[inset_-3px_-3px_8px_rgba(0,0,0,0.04)]" />
            <div className="absolute top-[6px] right-[2px] w-[34px] h-[42px] bg-gradient-to-bl from-[#ffffff] to-[#f2f2f2] rounded-[50%] shadow-[inset_2px_-2px_6px_rgba(0,0,0,0.05)]" />
          </div>
          {/* Wooden Spoon (held in arm) */}
          <div className="absolute top-[100px] -right-[18px] w-[12px] h-[65px] bg-gradient-to-r from-[#d09e6c] to-[#b37a4a] rounded-full rotate-[-20deg] shadow-[2px_4px_6px_rgba(0,0,0,0.15)] z-20">
             <div className="absolute -top-[12px] -left-[6px] w-[24px] h-[30px] bg-gradient-to-br from-[#dcb487] to-[#ba8557] rounded-[50%] shadow-[inset_-2px_-2px_4px_rgba(0,0,0,0.1)]">
                <div className="absolute top-[6px] left-[5px] w-[14px] h-[18px] rounded-[50%] bg-[#a56d40] shadow-[inset_1px_2px_4px_rgba(0,0,0,0.2)]" />
             </div>
          </div>
        </>
      )}

      {/* GLASSES */}
      {selectedAccessories.some(a => a.includes("anteojo") || a.includes("gafa") || a.includes("lente")) && (
        <div className="absolute top-[34%] left-1/2 -translate-x-1/2 w-[94px] h-[34px] z-20 flex justify-between items-center px-[4px]">
           <div className="w-[36px] h-[36px] rounded-[50%] border-[3.5px] border-[#2f302b] shadow-[0_4px_6px_rgba(0,0,0,0.15)]" />
           <div className="w-[14px] h-[3.5px] bg-[#2f302b] -mt-[6px] shadow-[0_2px_4px_rgba(0,0,0,0.1)]" />
           <div className="w-[36px] h-[36px] rounded-[50%] border-[3.5px] border-[#2f302b] shadow-[0_4px_6px_rgba(0,0,0,0.15)]" />
        </div>
      )}

      {/* HEADWEAR (Beanie / Hats) */}
      {selectedAccessories.includes("beanie-verde") && (
        <div className="absolute -top-[12px] left-1/2 -translate-x-1/2 w-[100px] h-[45px] bg-gradient-to-br from-[#7d9b54] to-[#607442] rounded-[40px_40px_8px_8px] shadow-[0_6px_10px_rgba(80,100,50,0.2),_inset_0_4px_8px_rgba(255,255,255,0.2)] z-20">
           {/* Pom pom */}
           <div className="absolute -top-[14px] left-1/2 -translate-x-1/2 w-[26px] h-[26px] rounded-[50%] bg-[#8fac64] shadow-[inset_-2px_-2px_6px_rgba(0,0,0,0.15)]" />
           {/* Fold */}
           <div className="absolute bottom-[-6px] left-[-4px] w-[108px] h-[16px] bg-gradient-to-r from-[#6e854d] to-[#556839] rounded-[8px] shadow-[0_4px_6px_rgba(0,0,0,0.15)]" />
        </div>
      )}
      
      {/* HEADPHONES */}
      {selectedAccessories.some(a => a.includes("auricular")) && (
        <div className="absolute top-[15%] left-1/2 -translate-x-1/2 w-[168px] h-[100px] z-20">
           {/* Headband */}
           <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150px] h-[80px] rounded-[75px_75px_0_0] border-[12px] border-t-[14px] border-[#b7a1d8] border-b-0" />
           {/* Earcups */}
           <div className="absolute top-[50px] left-0 w-[24px] h-[55px] bg-gradient-to-r from-[#a28bc8] to-[#8d75b3] rounded-[12px] shadow-[2px_4px_8px_rgba(0,0,0,0.15)]" />
           <div className="absolute top-[50px] right-0 w-[24px] h-[55px] bg-gradient-to-l from-[#a28bc8] to-[#8d75b3] rounded-[12px] shadow-[-2px_4px_8px_rgba(0,0,0,0.15)]" />
        </div>
      )}
      
      {/* NECK / SCARF */}
      {selectedAccessories.some(a => a.includes("panuelo") || a.includes("bufanda")) && (
        <div className="absolute top-[68%] left-1/2 -translate-x-1/2 w-[146px] h-[30px] z-20">
           <div className="absolute top-0 w-full h-[22px] bg-gradient-to-b from-[#668f4a] to-[#52753a] rounded-[12px_12px_24px_24px] shadow-[0_6px_8px_rgba(0,0,0,0.15)]" />
           <div className="absolute top-[16px] left-[20px] w-[30px] h-[45px] bg-gradient-to-br from-[#52753a] to-[#405c2d] rounded-[0_0_20px_20px] shadow-[2px_4px_6px_rgba(0,0,0,0.1)] rotate-[15deg]" />
        </div>
      )}
    </div>
  );
}
