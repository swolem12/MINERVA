"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { ResolvedCampaignNode } from "@minerva/core";
import type { ReviewAssignment } from "@minerva/core";

interface ContinueLearningCardProps {
  displayName: string;
  node: ResolvedCampaignNode | undefined;
  href: string;
  unitTitle: string;
  unitProgress: number;
  dueReview?: ReviewAssignment;
  reviewHref?: string;
  estimateMin?: number;
}

export function ContinueLearningCard({
  displayName,
  node,
  href,
  unitTitle,
  unitProgress,
  dueReview,
  reviewHref,
  estimateMin = 8,
}: ContinueLearningCardProps) {
  if (dueReview && reviewHref) {
    return (
      <Link href={reviewHref} className="block">
        <div className="overflow-hidden rounded-2xl border-2 border-muted-gold bg-gold-soft shadow-sm transition-transform active:scale-[0.99]">
          <div className="px-5 py-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-secondary">
              Review due
            </p>
            <p className="mt-1 text-xl font-bold text-primary">
              {dueReview.skillTag.replace(/_/g, " ")}
            </p>
            <p className="mt-0.5 text-sm text-secondary">
              Spaced review helps this stick · ~5 min
            </p>
          </div>
          <div className="flex items-center justify-between bg-black/5 px-5 py-3">
            <span className="text-sm font-bold text-cardinal">Start review</span>
            <span className="text-cardinal">→</span>
          </div>
        </div>
      </Link>
    );
  }

  if (!node) {
    return (
      <div className="card overflow-hidden p-5">
        <p className="text-sm font-medium text-secondary">All caught up!</p>
        <p className="mt-1 text-lg font-bold text-primary">Great work, {displayName}</p>
      </div>
    );
  }

  const typeLabel =
    node.type === "lesson"
      ? "Lesson"
      : node.type === "boss"
        ? "Chapter check"
        : node.type === "drill"
          ? "Quick practice"
          : "Review";

  return (
    <Link href={href} className="block">
      <div className="overflow-hidden rounded-2xl bg-cardinal shadow-md transition-transform active:scale-[0.99]">
        <div className="px-5 py-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-white/80">
            Continue learning
          </p>
          <p className="mt-1 text-xl font-bold text-white">{node.title}</p>
          <p className="mt-0.5 text-sm text-white/75">
            {unitTitle} · {typeLabel} · {Math.round(unitProgress * 100)}% complete · ~{estimateMin} min
          </p>
        </div>
        <div className="flex items-center justify-between bg-black/10 px-5 py-3">
          <span className="text-sm font-bold text-white">Continue</span>
          <motion.span
            animate={{ x: [0, 4, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white"
          >
            →
          </motion.span>
        </div>
      </div>
    </Link>
  );
}
