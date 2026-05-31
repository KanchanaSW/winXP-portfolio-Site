"use client";

import { useDesktopStore } from "@/stores/desktopStore";

export function XPContextMenu() {
  const { contextMenu, hideContextMenu, setDisplayPropertiesOpen } =
    useDesktopStore();

  if (!contextMenu.visible) return null;

  return (
    <div
      className="xp-context-menu"
      style={{ left: contextMenu.x, top: contextMenu.y }}
      onClick={(e) => e.stopPropagation()}
      role="menu"
    >
      <div className="xp-context-menu-item" role="menuitem">
        Arrange Icons By <span>▶</span>
      </div>
      <div
        className="xp-context-menu-item"
        role="menuitem"
        onClick={() => {
          hideContextMenu();
          window.location.reload();
        }}
      >
        Refresh
      </div>
      <div className="xp-context-menu-separator" />
      <div className="xp-context-menu-item" role="menuitem">
        New <span>▶</span>
      </div>
      <div className="xp-context-menu-separator" />
      <div
        className="xp-context-menu-item"
        role="menuitem"
        onClick={() => {
          hideContextMenu();
          setDisplayPropertiesOpen(true);
        }}
      >
        Properties
      </div>
    </div>
  );
}
