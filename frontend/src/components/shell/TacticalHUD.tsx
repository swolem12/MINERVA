"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { calculateRank, xpToNextRank } from "@minerva/core";
import { usePlayerStore } from "@/lib/player/player-store";

const NAV = [
  { href: "/campaign", label: "Learn", icon: LearnIcon },
  { href: "/missions", label: "Practice", icon: PracticeIcon },
  { href: "/forge", label: "Quick drills", icon: DrillIcon },
  { href: "/profile", label: "You", icon: YouIcon },
] as const;

function LearnIcon({ active }: { active: boolean }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden className={active ? "text-cardinal" : "text-muted"}>
      <path d="M4 19V5l8 4 8-4v14" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M12 9v10" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function PracticeIcon({ active }: { active: boolean }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden className={active ? "text-cardinal" : "text-muted"}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
      <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function DrillIcon({ active }: { active: boolean }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden className={active ? "text-cardinal" : "text-muted"}>
      <path d="M13 2L4 14h7l-1 8 10-14h-7l0-6z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}

function YouIcon({ active }: { active: boolean }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden className={active ? "text-cardinal" : "text-muted"}>
      <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2" />
      <path d="M5 20c0-4 3-6 7-6s7 2 7 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function TacticalHUD() {
  const pathname = usePathname();
  const enlisted = usePlayerStore((s) => s.enlisted);

  if (!enlisted) return null;

  const hideNav =
    pathname.startsWith("/lesson") ||
    pathname.startsWith("/boss") ||
    pathname.startsWith("/onboarding") ||
    pathname.startsWith("/practice");

  if (hideNav) return null;

  return (
    <nav
      className="safe-area-bottom fixed bottom-0 left-0 right-0 z-50 border-t border-black/[0.08] bg-surface-card"
      aria-label="Main"
      style={{ height: "var(--nav-height)" }}
    >
      <div className="mx-auto flex h-full max-w-lg items-stretch justify-around px-2">
        {NAV.map((item) => {
          const active = pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-1 flex-col items-center justify-center gap-0.5 border-t-2 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-cardinal ${
                active ? "border-cardinal text-cardinal" : "border-transparent text-muted"
              }`}
            >
              <Icon active={active} />
              <span className="text-[11px] font-bold">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

export function LessonTopBar({ title, progress, estimateMin }: { title: string; progress: number; estimateMin?: number }) {
  const pct = Math.min(progress * 100, 100);
  return (
    <header className="sticky top-0 z-40 border-b border-black/[0.06] bg-surface-card">
      <div className="mx-auto max-w-lg px-4 py-3">
        <div className="mb-2 flex items-center gap-3">
          <Link href="/campaign" className="text-sm font-semibold text-cardinal focus-visible:outline focus-visible:outline-2 focus-visible:outline-cardinal" aria-label="Back to Learn">
            ← Exit
          </Link>
          <p className="flex-1 truncate text-sm font-semibold text-primary">{title}</p>
          {estimateMin && <span className="text-xs text-muted">~{estimateMin} min</span>}
        </div>
        <div
          className="h-2.5 overflow-hidden rounded-full bg-surface-muted"
          role="progressbar"
          aria-valuenow={Math.round(pct)}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Lesson progress"
        >
          <div
            className="h-full rounded-full bg-cardinal transition-all duration-500"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>
    </header>
  );
}

export function usePlayerHeader() {
  const { profile } = usePlayerStore();
  const rank = calculateRank(profile.xp);
  const { xpNeeded } = xpToNextRank(profile.xp);
  return { profile, rank, xpNeeded };
}
