"use client";

import { useState, useMemo } from "react";
import {
  resolveCampaignProgress,
  xpToNextRank,
  calculateRank,
} from "@minerva/core";
import type { ResolvedCampaignNode } from "@minerva/core";
import { usePlayerStore } from "@/lib/player/player-store";
import { AppPage } from "@/components/layout/AppPage";
import { ContinueLearningCard } from "@/components/learn/ContinueLearningCard";
import { UnitPathMap } from "@/components/learn/UnitPathMap";
import { XPBar } from "@/components/ui/XPBar";

function nodeHref(node: { type: string; lessonId?: string; id: string }): string {
  if (node.type === "lesson" && node.lessonId) return `/lesson/${node.lessonId}?node=${node.id}`;
  if (node.type === "boss") return `/boss/${node.id}`;
  if (node.type === "drill") return `/forge?node=${node.id}`;
  return "/campaign";
}

export function CampaignMapView() {
  const { profile, completedNodes } = usePlayerStore();
  const [activeRegionIndex, setActiveRegionIndex] = useState(0);

  const regions = resolveCampaignProgress(completedNodes, profile.startingRegion);
  const unlocked = regions.filter((r) => !r.locked);
  const region = unlocked[activeRegionIndex] ?? unlocked[0];
  const rank = calculateRank(profile.xp);
  const { xpNeeded } = xpToNextRank(profile.xp);

  const currentNode = useMemo(
    () => region?.nodes.find((n) => n.current && !n.locked),
    [region]
  );

  if (!region) {
    return (
      <AppPage title="Learn">
        <p className="text-sandstone">No units available yet.</p>
      </AppPage>
    );
  }

  return (
    <AppPage noPadding className="pb-4">
      {/* Khan-style greeting header */}
      <div className="border-b border-black/[0.06] bg-charcoal-panel px-4 py-4">
        <div className="mx-auto max-w-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-sandstone">Welcome back</p>
              <h1 className="text-xl font-bold text-warm-white">{profile.displayName}</h1>
            </div>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-brand-soft px-3 py-1 text-sm font-bold text-cardinal">
                🔥 {profile.streak}
              </span>
            </div>
          </div>
          <div className="mt-3">
            <XPBar xp={profile.xp} xpNeeded={xpNeeded} rank={rank} />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-lg space-y-6 px-4 pt-5">
        <ContinueLearningCard
          displayName={profile.displayName}
          node={currentNode}
          href={currentNode ? nodeHref(currentNode) : "/campaign"}
          unitTitle={region.title}
          unitProgress={region.progress}
        />

        {/* Duolingo-style unit selector */}
        <section>
          <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-slate">Units</h2>
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
            {unlocked.map((r, i) => (
              <button
                key={r.id}
                type="button"
                onClick={() => setActiveRegionIndex(i)}
                className={`shrink-0 rounded-xl px-4 py-2.5 text-left transition-all ${
                  i === activeRegionIndex
                    ? "bg-cardinal text-white shadow-sm"
                    : "card text-warm-white hover:border-cardinal/30"
                }`}
              >
                <p className="text-xs font-medium opacity-80">Unit {i + 1}</p>
                <p className="text-sm font-bold">{r.title}</p>
                <p className="mt-0.5 text-[10px] opacity-75">
                  {Math.round(r.progress * 100)}% · {r.nodes.filter((n) => n.completed).length}/{r.nodes.length}
                </p>
              </button>
            ))}
            {regions.filter((r) => r.locked).map((r) => (
              <div
                key={r.id}
                className="card shrink-0 cursor-not-allowed px-4 py-2.5 opacity-50"
              >
                <p className="text-xs text-slate">🔒 Locked</p>
                <p className="text-sm font-bold text-slate">{r.title}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Unit detail + path */}
        <section className="card p-4">
          <h2 className="text-lg font-bold text-warm-white">{region.title}</h2>
          <p className="mt-0.5 text-sm text-sandstone">{region.tagline}</p>
          <p className="mt-2 text-sm leading-relaxed text-slate">{region.description}</p>

          <div className="mt-6 border-t border-black/[0.06] pt-4">
            <UnitPathMap
              nodes={region.nodes}
              nodeHref={(node: ResolvedCampaignNode) => nodeHref(node)}
            />
          </div>
        </section>
      </div>
    </AppPage>
  );
}
