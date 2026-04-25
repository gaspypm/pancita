import type { AnimationName, Emotion } from "@/types";

export type EmotionConfig = {
  label: string;
  message: string;
  animation: AnimationName;
  glow: string;
  face: "smile" | "soft" | "open" | "sad" | "worried" | "sleepy";
};

export const emotionConfig: Record<Emotion, EmotionConfig> = {
  hambrienta: {
    label: "Hambrienta",
    message: "Tiene hambre, ¡dale algo rico y saludable!",
    animation: "hungry",
    glow: "rgba(247, 184, 77, 0.32)",
    face: "sad",
  },
  comiendo_mal: {
    label: "Comiendo mal",
    message: "No son las mejores elecciones hoy...",
    animation: "sad",
    glow: "rgba(239, 128, 116, 0.26)",
    face: "worried",
  },
  sobrealimentada: {
    label: "Sobrealimentada",
    message: "Ups... ¡te pasaste un poco!",
    animation: "satisfied",
    glow: "rgba(236, 154, 92, 0.26)",
    face: "sleepy",
  },
  equilibrada: {
    label: "Equilibrada",
    message: "¡Buen equilibrio! Seguí así.",
    animation: "idle",
    glow: "rgba(126, 151, 81, 0.26)",
    face: "soft",
  },
  motivada: {
    label: "Motivada",
    message: "¡Vas genial! Estoy muy orgullosa de vos.",
    animation: "motivated",
    glow: "rgba(95, 113, 59, 0.3)",
    face: "smile",
  },
  desanimada: {
    label: "Desanimada",
    message: "Parece que hoy no fue tu mejor día...",
    animation: "sad",
    glow: "rgba(161, 146, 188, 0.24)",
    face: "sad",
  },
  sorprendida: {
    label: "Sorprendida",
    message: "¡Guau! Eso fue una gran elección.",
    animation: "surprised",
    glow: "rgba(248, 204, 99, 0.34)",
    face: "open",
  },
  feliz: {
    label: "Feliz",
    message: "¡Me encanta lo que comiste!",
    animation: "happy",
    glow: "rgba(243, 172, 184, 0.3)",
    face: "smile",
  },
  satisfecha: {
    label: "Satisfecha",
    message: "Estoy llena y muy contenta.",
    animation: "satisfied",
    glow: "rgba(250, 197, 91, 0.28)",
    face: "soft",
  },
  curiosa: {
    label: "Curiosa",
    message: "¡Vamos a descubrir algo nuevo!",
    animation: "idle",
    glow: "rgba(188, 169, 216, 0.32)",
    face: "open",
  },
};
