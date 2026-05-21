import type { Lesson } from "../../types";

type LessonSeed = Omit<Lesson, "steps"> & {
  steps: Array<{
    type: Lesson["steps"][0]["type"];
    title: string;
    content: string;
    visual?: string;
    questions?: string[];
  }>;
};

function lesson(seed: LessonSeed): Lesson {
  return seed as Lesson;
}

export const LESSON_CATALOG: Record<string, Lesson> = {
  "percentages-intro": lesson({
    id: "percentages-intro",
    title: "Introduction to Percentages",
    section: "math_knowledge",
    skillTags: ["percentages"],
    prerequisites: ["fractions", "decimals"],
    difficultyTier: 1,
    masteryCriteria: { minAccuracy: 0.8, minQuestions: 4 },
    steps: [
      { type: "concept_introduction", title: "What Is a Percent?", content: "A percent is parts out of 100. 50% is half. 25% is one quarter. You are rebuilding a skill many adults lost — and that is normal." },
      { type: "visual_demonstration", title: "Visualize 25%", content: "Four equal blocks represent 100%. One shaded block is 25%.", visual: "bar-fourths" },
      { type: "guided_walkthrough", title: "Find 20% of $50", content: "Step 1: 20% → 0.20\nStep 2: 0.20 × 50 = $10\nYou just turned a percent into action." },
      { type: "assisted_practice", title: "Guided practice", content: "Hints available. Accuracy before speed.", questions: ["lesson-pct-001", "lesson-pct-002", "lesson-pct-003"] },
      { type: "independent_practice", title: "Practice", content: "Same skills. No hints. Trust your training.", questions: ["lesson-pct-004", "lesson-pct-005", "lesson-pct-009"] },
      { type: "timed_combat_drill", title: "Timed practice", content: "Pressure on. Stay calm.", questions: ["lesson-pct-007", "lesson-pct-010"] },
      { type: "mastery_check", title: "Check your understanding", content: "Prove you own this skill.", questions: ["lesson-pct-003", "lesson-pct-006", "lesson-pct-008"] },
    ],
  }),
  "fractions-foundation": lesson({
    id: "fractions-foundation",
    title: "Fractions Foundation",
    section: "math_knowledge",
    skillTags: ["fractions"],
    prerequisites: ["multiplication", "division"],
    difficultyTier: 1,
    masteryCriteria: { minAccuracy: 0.8, minQuestions: 3 },
    steps: [
      { type: "concept_introduction", title: "Fractions Are Division", content: "3/4 means 3 divided by 4. The top counts parts; the bottom names the whole." },
      { type: "visual_demonstration", title: "See the Whole", content: "Shade 3 of 4 equal slices. That is 3/4.", visual: "bar-fourths" },
      { type: "guided_walkthrough", title: "Add 1/4 + 1/2", content: "Step 1: Common denominator → 4\nStep 2: 1/4 + 2/4 = 3/4" },
      { type: "assisted_practice", title: "Guided practice", content: "Build fraction fluency.", questions: ["lesson-frac-001", "lesson-frac-002", "lesson-frac-003"] },
      { type: "independent_practice", title: "Practice", content: "No hints.", questions: ["lesson-frac-004", "lesson-frac-003", "lesson-frac-005"] },
      { type: "timed_combat_drill", title: "Timed practice", content: "Quick and accurate.", questions: ["lesson-frac-002", "lesson-frac-004"] },
      { type: "mastery_check", title: "Check your understanding", content: "Lock in fractions.", questions: ["lesson-frac-001", "lesson-frac-002", "lesson-frac-003"] },
    ],
  }),
  "ratios-basics": lesson({
    id: "ratios-basics",
    title: "Ratios & Rates",
    section: "arithmetic_reasoning",
    skillTags: ["ratios"],
    prerequisites: ["fractions"],
    difficultyTier: 2,
    masteryCriteria: { minAccuracy: 0.8, minQuestions: 3 },
    steps: [
      { type: "concept_introduction", title: "Ratios Compare Parts", content: "A ratio compares two quantities. 3:2 means 3 parts to 2 parts." },
      { type: "guided_walkthrough", title: "Scale a Ratio", content: "2:5 = x:20 → multiply both by 4 → 8:20. So x = 8." },
      { type: "assisted_practice", title: "Guided practice", content: "Practice ratio setups.", questions: ["lesson-ratio-001", "lesson-ratio-002", "lesson-ratio-003"] },
      { type: "independent_practice", title: "Practice", content: "Execute without hints.", questions: ["lesson-ratio-002", "lesson-ratio-004", "lesson-ratio-003"] },
      { type: "timed_combat_drill", title: "Timed practice", content: "Rate problems under time.", questions: ["lesson-ratio-003", "lesson-ratio-004"] },
      { type: "mastery_check", title: "Check your understanding", content: "Confirm ratio readiness.", questions: ["lesson-ratio-001", "lesson-ratio-003"] },
    ],
  }),
  "word-problems-ar": lesson({
    id: "word-problems-ar",
    title: "Word Problem Operations",
    section: "arithmetic_reasoning",
    skillTags: ["word_problem_translation"],
    prerequisites: ["percentages", "ratios"],
    difficultyTier: 2,
    masteryCriteria: { minAccuracy: 0.75, minQuestions: 3 },
    steps: [
      { type: "concept_introduction", title: "Translate Before You Calculate", content: "Every word problem hides an operation. Find the unknown first, then choose add, subtract, multiply, or divide." },
      { type: "guided_walkthrough", title: "Speed From Distance", content: "420 miles in 3 hours → rate = 420 ÷ 3 = 140 mph." },
      { type: "assisted_practice", title: "Guided practice", content: "Decode the scenario.", questions: ["lesson-wp-001", "lesson-wp-002", "lesson-wp-003"] },
      { type: "independent_practice", title: "Practice", content: "You are the translator.", questions: ["lesson-wp-002", "lesson-wp-004", "lesson-wp-005"] },
      { type: "mastery_check", title: "Check your understanding", content: "Word problem check.", questions: ["lesson-wp-001", "lesson-wp-003", "lesson-wp-005"] },
    ],
  }),
  "proportions-intro": lesson({
    id: "proportions-intro",
    title: "Proportions Intro",
    section: "arithmetic_reasoning",
    skillTags: ["proportions"],
    prerequisites: ["ratios"],
    difficultyTier: 2,
    masteryCriteria: { minAccuracy: 0.8, minQuestions: 3 },
    steps: [
      { type: "concept_introduction", title: "Equal Ratios", content: "A proportion states two ratios are equal. Cross-multiply to solve.\n\nWhy this matters: recipes, maps, and scale drawings all use proportions." },
      { type: "guided_walkthrough", title: "Map Scale Example", content: "1 inch = 15 miles. 4 inches apart → 4 × 15 = 60 miles." },
      { type: "assisted_practice", title: "Guided practice", content: "Set up proportions with hints.", questions: ["lesson-prop-001", "lesson-prop-002", "lesson-prop-003"] },
      { type: "independent_practice", title: "Practice", content: "Solve independently.", questions: ["lesson-prop-004", "lesson-prop-005", "lesson-ratio-002"] },
      { type: "timed_combat_drill", title: "Timed practice", content: "Quick proportion problems.", questions: ["lesson-prop-002", "lesson-prop-003"] },
      { type: "mastery_check", title: "Check your understanding", content: "Show what you learned.", questions: ["lesson-prop-005", "lesson-ratio-003"] },
    ],
  }),
  "mixtures-basics": lesson({
    id: "mixtures-basics",
    title: "Mixture Problems",
    section: "arithmetic_reasoning",
    skillTags: ["proportions"],
    prerequisites: ["percentages", "proportions"],
    difficultyTier: 3,
    masteryCriteria: { minAccuracy: 0.75, minQuestions: 3 },
    steps: [
      { type: "concept_introduction", title: "Mixtures Balance Amount × Strength", content: "Total amount of pure substance is conserved when mixing.\n\nWhy this matters: diluting juice, blending coffee, or mixing solutions." },
      { type: "guided_walkthrough", title: "Dilute a Solution", content: "10L of 20% plus water to make 15L of 10% → track pure amount on both sides." },
      { type: "assisted_practice", title: "Guided practice", content: "Mixture setup practice.", questions: ["lesson-mix-001", "lesson-mix-002", "lesson-mix-003"] },
      { type: "independent_practice", title: "Practice", content: "Work through mixture logic.", questions: ["lesson-mix-004", "lesson-prop-001", "lesson-prop-002"] },
      { type: "mastery_check", title: "Check your understanding", content: "Mixture check.", questions: ["lesson-mix-003", "lesson-mix-004"] },
    ],
  }),
  "unit-conversions": lesson({
    id: "unit-conversions",
    title: "Unit Conversions",
    section: "arithmetic_reasoning",
    skillTags: ["word_problem_translation"],
    prerequisites: ["multiplication"],
    difficultyTier: 1,
    masteryCriteria: { minAccuracy: 0.8, minQuestions: 3 },
    steps: [
      { type: "concept_introduction", title: "Conversion Factors", content: "Multiply by a fraction equal to 1 (like 12 in / 1 ft).\n\nWhy this matters: cooking, travel, and home projects use different units." },
      { type: "guided_walkthrough", title: "Feet to Inches", content: "5 feet × (12 inches / 1 foot) = 60 inches." },
      { type: "assisted_practice", title: "Guided practice", content: "Convert units.", questions: ["lesson-unit-001", "lesson-unit-002", "lesson-unit-003"] },
      { type: "independent_practice", title: "Practice", content: "Convert on your own.", questions: ["lesson-unit-004", "lesson-unit-002", "lesson-unit-003"] },
      { type: "mastery_check", title: "Check your understanding", content: "Conversion check.", questions: ["lesson-unit-001", "lesson-unit-004"] },
    ],
  }),
  "linear-equations": lesson({
    id: "linear-equations",
    title: "Linear Equations",
    section: "math_knowledge",
    skillTags: ["linear_equations"],
    prerequisites: ["signed_numbers"],
    difficultyTier: 2,
    masteryCriteria: { minAccuracy: 0.8, minQuestions: 3 },
    steps: [
      { type: "concept_introduction", title: "Balance Both Sides", content: "Whatever you do to one side, do to the other. Isolate x.\n\nWhy this matters: budgets, recipes, and any situation with an unknown number." },
      { type: "guided_walkthrough", title: "Solve 2x - 4 = 10", content: "Step 1: Add 4 to both sides → 2x = 14\nStep 2: Divide by 2 → x = 7" },
      { type: "assisted_practice", title: "Guided practice", content: "Solve step by step.", questions: ["lesson-lin-001", "lesson-lin-002", "lesson-lin-003"] },
      { type: "independent_practice", title: "Practice", content: "Solve on your own.", questions: ["lesson-lin-004", "lesson-lin-005", "lesson-lin-003"] },
      { type: "timed_combat_drill", title: "Timed practice", content: "Quick equation solving.", questions: ["lesson-lin-002", "lesson-lin-004"] },
      { type: "mastery_check", title: "Check your understanding", content: "Linear equations check.", questions: ["lesson-lin-001", "lesson-lin-005"] },
    ],
  }),
  "inequalities-intro": lesson({
    id: "inequalities-intro",
    title: "Inequalities",
    section: "math_knowledge",
    skillTags: ["inequalities"],
    prerequisites: ["linear_equations"],
    difficultyTier: 2,
    masteryCriteria: { minAccuracy: 0.75, minQuestions: 3 },
    steps: [
      { type: "concept_introduction", title: "Inequalities Are Ranges", content: "x > 3 means all values greater than 3. Flip the sign when multiplying/dividing by a negative.\n\nWhy this matters: budgets, speed limits, and grade thresholds use ranges." },
      { type: "guided_walkthrough", title: "Solve x - 3 > 5", content: "Add 3 to both sides → x > 8. Any value above 8 works." },
      { type: "assisted_practice", title: "Guided practice", content: "Solve inequalities.", questions: ["lesson-ineq-001", "lesson-ineq-002", "lesson-ineq-003"] },
      { type: "independent_practice", title: "Practice", content: "Try on your own.", questions: ["lesson-ineq-004", "lesson-ineq-001", "lesson-ineq-003"] },
      { type: "mastery_check", title: "Check your understanding", content: "Inequality check.", questions: ["lesson-ineq-002", "lesson-ineq-004"] },
    ],
  }),
  "algebra-expressions": lesson({
    id: "algebra-expressions",
    title: "Expressions & Factoring",
    section: "math_knowledge",
    skillTags: ["algebra_expressions"],
    prerequisites: ["exponents"],
    difficultyTier: 2,
    masteryCriteria: { minAccuracy: 0.75, minQuestions: 3 },
    steps: [
      { type: "concept_introduction", title: "Like Terms Combine", content: "3x + 2x = 5x. Factoring reverses multiplication.\n\nWhy this matters: simplifying formulas before plugging in numbers." },
      { type: "guided_walkthrough", title: "Combine Like Terms", content: "5a - 2a + 3 → 3a + 3. Only combine matching variables." },
      { type: "assisted_practice", title: "Guided practice", content: "Simplify and factor.", questions: ["lesson-alg-001", "lesson-alg-002", "lesson-alg-003"] },
      { type: "independent_practice", title: "Practice", content: "Work without hints.", questions: ["lesson-alg-004", "lesson-alg-001", "lesson-alg-003"] },
      { type: "mastery_check", title: "Check your understanding", content: "Expression mastery.", questions: ["lesson-alg-002", "lesson-alg-004"] },
    ],
  }),
  "systems-intro": lesson({
    id: "systems-intro",
    title: "Systems of Equations",
    section: "math_knowledge",
    skillTags: ["systems_of_equations"],
    prerequisites: ["linear_equations"],
    difficultyTier: 3,
    masteryCriteria: { minAccuracy: 0.75, minQuestions: 3 },
    steps: [
      { type: "concept_introduction", title: "Two Equations, Two Unknowns", content: "Elimination or substitution finds where both equations are true.\n\nWhy this matters: comparing phone plans or finding two unknown prices." },
      { type: "guided_walkthrough", title: "Add Equations", content: "x + y = 10 and x - y = 2 → add to get 2x = 12, x = 6, y = 4." },
      { type: "assisted_practice", title: "Guided practice", content: "Solve systems.", questions: ["lesson-sys-001", "lesson-sys-002", "lesson-sys-003"] },
      { type: "independent_practice", title: "Practice", content: "Systems on your own.", questions: ["lesson-sys-004", "lesson-sys-002", "lesson-sys-003"] },
      { type: "mastery_check", title: "Check your understanding", content: "Systems check.", questions: ["lesson-sys-001", "lesson-sys-004"] },
    ],
  }),
  "geometry-area": lesson({
    id: "geometry-area",
    title: "Area & Perimeter",
    section: "math_knowledge",
    skillTags: ["geometry_formulas"],
    prerequisites: ["multiplication"],
    difficultyTier: 2,
    masteryCriteria: { minAccuracy: 0.8, minQuestions: 3 },
    steps: [
      { type: "concept_introduction", title: "Area Fills Space", content: "Rectangle: l×w. Square: s². Triangle: ½bh.\n\nWhy this matters: flooring, paint, and garden planning." },
      { type: "visual_demonstration", title: "See the Rectangle", content: "Count square units inside a 8×5 grid → 40 square units.", visual: "bar-fourths" },
      { type: "assisted_practice", title: "Guided practice", content: "Compute area.", questions: ["lesson-geo-001", "lesson-geo-002", "lesson-geo-003"] },
      { type: "independent_practice", title: "Practice", content: "Area on your own.", questions: ["lesson-geo-004", "lesson-geo-001", "lesson-geo-003"] },
      { type: "mastery_check", title: "Check your understanding", content: "Geometry check.", questions: ["lesson-geo-002", "lesson-geo-004"] },
    ],
  }),
  "triangle-properties": lesson({
    id: "triangle-properties",
    title: "Triangle Properties",
    section: "math_knowledge",
    skillTags: ["geometry_formulas"],
    prerequisites: ["geometry_formulas"],
    difficultyTier: 2,
    masteryCriteria: { minAccuracy: 0.75, minQuestions: 3 },
    steps: [
      { type: "concept_introduction", title: "Right Triangle Rules", content: "a² + b² = c² for right triangles. Angles in any triangle sum to 180°.\n\nWhy this matters: construction, design, and everyday measurement." },
      { type: "guided_walkthrough", title: "Find a Missing Angle", content: "50° + 60° + ? = 180° → third angle is 70°." },
      { type: "assisted_practice", title: "Guided practice", content: "Triangle applications.", questions: ["lesson-tri-001", "lesson-tri-002", "lesson-tri-003"] },
      { type: "independent_practice", title: "Practice", content: "Triangles on your own.", questions: ["lesson-tri-004", "lesson-tri-002", "lesson-tri-003"] },
      { type: "mastery_check", title: "Check your understanding", content: "Triangle mastery.", questions: ["lesson-tri-001", "lesson-tri-004"] },
    ],
  }),
};

export function getLessonById(id: string): Lesson | undefined {
  return LESSON_CATALOG[id];
}

export const ALL_LESSON_IDS = Object.keys(LESSON_CATALOG);
