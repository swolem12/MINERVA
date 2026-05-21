"use client";

import Link from "next/link";
import { calculateRank, xpToNextRank } from "@minerva/core";
import { usePlayerStore } from "@/lib/player/player-store";
import { AppPage } from "@/components/layout/AppPage";
import { TacticalButton } from "@/components/ui/TacticalButton";

const LINKS = [
  { href: "/armory", label: "Formula reference", desc: "Quick recall cards" },
  { href: "/analytics", label: "Your progress", desc: "XP and stats" },
  { href: "/trials", label: "Practice tests", desc: "Timed review sets" },
];

export default function ProfilePage() {
  const { profile, completedLessons, completedNodes, resetProgress } = usePlayerStore();
  const rank = calculateRank(profile.xp);
  const { nextRank, xpNeeded } = xpToNextRank(profile.xp);

  return (
    <AppPage title="You">
      <div className="card p-5 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-soft text-2xl font-bold text-cardinal">
          {profile.displayName.charAt(0).toUpperCase()}
        </div>
        <h2 className="mt-3 text-xl font-bold text-warm-white">{profile.displayName}</h2>
        <p className="text-sm font-semibold text-cardinal">{rank}</p>
        <p className="mt-2 text-sm text-sandstone">
          {profile.xp} XP · 🔥 {profile.streak} day streak
        </p>
        {nextRank && (
          <p className="mt-1 text-xs text-slate">{xpNeeded} XP to {nextRank}</p>
        )}
      </div>

      <div className="card mt-4 p-4">
        <p className="text-sm font-semibold text-warm-white">Your progress</p>
        <p className="mt-1 text-sm text-sandstone">
          Saved on this device. Free to use — no account required.
        </p>
      </div>

      <div className="card mt-4 px-4 py-3 text-sm text-sandstone">
        <span className="font-semibold text-warm-white">{completedLessons.length}</span> lessons ·{" "}
        <span className="font-semibold text-warm-white">{completedNodes.length}</span> activities
      </div>
      <ul className="mt-4 space-y-2">
        {LINKS.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="card flex items-center justify-between px-4 py-3 transition-colors hover:border-cardinal/30"
            >
              <div>
                <p className="font-semibold text-warm-white">{link.label}</p>
                <p className="text-xs text-slate">{link.desc}</p>
              </div>
              <span className="text-slate">→</span>
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-8">
        <TacticalButton variant="secondary" onClick={() => { resetProgress(); window.location.href = "/"; }}>
          Reset progress
        </TacticalButton>
      </div>
    </AppPage>
  );
}
