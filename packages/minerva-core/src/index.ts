export * from "./types";

export { assertAFOQTScope, scanTextForForbiddenTopics, FORBIDDEN_TOPICS } from "./curriculum/scope-guard";
export {
  getPrerequisites,
  findRootCause,
  getRemediationPath,
  getUnlockedSkills,
  EDGES,
} from "./curriculum/knowledge-graph";
export type { GraphEdge, EdgeType } from "./curriculum/knowledge-graph";

export { validateQuestion, validateQuestionBank } from "./questions/governor";

export { classifyError, getRemediation, aggregateErrorsBySkill, REMEDIATION_MAP } from "./errors/taxonomy";

export {
  createDiagnosticEngine,
  enrichAttemptsWithErrors,
} from "./learning/diagnostic";
export type { DiagnosticEngine } from "./learning/diagnostic";

export {
  createLessonEngine,
  getStepLabel,
} from "./learning/lesson-engine";
export type { LessonEngine, LessonEngineState } from "./learning/lesson-engine";

export {
  createGuidedPracticeEngine,
  computePracticeAccuracy,
} from "./learning/guided-practice";
export type { GuidedPracticeEngine, GuidedPracticeConfig } from "./learning/guided-practice";

export { createAdaptiveLearningEngine } from "./learning/adaptive";
export type { AdaptiveLearningEngine, AdaptiveSignal, AdaptiveAction } from "./learning/adaptive";

export { createRetentionEngine } from "./learning/retention";
export type { RetentionEngine, ReviewAssignment, ReviewInterval } from "./learning/retention";

export { createMentalForgeEngine } from "./learning/mental-forge";
export type { MentalForgeEngine, MentalForgeDrill } from "./learning/mental-forge";

export { createFormulaArmoryEngine } from "./learning/formula-armory";
export type { FormulaArmoryEngine, FormulaCard } from "./learning/formula-armory";

export { createWordProblemTranslatorEngine } from "./learning/word-problem-translator";
export type { WordProblemTranslatorEngine, WordProblemTranslation } from "./learning/word-problem-translator";

export {
  createCampaignEngine,
  CAMPAIGN_REGIONS,
  CAMPAIGN_DEFINITION,
  resolveCampaignProgress,
} from "./gameplay/campaign";
export type {
  CampaignEngine,
  CampaignRegionDef,
  CampaignNodeDef,
  ResolvedCampaignRegion,
  ResolvedCampaignNode,
} from "./gameplay/campaign";

export { createXPRankEngine, calculateRank, awardXp, xpToNextRank } from "./gameplay/xp-rank";
export type { XPRankEngine } from "./gameplay/xp-rank";

export { createDailyMissionEngine } from "./gameplay/daily-missions";
export type { DailyMissionEngine, DailyMission } from "./gameplay/daily-missions";

export { createBossBattleEngine } from "./gameplay/boss-battles";
export type { BossBattleEngine, BossBattle } from "./gameplay/boss-battles";

export { createOfficerTrialEngine } from "./testing/officer-trials";
export type { OfficerTrialEngine, OfficerTrial } from "./testing/officer-trials";

export { createPacingCoachEngine } from "./testing/pacing-coach";
export type { PacingCoachEngine, PacingAdvice } from "./testing/pacing-coach";

export { createAnalyticsEngine } from "./analytics/dashboard";
export type { AnalyticsEngine, AnalyticsSnapshot } from "./analytics/dashboard";

export { createAfterActionReviewEngine } from "./ai/after-action-review";
export type { AfterActionReviewEngine } from "./ai/after-action-review";

export { createOfflineCacheEngine } from "./sync/offline-cache";
export type { OfflineCacheEngine, CacheEntry } from "./sync/offline-cache";

export { createFirebaseSyncEngine } from "./sync/firebase-sync";
export type { FirebaseSyncEngine, SyncQueueItem, SyncOperation } from "./sync/firebase-sync";

import seedQuestions from "./data/seed-questions.json";
import extraQuestions from "./data/extra-questions.json";
import type { MinervaQuestion, Lesson } from "./types";
import { LESSON_CATALOG, getLessonById, ALL_LESSON_IDS } from "./data/lessons/index";

export const SEED_QUESTIONS = [...seedQuestions, ...extraQuestions] as MinervaQuestion[];
export const DIAGNOSTIC_QUESTIONS = SEED_QUESTIONS.filter((q) => q.id.startsWith("diag-"));
export const PERCENTAGES_INTRO_LESSON = LESSON_CATALOG["percentages-intro"];
export { LESSON_CATALOG, getLessonById, ALL_LESSON_IDS };

export function getQuestionById(id: string): MinervaQuestion | undefined {
  return SEED_QUESTIONS.find((q) => q.id === id);
}

export function resolveLessonQuestions(lesson: Lesson): MinervaQuestion[] {
  const ids = new Set<string>();
  for (const step of lesson.steps) {
    if (step.questions) {
      for (const id of step.questions) ids.add(id);
    }
  }
  return Array.from(ids)
    .map(getQuestionById)
    .filter((q): q is MinervaQuestion => q !== undefined);
}
