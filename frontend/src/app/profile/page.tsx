"use client";

import Link from "next/link";
import { calculateRank, xpToNextRank } from "@minerva/core";
import { usePlayerStore } from "@/lib/player/player-store";
import { AppPage } from "@/components/layout/AppPage";
import { TacticalButton } from "@/components/ui/TacticalButton";
import { XPBar } from "@/components/ui/XPBar";

const LINKS = [
  { href: "/armory", label: "Formula reference", desc: "Quick recall cards" },
  { href: "/analytics", label: "Your progress", desc: "XP and stats" },
  { href: "/trials", label: "Confidence checks", desc: "Optional timed review" },
];

function SettingToggle({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex cursor-pointer items-center justify-between gap-3 py-2">
      <div>
        <p className="text-sm font-semibold text-primary">{label}</p>
        <p className="text-xs text-muted">{description}</p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative h-7 w-12 shrink-0 rounded-full transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-cardinal ${
          checked ? "bg-cardinal" : "bg-surface-muted"
        }`}
      >
        <span
          className={`absolute top-0.5 h-6 w-6 rounded-full bg-white shadow transition-transform ${
            checked ? "translate-x-5" : "translate-x-0.5"
          }`}
        />
      </button>
    </label>
  );
}

export default function ProfilePage() {
  const { profile, completedLessons, completedNodes, resetProgress, updateSettings } = usePlayerStore();
  const rank = calculateRank(profile.xp);
  const { nextRank, xpNeeded } = xpToNextRank(profile.xp);
  const settings = profile.settings;

  return (
    <AppPage title="You">
      <div className="card p-5 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-soft text-2xl font-bold text-cardinal">
          {profile.displayName.charAt(0).toUpperCase()}
        </div>
        <h2 className="mt-3 text-xl font-bold text-primary">{profile.displayName}</h2>
        <p className="text-sm font-semibold text-cardinal">{rank}</p>
        <div className="mt-4">
          <XPBar xp={profile.xp} xpNeeded={xpNeeded} rank={rank} />
        </div>
        <div className="mt-3 flex items-center justify-center gap-2">
          <span className="rounded-full bg-brand-soft px-3 py-1 text-sm font-bold text-cardinal">
            {profile.streak} day streak
          </span>
          {nextRank && (
            <span className="text-xs text-muted">{xpNeeded} XP to {nextRank}</span>
          )}
        </div>
      </div>

      <div className="card mt-4 p-4">
        <p className="text-sm font-semibold text-primary">Your progress</p>
        <p className="mt-1 text-sm text-secondary">
          Saved on this device. Free to use — no account required.
        </p>
      </div>

      <div className="card mt-4 p-4">
        <p className="mb-2 text-sm font-semibold text-primary">Settings</p>
        <SettingToggle
          label="Large text"
          description="Easier reading"
          checked={settings.largeText}
          onChange={(v) => updateSettings({ largeText: v })}
        />
        <SettingToggle
          label="High contrast"
          description="Stronger borders and text"
          checked={settings.highContrast}
          onChange={(v) => updateSettings({ highContrast: v })}
        />
        <SettingToggle
          label="Reduce motion"
          description="Minimal animations"
          checked={settings.reducedMotion}
          onChange={(v) => updateSettings({ reducedMotion: v })}
        />
      </div>

      <div className="card mt-4 px-4 py-3 text-sm text-secondary">
        <span className="font-semibold text-primary">{completedLessons.length}</span> lessons ·{" "}
        <span className="font-semibold text-primary">{completedNodes.length}</span> activities
      </div>
      <ul className="mt-4 space-y-2">
        {LINKS.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="card flex items-center justify-between px-4 py-3 transition-colors hover:border-cardinal/30"
            >
              <div>
                <p className="font-semibold text-primary">{link.label}</p>
                <p className="text-xs text-muted">{link.desc}</p>
              </div>
              <span className="text-muted">→</span>
            </Link>
          </li>
        ))}
      </ul>

      <div className="card mt-6 p-4">
        <p className="text-sm font-semibold text-primary">Backup progress</p>
        <p className="mt-1 text-xs text-secondary">Export your progress as a file, or restore from a backup.</p>
        <div className="mt-3 flex flex-col gap-2">
          <TacticalButton
            variant="secondary"
            onClick={() => {
              const raw = localStorage.getItem("minerva-player-v2");
              if (!raw) return;
              const blob = new Blob([raw], { type: "application/json" });
              const url = URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = url;
              a.download = `minerva-progress-${new Date().toISOString().slice(0, 10)}.json`;
              a.click();
              URL.revokeObjectURL(url);
            }}
          >
            Export progress
          </TacticalButton>
          <label className="cursor-pointer">
            <span className="btn-secondary inline-flex w-full items-center justify-center px-4 py-3 text-sm font-semibold">
              Import progress
            </span>
            <input
              type="file"
              accept="application/json"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                const reader = new FileReader();
                reader.onload = () => {
                  try {
                    localStorage.setItem("minerva-player-v2", String(reader.result));
                    window.location.reload();
                  } catch {
                    alert("Could not import that file.");
                  }
                };
                reader.readAsText(file);
              }}
            />
          </label>
        </div>
      </div>

      <div className="mt-8">
        <TacticalButton variant="secondary" onClick={() => { resetProgress(); window.location.href = "/"; }}>
          Reset progress
        </TacticalButton>
      </div>
    </AppPage>
  );
}
