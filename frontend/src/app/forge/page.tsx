"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { createMentalForgeEngine } from "@minerva/core";
import { usePlayerStore } from "@/lib/player/player-store";
import { AppPage } from "@/components/layout/AppPage";
import { TacticalButton } from "@/components/ui/TacticalButton";
import { MathDisplay } from "@/components/ui/MathDisplay";

export default function ForgePage() {
  const engine = createMentalForgeEngine();
  const { addXp } = usePlayerStore();
  const [drill, setDrill] = useState(() => engine.generateDrill("percentages", 2));
  const [answer, setAnswer] = useState("");
  const [streak, setStreak] = useState(0);
  const [feedback, setFeedback] = useState("");

  const check = () => {
    const val = parseFloat(answer);
    if (val === drill.answer) {
      setStreak((s) => s + 1);
      setFeedback(`Correct! Streak: ${streak + 1}`);
      addXp(10);
      setDrill(engine.generateDrill("percentages", (Math.min(3, 1 + Math.floor(streak / 3)) as 1 | 2 | 3)));
      setAnswer("");
    } else {
      setStreak(0);
      setFeedback(`Answer: ${drill.answer}. Try the next one.`);
    }
  };

  return (
    <AppPage title="Drills" subtitle="Quick mental math — build speed and confidence">
      <div className="card p-5 text-center">
        <p className="text-sm font-bold text-cardinal">🔥 Streak {streak}</p>
        <MathDisplay size="lg" className="mt-4">
          {drill.prompt}
        </MathDisplay>
        <input
          type="number"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && check()}
          className="mt-5 w-full rounded-xl border-2 border-black/[0.1] bg-surface-muted px-4 py-4 text-center text-2xl font-mono text-warm-white focus:border-cardinal focus:outline-none"
        />
        {feedback && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-3 text-sm text-sandstone">
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
