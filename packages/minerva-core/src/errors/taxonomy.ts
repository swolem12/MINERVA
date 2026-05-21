import type { ErrorType, QuestionAttempt, SkillTag } from "../types";

const REMEDIATION_MAP: Record<ErrorType, string> = {
  conceptual_gap: "TeachAgainSlowly",
  arithmetic_slip: "MentalForgeDrill",
  formula_recall_failure: "FormulaCardReview",
  question_misread: "ReadingPrecisionDrill",
  unit_conversion_failure: "ConversionMicroLesson",
  time_pressure_failure: "TimedExposureTraining",
  guessing_pattern: "ConfidenceBuildingPractice",
  algebra_setup_failure: "WordProblemTranslator",
  sign_error: "SignedNumberDrill",
  fraction_operation_failure: "FractionMicroLesson",
  decimal_placement_error: "DecimalPlaceValueDrill",
};

export function classifyError(
  attempt: QuestionAttempt,
  expectedAnswer: string
): ErrorType {
  if (attempt.timeMs < 3000 && !attempt.correct) {
    return "guessing_pattern";
  }
  if (attempt.timeMs > attempt.confidence * 15000 && !attempt.correct) {
    return "time_pressure_failure";
  }
  const selected = attempt.selectedAnswer;
  if (selected.includes("-") !== expectedAnswer.includes("-") && !attempt.correct) {
    return "sign_error";
  }
  if (selected.includes("/") || expectedAnswer.includes("/")) {
    if (!attempt.correct) return "fraction_operation_failure";
  }
  if (!attempt.correct && attempt.confidence >= 4) {
    return "conceptual_gap";
  }
  if (!attempt.correct && attempt.confidence <= 2) {
    return "arithmetic_slip";
  }
  return "conceptual_gap";
}

export function getRemediation(errorType: ErrorType): string {
  return REMEDIATION_MAP[errorType];
}

export function aggregateErrorsBySkill(
  attempts: QuestionAttempt[]
): Partial<Record<SkillTag, ErrorType[]>> {
  const map: Partial<Record<SkillTag, ErrorType[]>> = {};
  for (const a of attempts) {
    for (const tag of a.skillTags) {
      if (!map[tag]) map[tag] = [];
      if (a.errorType) map[tag]!.push(a.errorType);
    }
  }
  return map;
}

export { REMEDIATION_MAP };
