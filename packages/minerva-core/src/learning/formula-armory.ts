export interface FormulaCard {
  id: string;
  name: string;
  formula: string;
  whenToUse: string;
  example: string;
  category: "geometry" | "algebra" | "arithmetic";
}

const FORMULA_DECK: FormulaCard[] = [
  {
    id: "rect-area",
    name: "Rectangle Area",
    formula: "A = l × w",
    whenToUse: "Finding area of a rectangle",
    example: "Length 8, width 5 → A = 40",
    category: "geometry",
  },
  {
    id: "tri-area",
    name: "Triangle Area",
    formula: "A = ½ × b × h",
    whenToUse: "Finding area of a triangle",
    example: "Base 10, height 6 → A = 30",
    category: "geometry",
  },
  {
    id: "circ-circum",
    name: "Circle Circumference",
    formula: "C = 2πr",
    whenToUse: "Distance around a circle",
    example: "Radius 7 → C ≈ 44",
    category: "geometry",
  },
  {
    id: "pct-change",
    name: "Percent Change",
    formula: "% change = (new - old) / old × 100",
    whenToUse: "Finding percent increase or decrease",
    example: "50 to 65 → 30% increase",
    category: "arithmetic",
  },
  {
    id: "dist-rate-time",
    name: "Distance Formula",
    formula: "d = r × t",
    whenToUse: "Speed, distance, time problems",
    example: "60 mph for 2 hr → 120 miles",
    category: "arithmetic",
  },
  {
    id: "slope",
    name: "Slope",
    formula: "m = (y₂ - y₁) / (x₂ - x₁)",
    whenToUse: "Rate of change between two points",
    example: "(0,0) to (4,8) → m = 2",
    category: "algebra",
  },
];

export interface FormulaArmoryEngine {
  getAllCards(): FormulaCard[];
  getCardsByCategory(category: FormulaCard["category"]): FormulaCard[];
  getCard(id: string): FormulaCard | undefined;
}

export function createFormulaArmoryEngine(): FormulaArmoryEngine {
  return {
    getAllCards: () => [...FORMULA_DECK],
    getCardsByCategory: (category) => FORMULA_DECK.filter((c) => c.category === category),
    getCard: (id) => FORMULA_DECK.find((c) => c.id === id),
  };
}
