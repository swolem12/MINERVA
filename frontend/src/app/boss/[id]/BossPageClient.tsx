"use client";

import { useState, useMemo, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  createBossBattleEngine,
  createOfficerTrialEngine,
  getQuestionsForBossNode,
  getBossTitle,
} from "@minerva/core";
import { usePlayerStore } from "@/lib/player/player-store";
import { AppPage } from "@/components/layout/AppPage";
import { LessonTopBar } from "@/components/shell/TacticalHUD";
import { TacticalButton } from "@/components/ui/TacticalButton";
import { QuestionCard } from "@/components/learning/QuestionCard";

export default function BossPageClient({ id }: { id: string }) {
  const router = useRouter();
  const { completeNode, recordQuestionAttempt } = usePlayerStore();
  const isTrial = id.startsWith("trial-");
  const bossEngine = useMemo(() => createBossBattleEngine(), []);
  const trialEngine = useMemo(() => createOfficerTrialEngine(), []);
  const questions = useMemo(() => getQuestionsForBossNode(id, isTrial ? 8 : 5), [id, isTrial]);
  const title = getBossTitle(id);
  const battle = bossEngine.createBattle(id, title, questions);

  const [phase, setPhase] = useState<"brief" | "fight" | "done">("brief");
  const [qIndex, setQIndex] = useState(0);
  const resultsRef = useRef<{ correct: boolean; timeMs: number }[]>([]);
  const [outcome, setOutcome] = useState<{ passed: boolean; feedback: string; accuracy: number } | null>(null);
  const [pendingContinue, setPendingContinue] = useState(false);

  const handleAnswer = (selected: string, _c: 1 | 2 | 3 | 4 | 5, timeMs: number) => {
    const q = battle.questions[qIndex];
    const correct = selected === q.correctAnswer;
    recordQuestionAttempt(
      { questionId: q.id, selectedAnswer: selected, correct, timeMs, confidence: _c, skillTags: [q.skillTag] },
      q.skillTag
    );
    resultsRef.current = [...resultsRef.current, { correct, timeMs }];
    setPendingContinue(true);
  };

  const continueQuestion = () => {
    setPendingContinue(false);
    if (qIndex + 1 >= battle.questions.length) {
      const results = resultsRef.current;
      const eval_ = isTrial
        ? trialEngine.scoreTrial(
            trialEngine.createTrial(
              id === "trial-ar" ? "arithmetic_reasoning" : "math_knowledge",
              questions
            ),
            results.map((r) => ({ ...r, skipped: false }))
          )
        : bossEngine.evaluateBattle(battle, results);
      setOutcome({
        passed: eval_.passed,
        feedback: eval_.feedback,
        accuracy: "accuracy" in eval_ ? eval_.accuracy : eval_.rawScore,
      });
      setPhase("done");
      if (eval_.passed) completeNode(id, null, battle.questions.length * 50 + 150);
    } else {
      setQIndex((i) => i + 1);
    }
  };

  if (phase === "brief") {
    return (
      <AppPage title={title} subtitle={isTrial ? "Timed mixed review" : "Chapter check"}>
        <div className="card p-5">
          <p className="text-secondary">{battle.questions.length} questions</p>
          <p className="mt-2 text-sm text-muted">
            Pass threshold: {Math.round(battle.passAccuracy * 100)}% accuracy
          </p>
          <div className="mt-6">
            <TacticalButton onClick={() => setPhase("fight")}>Start</TacticalButton>
          </div>
        </div>
      </AppPage>
    );
  }

  if (phase === "done" && outcome) {
    return (
      <AppPage title={title}>
        <div className="card p-6 text-center">
          <p className="text-xl font-bold text-primary">
            {outcome.passed ? "Chapter complete!" : "Keep practicing"}
          </p>
          <p className="mt-2 text-secondary">{outcome.feedback}</p>
          <p className="mt-2 font-semibold text-cardinal">{Math.round(outcome.accuracy * 100)}% accuracy</p>
        </div>
        <div className="mt-6">
          <TacticalButton onClick={() => router.push("/campaign")}>Back to learning path</TacticalButton>
        </div>
      </AppPage>
    );
  }

  const q = battle.questions[qIndex];
  const progress = (qIndex + 0.5) / battle.questions.length;

  return (
    <div className="flex min-h-dvh flex-col bg-surface-page">
      <LessonTopBar title={`${title} · ${qIndex + 1}/${battle.questions.length}`} progress={progress} />
      <div className="mx-auto w-full max-w-lg flex-1 px-4 py-5">
        <QuestionCard
          key={q.id}
          question={q}
          onSubmit={handleAnswer}
          onContinue={pendingContinue ? continueQuestion : undefined}
        />
      </div>
    </div>
  );
}
