"use client";

import { ReactNode } from "react";

interface AppPageProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  className?: string;
  noPadding?: boolean;
}

/** Khan-style page shell: left-aligned header, consistent width */
export function AppPage({ children, title, subtitle, className = "", noPadding }: AppPageProps) {
  return (
    <div className={`mx-auto w-full max-w-lg ${noPadding ? "" : "px-4 py-5"} ${className}`}>
      {(title || subtitle) && (
        <header className="mb-5">
          {title && <h1 className="text-2xl font-bold tracking-tight text-warm-white">{title}</h1>}
          {subtitle && <p className="mt-1 text-sm text-sandstone">{subtitle}</p>}
        </header>
      )}
      {children}
    </div>
  );
}
