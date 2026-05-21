import { ALL_LESSON_IDS } from "@minerva/core";

/** Boss and trial node IDs used in /boss/[id] routes. */
export const BOSS_ROUTE_IDS = [
  "boss-percent-commander",
  "boss-ratio-warlord",
  "boss-algebra-overlord",
  "boss-geometry-sentinel",
  "trial-ar",
  "trial-mk",
] as const;

/** Skill practice slugs used in /practice/[id] routes (hyphenated SkillTag). */
export const PRACTICE_ROUTE_IDS = [
  "addition",
  "subtraction",
  "multiplication",
  "division",
  "long-division",
  "fractions",
  "decimals",
  "percentages",
  "ratios",
  "proportions",
  "exponents",
  "roots",
  "linear-equations",
  "inequalities",
  "absolute-value",
  "geometry-formulas",
  "word-problem-translation",
  "signed-numbers",
  "order-of-operations",
  "algebra-expressions",
  "systems-of-equations",
  "review",
] as const;

export function getLessonStaticParams() {
  return ALL_LESSON_IDS.map((id) => ({ id }));
}

export function getBossStaticParams() {
  return BOSS_ROUTE_IDS.map((id) => ({ id }));
}

export function getPracticeStaticParams() {
  return PRACTICE_ROUTE_IDS.map((id) => ({ id }));
}
