"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { usePlayerStore } from "@/lib/player/player-store";

const PUBLIC = ["/", "/enlist"];

export function PlayerGuard({ children }: { children: React.ReactNode }) {
  const { enlisted, profile } = usePlayerStore();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!enlisted && !PUBLIC.includes(pathname)) {
      router.replace("/");
      return;
    }
    if (enlisted && pathname === "/enlist") {
      router.replace(
        profile.diagnosticCompleted ? "/campaign" : "/onboarding/diagnostic"
      );
      return;
    }
    if (
      enlisted &&
      !profile.diagnosticCompleted &&
      pathname !== "/onboarding/diagnostic" &&
      !PUBLIC.includes(pathname)
    ) {
      router.replace("/onboarding/diagnostic");
    }
  }, [enlisted, profile.diagnosticCompleted, pathname, router]);

  return <>{children}</>;
}
