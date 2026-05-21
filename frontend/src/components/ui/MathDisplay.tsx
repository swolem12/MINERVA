"use client";

import { useMemo } from "react";
import katex from "katex";

interface MathDisplayProps {
  children: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}

const sizes = {
  sm: "text-lg",
  md: "text-xl",
  lg: "text-2xl",
};

function renderMath(text: string): string {
  const parts = text.split(/(\$[^$]+\$|\\\([^)]+\\\))/g);
  return parts
    .map((part) => {
      if (part.startsWith("$") && part.endsWith("$")) {
        try {
          return katex.renderToString(part.slice(1, -1), { throwOnError: false, displayMode: false });
        } catch {
          return part;
        }
      }
      if (part.startsWith("\\(") && part.endsWith("\\)")) {
        try {
          return katex.renderToString(part.slice(2, -2), { throwOnError: false, displayMode: false });
        } catch {
          return part;
        }
      }
      const fracMatch = part.match(/(\d+)\/(\d+)/);
      if (fracMatch && part.trim() === fracMatch[0]) {
        try {
          return katex.renderToString(`\\frac{${fracMatch[1]}}{${fracMatch[2]}}`, { throwOnError: false });
        } catch {
          return part;
        }
      }
      return part.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    })
    .join("");
}

export function MathDisplay({ children, className = "", size = "md" }: MathDisplayProps) {
  const html = useMemo(() => renderMath(children), [children]);

  return (
    <p
      className={`math-display font-mono font-semibold text-primary ${sizes[size]} ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
