"use client";

import { useState } from "react";
import { createWordProblemTranslatorEngine } from "@minerva/core";
import { AppPage } from "@/components/layout/AppPage";
import { TacticalButton } from "@/components/ui/TacticalButton";

export default function TranslatorPage() {
  const engine = createWordProblemTranslatorEngine();
  const [problem, setProblem] = useState(
    "A train travels 120 miles in 2 hours. How far in 5 hours?"
  );
  const [revealed, setRevealed] = useState(false);
  const translation = engine.translate(problem);

  return (
    <AppPage title="Word problem helper" subtitle="Break problems into steps">
      <p className="mb-4 text-sm text-secondary">
        Paste or edit a word problem. We highlight what you know and what you need to find.
      </p>
      <textarea
        value={problem}
        onChange={(e) => { setProblem(e.target.value); setRevealed(false); }}
        className="mb-4 w-full rounded-xl border-2 border-black/[0.1] bg-surface-card p-4 text-primary focus:border-cardinal focus:outline-none"
        rows={3}
        aria-label="Word problem"
      />
      <TacticalButton onClick={() => setRevealed(true)}>Analyze problem</TacticalButton>
      {revealed && (
        <div className="mt-4 space-y-3">
          {translation.steps.map((s, i) => (
            <div
              key={i}
              className={`card p-4 ${i === 0 ? "border-cardinal/30 bg-brand-soft" : ""}`}
            >
              <p className="text-xs font-bold uppercase tracking-wide text-cardinal">{s.label}</p>
              <p className="mt-1 text-sm text-secondary">{s.prompt}</p>
            </div>
          ))}
        </div>
      )}
    </AppPage>
  );
}
