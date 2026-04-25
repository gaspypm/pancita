export type Emotion =
  | "hambrienta"
  | "comiendo_mal"
  | "sobrealimentada"
  | "equilibrada"
  | "motivada"
  | "desanimada"
  | "sorprendida"
  | "feliz"
  | "satisfecha"
  | "curiosa";

export type AnimationName =
  | "idle"
  | "hungry"
  | "eating"
  | "happy"
  | "satisfied"
  | "surprised"
  | "sad"
  | "motivated"
  | "chef_idle";

export type MacroSummary = {
  kcal: number;
  protein: number;
  carbs: number;
  fat: number;
};

export type MacroTargets = MacroSummary;

export type DailySummary = {
  consumed: MacroSummary;
  targets: MacroTargets;
};

export type WeeklySummary = {
  averageKcal: number;
  protein: { current: number; target: number };
  carbs: { current: number; target: number };
  fat: { current: number; target: number };
};

export type UserProfile = {
  name: string;
  email: string;
  memberSince: string;
  age: string;
  sex: string;
  height: string;
  currentWeight: string;
  activityLevel: string;
  activityDescription: string;
  goal: string;
  goalDescription: string;
};

export type FoodCategory = "saludable" | "proteina" | "energia" | "antojo";

export type Food = {
  id: string;
  name: string;
  emoji: string;
  category: FoodCategory;
  nutrition: MacroSummary;
  points: number;
  emotion: Emotion;
  description: string;
};

export type DiaryEntry = {
  id: string;
  type: "food" | "recipe";
  itemId: string;
  name: string;
  emoji: string;
  nutrition: MacroSummary;
  points: number;
  createdAt: string;
};

export type RecipeStep = {
  title: string;
  instruction: string;
  tip: string;
};

export type Recipe = {
  id: string;
  title: string;
  tag: string;
  time: string;
  portions: string;
  description: string;
  ingredients: string[];
  steps: RecipeStep[];
  nutrition: MacroSummary;
  points: number;
  emoji: string;
  accent: string;
};

export type AccessorySlot = "head" | "eyes" | "ears" | "neck" | "back";

export type Accessory = {
  id: string;
  name: string;
  price?: number;
  slot: AccessorySlot;
  icon: string;
  color: string;
  modelPath: string;
  description: string;
};

export type ToastTone = "success" | "info" | "warning";

export type AppToast = {
  id: number;
  message: string;
  tone: ToastTone;
};
