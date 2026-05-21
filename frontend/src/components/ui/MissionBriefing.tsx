"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

interface MissionBriefingProps {
  title: string;
  subtitle?: string;
  children?: ReactNode;
  badge?: string;
}

export function MissionBriefing({ title, subtitle, children, badge = "Overview" }: MissionBriefingProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-panel mb-6 w-full p-5 text-center shadow-card"
    >
      <p className="mb-1.5 text-xs font-semibold text-muted-gold">{badge}</p>
      <h1 className="text-xl font-bold text-warm-white md:text-2xl">{title}</h1>
      {subtitle && <p className="mt-1.5 text-sm text-sandstone">{subtitle}</p>}
      {children && (
        <div className="mt-3 text-sm leading-relaxed text-sandstone">{children}</div>
      )}
    </motion.section>
  );
}
