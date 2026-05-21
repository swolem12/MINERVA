export type ExamSection = "arithmetic_reasoning" | "math_knowledge";

export type ScopeClassification =
  | "official_arithmetic_reasoning"
  | "official_math_knowledge"
  | "direct_sample_archetype"
  | "prerequisite_skill"
  | "mental_forge_support_skill";

export type SkillTag =
  | "addition"
  | "subtraction"
  | "multiplication"
  | "division"
  | "long_division"
  | "fractions"
  | "decimals"
  | "percentages"
  | "ratios"
  | "proportions"
  | "exponents"
  | "roots"
  | "linear_equations"
  | "inequalities"
  | "absolute_value"
  | "geometry_formulas"
  | "word_problem_translation"
  | "signed_numbers"
  | "order_of_operations"
  | "algebra_expressions"
  | "systems_of_equations";

export type ErrorType =
  | "conceptual_gap"
  | "arithmetic_slip"
  | "formula_recall_failure"
  | "question_misread"
  | "unit_conversion_failure"
  | "time_pressure_failure"
  | "guessing_pattern"
  | "algebra_setup_failure"
  | "sign_error"
  | "fraction_operation_failure"
  | "decimal_placement_error";

export type OfficerRank =
  | "Novice"
  | "Apprentice"
  | "Scholar"
  | "Expert"
  | "Master"
  | "Sage"
  | "Legend";

export type CampaignRegion =
  | "arithmetic_frontier"
  | "ratio_ridge"
  | "algebra_citadel"
  | "geometry_sector"
  | "mental_forge"
  | "officer_trials";

export type LessonStepType =
  | "concept_introduction"
  | "visual_demonstration"
  | "guided_walkthrough"
  | "assisted_practice"
  | "independent_practice"
  | "timed_combat_drill"
  | "mastery_check";

export interface MinervaQuestion {
  id: string;
  section: ExamSection;
  scopeClassification: ScopeClassification;
  skillTag: SkillTag;
  difficulty: 1 | 2 | 3 | 4 | 5;
  prompt: string;
  answerChoices: string[];
  correctAnswer: string;
  explanation: string;
  estimatedSolveTimeSec: number;
  commonTrap: string;
  prerequisites: SkillTag[];
}

export interface QuestionAttempt {
  questionId: string;
  selectedAnswer: string;
  correct: boolean;
  timeMs: number;
  confidence: 1 | 2 | 3 | 4 | 5;
  errorType?: ErrorType;
  skillTags: SkillTag[];
}

export interface UserProfile {
  uid: string;
  displayName: string;
  rank: OfficerRank;
  xp: number;
  streak: number;
  startingRegion: CampaignRegion;
  weaknessMap: Partial<Record<SkillTag, number>>;
  confidenceProfile: Partial<Record<SkillTag, number>>;
  diagnosticCompleted: boolean;
  settings: UserSettings;
  createdAt: string;
  lastActiveAt: string;
}

export interface UserSettings {
  reducedMotion: boolean;
  largeText: boolean;
  highContrast: boolean;
}

export interface DiagnosticResult {
  startingRegion: CampaignRegion;
  weaknessMap: Partial<Record<SkillTag, number>>;
  confidenceProfile: Partial<Record<SkillTag, number>>;
  remediationPath: SkillTag[];
  dailyTrainingPlan: string[];
  overallAccuracy: number;
  avgTimeMs: number;
}

export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

export interface LessonStep {
  type: LessonStepType;
  title: string;
  content: string;
  visual?: string;
  questions?: string[];
  hints?: string[];
}

export interface Lesson {
  id: string;
  title: string;
  section: ExamSection;
  skillTags: SkillTag[];
  prerequisites: SkillTag[];
  difficultyTier: 1 | 2 | 3 | 4 | 5;
  steps: LessonStep[];
  masteryCriteria: { minAccuracy: number; minQuestions: number };
}

export interface CampaignNode {
  id: string;
  title: string;
  type: "lesson" | "drill" | "boss" | "review";
  lessonId?: string;
  locked: boolean;
  xpReward: number;
}

export interface CampaignRegionData {
  id: CampaignRegion;
  title: string;
  description: string;
  nodes: CampaignNode[];
}

export interface AfterActionReview {
  whatImproved: string[];
  whatBrokeDown: string[];
  rootCauseAnalysis: string;
  recommendedNextMission: string;
  mentalMathPrescription: string;
  encouragementStatement: string;
}
