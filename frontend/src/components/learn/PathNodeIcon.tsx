type NodeType = "lesson" | "drill" | "boss" | "review";

interface PathNodeIconProps {
  type: NodeType;
  completed?: boolean;
  locked?: boolean;
  className?: string;
}

export function PathNodeIcon({ type, completed, locked, className = "" }: PathNodeIconProps) {
  if (locked) {
    return (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden className={className}>
        <rect x="5" y="11" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="2" />
        <path d="M8 11V8a4 4 0 1 1 8 0v3" stroke="currentColor" strokeWidth="2" />
      </svg>
    );
  }

  if (completed) {
    return (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden className={className}>
        <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (type === "drill") {
    return (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden className={className}>
        <path d="M13 2L4 14h7l-1 8 10-14h-7l0-6z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      </svg>
    );
  }

  if (type === "boss") {
    return (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden className={className}>
        <path d="M12 2l2.4 7.4H22l-6 4.6 2.3 7L12 16.8 5.7 21l2.3-7-6-4.6h7.6L12 2z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      </svg>
    );
  }

  if (type === "review") {
    return (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden className={className}>
        <path d="M4 4v5h5M20 20v-5h-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M20 9a8 8 0 0 0-14-4M4 15a8 8 0 0 0 14 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden className={className}>
      <path d="M4 19V5l8 4 8-4v14" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M12 9v10" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

export function nodeTypeLabel(type: NodeType): string {
  const labels: Record<NodeType, string> = {
    lesson: "Lesson",
    drill: "Quick practice",
    boss: "Chapter check",
    review: "Review",
  };
  return labels[type];
}
