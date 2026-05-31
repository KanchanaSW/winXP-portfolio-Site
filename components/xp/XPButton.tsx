"use client";

import { ButtonHTMLAttributes } from "react";

interface XPButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "primary";
}

export function XPButton({
  variant = "default",
  className = "",
  children,
  ...props
}: XPButtonProps) {
  return (
    <button
      type="button"
      className={`xp-button xp-bevel-raised ${variant === "primary" ? "xp-button--primary" : ""} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
