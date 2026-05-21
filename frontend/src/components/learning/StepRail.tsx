"use client";

import { getStepLabel } from "@minerva/core";
import type { LessonStepType } from "@minerva/core";

const STEP_ORDER: LessonStepType[] = [
  "concept_introduction",
  "visual_demonstration",
  "guided_walkthrough",
  "assisted_practice",
  "independent_practice",
  "timed_combat_drill",
  "mastery_check",
];

interface StepRailProps {
  currentType: LessonStepType;
}

export function StepRail({ currentType }: StepRailProps) {
  const currentIndex = STEP_ORDER.indexOf(currentType);

  return (
    <div className="mb-6 w-full max-w-sm">
      <div className="flex justify-between gap-1">
        {STEP_ORDER.map((step, i) => {
          const done = i < currentIndex;
          const active = i === currentIndex;
          return (
            <div key={step} className="flex flex-1 flex-col items-center gap-1">
              <div
                className={`h-2 w-full rounded-full transition-all ${
                  done
                    ? "bg-muted-gold"
                    : active
                      ? "bg-cardinal"
                      : "bg-surface-muted"
                }`}
              />
              {active && (
                <span className="text-[9px] font-semibold text-muted-gold">
                  {getStepLabel(step).split(" ")[0]}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
