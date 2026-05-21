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

export function MathDisplay({ children, className = "", size = "md" }: MathDisplayProps) {
  return (
    <p className={`math-display font-mono font-semibold text-warm-white ${sizes[size]} ${className}`}>
      {children}
    </p>
  );
}
