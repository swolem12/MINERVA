import type { MinervaQuestion } from "../types";

export interface BossBattle {
  id: string;
  title: string;
  questions: MinervaQuestion[];
  timeLimitSec: number;
  passAccuracy: number;
}

export interface BossBattleEngine {
  createBattle(id: string, title: string, questions: MinervaQuestion[]): BossBattle;
  evaluateBattle(
    battle: BossBattle,
    results: { correct: boolean; timeMs: number }[]
  ): { passed: boolean; accuracy: number; feedback: string };
}

export function createBossBattleEngine(): BossBattleEngine {
  return {
    createBattle(id, title, questions) {
      const totalTime = questions.reduce((s, q) => s + q.estimatedSolveTimeSec, 0);
      return {
        id,
        title,
        questions,
        timeLimitSec: totalTime + 60,
        passAccuracy: 0.7,
      };
    },

    evaluateBattle(battle, results) {
      const correct = results.filter((r) => r.correct).length;
      const accuracy = results.length > 0 ? correct / results.length : 0;
      const passed = accuracy >= battle.passAccuracy;
      return {
        passed,
        accuracy,
        feedback: passed
          ? "You passed this chapter check. Great work!"
          : "Review the lessons in this unit and try again when you're ready.",
      };
    },
  };
}
