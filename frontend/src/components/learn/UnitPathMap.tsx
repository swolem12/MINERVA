"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { ResolvedCampaignNode } from "@minerva/core";

interface UnitPathMapProps {
  nodes: ResolvedCampaignNode[];
  nodeHref: (node: ResolvedCampaignNode) => string;
}

const TYPE_META = {
  lesson: { bg: "bg-cardinal", ring: "ring-cardinal/30", icon: "📖", label: "Lesson" },
  drill: { bg: "bg-amber-500", ring: "ring-amber-400/40", icon: "⚡", label: "Drill" },
  boss: { bg: "bg-violet-600", ring: "ring-violet-400/40", icon: "⭐", label: "Test" },
  review: { bg: "bg-teal-600", ring: "ring-teal-400/40", icon: "↻", label: "Review" },
};

function offsetClass(index: number): string {
  const pattern = ["self-center", "self-start ml-8", "self-center", "self-end mr-8"];
  return pattern[index % pattern.length];
}

export function UnitPathMap({ nodes, nodeHref }: UnitPathMapProps) {
  return (
    <div className="flex flex-col gap-0 py-2">
      {nodes.map((node, i) => {
        const meta = TYPE_META[node.type];
        const prevDone = i === 0 || nodes[i - 1].completed;
        const lineDone = prevDone && (i === 0 || nodes[i - 1].completed);

        return (
          <div key={node.id} className={`flex flex-col ${offsetClass(i)}`}>
            {i > 0 && (
              <div
                className={`mx-auto mb-1 h-10 w-1 rounded-full ${lineDone ? "path-line-done path-line" : "path-line"}`}
                aria-hidden
              />
            )}

            {node.locked ? (
              <div className="flex flex-col items-center gap-1.5 opacity-45">
                <div className="flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-full border-4 border-surface-muted bg-surface-muted text-2xl grayscale">
                  🔒
                </div>
                <p className="max-w-[8rem] text-center text-xs font-medium text-slate">{node.title}</p>
              </div>
            ) : (
              <Link href={nodeHref(node)} className="group flex flex-col items-center gap-1.5">
                <motion.div
                  whileTap={{ scale: 0.92 }}
                  className={`relative flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-full border-4 border-white text-2xl shadow-node ${meta.bg} ${
                    node.current ? `ring-4 ${meta.ring} animate-bounce-subtle scale-110` : ""
                  } ${node.completed ? "opacity-90" : ""}`}
                  style={{ boxShadow: "0 3px 0 rgba(0,0,0,0.2)" }}
                >
                  {node.completed ? (
                    <span className="text-xl text-white">✓</span>
                  ) : (
                    <span>{meta.icon}</span>
                  )}
                  {node.current && (
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-cardinal px-2 py-0.5 text-[10px] font-bold uppercase text-white">
                      Start
                    </span>
                  )}
                </motion.div>
                <p className="max-w-[9rem] text-center text-xs font-semibold text-warm-white group-hover:text-cardinal">
                  {node.title}
                </p>
                <p className="text-[10px] text-slate">{meta.label} · +{node.xpReward} XP</p>
              </Link>
            )}
          </div>
        );
      })}
    </div>
  );
}
