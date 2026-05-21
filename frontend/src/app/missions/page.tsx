"use client";

import { createDailyMissionEngine } from "@minerva/core";
import { usePlayerStore } from "@/lib/player/player-store";
import { AppPage } from "@/components/layout/AppPage";
import Link from "next/link";

export default function MissionsPage() {
  const { profile } = usePlayerStore();
  const engine = createDailyMissionEngine();
  const today = new Date().toLocaleDateString(undefined, { weekday: "long", month: "short", day: "numeric" });
  const missions = engine.generateDailyMissions(
    new Date().toISOString().slice(0, 10),
    profile.weaknessMap ?? {}
  );

  return (
    <AppPage title="Practice" subtitle={today}>
      <p className="mb-4 text-sm text-sandstone">
        Daily exercises based on skills you&apos;re building. Complete them for bonus XP.
      </p>
      <ul className="space-y-3">
        {missions.map((m, i) => (
          <li key={m.id} className="card p-4">
            <div className="flex items-start gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-soft text-sm font-bold text-cardinal">
                {i + 1}
              </span>
              <div className="flex-1">
                <p className="font-bold text-warm-white">{m.title}</p>
                <p className="mt-1 text-sm text-sandstone">{m.description}</p>
                <p className="mt-2 text-xs font-semibold text-cardinal">+{m.xpReward} XP</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <p className="mt-6 text-center text-sm text-slate">
        Want speed work? Try{" "}
        <Link href="/forge" className="font-semibold text-cardinal">
          Drills
        </Link>
      </p>
    </AppPage>
  );
}
