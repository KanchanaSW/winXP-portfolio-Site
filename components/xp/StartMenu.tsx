"use client";

import { useEffect, useRef, ReactNode } from "react";
import {
  useDesktopStore,
  WindowId,
} from "@/stores/desktopStore";
import {
  FolderIcon,
  UserIcon,
  EnvelopeIcon,
  DocumentIcon,
  GearIcon,
} from "./icons";
import { XPButton } from "./XPButton";
import { portfolio } from "@/portfolio.config";
import { GlobeIcon } from "./icons";

const MENU_LINKS: { id: WindowId; label: string; icon: ReactNode }[] = [
  { id: "about", label: "About Me", icon: <UserIcon size={24} /> },
  { id: "projects", label: "My Projects", icon: <FolderIcon size={24} /> },
  ...(portfolio.blog
    ? [{ id: "blog" as WindowId, label: "My Blog", icon: <GlobeIcon size={24} /> }]
    : []),
  { id: "contact", label: "Contact", icon: <EnvelopeIcon size={24} /> },
];

export function StartMenu() {
  const {
    startMenuOpen,
    closeStartMenu,
    openWindow,
    setShutdownDialogOpen,
  } = useDesktopStore();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!startMenuOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        const startBtn = document.querySelector(".xp-start-btn");
        if (startBtn && startBtn.contains(e.target as Node)) return;
        closeStartMenu();
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [startMenuOpen, closeStartMenu]);

  if (!startMenuOpen) return null;

  const open = (id: WindowId) => {
    openWindow(id);
    closeStartMenu();
  };

  return (
    <div ref={menuRef} className="xp-start-menu" role="menu">
      <div className="xp-start-menu-body">
        <div className="xp-start-menu-sidebar">
          <UserIcon size={32} />
          <span className="xp-start-menu-user">{portfolio.name}</span>
        </div>
        <div className="xp-start-menu-main">
          {MENU_LINKS.map((link) => (
            <div
              key={link.id}
              className="xp-start-menu-item"
              role="menuitem"
              onClick={() => open(link.id)}
            >
              {link.icon}
              <span>{link.label}</span>
            </div>
          ))}
          <div className="xp-context-menu-separator" style={{ margin: "8px 0" }} />
          <div className="xp-start-menu-item" onClick={() => open("about")}>
            <DocumentIcon size={24} />
            <span>My Documents</span>
          </div>
          <div className="xp-start-menu-item" onClick={() => open("projects")}>
            <FolderIcon size={24} />
            <span>My Projects</span>
          </div>
          <div
            className="xp-start-menu-item xp-start-menu-item--disabled"
            title="Access denied"
          >
            <GearIcon size={24} />
            <span>Control Panel</span>
          </div>
          <div className="xp-context-menu-separator" style={{ margin: "8px 0" }} />
          <div
            className="xp-start-menu-item"
            onClick={() => {
              closeStartMenu();
              setShutdownDialogOpen(true);
            }}
          >
            <span>Turn Off Computer</span>
          </div>
        </div>
      </div>
      <div className="xp-start-menu-footer">
        <XPButton onClick={() => closeStartMenu()}>Log Off</XPButton>
        <XPButton
          onClick={() => {
            closeStartMenu();
            setShutdownDialogOpen(true);
          }}
        >
          Turn Off
        </XPButton>
      </div>
    </div>
  );
}
