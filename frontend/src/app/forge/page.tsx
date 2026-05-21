"use client";

import { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { createMentalForgeEngine, DRILL_NODE_SKILLS } from "@minerva/core";
import type { SkillTag } from "@minerva/core";
import { usePlayerStore } from "@/lib/player/player-store";
import { AppPage } from "@/components/layout/AppPage";
import { TacticalButton } from "@/components/ui/TacticalButton";
import { MathDisplay } from "@/components/ui/MathDisplay";

const DRILL_LABELS: Record<string, string> = {
  "drill-ar-speed": "Arithmetic speed",
  "forge-addition": "Addition sprint",
  "forge-multiplication": "Multiplication blitz",
  "forge-percentages": "Percent snap drill",
};

function ForgeContent() {
  const searchParams = useSearchParams();
  const nodeId = searchParams.get("node") ?? "forge-percentages";
  const skill = (DRILL_NODE_SKILLS[nodeId] ?? "percentages") as SkillTag;
  const label = DRILL_LABELS[nodeId] ?? "Quick practice";

  const engine = createMentalForgeEngine();
  const { addXp, incrementMissionProgress, completeNode } = usePlayerStore();
  const [drill, setDrill] = useState(() => engine.generateDrill(skill, 2));
  const [answer, setAnswer] = useState("");
  const [streak, setStreak] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [solved, setSolved] = useState(0);

  const check = () => {
    const val = parseFloat(answer);
    if (val === drill.answer) {
      const nextStreak = streak + 1;
      setStreak(nextStreak);
      setSolved((s) => s + 1);
      setFeedback(`Correct! Streak: ${nextStreak}`);
      addXp(10);
      incrementMissionProgress(`${new Date().toISOString().slice(0, 10)}-warmup`);
      if (solved + 1 >= 5 && nodeId.startsWith("forge-")) {
        completeNode(nodeId, null, 60);
      }
      setDrill(engine.generateDrill(skill, (Math.min(3, 1 + Math.floor(nextStreak / 3)) as 1 | 2 | 3)));
      setAnswer("");
    } else {
      setStreak(0);
      setFeedback(`Answer: ${drill.answer}. Try the next one.`);
    }
  };

  return (
    <AppPage title="Quick drills" subtitle={label}>
      <div className="card p-5 text-center">
        <p className="text-sm font-bold text-cardinal">Streak {streak}</p>
        <MathDisplay size="lg" className="mt-4">
          {drill.prompt}
        </MathDisplay>
        <input
          type="number"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && check()}
          aria-label="Your answer"
          className="mt-5 w-full rounded-xl border-2 border-black/[0.1] bg-surface-muted px-4 py-4 text-center text-2xl font-mono text-primary focus:border-cardinal focus:outline-none"
        />
        {feedback && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-3 text-sm text-secondary">
            {feedback}
          </motion.p>
        )}
        <div className="mt-4">
          <TacticalButton onClick={check}>Check</TacticalButton>
        </div>
      </div>
    </AppPage>
  );
}

export default function ForgePage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-secondary">Loading…</div>}>
      <ForgeContent />
    </Suspense>
  );
}
