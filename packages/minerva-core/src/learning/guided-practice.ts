import type { MinervaQuestion, QuestionAttempt } from "../types";

export interface GuidedPracticeConfig {
  maxHints: number;
  showTrapOnWrong: boolean;
}

export interface GuidedPracticeEngine {
  getHint(question: MinervaQuestion, hintsUsed: number): string | null;
  evaluateAnswer(
    question: MinervaQuestion,
    selectedAnswer: string
  ): { correct: boolean; feedback: string };
}

export function createGuidedPracticeEngine(
  config: GuidedPracticeConfig = { maxHints: 3, showTrapOnWrong: true }
): GuidedPracticeEngine {
  return {
    getHint(question, hintsUsed) {
      if (hintsUsed >= config.maxHints) return null;
      const hints = [
        `Focus on the skill: ${question.skillTag.replace(/_/g, " ")}`,
        `Watch for this trap: ${question.commonTrap}`,
        `Estimated time: ${question.estimatedSolveTimeSec}s — work step by step`,
      ];
      return hints[hintsUsed] ?? null;
    },

    evaluateAnswer(question, selectedAnswer) {
      const correct = selectedAnswer === question.correctAnswer;
      if (correct) {
        return { correct: true, feedback: "Correct. " + question.explanation };
      }
      const feedback = config.showTrapOnWrong
        ? `Not quite. ${question.commonTrap}. ${question.explanation}`
        : question.explanation;
      return { correct: false, feedback };
    },
  };
}

export function computePracticeAccuracy(attempts: QuestionAttempt[]): number {
  if (attempts.length === 0) return 0;
  return attempts.filter((a) => a.correct).length / attempts.length;
}
