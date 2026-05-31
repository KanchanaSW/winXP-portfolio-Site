"use client";

import { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

type XPInputProps = InputHTMLAttributes<HTMLInputElement>;

export function XPInput({ className = "", ...props }: XPInputProps) {
  return <input className={`xp-input ${className}`} {...props} />;
}

type XPTextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

export function XPTextarea({ className = "", ...props }: XPTextareaProps) {
  return <textarea className={`xp-textarea ${className}`} {...props} />;
}
