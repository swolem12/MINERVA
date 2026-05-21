import type { SkillTag } from "../types";

export type EdgeType = "requires" | "reinforces" | "commonly_confused_with" | "unlocks";

export interface GraphEdge {
  from: SkillTag;
  to: SkillTag;
  type: EdgeType;
}

const EDGES: GraphEdge[] = [
  { from: "addition", to: "subtraction", type: "reinforces" },
  { from: "addition", to: "multiplication", type: "requires" },
  { from: "multiplication", to: "division", type: "requires" },
  { from: "division", to: "long_division", type: "unlocks" },
  { from: "multiplication", to: "fractions", type: "requires" },
  { from: "fractions", to: "decimals", type: "reinforces" },
  { from: "decimals", to: "percentages", type: "requires" },
  { from: "fractions", to: "ratios", type: "requires" },
  { from: "ratios", to: "proportions", type: "requires" },
  { from: "addition", to: "signed_numbers", type: "requires" },
  { from: "signed_numbers", to: "linear_equations", type: "requires" },
  { from: "linear_equations", to: "inequalities", type: "unlocks" },
  { from: "linear_equations", to: "systems_of_equations", type: "unlocks" },
  { from: "linear_equations", to: "absolute_value", type: "unlocks" },
  { from: "multiplication", to: "exponents", type: "requires" },
  { from: "exponents", to: "algebra_expressions", type: "requires" },
  { from: "addition", to: "geometry_formulas", type: "requires" },
  { from: "multiplication", to: "geometry_formulas", type: "requires" },
  { from: "addition", to: "word_problem_translation", type: "requires" },
  { from: "fractions", to: "word_problem_translation", type: "requires" },
  { from: "percentages", to: "word_problem_translation", type: "requires" },
  { from: "ratios", to: "word_problem_translation", type: "requires" },
  { from: "fractions", to: "percentages", type: "commonly_confused_with" },
  { from: "decimals", to: "percentages", type: "commonly_confused_with" },
];

export function getPrerequisites(skill: SkillTag): SkillTag[] {
  const prereqs = new Set<SkillTag>();
  const queue = [skill];
  const visited = new Set<SkillTag>();

  while (queue.length > 0) {
    const current = queue.shift()!;
    if (visited.has(current)) continue;
    visited.add(current);

    for (const edge of EDGES) {
      if (edge.to === current && edge.type === "requires") {
        prereqs.add(edge.from);
        queue.push(edge.from);
      }
    }
  }
  return Array.from(prereqs);
}

export function findRootCause(failedSkills: SkillTag[]): SkillTag[] {
  const rootCauses: SkillTag[] = [];
  for (const skill of failedSkills) {
    const prereqs = getPrerequisites(skill);
    if (prereqs.length === 0) {
      rootCauses.push(skill);
    } else {
      rootCauses.push(prereqs[0]);
    }
  }
  return [...new Set(rootCauses)];
}

export function getRemediationPath(gaps: SkillTag[]): SkillTag[] {
  const path: SkillTag[] = [];
  const seen = new Set<SkillTag>();

  for (const gap of gaps) {
    const prereqs = getPrerequisites(gap);
    for (const p of [...prereqs, gap]) {
      if (!seen.has(p)) {
        seen.add(p);
        path.push(p);
      }
    }
  }
  return path;
}

export function getUnlockedSkills(mastered: SkillTag[]): SkillTag[] {
  const unlocked = new Set<SkillTag>(mastered);
  for (const edge of EDGES) {
    if (edge.type === "unlocks" && unlocked.has(edge.from)) {
      unlocked.add(edge.to);
    }
  }
  return Array.from(unlocked);
}

export { EDGES };
