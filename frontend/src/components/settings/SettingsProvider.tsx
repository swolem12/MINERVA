"use client";

import { useEffect } from "react";
import { usePlayerStore } from "@/lib/player/player-store";

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const settings = usePlayerStore((s) => s.profile.settings);

  useEffect(() => {
    document.documentElement.dataset.largeText = settings.largeText ? "true" : "false";
    document.documentElement.dataset.highContrast = settings.highContrast ? "true" : "false";
    document.documentElement.dataset.reducedMotion = settings.reducedMotion ? "true" : "false";
  }, [settings.largeText, settings.highContrast, settings.reducedMotion]);

  return <>{children}</>;
}
