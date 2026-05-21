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
      { type: "assisted_practice", title: "Assisted Drill", content: "Hints available. Accuracy before speed.", questions: ["lesson-pct-001", "lesson-pct-002", "lesson-pct-003"] },
      { type: "independent_practice", title: "Solo Drill", content: "Same skills. No hints. Trust your training.", questions: ["lesson-pct-004", "lesson-pct-005", "lesson-pct-006"] },
      { type: "timed_combat_drill", title: "Timed Combat", content: "Pressure on. Stay calm. Execute.", questions: ["lesson-pct-007", "lesson-pct-008"] },
      { type: "mastery_check", title: "Mastery Check", content: "Prove you own this skill.", questions: ["lesson-pct-003", "lesson-pct-005", "lesson-pct-007"] },
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
      { type: "assisted_practice", title: "Assisted Drill", content: "Build fraction fluency.", questions: ["lesson-frac-001", "lesson-frac-002", "lesson-frac-003"] },
      { type: "independent_practice", title: "Solo Drill", content: "No hints.", questions: ["lesson-frac-001", "lesson-frac-003", "diag-mk-002"] },
      { type: "timed_combat_drill", title: "Timed Combat", content: "Quick and accurate.", questions: ["lesson-frac-002", "lesson-frac-003"] },
      { type: "mastery_check", title: "Mastery Check", content: "Lock in fractions.", questions: ["lesson-frac-001", "lesson-frac-002", "lesson-frac-003"] },
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
      { type: "assisted_practice", title: "Assisted Drill", content: "Practice ratio setups.", questions: ["lesson-ratio-001", "lesson-ratio-002", "lesson-ratio-003"] },
      { type: "independent_practice", title: "Solo Drill", content: "Execute without hints.", questions: ["lesson-ratio-002", "lesson-ratio-003", "diag-ar-002"] },
      { type: "timed_combat_drill", title: "Timed Combat", content: "Rate problems under time.", questions: ["lesson-ratio-003", "diag-ar-003"] },
      { type: "mastery_check", title: "Mastery Check", content: "Confirm ratio readiness.", questions: ["lesson-ratio-001", "lesson-ratio-003"] },
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
      { type: "assisted_practice", title: "Assisted Drill", content: "Decode the scenario.", questions: ["lesson-wp-001", "lesson-wp-002", "lesson-wp-003"] },
      { type: "independent_practice", title: "Solo Drill", content: "You are the translator.", questions: ["lesson-wp-002", "lesson-wp-003", "diag-ar-003"] },
      { type: "mastery_check", title: "Mastery Check", content: "Word problem clearance.", questions: ["lesson-wp-001", "lesson-wp-002", "lesson-wp-003"] },
    ],
  }),
  "proportions-intro": lesson({
    id: "proportions-intro",
    title: "Proportions Intro",
    section: "arithmetic_reasoning",
    skillTags: ["proportions"],
    prerequisites: ["ratios"],
    difficultyTier: 2,
    masteryCriteria: { minAccuracy: 0.8, minQuestions: 2 },
    steps: [
      { type: "concept_introduction", title: "Equal Ratios", content: "A proportion states two ratios are equal. Cross-multiply to solve." },
      { type: "assisted_practice", title: "Assisted Drill", content: "Set up proportions.", questions: ["lesson-prop-001", "lesson-prop-002"] },
      { type: "independent_practice", title: "Solo Drill", content: "Solve independently.", questions: ["lesson-prop-001", "lesson-prop-002", "lesson-ratio-002"] },
      { type: "mastery_check", title: "Mastery Check", content: "Proportion mastery.", questions: ["lesson-prop-002", "lesson-ratio-003"] },
    ],
  }),
  "mixtures-basics": lesson({
    id: "mixtures-basics",
    title: "Mixture Problems",
    section: "arithmetic_reasoning",
    skillTags: ["proportions"],
    prerequisites: ["percentages", "proportions"],
    difficultyTier: 3,
    masteryCriteria: { minAccuracy: 0.75, minQuestions: 1 },
    steps: [
      { type: "concept_introduction", title: "Mixtures Balance Amount × Strength", content: "Total amount of pure substance is conserved when mixing." },
      { type: "assisted_practice", title: "Assisted Drill", content: "Mixture setup practice.", questions: ["lesson-mix-001"] },
      { type: "independent_practice", title: "Solo Drill", content: "Execute mixture logic.", questions: ["lesson-mix-001", "lesson-prop-001"] },
      { type: "mastery_check", title: "Mastery Check", content: "Mixture clearance.", questions: ["lesson-mix-001"] },
    ],
  }),
  "unit-conversions": lesson({
    id: "unit-conversions",
    title: "Unit Conversions",
    section: "arithmetic_reasoning",
    skillTags: ["word_problem_translation"],
    prerequisites: ["multiplication"],
    difficultyTier: 1,
    masteryCriteria: { minAccuracy: 0.8, minQuestions: 2 },
    steps: [
      { type: "concept_introduction", title: "Conversion Factors", content: "Multiply by a fraction equal to 1 (like 12 in / 1 ft)." },
      { type: "assisted_practice", title: "Assisted Drill", content: "Convert units.", questions: ["lesson-unit-001", "diag-ar-006"] },
      { type: "mastery_check", title: "Mastery Check", content: "Conversion check.", questions: ["lesson-unit-001"] },
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
      { type: "concept_introduction", title: "Balance Both Sides", content: "Whatever you do to one side, do to the other. Isolate x." },
      { type: "assisted_practice", title: "Assisted Drill", content: "Solve step by step.", questions: ["lesson-lin-001", "lesson-lin-002", "lesson-lin-003"] },
      { type: "independent_practice", title: "Solo Drill", content: "Solo solves.", questions: ["lesson-lin-002", "lesson-lin-003", "diag-mk-001"] },
      { type: "mastery_check", title: "Mastery Check", content: "Linear clearance.", questions: ["lesson-lin-001", "lesson-lin-003"] },
    ],
  }),
  "inequalities-intro": lesson({
    id: "inequalities-intro",
    title: "Inequalities",
    section: "math_knowledge",
    skillTags: ["inequalities"],
    prerequisites: ["linear_equations"],
    difficultyTier: 2,
    masteryCriteria: { minAccuracy: 0.75, minQuestions: 2 },
    steps: [
      { type: "concept_introduction", title: "Inequalities Are Ranges", content: "x > 3 means all values greater than 3. Flip the sign when multiplying/dividing by a negative." },
      { type: "assisted_practice", title: "Assisted Drill", content: "Solve inequalities.", questions: ["lesson-ineq-001", "lesson-ineq-002"] },
      { type: "mastery_check", title: "Mastery Check", content: "Inequality check.", questions: ["lesson-ineq-001", "diag-mk-005"] },
    ],
  }),
  "algebra-expressions": lesson({
    id: "algebra-expressions",
    title: "Expressions & Factoring",
    section: "math_knowledge",
    skillTags: ["algebra_expressions"],
    prerequisites: ["exponents"],
    difficultyTier: 2,
    masteryCriteria: { minAccuracy: 0.75, minQuestions: 2 },
    steps: [
      { type: "concept_introduction", title: "Like Terms Combine", content: "3x + 2x = 5x. Factoring reverses multiplication." },
      { type: "assisted_practice", title: "Assisted Drill", content: "Simplify and factor.", questions: ["lesson-alg-001", "lesson-alg-002"] },
      { type: "mastery_check", title: "Mastery Check", content: "Expression mastery.", questions: ["lesson-alg-001", "lesson-alg-002"] },
    ],
  }),
  "systems-intro": lesson({
    id: "systems-intro",
    title: "Systems of Equations",
    section: "math_knowledge",
    skillTags: ["systems_of_equations"],
    prerequisites: ["linear_equations"],
    difficultyTier: 3,
    masteryCriteria: { minAccuracy: 0.75, minQuestions: 1 },
    steps: [
      { type: "concept_introduction", title: "Two Equations, Two Unknowns", content: "Elimination or substitution finds where both equations are true." },
      { type: "assisted_practice", title: "Assisted Drill", content: "Solve the system.", questions: ["lesson-sys-001"] },
      { type: "mastery_check", title: "Mastery Check", content: "Systems check.", questions: ["lesson-sys-001"] },
    ],
  }),
  "geometry-area": lesson({
    id: "geometry-area",
    title: "Area & Perimeter",
    section: "math_knowledge",
    skillTags: ["geometry_formulas"],
    prerequisites: ["multiplication"],
    difficultyTier: 2,
    masteryCriteria: { minAccuracy: 0.8, minQuestions: 2 },
    steps: [
      { type: "concept_introduction", title: "Area Fills Space", content: "Rectangle: l×w. Square: s². Triangle: ½bh." },
      { type: "assisted_practice", title: "Assisted Drill", content: "Compute area.", questions: ["lesson-geo-001", "lesson-geo-002", "diag-ar-006"] },
      { type: "mastery_check", title: "Mastery Check", content: "Geometry clearance.", questions: ["lesson-geo-001", "diag-mk-006"] },
    ],
  }),
  "triangle-properties": lesson({
    id: "triangle-properties",
    title: "Triangle Properties",
    section: "math_knowledge",
    skillTags: ["geometry_formulas"],
    prerequisites: ["geometry_formulas"],
    difficultyTier: 2,
    masteryCriteria: { minAccuracy: 0.75, minQuestions: 1 },
    steps: [
      { type: "concept_introduction", title: "Right Triangle Rules", content: "a² + b² = c² for right triangles. Know common triples: 3-4-5." },
      { type: "assisted_practice", title: "Assisted Drill", content: "Triangle applications.", questions: ["lesson-tri-001", "diag-mk-006"] },
      { type: "mastery_check", title: "Mastery Check", content: "Triangle mastery.", questions: ["lesson-tri-001"] },
    ],
  }),
};

export function getLessonById(id: string): Lesson | undefined {
  return LESSON_CATALOG[id];
}

export const ALL_LESSON_IDS = Object.keys(LESSON_CATALOG);
