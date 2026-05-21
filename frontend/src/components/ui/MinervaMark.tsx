"use client";

import { motion } from "framer-motion";

interface MinervaMarkProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizes = { sm: 72, md: 112, lg: 148 };

export function MinervaMark({ size = "lg", className = "" }: MinervaMarkProps) {
  const px = sizes[size];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={className}
      aria-hidden
    >
      <svg width={px} height={px} viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="80" cy="80" r="76" fill="white" fillOpacity="0.15" stroke="white" strokeOpacity="0.4" strokeWidth="2" />
        <ellipse cx="80" cy="92" rx="38" ry="34" fill="#8c1515" />
        <ellipse cx="80" cy="88" rx="32" ry="28" fill="#b1040e" />
        <ellipse cx="80" cy="98" rx="22" ry="20" fill="#e8e0d0" />
        <path d="M52 52 L58 72 L48 68 Z" fill="#6e0f0f" />
        <path d="M108 52 L102 72 L112 68 Z" fill="#6e0f0f" />
        <circle cx="66" cy="78" r="14" fill="#fff" />
        <circle cx="94" cy="78" r="14" fill="#fff" />
        <circle cx="68" cy="80" r="7" fill="#2e2d29" />
        <circle cx="96" cy="80" r="7" fill="#2e2d29" />
        <path d="M80 88 L74 96 L86 96 Z" fill="#b6a88a" />
        <rect x="58" y="108" width="44" height="28" rx="4" fill="#b6a88a" />
        <rect x="62" y="112" width="36" height="20" rx="2" fill="#fff" />
        <line x1="80" y1="112" x2="80" y2="132" stroke="#b6a88a" strokeWidth="2" />
      </svg>
    </motion.div>
  );
}
