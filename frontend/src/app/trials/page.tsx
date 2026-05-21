"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { createOfficerTrialEngine, SEED_QUESTIONS, getQuestionsForBossNode } from "@minerva/core";
import { usePlayerStore } from "@/lib/player/player-store";
import { AppPage } from "@/components/layout/AppPage";
import { TacticalButton } from "@/components/ui/TacticalButton";

export default function TrialsPage() {
  const router = useRouter();
  const { completeNode } = usePlayerStore();
  const engine = useMemo(() => createOfficerTrialEngine(), []);

  const arQuestions = useMemo(() => getQuestionsForBossNode("trial-ar", 8), []);
  const mkQuestions = useMemo(
    () => SEED_QUESTIONS.filter((q) => q.section === "math_knowledge" && !q.id.startsWith("diag-")).slice(0, 8),
    []
  );

  const [activeTrial, setActiveTrial] = useState<"ar" | "mk" | null>(null);

  if (activeTrial) {
    const questions = activeTrial === "ar" ? arQuestions : mkQuestions;
    const trial = engine.createTrial(
      activeTrial === "ar" ? "arithmetic_reasoning" : "math_knowledge",
      questions
    );
    return (
      <AppPage title={trial.title} subtitle="Timed mixed review">
        <div className="card p-5">
          <p className="text-secondary">{trial.questionCount} questions</p>
          <p className="mt-1 text-sm text-muted">About {Math.round(trial.timeLimitSec / 60)} minutes suggested</p>
          <TacticalButton className="mt-4" onClick={() => router.push(`/boss/trial-${activeTrial}`)}>
            Start {activeTrial === "ar" ? "arithmetic" : "algebra & geometry"} review
          </TacticalButton>
        </div>
        <TacticalButton variant="ghost" className="mt-4" onClick={() => setActiveTrial(null)}>
          Back
        </TacticalButton>
      </AppPage>
    );
  }

  return (
    <AppPage title="Confidence checks" subtitle="Optional timed mixed review">
      <p className="mb-4 text-sm text-secondary">
        See how far you&apos;ve come with a timed set. No pressure — you can retry anytime.
      </p>
      <ul className="space-y-3">
        <li className="card p-4">
          <p className="font-bold text-primary">Mixed arithmetic review</p>
          <p className="mt-1 text-sm text-secondary">Percentages, ratios, fractions, word problems</p>
          <TacticalButton className="mt-3" onClick={() => setActiveTrial("ar")}>
            Preview
          </TacticalButton>
        </li>
        <li className="card p-4">
          <p className="font-bold text-primary">Mixed algebra & geometry review</p>
          <p className="mt-1 text-sm text-secondary">Equations, expressions, area, triangles</p>
          <TacticalButton className="mt-3" onClick={() => setActiveTrial("mk")}>
            Preview
          </TacticalButton>
        </li>
      </ul>
    </AppPage>
  );
}
