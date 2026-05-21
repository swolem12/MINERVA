import seedQuestions from "../data/seed-questions.json";
import extraQuestions from "../data/extra-questions.json";
import bulkQuestions from "../data/bulk-questions.json";
import type { MinervaQuestion, SkillTag } from "../types";

const ALL_QUESTIONS = [
  ...seedQuestions,
  ...extraQuestions,
  ...bulkQuestions,
] as MinervaQuestion[];

const BOSS_SKILL_MAP: Record<string, SkillTag[]> = {
  "boss-percent-commander": ["percentages", "fractions", "ratios"],
  "boss-ratio-warlord": ["proportions", "ratios", "word_problem_translation"],
  "boss-algebra-overlord": ["linear_equations", "inequalities", "algebra_expressions"],
  "boss-geometry-sentinel": ["geometry_formulas"],
  "trial-ar": ["percentages", "ratios", "proportions", "word_problem_translation", "fractions"],
  "trial-mk": ["linear_equations", "inequalities", "algebra_expressions", "geometry_formulas", "systems_of_equations"],
};

export function getQuestionsForBossNode(nodeId: string, count = 5): MinervaQuestion[] {
  const skills = BOSS_SKILL_MAP[nodeId];
  if (!skills) {
    return ALL_QUESTIONS.filter((q) => !q.id.startsWith("diag-")).slice(0, count);
  }
  const pool = ALL_QUESTIONS.filter(
    (q) => !q.id.startsWith("diag-") && skills.includes(q.skillTag)
  );
  if (pool.length >= count) return pool.slice(0, count);
  const extras = ALL_QUESTIONS.filter(
    (q) => !q.id.startsWith("diag-") && !pool.includes(q)
  );
  return [...pool, ...extras].slice(0, count);
}

export function getBossTitle(nodeId: string): string {
  const titles: Record<string, string> = {
    "boss-percent-commander": "Chapter Check: Foundations",
    "boss-ratio-warlord": "Chapter Check: Proportions",
    "boss-algebra-overlord": "Chapter Check: Algebra",
    "boss-geometry-sentinel": "Chapter Check: Geometry",
    "trial-ar": "Arithmetic Reasoning Test",
    "trial-mk": "Math Knowledge Test",
  };
  return titles[nodeId] ?? "Chapter Check";
}

export const DRILL_NODE_SKILLS: Record<string, SkillTag> = {
  "drill-ar-speed": "percentages",
  "forge-addition": "addition",
  "forge-multiplication": "multiplication",
  "forge-percentages": "percentages",
};
