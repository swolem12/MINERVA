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
  {
    id: "square-area",
    name: "Square Area",
    formula: "A = s²",
    whenToUse: "Area when all sides are equal",
    example: "Side 9 → A = 81",
    category: "geometry",
  },
  {
    id: "circ-area",
    name: "Circle Area",
    formula: "A = πr²",
    whenToUse: "Space inside a circle",
    example: "Radius 5 → A ≈ 78.5",
    category: "geometry",
  },
  {
    id: "pythagoras",
    name: "Pythagorean Theorem",
    formula: "a² + b² = c²",
    whenToUse: "Right triangle side lengths",
    example: "Legs 3 and 4 → hypotenuse 5",
    category: "geometry",
  },
  {
    id: "pct-of",
    name: "Percent of a Number",
    formula: "part = (percent/100) × whole",
    whenToUse: "Finding a percentage of a quantity",
    example: "20% of 50 → 10",
    category: "arithmetic",
  },
  {
    id: "pct-is",
    name: "What Percent",
    formula: "percent = (part/whole) × 100",
    whenToUse: "Finding what percent one number is of another",
    example: "15 of 60 → 25%",
    category: "arithmetic",
  },
  {
    id: "unit-rate",
    name: "Unit Rate",
    formula: "rate = quantity ÷ units",
    whenToUse: "Price per item, speed, etc.",
    example: "3 pencils for $1.50 → $0.50 each",
    category: "arithmetic",
  },
  {
    id: "proportion",
    name: "Proportion",
    formula: "a/b = c/d",
    whenToUse: "Scaling recipes, maps, or mixtures",
    example: "2/5 = x/20 → x = 8",
    category: "arithmetic",
  },
  {
    id: "linear-slope-intercept",
    name: "Slope-Intercept Form",
    formula: "y = mx + b",
    whenToUse: "Lines on a graph; m is slope, b is y-intercept",
    example: "y = 2x + 3 rises 2 per step",
    category: "algebra",
  },
  {
    id: "distributive",
    name: "Distributive Property",
    formula: "a(b + c) = ab + ac",
    whenToUse: "Expanding or factoring expressions",
    example: "3(x + 4) = 3x + 12",
    category: "algebra",
  },
  {
    id: "difference-squares",
    name: "Difference of Squares",
    formula: "a² - b² = (a+b)(a-b)",
    whenToUse: "Factoring expressions like x² - 9",
    example: "x² - 9 = (x+3)(x-3)",
    category: "algebra",
  },
  {
    id: "avg",
    name: "Average (Mean)",
    formula: "mean = sum ÷ count",
    whenToUse: "Finding a typical value in a set",
    example: "(2+4+6)/3 = 4",
    category: "arithmetic",
  },
  {
    id: "perimeter-rect",
    name: "Rectangle Perimeter",
    formula: "P = 2l + 2w",
    whenToUse: "Distance around a rectangle",
    example: "8 by 5 → P = 26",
    category: "geometry",
  },
  {
    id: "volume-rect",
    name: "Rectangular Volume",
    formula: "V = l × w × h",
    whenToUse: "Space inside a box",
    example: "4×3×2 → V = 24",
    category: "geometry",
  },
  {
    id: "order-ops",
    name: "Order of Operations",
    formula: "PEMDAS: Parentheses, Exponents, ×÷, +-",
    whenToUse: "Evaluating expressions with multiple operations",
    example: "2 + 3 × 4 = 14 (not 20)",
    category: "arithmetic",
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
