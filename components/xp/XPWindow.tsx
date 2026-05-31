"use client";

import { useCallback, ReactNode } from "react";
import { motion, AnimatePresence, useDragControls } from "framer-motion";
import {
  useDesktopStore,
  WindowId,
  TASKBAR_HEIGHT,
} from "@/stores/desktopStore";
import { WINDOW_ICONS } from "./icons";

interface XPWindowProps {
  id: WindowId;
  children: ReactNode;
  desktopRef: React.RefObject<HTMLDivElement | null>;
}

const MIN_WIDTH = 280;
const MIN_HEIGHT = 160;

export function XPWindow({ id, children, desktopRef }: XPWindowProps) {
  const dragControls = useDragControls();
  const {
    windows,
    activeWindowId,
    focusWindow,
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    moveWindow,
    resizeWindow,
  } = useDesktopStore();

  const win = windows[id];
  const isActive = activeWindowId === id;
  const icon = WINDOW_ICONS[id];

  const handleResizeStart = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (win.isMaximized) return;

      const startX = e.clientX;
      const startY = e.clientY;
      const startW = win.size.width;
      const startH = win.size.height;

      const onMove = (ev: MouseEvent) => {
        const newW = Math.max(MIN_WIDTH, startW + (ev.clientX - startX));
        const newH = Math.max(MIN_HEIGHT, startH + (ev.clientY - startY));
        resizeWindow(id, { width: newW, height: newH });
      };

      const onUp = () => {
        document.removeEventListener("mousemove", onMove);
        document.removeEventListener("mouseup", onUp);
      };

      document.addEventListener("mousemove", onMove);
      document.addEventListener("mouseup", onUp);
    },
    [id, win.isMaximized, win.size.width, win.size.height, resizeWindow]
  );

  const clampPosition = useCallback(
    (x: number, y: number) => {
      const parent = desktopRef.current;
      const maxX = parent
        ? parent.clientWidth - win.size.width
        : window.innerWidth - win.size.width;
      const maxY = parent
        ? parent.clientHeight - win.size.height
        : window.innerHeight - TASKBAR_HEIGHT - win.size.height;
      return {
        x: Math.max(0, Math.min(maxX, x)),
        y: Math.max(0, Math.min(maxY, y)),
      };
    },
    [desktopRef, win.size.width, win.size.height]
  );

  if (!win.isOpen || win.isMinimized) return null;

  return (
    <AnimatePresence>
      <motion.div
        key={id}
        className="xp-window"
        style={{
          left: win.position.x,
          top: win.position.y,
          width: win.size.width,
          height: win.size.height,
          zIndex: win.zIndex,
        }}
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.1 }}
        onMouseDown={() => focusWindow(id)}
        drag={!win.isMaximized}
        dragControls={dragControls}
        dragListener={false}
        dragMomentum={false}
        dragElastic={0}
        onDragEnd={(_, info) => {
          if (win.isMaximized) return;
          const next = clampPosition(
            win.position.x + info.offset.x,
            win.position.y + info.offset.y
          );
          moveWindow(id, next);
        }}
      >
        <div
          className={`xp-title-bar ${isActive ? "" : "xp-title-bar--inactive"}`}
          onPointerDown={(e) => {
            if (!win.isMaximized) {
              dragControls.start(e);
            }
            focusWindow(id);
          }}
          style={{ cursor: win.isMaximized ? "default" : "default" }}
        >
          <div className="xp-title-bar-left">
            <span className="xp-title-bar-icon">{icon}</span>
            <span className="xp-title-bar-text">{win.title}</span>
          </div>
          <div className="xp-title-bar-controls">
            <button
              type="button"
              className="xp-win-control xp-win-control--min"
              onClick={(e) => {
                e.stopPropagation();
                minimizeWindow(id);
              }}
              aria-label="Minimize"
            >
              _
            </button>
            <button
              type="button"
              className="xp-win-control xp-win-control--max"
              onClick={(e) => {
                e.stopPropagation();
                maximizeWindow(id);
              }}
              aria-label="Maximize"
            >
              □
            </button>
            <button
              type="button"
              className="xp-win-control xp-win-control--close"
              onClick={(e) => {
                e.stopPropagation();
                closeWindow(id);
              }}
              aria-label="Close"
            >
              ×
            </button>
          </div>
        </div>

        <div
          className="xp-window-inner-bevel"
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            minHeight: 0,
          }}
        >
          <div className="xp-window-content xp-scrollbar">{children}</div>
        </div>

        {!win.isMaximized && (
          <div
            className="xp-resize-handle"
            onMouseDown={handleResizeStart}
            aria-label="Resize"
          />
        )}
      </motion.div>
    </AnimatePresence>
  );
}
