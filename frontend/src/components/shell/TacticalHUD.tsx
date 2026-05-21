"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { calculateRank, xpToNextRank } from "@minerva/core";
import { usePlayerStore } from "@/lib/player/player-store";

const NAV = [
  { href: "/campaign", label: "Learn", icon: LearnIcon },
  { href: "/missions", label: "Practice", icon: PracticeIcon },
  { href: "/forge", label: "Drills", icon: DrillIcon },
  { href: "/profile", label: "You", icon: YouIcon },
] as const;

const ACTIVE = "#8c1515";
const INACTIVE = "#8a8b8c";

function LearnIcon({ active }: { active: boolean }) {
  const c = active ? ACTIVE : INACTIVE;
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M4 19V5l8 4 8-4v14" stroke={c} strokeWidth="2" strokeLinejoin="round" />
      <path d="M12 9v10" stroke={c} strokeWidth="2" />
    </svg>
  );
}

function PracticeIcon({ active }: { active: boolean }) {
  const c = active ? ACTIVE : INACTIVE;
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="9" stroke={c} strokeWidth="2" />
      <path d="M12 7v5l3 2" stroke={c} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function DrillIcon({ active }: { active: boolean }) {
  const c = active ? ACTIVE : INACTIVE;
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M13 2L4 14h7l-1 8 10-14h-7l0-6z" stroke={c} strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}

function YouIcon({ active }: { active: boolean }) {
  const c = active ? ACTIVE : INACTIVE;
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="8" r="4" stroke={c} strokeWidth="2" />
      <path d="M5 20c0-4 3-6 7-6s7 2 7 6" stroke={c} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

/** Duolingo-style bottom tab bar — only shown on main app routes */
export function TacticalHUD() {
  const pathname = usePathname();
  const { enlisted } = usePlayerStore();

  if (!enlisted) return null;

  const hideNav =
    pathname.startsWith("/lesson") ||
    pathname.startsWith("/boss") ||
    pathname.startsWith("/onboarding");

  if (hideNav) return null;

  return (
    <nav
      className="safe-area-bottom fixed bottom-0 left-0 right-0 z-50 border-t border-black/[0.08] bg-charcoal-panel"
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
              className={`flex flex-1 flex-col items-center justify-center gap-0.5 border-t-2 transition-colors ${
                active ? "border-cardinal text-cardinal" : "border-transparent text-slate"
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

/** Compact top bar for lesson / boss flows */
export function LessonTopBar({ title, progress }: { title: string; progress: number }) {
  return (
    <header className="sticky top-0 z-40 border-b border-black/[0.06] bg-charcoal-panel">
      <div className="mx-auto max-w-lg px-4 py-3">
        <div className="mb-2 flex items-center gap-3">
          <Link href="/campaign" className="text-sm font-semibold text-cardinal" aria-label="Back to Learn">
            ← Exit
          </Link>
          <p className="flex-1 truncate text-sm font-semibold text-warm-white">{title}</p>
        </div>
        <div className="h-2.5 overflow-hidden rounded-full bg-surface-muted">
          <div
            className="h-full rounded-full bg-cardinal transition-all duration-500"
            style={{ width: `${Math.min(progress * 100, 100)}%` }}
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
