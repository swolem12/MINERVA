import type { CampaignRegion, CampaignRegionData, DiagnosticResult, UserProfile } from "../types";

export interface CampaignNodeDef {
  id: string;
  title: string;
  type: "lesson" | "drill" | "boss" | "review";
  lessonId?: string;
  xpReward: number;
  icon?: string;
}

export interface CampaignRegionDef {
  id: CampaignRegion;
  title: string;
  description: string;
  tagline: string;
  unlockAfterRegion?: CampaignRegion;
  nodes: CampaignNodeDef[];
}

export const CAMPAIGN_DEFINITION: CampaignRegionDef[] = [
  {
    id: "arithmetic_frontier",
    title: "Foundations",
    tagline: "Percentages · Ratios · Word Problems",
    description: "Core number skills explained clearly, one idea at a time.",
    nodes: [
      { id: "percentages-intro", title: "Introduction to Percentages", type: "lesson", lessonId: "percentages-intro", xpReward: 100, icon: "◆" },
      { id: "fractions-foundation", title: "Fractions Foundation", type: "lesson", lessonId: "fractions-foundation", xpReward: 100, icon: "◆" },
      { id: "ratios-basics", title: "Ratios & Rates", type: "lesson", lessonId: "ratios-basics", xpReward: 120, icon: "◆" },
      { id: "word-problems-ar", title: "Word Problem Strategies", type: "lesson", lessonId: "word-problems-ar", xpReward: 130, icon: "◆" },
      { id: "drill-ar-speed", title: "Quick Practice: Arithmetic", type: "drill", xpReward: 80, icon: "⚡" },
      { id: "boss-percent-commander", title: "Chapter Check: Foundations", type: "boss", xpReward: 250, icon: "★" },
      { id: "review-foundations", title: "Review: Number Skills", type: "review", xpReward: 60, icon: "↻" },
    ],
  },
  {
    id: "ratio_ridge",
    title: "Proportions",
    tagline: "Proportions · Mixtures · Conversions",
    description: "Learn to compare quantities and scale recipes, maps, and mixtures.",
    unlockAfterRegion: "arithmetic_frontier",
    nodes: [
      { id: "proportions-intro", title: "Proportions Intro", type: "lesson", lessonId: "proportions-intro", xpReward: 120, icon: "◆" },
      { id: "mixtures-basics", title: "Mixture Problems", type: "lesson", lessonId: "mixtures-basics", xpReward: 130, icon: "◆" },
      { id: "unit-conversions", title: "Unit Conversions", type: "lesson", lessonId: "unit-conversions", xpReward: 100, icon: "◆" },
      { id: "boss-ratio-warlord", title: "Chapter Check: Proportions", type: "boss", xpReward: 280, icon: "★" },
      { id: "review-proportions", title: "Review: Ratios & Mixtures", type: "review", xpReward: 60, icon: "↻" },
    ],
  },
  {
    id: "algebra_citadel",
    title: "Algebra",
    tagline: "Equations · Inequalities · Expressions",
    description: "Symbols and equations demystified with guided examples.",
    unlockAfterRegion: "ratio_ridge",
    nodes: [
      { id: "linear-equations", title: "Linear Equations", type: "lesson", lessonId: "linear-equations", xpReward: 120, icon: "◆" },
      { id: "inequalities-intro", title: "Inequalities", type: "lesson", lessonId: "inequalities-intro", xpReward: 120, icon: "◆" },
      { id: "algebra-expressions", title: "Expressions & Factoring", type: "lesson", lessonId: "algebra-expressions", xpReward: 130, icon: "◆" },
      { id: "systems-intro", title: "Systems of Equations", type: "lesson", lessonId: "systems-intro", xpReward: 140, icon: "◆" },
      { id: "boss-algebra-overlord", title: "Chapter Check: Algebra", type: "boss", xpReward: 300, icon: "★" },
    ],
  },
  {
    id: "geometry_sector",
    title: "Geometry",
    tagline: "Area · Triangles · Spatial Reasoning",
    description: "Shapes, area, and spatial reasoning with visual explanations.",
    unlockAfterRegion: "algebra_citadel",
    nodes: [
      { id: "geometry-area", title: "Area & Perimeter", type: "lesson", lessonId: "geometry-area", xpReward: 120, icon: "◆" },
      { id: "triangle-properties", title: "Triangle Properties", type: "lesson", lessonId: "triangle-properties", xpReward: 130, icon: "◆" },
      { id: "boss-geometry-sentinel", title: "Chapter Check: Geometry", type: "boss", xpReward: 280, icon: "★" },
    ],
  },
  {
    id: "mental_forge",
    title: "Mental Math",
    tagline: "Speed · Fluency · Confidence",
    description: "Short drills to build number fluency without a calculator.",
    unlockAfterRegion: "arithmetic_frontier",
    nodes: [
      { id: "forge-addition", title: "Addition Sprint", type: "drill", xpReward: 60, icon: "⚡" },
      { id: "forge-multiplication", title: "Multiplication Blitz", type: "drill", xpReward: 70, icon: "⚡" },
      { id: "forge-percentages", title: "Percent Snap Drill", type: "drill", xpReward: 80, icon: "⚡" },
    ],
  },
  {
    id: "officer_trials",
    title: "Confidence Checks",
    tagline: "Timed Mixed Review",
    description: "Optional timed sets to see how far you've come.",
    unlockAfterRegion: "geometry_sector",
    nodes: [
      { id: "trial-ar", title: "Mixed Arithmetic Review", type: "boss", xpReward: 400, icon: "📝" },
      { id: "trial-mk", title: "Mixed Algebra & Geometry Review", type: "boss", xpReward: 400, icon: "📝" },
    ],
  },
];

export interface ResolvedCampaignNode extends CampaignNodeDef {
  locked: boolean;
  completed: boolean;
  current: boolean;
}

export interface ResolvedCampaignRegion extends CampaignRegionDef {
  locked: boolean;
  nodes: ResolvedCampaignNode[];
  progress: number;
}

export function resolveCampaignProgress(
  completedNodeIds: string[],
  startingRegion: CampaignRegion = "arithmetic_frontier"
): ResolvedCampaignRegion[] {
  const completed = new Set(completedNodeIds);
  const regionUnlocked = new Set<CampaignRegion>([startingRegion]);

  for (const region of CAMPAIGN_DEFINITION) {
    if (!region.unlockAfterRegion) continue;
    const prev = CAMPAIGN_DEFINITION.find((r) => r.id === region.unlockAfterRegion);
    if (!prev) continue;
    const boss = prev.nodes.find((n) => n.type === "boss");
    if (boss && completed.has(boss.id)) {
      regionUnlocked.add(region.id);
    }
  }

  regionUnlocked.add(startingRegion);

  let foundCurrent = false;

  return CAMPAIGN_DEFINITION.map((region) => {
    const regionLocked = !regionUnlocked.has(region.id);
    const nodes: ResolvedCampaignNode[] = region.nodes.map((node, index) => {
      const isCompleted = completed.has(node.id);
      const prevInRegion = index > 0 ? region.nodes[index - 1].id : null;
      const prevDone = !prevInRegion || completed.has(prevInRegion);
      const locked = regionLocked || !prevDone;
      let current = false;
      if (!foundCurrent && !locked && !isCompleted) {
        current = true;
        foundCurrent = true;
      }
      return { ...node, locked, completed: isCompleted, current };
    });

    const doneCount = nodes.filter((n) => n.completed).length;
    return {
      ...region,
      locked: regionLocked,
      nodes,
      progress: nodes.length ? doneCount / nodes.length : 0,
    };
  });
}

export const CAMPAIGN_REGIONS: CampaignRegionData[] = CAMPAIGN_DEFINITION.map((r) => ({
  id: r.id,
  title: r.title,
  description: r.description,
  nodes: r.nodes.map((n, i) => ({
    ...n,
    locked: i > 0,
  })),
}));

export interface CampaignEngine {
  getRegion(id: CampaignRegion): CampaignRegionData | undefined;
  getAllRegions(): CampaignRegionData[];
  unlockNode(regionId: CampaignRegion, nodeId: string): CampaignRegionData | undefined;
}

export function createCampaignEngine(): CampaignEngine {
  const regions = structuredClone(CAMPAIGN_REGIONS);
  return {
    getRegion(id) { return regions.find((r) => r.id === id); },
    getAllRegions() { return regions; },
    unlockNode(regionId, nodeId) {
      const region = regions.find((r) => r.id === regionId);
      if (!region) return undefined;
      const node = region.nodes.find((n) => n.id === nodeId);
      if (node) node.locked = false;
      return region;
    },
  };
}
