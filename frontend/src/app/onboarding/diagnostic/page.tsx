"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  DIAGNOSTIC_QUESTIONS,
  createDiagnosticEngine,
  enrichAttemptsWithErrors,
  classifyError,
} from "@minerva/core";
import type { QuestionAttempt } from "@minerva/core";
import { usePlayerStore } from "@/lib/player/player-store";
import { AppPage } from "@/components/layout/AppPage";
import { TacticalButton } from "@/components/ui/TacticalButton";
import { QuestionCard } from "@/components/learning/QuestionCard";

export default function DiagnosticPage() {
  const [index, setIndex] = useState(0);
  const [attempts, setAttempts] = useState<QuestionAttempt[]>([]);
  const [phase, setPhase] = useState<"intro" | "questions" | "results">("intro");
  const [result, setResult] = useState<ReturnType<ReturnType<typeof createDiagnosticEngine>["processAttempts"]> | null>(null);
  const [pendingContinue, setPendingContinue] = useState(false);
  const { applyDiagnostic, skipDiagnostic, profile } = usePlayerStore();
  const router = useRouter();

  const handleSkip = () => {
    skipDiagnostic();
    router.push("/campaign");
  };

  const question = DIAGNOSTIC_QUESTIONS[index];
  const progress = (index + (phase === "results" ? 1 : 0)) / DIAGNOSTIC_QUESTIONS.length;

  const finishDiagnostic = useCallback(
    (allAttempts: QuestionAttempt[]) => {
      const enriched = enrichAttemptsWithErrors(
        allAttempts,
        DIAGNOSTIC_QUESTIONS.map((q) => ({ id: q.id, correctAnswer: q.correctAnswer }))
      );
      const engine = createDiagnosticEngine();
      const diagnosticResult = engine.processAttempts(enriched);
      setResult(diagnosticResult);
      setPhase("results");
      applyDiagnostic(diagnosticResult);
    },
    [applyDiagnostic]
  );

  const handleContinue = useCallback(() => {
    setPendingContinue(false);
    setAttempts((current) => {
      if (index + 1 >= DIAGNOSTIC_QUESTIONS.length) {
        finishDiagnostic(current);
      } else {
        setIndex((i) => i + 1);
      }
      return current;
    });
  }, [index, finishDiagnostic]);

  const handleSubmit = useCallback(
    (selectedAnswer: string, confidence: 1 | 2 | 3 | 4 | 5, timeMs: number) => {
      const q = DIAGNOSTIC_QUESTIONS[index];
      const correct = selectedAnswer === q.correctAnswer;
      const attempt: QuestionAttempt = {
        questionId: q.id,
        selectedAnswer,
        correct,
        timeMs,
        confidence,
        skillTags: [q.skillTag],
        errorType: correct
          ? undefined
          : classifyError(
              { questionId: q.id, selectedAnswer, correct, timeMs, confidence, skillTags: [q.skillTag] },
              q.correctAnswer
            ),
      };
      setAttempts((prev) => [...prev, attempt]);
      setPendingContinue(true);
    },
    [index]
  );

  if (phase === "intro") {
    return (
      <AppPage title="Placement check" subtitle={`Hi ${profile.displayName} — this takes about 5 minutes`}>
        <div className="card p-5">
          <p className="text-sm leading-relaxed text-secondary">
            12 questions on core math topics. Wrong answers only help us pick your starting unit — not a grade.
          </p>
        </div>
        <div className="mt-6 flex flex-col gap-3">
          <TacticalButton onClick={() => setPhase("questions")}>Begin</TacticalButton>
          <TacticalButton variant="ghost" onClick={handleSkip}>
            Skip — start at Unit 1
          </TacticalButton>
        </div>
      </AppPage>
    );
  }

  if (phase === "results" && result) {
    return (
      <AppPage title="You're all set">
        <div className="card p-5">
          <p className="text-sm text-secondary">Accuracy</p>
          <p className="text-3xl font-bold text-cardinal">{Math.round(result.overallAccuracy * 100)}%</p>
          <p className="mt-3 text-sm text-secondary">
            Starting unit: <span className="font-semibold text-primary">{result.startingRegion.replace(/_/g, " ")}</span>
          </p>
          {result.remediationPath.length > 0 && (
            <p className="mt-2 text-sm text-secondary">
              Focus first: {result.remediationPath.slice(0, 3).map((s) => s.replace(/_/g, " ")).join(", ")}
            </p>
          )}
        </div>
        <div className="mt-6">
          <TacticalButton onClick={() => router.push("/campaign")}>Go to Learn</TacticalButton>
        </div>
      </AppPage>
    );
  }

  return (
    <AppPage title="Placement check" subtitle={`Question ${index + 1} of ${DIAGNOSTIC_QUESTIONS.length}`}>
      <div
        className="mb-4 h-2 overflow-hidden rounded-full bg-surface-muted"
        role="progressbar"
        aria-valuenow={Math.round(progress * 100)}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <motion.div
          className="h-full bg-cardinal"
          animate={{ width: `${progress * 100}%` }}
        />
      </div>
      <AnimatePresence mode="wait">
        <motion.div key={question.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
          <QuestionCard
            question={question}
            onSubmit={handleSubmit}
            onContinue={pendingContinue ? handleContinue : undefined}
          />
        </motion.div>
      </AnimatePresence>
      <div className="mt-4 text-center">
        <button type="button" onClick={handleSkip} className="text-sm font-semibold text-muted hover:text-cardinal">
          Skip placement check
        </button>
      </div>
    </AppPage>
  );
}
