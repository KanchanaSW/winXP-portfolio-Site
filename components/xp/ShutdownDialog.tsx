"use client";

import { useRef } from "react";
import { useDesktopStore } from "@/stores/desktopStore";
import { XPButton } from "./XPButton";

export function ShutdownDialog() {
  const { shutdownDialogOpen, setShutdownDialogOpen, showMessageBox } =
    useDesktopStore();
  const audioRef = useRef<HTMLAudioElement>(null);

  if (!shutdownDialogOpen) return null;

  const playShutdown = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.play().catch(() => {
        /* User may not have placed shutdown.mp3 in public/sounds */
      });
    }
  };

  const handleTurnOff = () => {
    playShutdown();
    setShutdownDialogOpen(false);
    showMessageBox(
      "Windows",
      "It's now safe to turn off your computer. (Just kidding — this is a portfolio!)"
    );
  };

  return (
    <>
      <audio ref={audioRef} src="/sounds/shutdown.mp3" preload="auto" />
      <div
        className="xp-dialog-overlay"
        onClick={() => setShutdownDialogOpen(false)}
      >
        <div
          className="xp-message-box"
          style={{ width: 320 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="xp-title-bar">
            <div className="xp-title-bar-left">
              <span className="xp-title-bar-text">Turn off computer</span>
            </div>
            <div className="xp-title-bar-controls">
              <button
                type="button"
                className="xp-win-control xp-win-control--close"
                onClick={() => setShutdownDialogOpen(false)}
              >
                ×
              </button>
            </div>
          </div>
          <div className="xp-message-box-body">
            <p className="xp-message-box-text" style={{ paddingTop: 0 }}>
              What do you want the computer to do?
            </p>
          </div>
          <div
            className="xp-message-box-buttons"
            style={{ flexDirection: "column", gap: 4 }}
          >
            <XPButton onClick={() => setShutdownDialogOpen(false)}>
              Stand By
            </XPButton>
            <XPButton onClick={() => setShutdownDialogOpen(false)}>
              Restart
            </XPButton>
            <XPButton variant="primary" onClick={handleTurnOff}>
              Turn Off
            </XPButton>
            <XPButton onClick={() => setShutdownDialogOpen(false)}>
              Cancel
            </XPButton>
          </div>
        </div>
      </div>
    </>
  );
}
