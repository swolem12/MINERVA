import type { SkillTag } from "../types";

export type ReviewInterval =
  | "same_day"
  | "next_day"
  | "three_days"
  | "seven_days"
  | "fourteen_days"
  | "thirty_days";

export interface ReviewAssignment {
  skillTag: SkillTag;
  dueAt: string;
  interval: ReviewInterval;
  priority: number;
}

const INTERVAL_DAYS: Record<ReviewInterval, number> = {
  same_day: 0,
  next_day: 1,
  three_days: 3,
  seven_days: 7,
  fourteen_days: 14,
  thirty_days: 30,
};

export interface RetentionEngine {
  scheduleReview(
    skillTag: SkillTag,
    wasCorrect: boolean,
    previousInterval?: ReviewInterval
  ): ReviewAssignment;
  getDueReviews(assignments: ReviewAssignment[], now?: Date): ReviewAssignment[];
}

function nextInterval(wasCorrect: boolean, prev?: ReviewInterval): ReviewInterval {
  const order: ReviewInterval[] = [
    "same_day",
    "next_day",
    "three_days",
    "seven_days",
    "fourteen_days",
    "thirty_days",
  ];
  if (!wasCorrect) return "same_day";
  if (!prev) return "next_day";
  const idx = order.indexOf(prev);
  return order[Math.min(idx + 1, order.length - 1)];
}

export function createRetentionEngine(): RetentionEngine {
  return {
    scheduleReview(skillTag, wasCorrect, previousInterval) {
      const interval = nextInterval(wasCorrect, previousInterval);
      const due = new Date();
      due.setDate(due.getDate() + INTERVAL_DAYS[interval]);
      return {
        skillTag,
        dueAt: due.toISOString(),
        interval,
        priority: wasCorrect ? 2 : 5,
      };
    },

    getDueReviews(assignments, now = new Date()) {
      return assignments
        .filter((a) => new Date(a.dueAt) <= now)
        .sort((a, b) => b.priority - a.priority);
    },
  };
}
