"use client";

import { use, useState } from "react";
import { useRouter } from "next/navigation";
import { createBossBattleEngine, SEED_QUESTIONS } from "@minerva/core";
import { usePlayerStore } from "@/lib/player/player-store";
import { CenteredScreen } from "@/components/ui/CenteredScreen";
import { MissionBriefing } from "@/components/ui/MissionBriefing";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { TacticalButton } from "@/components/ui/TacticalButton";
import { QuestionCard } from "@/components/learning/QuestionCard";

export default function BossPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const { completeNode } = usePlayerStore();
  const engine = createBossBattleEngine();
  const questions = SEED_QUESTIONS.filter((q) =>
    ["percentages", "ratios", "fractions"].includes(q.skillTag)
  ).slice(0, 5);
  const battle = engine.createBattle(id, "Chapter Check", questions);

  const [phase, setPhase] = useState<"brief" | "fight" | "done">("brief");
  const [qIndex, setQIndex] = useState(0);
  const [results, setResults] = useState<{ correct: boolean; timeMs: number }[]>([]);
  const [outcome, setOutcome] = useState<{ passed: boolean; feedback: string; accuracy: number } | null>(null);

  const handleAnswer = (selected: string, _c: 1 | 2 | 3 | 4 | 5, timeMs: number) => {
    const q = battle.questions[qIndex];
    const correct = selected === q.correctAnswer;
    const next = [...results, { correct, timeMs }];
    setResults(next);
    setTimeout(() => {
      if (qIndex + 1 >= battle.questions.length) {
        const eval_ = engine.evaluateBattle(battle, next);
        setOutcome(eval_);
        setPhase("done");
        if (eval_.passed) completeNode(id, null, battle.questions.length * 50 + 150);
      } else {
        setQIndex((i) => i + 1);
      }
    }, 1200);
  };

  if (phase === "brief") {
    return (
      <CenteredScreen>
        <MissionBriefing title={battle.title} subtitle="Chapter Check" badge="Review">
          <p>{battle.questions.length} questions · {battle.timeLimitSec}s limit</p>
          <p>Pass threshold: {Math.round(battle.passAccuracy * 100)}% accuracy</p>
        </MissionBriefing>
        <TacticalButton onClick={() => setPhase("fight")}>Start Check</TacticalButton>
      </CenteredScreen>
    );
  }

  if (phase === "done" && outcome) {
    return (
      <CenteredScreen>
        <GlassPanel glow={outcome.passed} className="w-full text-center">
          <p className="text-4xl">{outcome.passed ? "🏆" : "🛡"}</p>
          <p className="mt-4 text-xl font-bold">{outcome.passed ? "Chapter Complete!" : "Not quite yet"}</p>
          <p className="mt-2 text-sandstone">{outcome.feedback}</p>
          <p className="mt-2 text-muted-gold">{Math.round(outcome.accuracy * 100)}% accuracy</p>
        </GlassPanel>
        <div className="mt-6">
          <TacticalButton onClick={() => router.push("/campaign")}>Back to Learning Path</TacticalButton>
        </div>
      </CenteredScreen>
    );
  }

  const q = battle.questions[qIndex];
  return (
    <CenteredScreen maxWidth="lg">
      <MissionBriefing title={`Question ${qIndex + 1} of ${battle.questions.length}`} badge="Chapter Check" />
      <QuestionCard key={q.id} question={q} onSubmit={handleAnswer} />
    </CenteredScreen>
  );
}
