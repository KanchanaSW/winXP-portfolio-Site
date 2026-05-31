"use client";

import { useEffect, useState } from "react";
import { useDesktopStore, WindowId } from "@/stores/desktopStore";
import { XPFlagIcon, WINDOW_ICONS, NetworkTrayIcon, VolumeTrayIcon } from "./icons";

export function Taskbar() {
  const {
    windows,
    activeWindowId,
    startMenuOpen,
    toggleStartMenu,
    restoreWindow,
    closeStartMenu,
  } = useDesktopStore();

  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        })
      );
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  const openTabs = (Object.keys(windows) as WindowId[]).filter(
    (id) => windows[id].isOpen
  );

  return (
    <div className="xp-taskbar">
      <button
        type="button"
        className={`xp-start-btn ${startMenuOpen ? "xp-button--pressed" : ""}`}
        onClick={toggleStartMenu}
        aria-expanded={startMenuOpen}
        aria-haspopup="true"
      >
        <XPFlagIcon />
        start
      </button>

      <div className="xp-taskbar-tabs">
        {openTabs.map((id) => {
          const w = windows[id];
          const isActive = activeWindowId === id && !w.isMinimized;
          return (
            <button
              key={id}
              type="button"
              className={`xp-taskbar-tab ${isActive ? "xp-taskbar-tab--active" : "xp-taskbar-tab--inactive"}`}
              onClick={() => {
                closeStartMenu();
                if (w.isMinimized || activeWindowId !== id) {
                  restoreWindow(id);
                } else {
                  useDesktopStore.getState().minimizeWindow(id);
                }
              }}
              title={w.title}
            >
              <span style={{ width: 16, height: 16, flexShrink: 0 }}>
                {WINDOW_ICONS[id]}
              </span>
              <span className="truncate">{w.title}</span>
            </button>
          );
        })}
      </div>

      <div className="xp-system-tray">
        <VolumeTrayIcon />
        <NetworkTrayIcon />
        <span className="xp-tray-clock">{time}</span>
      </div>
    </div>
  );
}
