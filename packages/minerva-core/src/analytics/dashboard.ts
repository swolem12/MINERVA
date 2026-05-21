import type { QuestionAttempt, SkillTag } from "../types";

export interface AnalyticsSnapshot {
  overallAccuracy: number;
  avgTimeMs: number;
  skillBreakdown: Partial<Record<SkillTag, { accuracy: number; count: number }>>;
  sessionsCompleted: number;
  totalXp: number;
  streak: number;
}

export interface AnalyticsEngine {
  computeSnapshot(
    attempts: QuestionAttempt[],
    meta: { sessionsCompleted: number; totalXp: number; streak: number }
  ): AnalyticsSnapshot;
}

export function createAnalyticsEngine(): AnalyticsEngine {
  return {
    computeSnapshot(attempts, meta) {
      const correct = attempts.filter((a) => a.correct).length;
      const overallAccuracy = attempts.length > 0 ? correct / attempts.length : 0;
      const avgTimeMs =
        attempts.length > 0
          ? attempts.reduce((s, a) => s + a.timeMs, 0) / attempts.length
          : 0;

      const skillBreakdown: AnalyticsSnapshot["skillBreakdown"] = {};
      for (const a of attempts) {
        for (const tag of a.skillTags) {
          if (!skillBreakdown[tag]) skillBreakdown[tag] = { accuracy: 0, count: 0 };
          const entry = skillBreakdown[tag]!;
          entry.count += 1;
          entry.accuracy =
            (entry.accuracy * (entry.count - 1) + (a.correct ? 1 : 0)) / entry.count;
        }
      }

      return {
        overallAccuracy,
        avgTimeMs,
        skillBreakdown,
        sessionsCompleted: meta.sessionsCompleted,
        totalXp: meta.totalXp,
        streak: meta.streak,
      };
    },
  };
}
