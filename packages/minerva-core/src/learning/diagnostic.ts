import type {
  DiagnosticResult,
  QuestionAttempt,
  SkillTag,
  CampaignRegion,
} from "../types";
import { findRootCause, getRemediationPath } from "../curriculum/knowledge-graph";
import { classifyError } from "../errors/taxonomy";

const ASSESSMENT_SKILLS: SkillTag[] = [
  "percentages",
  "ratios",
  "fractions",
  "linear_equations",
  "geometry_formulas",
  "word_problem_translation",
  "decimals",
  "signed_numbers",
];

export interface DiagnosticEngine {
  processAttempts(attempts: QuestionAttempt[]): DiagnosticResult;
}

export function createDiagnosticEngine(): DiagnosticEngine {
  return {
    processAttempts(attempts: QuestionAttempt[]): DiagnosticResult {
      const correct = attempts.filter((a) => a.correct).length;
      const overallAccuracy = attempts.length > 0 ? correct / attempts.length : 0;
      const avgTimeMs =
        attempts.length > 0
          ? attempts.reduce((s, a) => s + a.timeMs, 0) / attempts.length
          : 0;

      const weaknessMap: Partial<Record<SkillTag, number>> = {};
      const confidenceProfile: Partial<Record<SkillTag, number>> = {};
      const failedSkills: SkillTag[] = [];

      for (const skill of ASSESSMENT_SKILLS) {
        const skillAttempts = attempts.filter((a) => a.skillTags.includes(skill));
        if (skillAttempts.length === 0) continue;

        const acc =
          skillAttempts.filter((a) => a.correct).length / skillAttempts.length;
        weaknessMap[skill] = 1 - acc;
        confidenceProfile[skill] =
          skillAttempts.reduce((s, a) => s + a.confidence, 0) / skillAttempts.length;

        if (acc < 0.6) failedSkills.push(skill);
      }

      const rootCauses = findRootCause(failedSkills);
      const remediationPath = getRemediationPath(rootCauses);

      let startingRegion: CampaignRegion = "arithmetic_frontier";
      if (overallAccuracy >= 0.75) {
        startingRegion = "ratio_ridge";
      }
      if (overallAccuracy >= 0.85) {
        startingRegion = "algebra_citadel";
      }

      const dailyTrainingPlan = remediationPath.slice(0, 3).map(
        (s) => `Review ${s.replace(/_/g, " ")}`
      );

      return {
        startingRegion,
        weaknessMap,
        confidenceProfile,
        remediationPath,
        dailyTrainingPlan,
        overallAccuracy,
        avgTimeMs,
      };
    },
  };
}

export function enrichAttemptsWithErrors(
  attempts: QuestionAttempt[],
  questions: { id: string; correctAnswer: string }[]
): QuestionAttempt[] {
  return attempts.map((a) => {
    const q = questions.find((q) => q.id === a.questionId);
    if (!q || a.errorType) return a;
    return {
      ...a,
      errorType: classifyError(a, q.correctAnswer),
    };
  });
}
