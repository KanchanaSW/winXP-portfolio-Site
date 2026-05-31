import { create } from "zustand";
import { getDesktopBounds, isMobileViewport } from "@/lib/viewport";

export type WindowId =
  | "about"
  | "projects"
  | "skills"
  | "resume"
  | "contact"
  | "blog";

export interface WindowState {
  id: WindowId;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  position: { x: number; y: number };
  size: { width: number; height: number };
  zIndex: number;
  preMaximize?: {
    position: { x: number; y: number };
    size: { width: number; height: number };
  };
}

export interface MessageBoxState {
  title: string;
  message: string;
  visible: boolean;
}

export interface ContextMenuState {
  visible: boolean;
  x: number;
  y: number;
}

export const WINDOW_DEFAULTS: Record<
  WindowId,
  { title: string; size: { width: number; height: number }; offset: number }
> = {
  about: { title: "About Me", size: { width: 480, height: 360 }, offset: 0 },
  projects: {
    title: "My Projects",
    size: { width: 600, height: 440 },
    offset: 30,
  },
  skills: { title: "Skills", size: { width: 420, height: 380 }, offset: 60 },
  resume: {
    title: "Resume.pdf",
    size: { width: 500, height: 400 },
    offset: 90,
  },
  contact: { title: "Contact", size: { width: 420, height: 340 }, offset: 120 },
  blog: {
    title: "Internet Explorer",
    size: { width: 560, height: 480 },
    offset: 150,
  },
};

const TASKBAR_HEIGHT = 32;
let zIndexCounter = 10;

function createInitialWindows(): Record<WindowId, WindowState> {
  const ids = Object.keys(WINDOW_DEFAULTS) as WindowId[];
  return ids.reduce(
    (acc, id, index) => {
      const def = WINDOW_DEFAULTS[id];
      acc[id] = {
        id,
        title: def.title,
        isOpen: id === "about",
        isMinimized: false,
        isMaximized: false,
        position: { x: 80 + def.offset, y: 40 + def.offset },
        size: { ...def.size },
        zIndex: id === "about" ? 10 : 0,
      };
      return acc;
    },
    {} as Record<WindowId, WindowState>
  );
}

interface DesktopStore {
  windows: Record<WindowId, WindowState>;
  activeWindowId: WindowId | null;
  selectedIconId: WindowId | null;
  startMenuOpen: boolean;
  contextMenu: ContextMenuState;
  messageBox: MessageBoxState;
  displayPropertiesOpen: boolean;
  shutdownDialogOpen: boolean;
  bootComplete: boolean;
  desktopReady: boolean;

  setBootComplete: () => void;
  setDesktopReady: () => void;
  centerAboutWindow: (viewportW: number, viewportH: number) => void;
  fitWindowToViewport: (id: WindowId) => void;
  syncWindowsToViewport: () => void;
  selectIcon: (id: WindowId | null) => void;
  openWindow: (id: WindowId) => void;
  closeWindow: (id: WindowId) => void;
  minimizeWindow: (id: WindowId) => void;
  maximizeWindow: (id: WindowId) => void;
  focusWindow: (id: WindowId) => void;
  moveWindow: (id: WindowId, position: { x: number; y: number }) => void;
  resizeWindow: (
    id: WindowId,
    size: { width: number; height: number }
  ) => void;
  restoreWindow: (id: WindowId) => void;
  toggleStartMenu: () => void;
  closeStartMenu: () => void;
  showContextMenu: (x: number, y: number) => void;
  hideContextMenu: () => void;
  showMessageBox: (title: string, message: string) => void;
  hideMessageBox: () => void;
  setDisplayPropertiesOpen: (open: boolean) => void;
  setShutdownDialogOpen: (open: boolean) => void;
}

export const useDesktopStore = create<DesktopStore>((set, get) => ({
  windows: createInitialWindows(),
  activeWindowId: "about",
  selectedIconId: null,
  startMenuOpen: false,
  contextMenu: { visible: false, x: 0, y: 0 },
  messageBox: { title: "", message: "", visible: false },
  displayPropertiesOpen: false,
  shutdownDialogOpen: false,
  bootComplete: false,
  desktopReady: false,

  setBootComplete: () => set({ bootComplete: true }),
  setDesktopReady: () => set({ desktopReady: true }),

  centerAboutWindow: (viewportW, viewportH) => {
    const about = get().windows.about;
    const x = Math.max(0, (viewportW - about.size.width) / 2);
    const y = Math.max(
      0,
      (viewportH - TASKBAR_HEIGHT - about.size.height) / 2
    );
    set((s) => ({
      windows: {
        ...s.windows,
        about: { ...s.windows.about, position: { x, y } },
      },
    }));
  },

  fitWindowToViewport: (id) => {
    const bounds = getDesktopBounds(TASKBAR_HEIGHT);
    set((s) => {
      const win = s.windows[id];
      const preMaximize =
        win.isMaximized && win.preMaximize
          ? win.preMaximize
          : {
              position: { ...win.position },
              size: { ...win.size },
            };

      return {
        windows: {
          ...s.windows,
          [id]: {
            ...win,
            isMaximized: true,
            preMaximize,
            position: { x: 0, y: 0 },
            size: { width: bounds.width, height: bounds.height },
          },
        },
      };
    });
  },

  syncWindowsToViewport: () => {
    if (!isMobileViewport()) return;

    const bounds = getDesktopBounds(TASKBAR_HEIGHT);
    set((s) => {
      const nextWindows = { ...s.windows };

      for (const id of Object.keys(nextWindows) as WindowId[]) {
        const win = nextWindows[id];
        if (!win.isOpen || win.isMinimized) continue;

        if (!win.isMaximized) {
          nextWindows[id] = {
            ...win,
            isMaximized: true,
            preMaximize: {
              position: { ...win.position },
              size: { ...win.size },
            },
            position: { x: 0, y: 0 },
            size: { width: bounds.width, height: bounds.height },
          };
        } else {
          nextWindows[id] = {
            ...win,
            position: { x: 0, y: 0 },
            size: { width: bounds.width, height: bounds.height },
          };
        }
      }

      return { windows: nextWindows };
    });
  },

  selectIcon: (id) => set({ selectedIconId: id }),

  openWindow: (id) => {
    zIndexCounter += 1;
    const mobile = typeof window !== "undefined" && isMobileViewport();
    const bounds = mobile ? getDesktopBounds(TASKBAR_HEIGHT) : null;

    set((s) => {
      const current = s.windows[id];
      let nextWindow = {
        ...current,
        isOpen: true,
        isMinimized: false,
        zIndex: zIndexCounter,
      };

      if (mobile && bounds) {
        nextWindow = {
          ...nextWindow,
          isMaximized: true,
          preMaximize: {
            position: { ...current.position },
            size: { ...current.size },
          },
          position: { x: 0, y: 0 },
          size: { width: bounds.width, height: bounds.height },
        };
      }

      return {
        startMenuOpen: false,
        selectedIconId: id,
        activeWindowId: id,
        windows: {
          ...s.windows,
          [id]: nextWindow,
        },
      };
    });
  },

  closeWindow: (id) => {
    set((s) => ({
      activeWindowId: s.activeWindowId === id ? null : s.activeWindowId,
      windows: {
        ...s.windows,
        [id]: {
          ...s.windows[id],
          isOpen: false,
          isMinimized: false,
          isMaximized: false,
        },
      },
    }));
  },

  minimizeWindow: (id) => {
    set((s) => ({
      activeWindowId: s.activeWindowId === id ? null : s.activeWindowId,
      windows: {
        ...s.windows,
        [id]: { ...s.windows[id], isMinimized: true },
      },
    }));
  },

  maximizeWindow: (id) => {
    const win = get().windows[id];
    if (win.isMaximized) {
      const pre = win.preMaximize;
      set((s) => ({
        windows: {
          ...s.windows,
          [id]: {
            ...s.windows[id],
            isMaximized: false,
            position: pre?.position ?? s.windows[id].position,
            size: pre?.size ?? s.windows[id].size,
            preMaximize: undefined,
          },
        },
      }));
      return;
    }

    const bounds = getDesktopBounds(TASKBAR_HEIGHT);

    set((s) => ({
      windows: {
        ...s.windows,
        [id]: {
          ...s.windows[id],
          isMaximized: true,
          preMaximize: {
            position: { ...s.windows[id].position },
            size: { ...s.windows[id].size },
          },
          position: { x: 0, y: 0 },
          size: {
            width: bounds.width,
            height: bounds.height,
          },
        },
      },
    }));
  },

  focusWindow: (id) => {
    zIndexCounter += 1;
    set((s) => ({
      activeWindowId: id,
      windows: {
        ...s.windows,
        [id]: { ...s.windows[id], zIndex: zIndexCounter },
      },
    }));
  },

  moveWindow: (id, position) => {
    set((s) => ({
      windows: {
        ...s.windows,
        [id]: { ...s.windows[id], position },
      },
    }));
  },

  resizeWindow: (id, size) => {
    set((s) => ({
      windows: {
        ...s.windows,
        [id]: { ...s.windows[id], size },
      },
    }));
  },

  restoreWindow: (id) => {
    const win = get().windows[id];
    if (!win.isOpen) {
      get().openWindow(id);
      return;
    }
    if (win.isMinimized) {
      zIndexCounter += 1;
      const mobile = typeof window !== "undefined" && isMobileViewport();
      const bounds = mobile ? getDesktopBounds(TASKBAR_HEIGHT) : null;

      set((s) => {
        const current = s.windows[id];
        let nextWindow = {
          ...current,
          isMinimized: false,
          zIndex: zIndexCounter,
        };

        if (mobile && bounds) {
          nextWindow = {
            ...nextWindow,
            isMaximized: true,
            preMaximize: current.preMaximize ?? {
              position: { ...current.position },
              size: { ...current.size },
            },
            position: { x: 0, y: 0 },
            size: { width: bounds.width, height: bounds.height },
          };
        }

        return {
          activeWindowId: id,
          windows: {
            ...s.windows,
            [id]: nextWindow,
          },
        };
      });
    } else {
      get().focusWindow(id);
    }
  },

  toggleStartMenu: () =>
    set((s) => ({ startMenuOpen: !s.startMenuOpen, contextMenu: { ...s.contextMenu, visible: false } })),

  closeStartMenu: () => set({ startMenuOpen: false }),

  showContextMenu: (x, y) =>
    set({ contextMenu: { visible: true, x, y }, startMenuOpen: false }),

  hideContextMenu: () =>
    set((s) => ({ contextMenu: { ...s.contextMenu, visible: false } })),

  showMessageBox: (title, message) =>
    set({ messageBox: { title, message, visible: true } }),

  hideMessageBox: () =>
    set((s) => ({ messageBox: { ...s.messageBox, visible: false } })),

  setDisplayPropertiesOpen: (open) => set({ displayPropertiesOpen: open }),

  setShutdownDialogOpen: (open) => set({ shutdownDialogOpen: open }),
}));

export { TASKBAR_HEIGHT };
