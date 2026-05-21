"use client";

import { useMemo, useState } from "react";
import { createFormulaArmoryEngine } from "@minerva/core";
import { AppPage } from "@/components/layout/AppPage";
import { MathDisplay } from "@/components/ui/MathDisplay";

export default function ArmoryPage() {
  const engine = createFormulaArmoryEngine();
  const cards = engine.getAllCards();
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return cards;
    return cards.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.formula.toLowerCase().includes(q) ||
        c.whenToUse.toLowerCase().includes(q) ||
        c.category.includes(q)
    );
  }, [cards, query]);

  return (
    <AppPage title="Formula reference" subtitle={`${cards.length} cards · search by topic`}>
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search formulas…"
        aria-label="Search formulas"
        className="mb-4 w-full rounded-xl border-2 border-black/[0.1] bg-surface-card px-4 py-3 text-primary focus:border-cardinal focus:outline-none"
      />
      <ul className="space-y-3">
        {filtered.map((card) => (
          <li key={card.id} className="card p-4 text-left">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted">{card.category}</p>
            <p className="font-bold text-cardinal">{card.name}</p>
            <MathDisplay className="mt-2">{card.formula}</MathDisplay>
            <p className="mt-2 text-sm text-secondary">{card.whenToUse}</p>
            <p className="mt-1 text-xs text-muted">{card.example}</p>
          </li>
        ))}
      </ul>
      {filtered.length === 0 && (
        <p className="text-center text-sm text-muted">No formulas match your search.</p>
      )}
    </AppPage>
  );
}
