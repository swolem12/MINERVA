"use client";

import { createAnalyticsEngine } from "@minerva/core";
import { usePlayerStore } from "@/lib/player/player-store";
import { AppPage } from "@/components/layout/AppPage";

export default function AnalyticsPage() {
  const { profile, completedNodes, completedLessons, skillMastery } = usePlayerStore();
  const engine = createAnalyticsEngine();
  const snapshot = engine.computeSnapshot([], {
    sessionsCompleted: completedNodes.length,
    totalXp: profile.xp,
    streak: profile.streak,
  });

  const skills = Object.entries(skillMastery)
    .filter(([, v]) => (v ?? 0) > 0)
    .sort(([, a], [, b]) => (b ?? 0) - (a ?? 0));

  return (
    <AppPage title="Your progress">
      <div className="grid grid-cols-2 gap-3">
        <div className="card p-4 text-center">
          <p className="text-2xl font-bold text-cardinal">{snapshot.totalXp}</p>
          <p className="text-xs text-muted">Total XP</p>
        </div>
        <div className="card p-4 text-center">
          <p className="text-2xl font-bold text-cardinal">{snapshot.streak}</p>
          <p className="text-xs text-muted">Day streak</p>
        </div>
        <div className="card p-4 text-center">
          <p className="text-2xl font-bold text-primary">{completedLessons.length}</p>
          <p className="text-xs text-muted">Lessons done</p>
        </div>
        <div className="card p-4 text-center">
          <p className="text-2xl font-bold text-primary">{completedNodes.length}</p>
          <p className="text-xs text-muted">Activities done</p>
        </div>
      </div>

      {skills.length > 0 && (
        <section className="mt-6">
          <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-muted">Skills practiced</h2>
          <ul className="space-y-2">
            {skills.map(([skill, level]) => (
              <li key={skill} className="card px-4 py-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-semibold text-primary capitalize">{skill.replace(/_/g, " ")}</span>
                  <span className="text-muted">{Math.round((level ?? 0) * 100)}%</span>
                </div>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-surface-muted">
                  <div className="h-full rounded-full bg-cardinal" style={{ width: `${Math.round((level ?? 0) * 100)}%` }} />
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}
    </AppPage>
  );
}
