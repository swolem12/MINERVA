"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { ResolvedCampaignNode } from "@minerva/core";
import { PathNodeIcon, nodeTypeLabel } from "@/components/learn/PathNodeIcon";

interface UnitPathMapProps {
  nodes: ResolvedCampaignNode[];
  nodeHref: (node: ResolvedCampaignNode) => string;
}

const TYPE_STYLE = {
  lesson: { bg: "bg-cardinal", ring: "ring-cardinal/30" },
  drill: { bg: "bg-cool-gray", ring: "ring-cool-gray/30" },
  boss: { bg: "bg-muted-gold", ring: "ring-muted-gold/40" },
  review: { bg: "bg-cardinal-bright", ring: "ring-cardinal/20" },
};

function offsetClass(index: number): string {
  const pattern = ["self-center", "self-start ml-8", "self-center", "self-end mr-8"];
  return pattern[index % pattern.length];
}

export function UnitPathMap({ nodes, nodeHref }: UnitPathMapProps) {
  return (
    <div className="flex flex-col gap-0 py-2">
      {nodes.map((node, i) => {
        const meta = TYPE_STYLE[node.type];
        const prevDone = i === 0 || nodes[i - 1].completed;
        const lineDone = prevDone && (i === 0 || nodes[i - 1].completed);
        const label = nodeTypeLabel(node.type);

        return (
          <div key={node.id} className={`flex flex-col ${offsetClass(i)}`}>
            {i > 0 && (
              <div
                className={`mx-auto mb-1 h-10 w-1 rounded-full ${lineDone ? "path-line-done path-line" : "path-line"}`}
                aria-hidden
              />
            )}

            {node.locked ? (
              <div className="flex flex-col items-center gap-1.5 opacity-45" aria-label={`${node.title} locked`}>
                <div className="flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-full border-4 border-surface-muted bg-surface-muted text-muted">
                  <PathNodeIcon type={node.type} locked />
                </div>
                <p className="max-w-[8rem] text-center text-xs font-medium text-muted">{node.title}</p>
              </div>
            ) : (
              <Link
                href={nodeHref(node)}
                className="group flex flex-col items-center gap-1.5"
                aria-label={`${label}: ${node.title}`}
              >
                <motion.div
                  whileTap={{ scale: 0.92 }}
                  className={`relative flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-full border-4 border-white text-white shadow-node ${meta.bg} ${
                    node.current ? `ring-4 ${meta.ring} animate-bounce-subtle scale-110` : ""
                  } ${node.completed ? "opacity-90" : ""}`}
                  style={{ boxShadow: "0 3px 0 rgba(0,0,0,0.2)" }}
                >
                  <PathNodeIcon type={node.type} completed={node.completed} />
                  {node.current && (
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-cardinal px-2 py-0.5 text-[10px] font-bold uppercase text-white">
                      Start
                    </span>
                  )}
                </motion.div>
                <p className="max-w-[9rem] text-center text-xs font-semibold text-primary group-hover:text-cardinal">
                  {node.title}
                </p>
                <p className="text-[10px] text-muted">{label} · +{node.xpReward} XP</p>
              </Link>
            )}
          </div>
        );
      })}
    </div>
  );
}
