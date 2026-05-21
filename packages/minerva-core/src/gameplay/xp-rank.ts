import type { OfficerRank } from "../types";

const RANK_THRESHOLDS: { rank: OfficerRank; minXp: number }[] = [
  { rank: "Novice", minXp: 0 },
  { rank: "Apprentice", minXp: 500 },
  { rank: "Scholar", minXp: 1500 },
  { rank: "Expert", minXp: 3500 },
  { rank: "Master", minXp: 7000 },
  { rank: "Sage", minXp: 12000 },
  { rank: "Legend", minXp: 20000 },
];

export function calculateRank(xp: number): OfficerRank {
  let rank: OfficerRank = "Novice";
  for (const t of RANK_THRESHOLDS) {
    if (xp >= t.minXp) rank = t.rank;
  }
  return rank;
}

export function xpToNextRank(xp: number): { nextRank: OfficerRank | null; xpNeeded: number } {
  const current = calculateRank(xp);
  const idx = RANK_THRESHOLDS.findIndex((t) => t.rank === current);
  const next = RANK_THRESHOLDS[idx + 1];
  if (!next) return { nextRank: null, xpNeeded: 0 };
  return { nextRank: next.rank, xpNeeded: next.minXp - xp };
}

export function awardXp(
  currentXp: number,
  baseReward: number,
  accuracy: number,
  streak: number
): number {
  const accuracyBonus = Math.floor(baseReward * accuracy * 0.5);
  const streakBonus = Math.min(streak * 5, 50);
  return currentXp + baseReward + accuracyBonus + streakBonus;
}

export interface XPRankEngine {
  calculateRank(xp: number): OfficerRank;
  awardXp(currentXp: number, baseReward: number, accuracy: number, streak: number): number;
}

export function createXPRankEngine(): XPRankEngine {
  return { calculateRank, awardXp };
}
