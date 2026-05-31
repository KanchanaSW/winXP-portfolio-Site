"use client";

import { useDesktopStore } from "@/stores/desktopStore";
import { XPButton } from "./XPButton";
import { InfoIcon } from "./icons";

export function XPMessageBox() {
  const { messageBox, hideMessageBox } = useDesktopStore();

  if (!messageBox.visible) return null;

  return (
    <div className="xp-message-box-overlay" onClick={hideMessageBox}>
      <div
        className="xp-message-box"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-labelledby="xp-msg-title"
      >
        <div className="xp-title-bar">
          <div className="xp-title-bar-left">
            <span className="xp-title-bar-icon">
              <InfoIcon />
            </span>
            <span id="xp-msg-title" className="xp-title-bar-text">
              {messageBox.title}
            </span>
          </div>
          <div className="xp-title-bar-controls">
            <button
              type="button"
              className="xp-win-control xp-win-control--close"
              onClick={hideMessageBox}
              aria-label="Close"
            >
              ×
            </button>
          </div>
        </div>
        <div className="xp-message-box-body">
          <InfoIcon />
          <p className="xp-message-box-text">{messageBox.message}</p>
        </div>
        <div className="xp-message-box-buttons">
          <XPButton variant="primary" onClick={hideMessageBox}>
            OK
          </XPButton>
        </div>
      </div>
    </div>
  );
}
