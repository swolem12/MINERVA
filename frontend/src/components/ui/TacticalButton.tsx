"use client";

import { ButtonHTMLAttributes, ReactNode } from "react";
import { motion } from "framer-motion";

interface TacticalButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  children: ReactNode;
  size?: "default" | "lg";
}

const variants = {
  primary: "btn-primary text-white",
  secondary: "btn-secondary",
  ghost: "btn-ghost",
};

export function TacticalButton({
  variant = "primary",
  size = "default",
  children,
  className = "",
  ...props
}: TacticalButtonProps) {
  const height = size === "lg" ? "min-h-16 text-lg" : "min-h-14 text-base";

  return (
    <motion.button
      whileTap={{ scale: variant === "primary" ? 1 : 0.98 }}
      className={`w-full max-w-sm px-6 py-4 font-bold transition-all disabled:opacity-50 disabled:shadow-none ${height} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
}
