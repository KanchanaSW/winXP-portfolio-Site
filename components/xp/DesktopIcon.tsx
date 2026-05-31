"use client";

import { ReactNode } from "react";
import { WindowId } from "@/stores/desktopStore";

interface DesktopIconProps {
  id: WindowId;
  label: string;
  icon: ReactNode;
  selected: boolean;
  onOpen: () => void;
}

export function DesktopIcon({
  label,
  icon,
  selected,
  onOpen,
}: DesktopIconProps) {
  return (
    <div
      className={`xp-desktop-icon ${selected ? "xp-desktop-icon--selected" : ""}`}
      onClick={(e) => {
        e.stopPropagation();
        onOpen();
      }}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter") onOpen();
      }}
    >
      {icon}
      <span className="xp-desktop-icon-label">{label}</span>
    </div>
  );
}
