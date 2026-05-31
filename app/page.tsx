"use client";

import { useRef, useEffect, ReactNode } from "react";
import { useDesktopStore, WindowId } from "@/stores/desktopStore";
import { BootScreen } from "@/components/xp/BootScreen";
import { DesktopIcon } from "@/components/xp/DesktopIcon";
import { XPWindow } from "@/components/xp/XPWindow";
import { Taskbar } from "@/components/xp/Taskbar";
import { StartMenu } from "@/components/xp/StartMenu";
import { XPContextMenu } from "@/components/xp/XPContextMenu";
import { XPMessageBox } from "@/components/xp/XPMessageBox";
import { DisplayPropertiesDialog } from "@/components/xp/DisplayPropertiesDialog";
import { ShutdownDialog } from "@/components/xp/ShutdownDialog";
import { WindowContent } from "@/components/windows/WindowContent";
import {
  FolderIcon,
  UserIcon,
  DocumentIcon,
  EnvelopeIcon,
  GearIcon,
  GlobeIcon,
} from "@/components/xp/icons";
import { portfolio } from "@/portfolio.config";

const DESKTOP_ICONS: {
  id: WindowId;
  label: string;
  icon: ReactNode;
}[] = [
  { id: "projects", label: "My Projects", icon: <FolderIcon /> },
  { id: "about", label: "About Me", icon: <UserIcon /> },
  { id: "resume", label: "Resume.pdf", icon: <DocumentIcon /> },
  { id: "contact", label: "Contact", icon: <EnvelopeIcon /> },
  { id: "skills", label: "Skills", icon: <GearIcon /> },
  ...(portfolio.blog
    ? [{ id: "blog" as WindowId, label: "My Blog", icon: <GlobeIcon /> }]
    : []),
];

export default function Home() {
  const desktopRef = useRef<HTMLDivElement>(null);
  const {
    windows,
    bootComplete,
    desktopReady,
    selectedIconId,
    setBootComplete,
    setDesktopReady,
    centerAboutWindow,
    selectIcon,
    openWindow,
    showContextMenu,
    hideContextMenu,
    closeStartMenu,
  } = useDesktopStore();

  useEffect(() => {
    if (bootComplete && !desktopReady) {
      centerAboutWindow(window.innerWidth, window.innerHeight);
      setDesktopReady();
    }
  }, [bootComplete, desktopReady, centerAboutWindow, setDesktopReady]);

  const handleDesktopClick = () => {
    selectIcon(null);
    hideContextMenu();
    closeStartMenu();
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    showContextMenu(e.clientX, e.clientY);
  };

  if (!bootComplete) {
    return <BootScreen onComplete={() => setBootComplete()} />;
  }

  const openWindowIds = (Object.keys(windows) as WindowId[]).filter(
    (id) => windows[id].isOpen
  );

  return (
    <div className="xp-desktop" onClick={handleDesktopClick}>
      <div
        ref={desktopRef}
        className="absolute inset-0 bottom-8 z-0"
        onContextMenu={handleContextMenu}
        style={{ bottom: 32 }}
      >
        <div className="xp-desktop-icons">
          {DESKTOP_ICONS.map((item) => (
            <DesktopIcon
              key={item.id}
              id={item.id}
              label={item.label}
              icon={item.icon}
              selected={selectedIconId === item.id}
              onSelect={() => selectIcon(item.id)}
              onOpen={() => openWindow(item.id)}
            />
          ))}
        </div>

        <div className="xp-windows-layer">
          {openWindowIds.map((id) => (
            <XPWindow key={id} id={id} desktopRef={desktopRef}>
              <WindowContent id={id} />
            </XPWindow>
          ))}
        </div>
      </div>

      <StartMenu />
      <Taskbar />
      <XPContextMenu />
      <XPMessageBox />
      <DisplayPropertiesDialog />
      <ShutdownDialog />
    </div>
  );
}
