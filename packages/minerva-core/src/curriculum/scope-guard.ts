import type { ScopeClassification } from "../types";

const FORBIDDEN_TOPICS = [
  "calculus",
  "derivative",
  "integral",
  "limit",
  "matrix",
  "matrices",
  "complex number",
  "vector",
  "conic section",
  "proof geometry",
  "advanced trigonometry",
  "eigenvalue",
  "determinant",
  "laplace",
  "differential equation",
];

const VALID_CLASSIFICATIONS: ScopeClassification[] = [
  "official_arithmetic_reasoning",
  "official_math_knowledge",
  "direct_sample_archetype",
  "prerequisite_skill",
  "mental_forge_support_skill",
];

export function assertAFOQTScope(
  text: string,
  classification: ScopeClassification
): { valid: boolean; reason?: string } {
  const lower = text.toLowerCase();
  for (const forbidden of FORBIDDEN_TOPICS) {
    if (lower.includes(forbidden)) {
      return { valid: false, reason: `Forbidden topic detected: ${forbidden}` };
    }
  }
  if (!VALID_CLASSIFICATIONS.includes(classification)) {
    return { valid: false, reason: `Invalid scope classification: ${classification}` };
  }
  return { valid: true };
}

export function scanTextForForbiddenTopics(text: string): string[] {
  const lower = text.toLowerCase();
  return FORBIDDEN_TOPICS.filter((t) => lower.includes(t));
}

export { FORBIDDEN_TOPICS };
