"use client";

import { useState, useMemo, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  SEED_QUESTIONS,
  REVIEW_NODE_SKILLS,
  getQuestionById,
} from "@minerva/core";
import type { SkillTag } from "@minerva/core";
import { usePlayerStore } from "@/lib/player/player-store";
import { LessonTopBar } from "@/components/shell/TacticalHUD";
import { TacticalButton } from "@/components/ui/TacticalButton";
import { QuestionCard } from "@/components/learning/QuestionCard";
import { AppPage } from "@/components/layout/AppPage";

function PracticeContent({ id }: { id: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nodeId = searchParams.get("node");
  const { recordQuestionAttempt, completeNode } = usePlayerStore();

  const questions = useMemo(() => {
    if (id === "review" && nodeId) {
      const skills = REVIEW_NODE_SKILLS[nodeId] ?? ["percentages"];
      return SEED_QUESTIONS.filter(
        (q) => !q.id.startsWith("diag-") && skills.includes(q.skillTag)
      ).slice(0, 5);
    }
    const skill = id.replace(/-/g, "_") as SkillTag;
    return SEED_QUESTIONS.filter((q) => q.skillTag === skill && !q.id.startsWith("diag-")).slice(0, 5);
  }, [id, nodeId]);

  const [qIndex, setQIndex] = useState(0);
  const [done, setDone] = useState(false);
  const [pendingContinue, setPendingContinue] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);

  const q = questions[qIndex];
  const title = id === "review" ? "Unit review" : id.replace(/-/g, " ");

  if (questions.length === 0) {
    return (
      <AppPage title="Practice">
        <p className="text-secondary">No practice questions for this skill yet.</p>
        <TacticalButton onClick={() => router.push("/campaign")}>Back to Learn</TacticalButton>
      </AppPage>
    );
  }

  if (done) {
    return (
      <AppPage title="Practice complete">
        <div className="card p-5 text-center">
          <p className="text-lg font-bold text-primary">
            {correctCount} of {questions.length} correct
          </p>
        </div>
        <div className="mt-6">
          <TacticalButton onClick={() => router.push("/campaign")}>Back to Learn</TacticalButton>
        </div>
      </AppPage>
    );
  }

  const handleSubmit = (selected: string, confidence: 1 | 2 | 3 | 4 | 5, timeMs: number) => {
    if (!q) return;
    const correct = selected === q.correctAnswer;
    if (correct) setCorrectCount((c) => c + 1);
    recordQuestionAttempt(
      { questionId: q.id, selectedAnswer: selected, correct, timeMs, confidence, skillTags: [q.skillTag] },
      q.skillTag
    );
    setPendingContinue(true);
  };

  const handleContinue = () => {
    setPendingContinue(false);
    if (qIndex + 1 >= questions.length) {
      if (id === "review" && nodeId) completeNode(nodeId, null, 60);
      setDone(true);
    } else {
      setQIndex((i) => i + 1);
    }
  };

  if (!q) return null;

  return (
    <div className="flex min-h-dvh flex-col bg-surface-page">
      <LessonTopBar title={title} progress={(qIndex + 0.5) / questions.length} estimateMin={5} />
      <div className="mx-auto w-full max-w-lg flex-1 px-4 py-5">
        <QuestionCard
          key={q.id}
          question={q}
          onSubmit={handleSubmit}
          onContinue={pendingContinue ? handleContinue : undefined}
          showHints
          hint={getQuestionById(q.id)?.explanation.slice(0, 80) ?? null}
        />
      </div>
    </div>
  );
}

export default function PracticePageClient({ id }: { id: string }) {
  return (
    <Suspense fallback={<div className="p-8 text-center text-secondary">Loading…</div>}>
      <PracticeContent id={id} />
    </Suspense>
  );
}
