import type { SkillTag } from "../types";

export interface DailyMission {
  id: string;
  title: string;
  description: string;
  targetCount: number;
  skillTag: SkillTag;
  xpReward: number;
  completed: boolean;
  progress: number;
}

export interface DailyMissionEngine {
  generateDailyMissions(
    date: string,
    weaknessMap: Partial<Record<SkillTag, number>>
  ): DailyMission[];
}

export function createDailyMissionEngine(): DailyMissionEngine {
  return {
    generateDailyMissions(date, weaknessMap) {
      const weakSkills = Object.entries(weaknessMap)
        .sort(([, a], [, b]) => (b ?? 0) - (a ?? 0))
        .slice(0, 2)
        .map(([skill]) => skill as SkillTag);

      const missions: DailyMission[] = [
        {
          id: `${date}-warmup`,
          title: "Morning Warmup",
          description: "Complete 5 mental math problems",
          targetCount: 5,
          skillTag: "addition",
          xpReward: 50,
          completed: false,
          progress: 0,
        },
        {
          id: `${date}-review`,
          title: "Weakness Review",
          description: `Practice ${weakSkills[0]?.replace(/_/g, " ") ?? "percentages"}`,
          targetCount: 3,
          skillTag: weakSkills[0] ?? "percentages",
          xpReward: 75,
          completed: false,
          progress: 0,
        },
        {
          id: `${date}-streak`,
          title: "Maintain Streak",
          description: "Complete any lesson or drill today",
          targetCount: 1,
          skillTag: "percentages",
          xpReward: 25,
          completed: false,
          progress: 0,
        },
      ];
      return missions;
    },
  };
}
