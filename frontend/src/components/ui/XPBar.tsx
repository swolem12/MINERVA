"use client";

import { motion } from "framer-motion";

interface XPBarProps {
  xp: number;
  xpNeeded: number;
  rank: string;
}

export function XPBar({ xp, xpNeeded, rank }: XPBarProps) {
  const total = xp + xpNeeded;
  const pct = total > 0 ? Math.min(xp / total, 1) : 0;

  return (
    <div className="w-full">
      <div className="mb-1 flex justify-between text-xs font-semibold">
        <span className="text-cardinal">{rank}</span>
        <span className="text-muted">{xp} XP</span>
      </div>
      <div
        className="h-2 overflow-hidden rounded-full bg-surface-muted"
        role="progressbar"
        aria-valuenow={Math.round(pct * 100)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${rank} progress`}
      >
        <motion.div
          className="h-full rounded-full bg-cardinal"
          initial={{ width: 0 }}
          animate={{ width: `${pct * 100}%` }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

