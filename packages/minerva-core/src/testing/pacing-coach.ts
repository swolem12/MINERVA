export interface PacingAdvice {
  message: string;
  shouldSkip: boolean;
  timeBudgetSec: number;
}

export interface PacingCoachEngine {
  advise(
    questionIndex: number,
    totalQuestions: number,
    elapsedSec: number,
    totalTimeSec: number,
    timeOnCurrentSec: number
  ): PacingAdvice;
}

export function createPacingCoachEngine(): PacingCoachEngine {
  return {
    advise(questionIndex, totalQuestions, elapsedSec, totalTimeSec, timeOnCurrentSec) {
      const remaining = totalTimeSec - elapsedSec;
      const questionsLeft = totalQuestions - questionIndex;
      const budgetPerQuestion = questionsLeft > 0 ? remaining / questionsLeft : 0;

      if (timeOnCurrentSec > budgetPerQuestion * 2) {
        return {
          message: "You are spending too long. Make your best estimate and move on.",
          shouldSkip: true,
          timeBudgetSec: budgetPerQuestion,
        };
      }

      if (remaining < questionsLeft * 15) {
        return {
          message: "Time is tight. Prioritize questions you can solve quickly.",
          shouldSkip: false,
          timeBudgetSec: budgetPerQuestion,
        };
      }

      return {
        message: "On pace. Stay accurate, then pick up speed.",
        shouldSkip: false,
        timeBudgetSec: budgetPerQuestion,
      };
    },
  };
}
