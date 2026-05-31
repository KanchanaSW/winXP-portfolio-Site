"use client";

import { ReactNode } from "react";
import { WindowId } from "@/stores/desktopStore";

interface DesktopIconProps {
  id: WindowId;
  label: string;
  icon: ReactNode;
  selected: boolean;
  onSelect: () => void;
  onOpen: () => void;
}

export function DesktopIcon({
  label,
  icon,
  selected,
  onSelect,
  onOpen,
}: DesktopIconProps) {
  return (
  // Double-click also opens the window (classic XP behavior).
  // Single click selects the icon with the blue highlight.
    <div
      className={`xp-desktop-icon ${selected ? "xp-desktop-icon--selected" : ""}`}
      onClick={onSelect}
      onDoubleClick={onOpen}
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
