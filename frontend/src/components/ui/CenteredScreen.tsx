"use client";

import { ReactNode } from "react";

interface CenteredScreenProps {
  children: ReactNode;
  className?: string;
  maxWidth?: "sm" | "md" | "lg";
}

const maxWidthClass = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
};

export function CenteredScreen({
  children,
  className = "",
  maxWidth = "md",
}: CenteredScreenProps) {
  return (
    <main
      className={`mx-auto flex w-full flex-col items-center px-5 py-6 text-center ${maxWidthClass[maxWidth]} ${className}`}
    >
      {children}
    </main>
  );
}
