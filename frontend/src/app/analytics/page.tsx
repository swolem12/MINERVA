"use client";

import { createAnalyticsEngine } from "@minerva/core";
import { usePlayerStore } from "@/lib/player/player-store";
import { AppPage } from "@/components/layout/AppPage";

export default function AnalyticsPage() {
  const { profile, completedNodes } = usePlayerStore();
  const engine = createAnalyticsEngine();
  const snapshot = engine.computeSnapshot([], {
    sessionsCompleted: completedNodes.length,
    totalXp: profile.xp,
    streak: profile.streak,
  });

  return (
    <AppPage title="Your progress">
      <div className="grid grid-cols-2 gap-3">
        <div className="card p-4 text-center">
          <p className="text-2xl font-bold text-cardinal">{snapshot.totalXp}</p>
          <p className="text-xs text-slate">Total XP</p>
        </div>
        <div className="card p-4 text-center">
          <p className="text-2xl font-bold text-cardinal">{snapshot.streak}</p>
          <p className="text-xs text-slate">Day streak</p>
        </div>
        <div className="card col-span-2 p-4 text-center">
          <p className="text-2xl font-bold text-warm-white">{completedNodes.length}</p>
          <p className="text-xs text-slate">Activities completed</p>
        </div>
      </div>
    </AppPage>
  );
}
