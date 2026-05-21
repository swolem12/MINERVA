import type { Lesson, LessonStepType, QuestionAttempt } from "../types";

export interface LessonEngineState {
  lessonId: string;
  currentStepIndex: number;
  stepResults: Record<number, { accuracy: number; completed: boolean }>;
}

export interface LessonEngine {
  getCurrentStep(state: LessonEngineState, lesson: Lesson): Lesson["steps"][0] | null;
  canAdvanceToTimedDrill(state: LessonEngineState): boolean;
  advanceStep(state: LessonEngineState): LessonEngineState;
  recordStepResult(
    state: LessonEngineState,
    stepIndex: number,
    attempts: QuestionAttempt[]
  ): LessonEngineState;
  isLessonComplete(state: LessonEngineState, lesson: Lesson): boolean;
}

const TIMED_DRILL_GATE_ACCURACY = 0.8;

export function createLessonEngine(): LessonEngine {
  return {
    getCurrentStep(state, lesson) {
      return lesson.steps[state.currentStepIndex] ?? null;
    },

    canAdvanceToTimedDrill(state) {
      const practiceSteps = [3, 4];
      const results = practiceSteps.map((i) => state.stepResults[i]);
      if (results.some((r) => !r?.completed)) return false;
      const avgAccuracy =
        results.reduce((s, r) => s + (r?.accuracy ?? 0), 0) / results.length;
      return avgAccuracy >= TIMED_DRILL_GATE_ACCURACY;
    },

    advanceStep(state) {
      return {
        ...state,
        currentStepIndex: state.currentStepIndex + 1,
      };
    },

    recordStepResult(state, stepIndex, attempts) {
      const correct = attempts.filter((a) => a.correct).length;
      const accuracy = attempts.length > 0 ? correct / attempts.length : 0;
      return {
        ...state,
        stepResults: {
          ...state.stepResults,
          [stepIndex]: { accuracy, completed: true },
        },
      };
    },

    isLessonComplete(state, lesson) {
      return state.currentStepIndex >= lesson.steps.length - 1 &&
        state.stepResults[lesson.steps.length - 1]?.completed === true;
    },
  };
}

export function getStepLabel(type: LessonStepType): string {
  const labels: Record<LessonStepType, string> = {
    concept_introduction: "Mission Brief",
    visual_demonstration: "Visual Demo",
    guided_walkthrough: "Guided Operation",
    assisted_practice: "Assisted Drill",
    independent_practice: "Solo Drill",
    timed_combat_drill: "Timed Combat",
    mastery_check: "Mastery Check",
  };
  return labels[type];
}
