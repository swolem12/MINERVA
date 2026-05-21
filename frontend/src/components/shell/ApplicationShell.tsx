"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { TacticalHUD } from "./TacticalHUD";

const SHELL_PATHS = [
  "/campaign", "/missions", "/forge", "/armory", "/profile",
  "/analytics", "/trials", "/translator", "/practice",
];

export function ApplicationShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const showNav = SHELL_PATHS.some((p) => pathname.startsWith(p));

  return (
    <div className={`flex min-h-dvh flex-col ${showNav ? "app-shell" : ""}`}>
      <TacticalHUD />
      {children}
    </div>
  );
}
