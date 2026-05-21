"use client";

import { useState } from "react";
import { createWordProblemTranslatorEngine } from "@minerva/core";
import { CenteredScreen } from "@/components/ui/CenteredScreen";
import { MissionBriefing } from "@/components/ui/MissionBriefing";
import { TacticalButton } from "@/components/ui/TacticalButton";

export default function TranslatorPage() {
  const engine = createWordProblemTranslatorEngine();
  const [problem, setProblem] = useState(
    "A train travels 120 miles in 2 hours. How far in 5 hours?"
  );
  const translation = engine.translate(problem);

  return (
    <CenteredScreen maxWidth="lg">
      <MissionBriefing title="Word Problem Translator" subtitle="Turn sentences into equations" />
      <textarea
        value={problem}
        onChange={(e) => setProblem(e.target.value)}
        className="mb-4 w-full rounded-lg border border-slate/40 bg-slate/10 p-4 text-center text-warm-white"
        rows={3}
      />
      {translation.steps.map((s, i) => (
        <div key={i} className="mb-3 w-full rounded-lg bg-slate/20 p-3 text-center">
          <p className="font-semibold text-muted-gold">{s.label}</p>
          <p className="text-sm text-sandstone">{s.prompt}</p>
        </div>
      ))}
      <TacticalButton variant="secondary">Build Equation</TacticalButton>
    </CenteredScreen>
  );
}
