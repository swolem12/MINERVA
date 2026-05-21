import type { SkillTag, QuestionAttempt } from "../types";

export interface AdaptiveSignal {
  accuracy: number;
  speedMs: number;
  confidence: number;
  errorType?: string;
}

export type AdaptiveAction =
  | "promote_difficulty"
  | "reduce_difficulty"
  | "assign_prerequisite"
  | "assign_mental_forge"
  | "assign_formula_review"
  | "assign_word_problem_translator"
  | "assign_timed_exposure";

export interface AdaptiveLearningEngine {
  decideNextAction(signals: AdaptiveSignal[]): AdaptiveAction;
}

export function createAdaptiveLearningEngine(): AdaptiveLearningEngine {
  return {
    decideNextAction(signals) {
      if (signals.length === 0) return "reduce_difficulty";

      const avgAccuracy =
        signals.reduce((s, sig) => s + sig.accuracy, 0) / signals.length;
      const avgConfidence =
        signals.reduce((s, sig) => s + sig.confidence, 0) / signals.length;

      if (avgAccuracy < 0.5) return "assign_prerequisite";
      if (avgAccuracy < 0.7 && avgConfidence < 3) return "reduce_difficulty";
      if (avgAccuracy >= 0.9 && avgConfidence >= 4) return "promote_difficulty";
      if (signals.some((s) => s.errorType === "arithmetic_slip")) return "assign_mental_forge";
      if (signals.some((s) => s.errorType === "formula_recall_failure"))
        return "assign_formula_review";
      if (signals.some((s) => s.errorType === "algebra_setup_failure"))
        return "assign_word_problem_translator";
      if (signals.some((s) => s.errorType === "time_pressure_failure"))
        return "assign_timed_exposure";

      return "promote_difficulty";
    },
  };
}
