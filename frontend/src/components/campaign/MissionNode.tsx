"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { ResolvedCampaignNode } from "@minerva/core";

interface MissionNodeProps {
  node: ResolvedCampaignNode;
  href: string;
  index: number;
}

const typeStyles = {
  lesson: "border-muted-gold/30 bg-brand-soft/30",
  drill: "border-muted-gold/40 bg-gold-soft/50",
  boss: "border-cardinal/25 bg-brand-soft/40",
  review: "border-muted-gold/20 bg-surface-muted",
};

export function MissionNode({ node, href, index }: MissionNodeProps) {
  const style = typeStyles[node.type];

  if (node.locked) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 0.55, y: 0 }}
        transition={{ delay: index * 0.05 }}
        className="flex w-full flex-col items-center"
      >
        <div className="glass-panel w-full max-w-sm px-5 py-4 text-center opacity-70">
          <span className="text-2xl grayscale">{node.icon ?? "🔒"}</span>
          <p className="mt-2 font-semibold text-muted">{node.title}</p>
          <p className="text-xs text-muted">Complete the previous lesson first</p>
        </div>
      </motion.div>
    );
  }

  const inner = (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ delay: index * 0.05 }}
      className={`glass-panel w-full max-w-sm border-2 px-5 py-4 text-center transition-shadow ${style} ${
        node.current ? "ring-current animate-pulse-glow" : "shadow-card"
      } ${node.completed ? "opacity-75" : ""}`}
    >
      <span className="text-2xl">{node.completed ? "✅" : node.icon ?? "📖"}</span>
      <p className="mt-2 text-base font-bold text-primary">{node.title}</p>
      <p className="text-xs font-medium text-muted">
        {node.type} · +{node.xpReward} XP
      </p>
      {node.current && (
        <p className="mt-2 inline-block rounded-full bg-gold-soft px-3 py-0.5 text-xs font-semibold text-muted-gold">
          Up next
        </p>
      )}
    </motion.div>
  );

  return (
    <div className="flex w-full flex-col items-center">
      <Link href={href} className="w-full max-w-sm">
        {inner}
      </Link>
    </div>
  );
}
