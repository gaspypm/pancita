import type { Recipe } from "@/types";

export const recipes: Recipe[] = [
  {
    id: "pollo-verduras",
    title: "Pollo a la plancha con verduras",
    tag: "Alta en proteínas",
    time: "25 min",
    portions: "2 porciones",
    description:
      "Una receta fácil, rápida y saludable. Ideal para comer rico y ganar fuerza 💪",
    ingredients: [
      "2 pechugas de pollo",
      "1 zucchini",
      "1 morrón rojo",
      "1 morrón amarillo",
      "1 zanahoria",
      "1 cda. de aceite de oliva",
      "Sal y pimienta a gusto",
      "Orégano seco (opcional)",
    ],
    steps: [
      {
        title: "Prepará las verduras",
        instruction:
          "Lavá y cortá el zucchini, los morrones y la zanahoria en tiras.",
        tip: "Cortá las verduras del mismo tamaño para que se cocinen parejo.",
      },
      {
        title: "Cociná el pollo",
        instruction:
          "Calentá una sartén con un poco de aceite de oliva y cociná las pechugas 5-6 minutos de cada lado a fuego medio.",
        tip: "No pinches el pollo mientras se cocina para que quede jugoso.",
      },
      {
        title: "Salteá las verduras",
        instruction:
          "Cociná los morrones, el zucchini y la zanahoria en la sartén hasta que estén tiernos pero firmes.",
        tip: "Movelas cada tanto para que se doren parejo sin perder textura.",
      },
      {
        title: "Condimentá",
        instruction:
          "Sumá sal, pimienta y orégano seco a gusto. Mezclá suavemente para integrar los sabores.",
        tip: "Probá antes de agregar más sal y ajustá de a poco.",
      },
      {
        title: "Integrá todo",
        instruction:
          "Volvé a colocar el pollo en la sartén con las verduras y mezclá todo junto. Cociná 2 minutos más para que se integren los sabores.",
        tip: "Probá y ajustá la sal y pimienta a gusto.",
      },
      {
        title: "Emplatá",
        instruction:
          "Serví el pollo caliente acompañado de las verduras. ¡Ya está listo para disfrutar! 😋",
        tip: "Podés acompañarlo con arroz integral, puré o ensalada.",
      },
      {
        title: "¡Receta completada!",
        instruction:
          "Pollo a la plancha con verduras. Hiciste un plato saludable y delicioso 💚",
        tip: "Agregala al diario para guardar el progreso de hoy.",
      },
    ],
    nutrition: { kcal: 430, protein: 52, carbs: 26, fat: 14 },
    points: 70,
    emoji: "🍗",
    accent: "#d8e8b8",
  },
  {
    id: "ensalada-completa",
    title: "Ensalada completa",
    tag: "Liviana",
    time: "15 min",
    portions: "1 porción",
    description:
      "Una mezcla fresca con verduras, huevo y un toque crocante para sumar color.",
    ingredients: ["Hojas verdes", "Tomate", "Huevo", "Palta", "Semillas"],
    steps: [],
    nutrition: { kcal: 320, protein: 18, carbs: 20, fat: 18 },
    points: 35,
    emoji: "🥗",
    accent: "#d8ead4",
  },
  {
    id: "pasta-cremosa",
    title: "Pasta cremosa",
    tag: "Energía",
    time: "20 min",
    portions: "2 porciones",
    description:
      "Pasta suave con una salsa cremosa simple para una comida reconfortante.",
    ingredients: ["Pasta", "Queso crema", "Espinaca", "Pimienta"],
    steps: [],
    nutrition: { kcal: 520, protein: 18, carbs: 74, fat: 18 },
    points: 20,
    emoji: "🍝",
    accent: "#f5deae",
  },
  {
    id: "salteado-tofu",
    title: "Salteado de tofu",
    tag: "Vegetariana",
    time: "18 min",
    portions: "2 porciones",
    description:
      "Tofu dorado con verduras y salsa suave para una opción rápida.",
    ingredients: ["Tofu", "Brócoli", "Zanahoria", "Salsa de soja"],
    steps: [],
    nutrition: { kcal: 360, protein: 28, carbs: 30, fat: 14 },
    points: 42,
    emoji: "🍲",
    accent: "#d9d1ef",
  },
];
