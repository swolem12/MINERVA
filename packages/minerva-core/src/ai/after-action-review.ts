import type { AfterActionReview, QuestionAttempt } from "../types";
import { aggregateErrorsBySkill } from "../errors/taxonomy";

export interface AfterActionReviewEngine {
  generate(attempts: QuestionAttempt[], streak: number): AfterActionReview;
}

export function createAfterActionReviewEngine(): AfterActionReviewEngine {
  return {
    generate(attempts, streak) {
      const correct = attempts.filter((a) => a.correct);
      const incorrect = attempts.filter((a) => !a.correct);
      const accuracy = attempts.length > 0 ? correct.length / attempts.length : 0;

      const improved: string[] = [];
      const brokeDown: string[] = [];

      if (accuracy >= 0.8) improved.push("Strong accuracy this session.");
      if (accuracy < 0.6) brokeDown.push("Accuracy dropped below target.");

      const slow = attempts.filter((a) => a.timeMs > 60000);
      if (slow.length > 2) brokeDown.push("Several questions took over 60 seconds.");

      const fast = attempts.filter((a) => a.correct && a.timeMs < 20000);
      if (fast.length >= 3) improved.push("Quick, confident solves on multiple problems.");

      const errorsBySkill = aggregateErrorsBySkill(incorrect);
      const topWeakSkill = Object.keys(errorsBySkill)[0]?.replace(/_/g, " ") ?? "fundamentals";

      return {
        whatImproved: improved.length ? improved : ["You showed up and completed the mission."],
        whatBrokeDown: brokeDown.length ? brokeDown : ["No major breakdowns detected."],
        rootCauseAnalysis:
          incorrect.length > 0
            ? `Most errors clustered around ${topWeakSkill}. Review prerequisites before pushing speed.`
            : "Clean session with no error patterns.",
        recommendedNextMission:
          accuracy >= 0.8
            ? "Advance to the next campaign node or try a timed drill."
            : "Repeat assisted practice on your weakest skill.",
        mentalMathPrescription:
          incorrect.some((a) => a.errorType === "arithmetic_slip")
            ? "5-minute Mental Forge warmup before your next lesson."
            : "Continue current training pace.",
        encouragementStatement:
          streak > 0
            ? `${streak}-day streak active. Consistency wins officer trials.`
            : "Every rep builds confidence. Failure here is intel, not defeat.",
      };
    },
  };
}
