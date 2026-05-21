"use client";

import { use, useState, useMemo, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  getLessonById,
  getQuestionById,
  createLessonEngine,
  getStepLabel,
  createGuidedPracticeEngine,
  createRetentionEngine,
  CAMPAIGN_DEFINITION,
} from "@minerva/core";
import type { QuestionAttempt, LessonStepType } from "@minerva/core";
import { usePlayerStore } from "@/lib/player/player-store";
import { LessonTopBar } from "@/components/shell/TacticalHUD";
import { TacticalButton } from "@/components/ui/TacticalButton";
import { QuestionCard } from "@/components/learning/QuestionCard";
import { MathDisplay } from "@/components/ui/MathDisplay";

function BarModelVisual() {
  return (
    <svg viewBox="0 0 200 48" className="w-full max-w-xs" aria-label="Bar model">
      {[0, 1, 2, 3].map((i) => (
        <rect
          key={i}
          x={i * 50}
          y={4}
          width={46}
          height={32}
          rx={4}
          fill={i === 0 ? "#8c1515" : "#efefef"}
          stroke="#b6a88a"
          strokeWidth={1.5}
        />
      ))}
      <text x={100} y={46} textAnchor="middle" fill="#535659" fontSize={11}>
        1 of 4 = 25%
      </text>
    </svg>
  );
}

function LessonContent({ id }: { id: string }) {
  const lesson = getLessonById(id);
  const router = useRouter();
  const searchParams = useSearchParams();
  const nodeId = searchParams.get("node") ?? id;
  const { completeNode } = usePlayerStore();
  const engine = useMemo(() => createLessonEngine(), []);
  const practiceEngine = useMemo(() => createGuidedPracticeEngine(), []);
  const retentionEngine = useMemo(() => createRetentionEngine(), []);

  const [state, setState] = useState(() => ({
    lessonId: id,
    currentStepIndex: 0,
    stepResults: {} as Record<number, { accuracy: number; completed: boolean }>,
  }));
  const [questionIndex, setQuestionIndex] = useState(0);
  const [stepAttempts, setStepAttempts] = useState<QuestionAttempt[]>([]);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [complete, setComplete] = useState(false);
  const [xpEarned, setXpEarned] = useState(0);

  if (!lesson) {
    return (
      <div className="mx-auto max-w-lg px-4 py-10 text-center">
        <p className="text-lg font-bold text-warm-white">Lesson not found</p>
        <div className="mt-4">
          <TacticalButton onClick={() => router.push("/campaign")}>Back to Learn</TacticalButton>
        </div>
      </div>
    );
  }

  const step = lesson.steps[state.currentStepIndex];
  const stepType = step.type as LessonStepType;
  const isPracticeStep = ["assisted_practice", "independent_practice", "timed_combat_drill", "mastery_check"].includes(stepType);
  const questionIds = step.questions ?? [];
  const currentQuestion = questionIds[questionIndex] ? getQuestionById(questionIds[questionIndex]) : undefined;
  const showHints = stepType === "assisted_practice";
  const progress = (state.currentStepIndex + (isPracticeStep ? (questionIndex + 0.5) / Math.max(questionIds.length, 1) : 0)) / lesson.steps.length;

  const nodeMeta = CAMPAIGN_DEFINITION.flatMap((r) => r.nodes).find((n) => n.id === nodeId);
  const xpReward = nodeMeta?.xpReward ?? 100;

  const finishLesson = () => {
    setComplete(true);
    setXpEarned(xpReward);
    completeNode(nodeId, lesson.id, xpReward);
    retentionEngine.scheduleReview(lesson.skillTags[0], true);
  };

  const advanceStep = () => {
    if (stepType === "timed_combat_drill" && !engine.canAdvanceToTimedDrill(state)) return;
    const next = engine.advanceStep(state);
    setState(next);
    setQuestionIndex(0);
    setStepAttempts([]);
    setHintsUsed(0);
    if (engine.isLessonComplete(next, lesson)) finishLesson();
  };

  const handleQuestionSubmit = (
    selectedAnswer: string,
    confidence: 1 | 2 | 3 | 4 | 5,
    timeMs: number
  ) => {
    if (!currentQuestion) return;
    const correct = selectedAnswer === currentQuestion.correctAnswer;
    const attempt: QuestionAttempt = {
      questionId: currentQuestion.id,
      selectedAnswer,
      correct,
      timeMs,
      confidence,
      skillTags: lesson.skillTags,
    };
    const nextAttempts = [...stepAttempts, attempt];
    setStepAttempts(nextAttempts);
    setTimeout(() => {
      if (questionIndex + 1 >= questionIds.length) {
        const newState = engine.recordStepResult(state, state.currentStepIndex, nextAttempts);
        setState(newState);
        if (engine.isLessonComplete(newState, lesson)) finishLesson();
        else advanceStep();
      } else {
        setQuestionIndex((i) => i + 1);
      }
    }, 1400);
  };

  if (complete) {
    return (
      <div className="flex min-h-dvh flex-col items-center justify-center px-4">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="card w-full max-w-sm p-8 text-center"
        >
          <p className="text-5xl">🎉</p>
          <h2 className="mt-4 text-2xl font-bold text-warm-white">Lesson complete!</h2>
          <p className="mt-2 font-semibold text-cardinal">+{xpEarned} XP</p>
          <p className="mt-1 text-sm text-sandstone">{lesson.title}</p>
        </motion.div>
        <div className="mt-6 w-full max-w-sm">
          <TacticalButton onClick={() => router.push("/campaign")}>Continue on path</TacticalButton>
        </div>
      </div>
    );
  }

  if (stepType === "timed_combat_drill" && !engine.canAdvanceToTimedDrill(state)) {
    return (
      <div className="mx-auto max-w-lg px-4 py-10 text-center">
        <p className="text-lg font-bold text-warm-white">Timed practice locked</p>
        <p className="mt-2 text-sm text-sandstone">Score 80%+ on guided practice first.</p>
        <div className="mt-6">
          <TacticalButton onClick={() => router.push("/campaign")}>Back to Learn</TacticalButton>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-dvh flex-col bg-charcoal">
      <LessonTopBar title={lesson.title} progress={progress} />

      <div className="mx-auto w-full max-w-lg flex-1 px-4 py-5">
        <p className="text-xs font-bold uppercase tracking-wide text-cardinal">
          {getStepLabel(stepType)} · Step {state.currentStepIndex + 1} of {lesson.steps.length}
        </p>
        <h2 className="mt-1 text-xl font-bold text-warm-white">{step.title}</h2>

        {!isPracticeStep && (
          <div className="card mt-4 p-4 text-left">
            <p className="whitespace-pre-line text-base leading-relaxed text-warm-white">{step.content}</p>
          </div>
        )}

        {stepType === "visual_demonstration" && step.visual === "bar-fourths" && (
          <div className="card mt-4 flex justify-center p-6">
            <BarModelVisual />
          </div>
        )}

        {stepType === "guided_walkthrough" && (
          <div className="card mt-4 space-y-2 p-4 text-left">
            {step.content.split("\n").map((line, i) => (
              <MathDisplay key={i} size="sm" className="block text-sandstone">
                {line}
              </MathDisplay>
            ))}
          </div>
        )}

        <AnimatePresence mode="wait">
          {isPracticeStep && currentQuestion && (
            <motion.div
              key={currentQuestion.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-4"
            >
              <QuestionCard
                question={currentQuestion}
                onSubmit={handleQuestionSubmit}
                showHints={showHints}
                hint={showHints ? practiceEngine.getHint(currentQuestion, hintsUsed) : null}
                onRequestHint={() => setHintsUsed((h) => h + 1)}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {!isPracticeStep && (
        <div className="sticky bottom-0 border-t border-black/[0.06] bg-charcoal-panel px-4 py-4">
          <div className="mx-auto max-w-lg">
            <TacticalButton className="max-w-none" onClick={advanceStep}>
              {state.currentStepIndex >= lesson.steps.length - 1 ? "Complete lesson" : "Continue"}
            </TacticalButton>
          </div>
        </div>
      )}
    </div>
  );
}

export default function LessonPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  return (
    <Suspense
      fallback={
        <div className="flex min-h-dvh items-center justify-center text-sandstone">Loading…</div>
      }
    >
      <LessonContent id={id} />
    </Suspense>
  );
}
