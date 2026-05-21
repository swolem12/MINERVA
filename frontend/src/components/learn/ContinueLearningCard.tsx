"use client";

import Link from "next/link";
import type { ResolvedCampaignNode } from "@minerva/core";

interface ContinueLearningCardProps {
  displayName: string;
  node: ResolvedCampaignNode | undefined;
  href: string;
  unitTitle: string;
  unitProgress: number;
}

export function ContinueLearningCard({
  displayName,
  node,
  href,
  unitTitle,
  unitProgress,
}: ContinueLearningCardProps) {
  if (!node) {
    return (
      <div className="card overflow-hidden p-5">
        <p className="text-sm font-medium text-sandstone">All caught up!</p>
        <p className="mt-1 text-lg font-bold text-warm-white">Great work, {displayName}</p>
      </div>
    );
  }

  const typeLabel =
    node.type === "lesson" ? "Lesson" : node.type === "boss" ? "Unit test" : node.type === "drill" ? "Drill" : "Review";

  return (
    <Link href={href} className="block">
      <div className="overflow-hidden rounded-2xl bg-cardinal shadow-md transition-transform active:scale-[0.99]">
        <div className="px-5 py-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-white/80">
            Continue learning
          </p>
          <p className="mt-1 text-xl font-bold text-white">{node.title}</p>
          <p className="mt-0.5 text-sm text-white/75">
            {unitTitle} · {typeLabel} · {Math.round(unitProgress * 100)}% complete
          </p>
        </div>
        <div className="flex items-center justify-between bg-black/10 px-5 py-3">
          <span className="text-sm font-bold text-white">Continue</span>
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white">
            →
          </span>
        </div>
      </div>
    </Link>
  );
}
