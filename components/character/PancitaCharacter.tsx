"use client";

import { useFrame } from "@react-three/fiber";
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
    <PancitaFallback
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

function PancitaFallback({ emotion, selectedAccessories, chefMode }: PancitaRenderProps) {
  const groupRef = useRef<THREE.Group>(null);
  const config = emotionConfig[chefMode ? "motivada" : emotion];

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const elapsed = clock.getElapsedTime();
    const bounce =
      config.animation === "happy" || config.animation === "motivated" ? 0.05 : 0.025;
    groupRef.current.position.y = Math.sin(elapsed * 1.8) * bounce;
    groupRef.current.rotation.z = Math.sin(elapsed * 1.15) * 0.025;
  });

  return (
    <group ref={groupRef} scale={1.34}>
      <mesh position={[0, -0.1, 0]} scale={[0.72, 0.92, 0.58]}>
        <sphereGeometry args={[1, 48, 32]} />
        <meshStandardMaterial color="#f1c99d" roughness={0.72} />
      </mesh>
      <mesh position={[0, -0.18, 0.04]} scale={[0.58, 0.74, 0.44]}>
        <sphereGeometry args={[1, 48, 24]} />
        <meshStandardMaterial color="#f4d4ac" roughness={0.75} />
      </mesh>
      <Face face={config.face} />
      <Arms lifted={config.animation === "happy" || config.animation === "motivated"} />
      <Legs />
      <AccessoryLayer chefMode={chefMode} selectedAccessories={selectedAccessories} />
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

function Face({ face }: { face: (typeof emotionConfig)[Emotion]["face"] }) {
  const isSad = face === "sad" || face === "worried";
  const isOpen = face === "open";
  const eyeScale: [number, number, number] =
    face === "sleepy" || face === "soft" ? [0.095, 0.035, 0.035] : [0.075, 0.1, 0.045];

  return (
    <group position={[0, 0.06, 0.72]}>
      <mesh position={[-0.22, 0.14, 0]} scale={eyeScale}>
        <sphereGeometry args={[1, 24, 12]} />
        <meshStandardMaterial color="#302b24" roughness={0.4} />
      </mesh>
      <mesh position={[0.22, 0.14, 0]} scale={eyeScale}>
        <sphereGeometry args={[1, 24, 12]} />
        <meshStandardMaterial color="#302b24" roughness={0.4} />
      </mesh>
      <mesh position={[-0.12, -0.03, 0.02]} scale={[0.09, 0.045, 0.025]}>
        <sphereGeometry args={[1, 20, 10]} />
        <meshStandardMaterial color="#eda6a0" roughness={0.55} />
      </mesh>
      <mesh position={[0.12, -0.03, 0.02]} scale={[0.09, 0.045, 0.025]}>
        <sphereGeometry args={[1, 20, 10]} />
        <meshStandardMaterial color="#eda6a0" roughness={0.55} />
      </mesh>
      <mesh
        position={[0, isSad ? -0.16 : -0.1, 0.04]}
        scale={isOpen ? [0.08, 0.1, 0.035] : [0.16, 0.04, 0.025]}
      >
        <sphereGeometry args={[1, 24, 12]} />
        <meshStandardMaterial color="#4f392f" roughness={0.45} />
      </mesh>
    </group>
  );
}

function Arms({ lifted }: { lifted: boolean }) {
  return (
    <group>
      <mesh
        position={[-0.66, lifted ? 0.18 : -0.16, 0.05]}
        rotation={[0, 0, lifted ? -0.72 : 0.35]}
        scale={[0.1, 0.32, 0.1]}
      >
        <capsuleGeometry args={[1, 1.2, 8, 18]} />
        <meshStandardMaterial color="#efc79d" roughness={0.74} />
      </mesh>
      <mesh
        position={[0.66, lifted ? 0.18 : -0.16, 0.05]}
        rotation={[0, 0, lifted ? 0.72 : -0.35]}
        scale={[0.1, 0.32, 0.1]}
      >
        <capsuleGeometry args={[1, 1.2, 8, 18]} />
        <meshStandardMaterial color="#efc79d" roughness={0.74} />
      </mesh>
    </group>
  );
}

function Legs() {
  return (
    <group>
      <mesh position={[-0.24, -0.9, 0.04]} scale={[0.12, 0.18, 0.1]}>
        <sphereGeometry args={[1, 24, 12]} />
        <meshStandardMaterial color="#eebf93" roughness={0.76} />
      </mesh>
      <mesh position={[0.24, -0.9, 0.04]} scale={[0.12, 0.18, 0.1]}>
        <sphereGeometry args={[1, 24, 12]} />
        <meshStandardMaterial color="#eebf93" roughness={0.76} />
      </mesh>
    </group>
  );
}
