"use client";

import Link from "next/link";
import { createDailyMissionEngine } from "@minerva/core";
import { usePlayerStore } from "@/lib/player/player-store";
import { AppPage } from "@/components/layout/AppPage";
import { TacticalButton } from "@/components/ui/TacticalButton";

export default function MissionsPage() {
  const { profile, missionProgress, completedMissions } = usePlayerStore();
  const engine = createDailyMissionEngine();
  const today = new Date().toLocaleDateString(undefined, { weekday: "long", month: "short", day: "numeric" });
  const missions = engine.generateDailyMissions(
    new Date().toISOString().slice(0, 10),
    profile.weaknessMap ?? {}
  );

  return (
    <AppPage title="Practice" subtitle={today}>
      <p className="mb-4 text-sm text-secondary">
        Daily exercises based on skills you&apos;re building. Tap to start.
      </p>
      <ul className="space-y-3">
        {missions.map((m, i) => {
          const done = completedMissions.includes(m.id) || (missionProgress[m.id] ?? 0) >= m.targetCount;
          return (
            <li key={m.id} className="card p-4">
              <div className="flex items-start gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-soft text-sm font-bold text-cardinal">
                  {done ? "✓" : i + 1}
                </span>
                <div className="flex-1">
                  <p className="font-bold text-primary">{m.title}</p>
                  <p className="mt-1 text-sm text-secondary">{m.description}</p>
                  <p className="mt-2 text-xs font-semibold text-cardinal">+{m.xpReward} XP</p>
                  <Link href={m.href} className="mt-3 inline-block">
                    <TacticalButton variant={done ? "secondary" : "primary"}>
                      {done ? "Done" : "Start"}
                    </TacticalButton>
                  </Link>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </AppPage>
  );
}
