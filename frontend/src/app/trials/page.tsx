"use client";

import { createOfficerTrialEngine, SEED_QUESTIONS } from "@minerva/core";
import { CenteredScreen } from "@/components/ui/CenteredScreen";
import { MissionBriefing } from "@/components/ui/MissionBriefing";

export default function TrialsPage() {
  const engine = createOfficerTrialEngine();
  const arQuestions = SEED_QUESTIONS.filter((q) => q.section === "arithmetic_reasoning").slice(0, 6);
  const trial = engine.createTrial("arithmetic_reasoning", arQuestions);

  return (
    <CenteredScreen>
      <MissionBriefing title="Practice Tests" subtitle="Timed mixed review">
        <p>{trial.title}</p>
        <p className="text-sm text-sandstone">
          {trial.questionCount} questions · {Math.round(trial.timeLimitSec / 60)} min limit
        </p>
        <p className="mt-4 text-xs text-muted-gold">Complete each chapter to unlock practice tests.</p>
      </MissionBriefing>
    </CenteredScreen>
  );
}
