"use client";

import { createFormulaArmoryEngine } from "@minerva/core";
import { AppPage } from "@/components/layout/AppPage";
import { MathDisplay } from "@/components/ui/MathDisplay";

export default function ArmoryPage() {
  const engine = createFormulaArmoryEngine();
  const cards = engine.getAllCards();

  return (
    <AppPage title="Formula reference" subtitle="Review before practice tests">
      <ul className="space-y-3">
        {cards.map((card) => (
          <li key={card.id} className="card p-4 text-left">
            <p className="font-bold text-cardinal">{card.name}</p>
            <MathDisplay className="mt-2">{card.formula}</MathDisplay>
            <p className="mt-2 text-sm text-sandstone">{card.whenToUse}</p>
          </li>
        ))}
      </ul>
    </AppPage>
  );
}
