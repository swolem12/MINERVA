import type { MinervaQuestion } from "../types";

export interface OfficerTrial {
  id: string;
  title: string;
  section: "arithmetic_reasoning" | "math_knowledge";
  questionCount: number;
  timeLimitSec: number;
  questions: MinervaQuestion[];
}

export interface OfficerTrialEngine {
  createTrial(
    section: OfficerTrial["section"],
    questions: MinervaQuestion[]
  ): OfficerTrial;
  scoreTrial(
    trial: OfficerTrial,
    results: { correct: boolean; timeMs: number; skipped: boolean }[]
  ): {
    rawScore: number;
    percentileEstimate: number;
    passed: boolean;
    feedback: string;
  };
}

export function createOfficerTrialEngine(): OfficerTrialEngine {
  return {
    createTrial(section, questions) {
      const timeLimit =
        section === "arithmetic_reasoning" ? 29 * 60 : 22 * 60;
      return {
        id: `trial-${section}-${Date.now()}`,
        title: section === "arithmetic_reasoning" ? "Arithmetic Reasoning Test" : "Math Knowledge Test",
        section,
        questionCount: questions.length,
        timeLimitSec: timeLimit,
        questions,
      };
    },

    scoreTrial(trial, results) {
      const answered = results.filter((r) => !r.skipped);
      const correct = answered.filter((r) => r.correct).length;
      const rawScore = answered.length > 0 ? correct / answered.length : 0;
      const passed = rawScore >= 0.65;
      return {
        rawScore,
        percentileEstimate: Math.round(rawScore * 100),
        passed,
        feedback: passed
          ? "Trial passed. You are test-ready for this section."
          : "Trial incomplete. Focus on accuracy before speed.",
      };
    },
  };
}
