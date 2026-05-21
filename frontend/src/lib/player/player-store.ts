"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  CampaignRegion,
  DiagnosticResult,
  QuestionAttempt,
  ReviewAssignment,
  SkillTag,
  UserProfile,
  UserSettings,
} from "@minerva/core";
import { awardXp, calculateRank, createRetentionEngine } from "@minerva/core";

const retentionEngine = createRetentionEngine();

const DEFAULT_PROFILE = (): UserProfile => ({
  uid: "local-player",
  displayName: "Learner",
  rank: "Novice",
  xp: 0,
  streak: 1,
  startingRegion: "arithmetic_frontier",
  weaknessMap: {},
  confidenceProfile: {},
  diagnosticCompleted: false,
  settings: { reducedMotion: false, largeText: false, highContrast: false },
  createdAt: new Date().toISOString(),
  lastActiveAt: new Date().toISOString(),
});

interface PlayerStore {
  enlisted: boolean;
  profile: UserProfile;
  completedNodes: string[];
  completedLessons: string[];
  skillMastery: Partial<Record<SkillTag, number>>;
  reviewQueue: ReviewAssignment[];
  missionProgress: Record<string, number>;
  completedMissions: string[];

  enlist: (displayName: string) => void;
  applyDiagnostic: (result: DiagnosticResult) => void;
  skipDiagnostic: () => void;
  completeNode: (nodeId: string, lessonId: string | null, xpReward: number) => void;
  addXp: (amount: number) => void;
  recordQuestionAttempt: (attempt: QuestionAttempt, skillTag: SkillTag) => void;
  updateSettings: (settings: Partial<UserSettings>) => void;
  incrementMissionProgress: (missionId: string) => void;
  getDueReviews: () => ReviewAssignment[];
  resetProgress: () => void;
  hydrate: (snapshot: {
    enlisted: boolean;
    profile: UserProfile;
    completedNodes: string[];
    completedLessons: string[];
    skillMastery: Partial<Record<SkillTag, number>>;
    reviewQueue?: ReviewAssignment[];
    missionProgress?: Record<string, number>;
    completedMissions?: string[];
  }) => void;
}

export const usePlayerStore = create<PlayerStore>()(
  persist(
    (set, get) => ({
      enlisted: false,
      profile: DEFAULT_PROFILE(),
      completedNodes: [],
      completedLessons: [],
      skillMastery: {},
      reviewQueue: [],
      missionProgress: {},
      completedMissions: [],

      enlist: (displayName) => {
        const now = new Date().toISOString();
        set({
          enlisted: true,
          profile: {
            ...DEFAULT_PROFILE(),
            displayName: displayName.trim() || "Learner",
            createdAt: now,
            lastActiveAt: now,
          },
        });
      },

      applyDiagnostic: (result) => {
        set((s) => ({
          profile: {
            ...s.profile,
            diagnosticCompleted: true,
            startingRegion: result.startingRegion,
            weaknessMap: result.weaknessMap,
            confidenceProfile: result.confidenceProfile,
            lastActiveAt: new Date().toISOString(),
          },
        }));
      },

      skipDiagnostic: () => {
        set((s) => ({
          profile: {
            ...s.profile,
            diagnosticCompleted: true,
            startingRegion: "arithmetic_frontier",
            lastActiveAt: new Date().toISOString(),
          },
        }));
      },

      completeNode: (nodeId, lessonId, xpReward) => {
        set((s) => {
          const nodes = s.completedNodes.includes(nodeId)
            ? s.completedNodes
            : [...s.completedNodes, nodeId];
          const lessons =
            lessonId && !s.completedLessons.includes(lessonId)
              ? [...s.completedLessons, lessonId]
              : s.completedLessons;
          const newXp = awardXp(s.profile.xp, xpReward, 0.85, s.profile.streak);
          return {
            completedNodes: nodes,
            completedLessons: lessons,
            profile: {
              ...s.profile,
              xp: newXp,
              rank: calculateRank(newXp),
              lastActiveAt: new Date().toISOString(),
            },
          };
        });
      },

      addXp: (amount) => {
        set((s) => {
          const newXp = s.profile.xp + amount;
          return {
            profile: {
              ...s.profile,
              xp: newXp,
              rank: calculateRank(newXp),
              lastActiveAt: new Date().toISOString(),
            },
          };
        });
      },

      recordQuestionAttempt: (attempt, skillTag) => {
        set((s) => {
          const prevInterval = s.reviewQueue.find((r) => r.skillTag === skillTag)?.interval;
          const assignment = retentionEngine.scheduleReview(skillTag, attempt.correct, prevInterval);
          const filtered = s.reviewQueue.filter((r) => r.skillTag !== skillTag);
          const weaknessMap = { ...s.profile.weaknessMap };
          if (!attempt.correct) {
            weaknessMap[skillTag] = (weaknessMap[skillTag] ?? 0) + 1;
          }
          const confidenceProfile = { ...s.profile.confidenceProfile };
          confidenceProfile[skillTag] = attempt.confidence;
          const mastery = { ...s.skillMastery };
          mastery[skillTag] = Math.min(1, (mastery[skillTag] ?? 0) + (attempt.correct ? 0.1 : -0.05));

          return {
            reviewQueue: [...filtered, assignment],
            skillMastery: mastery,
            profile: {
              ...s.profile,
              weaknessMap,
              confidenceProfile,
              lastActiveAt: new Date().toISOString(),
            },
          };
        });
      },

      updateSettings: (settings) => {
        set((s) => ({
          profile: {
            ...s.profile,
            settings: { ...s.profile.settings, ...settings },
            lastActiveAt: new Date().toISOString(),
          },
        }));
      },

      incrementMissionProgress: (missionId) => {
        set((s) => {
          const progress = (s.missionProgress[missionId] ?? 0) + 1;
          const completedMissions = s.completedMissions.includes(missionId)
            ? s.completedMissions
            : progress >= 1
              ? [...s.completedMissions, missionId]
              : s.completedMissions;
          return {
            missionProgress: { ...s.missionProgress, [missionId]: progress },
            completedMissions,
          };
        });
      },

      getDueReviews: () => retentionEngine.getDueReviews(get().reviewQueue),

      resetProgress: () => {
        set({
          enlisted: false,
          profile: DEFAULT_PROFILE(),
          completedNodes: [],
          completedLessons: [],
          skillMastery: {},
          reviewQueue: [],
          missionProgress: {},
          completedMissions: [],
        });
      },

      hydrate: (snapshot) => {
        set({
          enlisted: snapshot.enlisted,
          profile: snapshot.profile,
          completedNodes: snapshot.completedNodes,
          completedLessons: snapshot.completedLessons,
          skillMastery: snapshot.skillMastery,
          reviewQueue: snapshot.reviewQueue ?? [],
          missionProgress: snapshot.missionProgress ?? {},
          completedMissions: snapshot.completedMissions ?? [],
        });
      },
    }),
    { name: "minerva-player-v2" }
  )
);

export function usePlayer() {
  return usePlayerStore();
}
