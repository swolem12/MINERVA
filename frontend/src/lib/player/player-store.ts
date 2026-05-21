"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CampaignRegion, DiagnosticResult, SkillTag, UserProfile } from "@minerva/core";
import { awardXp, calculateRank } from "@minerva/core";

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

  enlist: (displayName: string) => void;
  applyDiagnostic: (result: DiagnosticResult) => void;
  skipDiagnostic: () => void;
  completeNode: (nodeId: string, lessonId: string | null, xpReward: number) => void;
  addXp: (amount: number) => void;
  resetProgress: () => void;
  hydrate: (snapshot: {
    enlisted: boolean;
    profile: UserProfile;
    completedNodes: string[];
    completedLessons: string[];
    skillMastery: Partial<Record<SkillTag, number>>;
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

      resetProgress: () => {
        set({
          enlisted: false,
          profile: DEFAULT_PROFILE(),
          completedNodes: [],
          completedLessons: [],
          skillMastery: {},
        });
      },

      hydrate: (snapshot) => {
        set({
          enlisted: snapshot.enlisted,
          profile: snapshot.profile,
          completedNodes: snapshot.completedNodes,
          completedLessons: snapshot.completedLessons,
          skillMastery: snapshot.skillMastery,
        });
      },
    }),
    { name: "minerva-player-v2" }
  )
);

export function usePlayer() {
  return usePlayerStore();
}
