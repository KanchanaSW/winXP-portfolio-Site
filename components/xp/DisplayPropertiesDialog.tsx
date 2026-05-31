"use client";

import { useDesktopStore } from "@/stores/desktopStore";
import { XPButton } from "./XPButton";

export function DisplayPropertiesDialog() {
  const { displayPropertiesOpen, setDisplayPropertiesOpen } = useDesktopStore();

  if (!displayPropertiesOpen) return null;

  return (
    <div
      className="xp-dialog-overlay"
      onClick={() => setDisplayPropertiesOpen(false)}
    >
      <div
        className="xp-message-box"
        style={{ width: 360 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="xp-title-bar">
          <div className="xp-title-bar-left">
            <span className="xp-title-bar-text">Display Properties</span>
          </div>
          <div className="xp-title-bar-controls">
            <button
              type="button"
              className="xp-win-control xp-win-control--close"
              onClick={() => setDisplayPropertiesOpen(false)}
            >
              ×
            </button>
          </div>
        </div>
        <div style={{ padding: 16, fontSize: 11, background: "var(--xp-chrome)" }}>
          <p style={{ margin: "0 0 12px" }}>
            <strong>Theme:</strong> Windows XP
          </p>
          <p style={{ margin: "0 0 12px" }}>
            <strong>Wallpaper:</strong> Bliss
          </p>
          <p style={{ margin: 0, color: "#666" }}>
            This portfolio simulates the classic Windows XP desktop experience.
          </p>
        </div>
        <div className="xp-message-box-buttons">
          <XPButton
            variant="primary"
            onClick={() => setDisplayPropertiesOpen(false)}
          >
            OK
          </XPButton>
          <XPButton onClick={() => setDisplayPropertiesOpen(false)}>
            Cancel
          </XPButton>
        </div>
      </div>
    </div>
  );
}
