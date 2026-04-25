import { emotionConfig } from "@/data/emotions";
import type { Emotion } from "@/types";

type CharacterEmotionControllerProps = {
  emotion: Emotion;
  children: (config: (typeof emotionConfig)[Emotion]) => React.ReactNode;
};

export function CharacterEmotionController({
  emotion,
  children,
}: CharacterEmotionControllerProps) {
  return children(emotionConfig[emotion]);
}
