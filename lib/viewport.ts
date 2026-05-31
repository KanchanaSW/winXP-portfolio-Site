"use client";

import { useEffect, useState } from "react";

export const MOBILE_BREAKPOINT = 768;

export function isMobileViewport(): boolean {
  if (typeof window === "undefined") return false;
  return window.innerWidth < MOBILE_BREAKPOINT;
}

export function getDesktopBounds(taskbarHeight = 32): {
  width: number;
  height: number;
} {
  if (typeof window === "undefined") {
    return { width: 1024, height: 768 - taskbarHeight };
  }

  return {
    width: window.innerWidth,
    height: window.innerHeight - taskbarHeight,
  };
}

export function useMobileViewport(): boolean {
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const check = () => setMobile(isMobileViewport());
    check();
    window.addEventListener("resize", check);
    window.addEventListener("orientationchange", check);
    return () => {
      window.removeEventListener("resize", check);
      window.removeEventListener("orientationchange", check);
    };
  }, []);

  return mobile;
}
