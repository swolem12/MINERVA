"use client";

import { useEffect, useState } from "react";
import { TacticalButton } from "@/components/ui/TacticalButton";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export function InstallPrompt() {
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(null);
  const [dismissed, setDismissed] = useState(false);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setInstalled(true);
      return;
    }

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferred(e as BeforeInstallPromptEvent);
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const install = async () => {
    if (!deferred) return;
    await deferred.prompt();
    const { outcome } = await deferred.userChoice;
    if (outcome === "accepted") setInstalled(true);
    setDeferred(null);
  };

  if (installed || dismissed || !deferred) return null;

  return (
    <div className="mt-8 w-full rounded-xl border border-muted-gold/40 bg-slate/20 p-4 text-center">
      <p className="mb-3 text-sm text-secondary">Install MINERVA for offline study</p>
      <div className="flex flex-col items-center gap-2">
        <TacticalButton onClick={install}>Install App</TacticalButton>
        <button
          type="button"
          onClick={() => setDismissed(true)}
          className="text-xs text-muted underline"
        >
          Not now
        </button>
      </div>
    </div>
  );
}
