"use client";

import { useState } from "react";
import { FolderIcon } from "@/components/xp/icons";
import { XPButton } from "@/components/xp/XPButton";
import { useDesktopStore } from "@/stores/desktopStore";
import { portfolio } from "@/portfolio.config";

export function ProjectsWindow() {
  const { showMessageBox } = useDesktopStore();
  const [selectedName, setSelectedName] = useState<string | null>(null);

  const selected = portfolio.projects.find((p) => p.name === selectedName);

  const openProject = (name: string) => {
    const project = portfolio.projects.find((p) => p.name === name);
    if (!project) return;
    const url = project.live ?? project.github;
    if (url) {
      window.open(url, "_blank", "noopener");
    } else {
      showMessageBox("My Projects", "No link available for this project.");
    }
  };

  return (
    <div className="flex flex-col h-full min-h-[360px]">
      <div className="xp-explorer-toolbar">
        <XPButton disabled style={{ minWidth: 32, padding: "2px 8px" }}>
          ◀ Back
        </XPButton>
        <XPButton disabled style={{ minWidth: 32, padding: "2px 8px" }}>
          ▶ Forward
        </XPButton>
        <XPButton disabled style={{ minWidth: 32, padding: "2px 8px" }}>
          ▲ Up
        </XPButton>
        <XPButton
          disabled={!selected}
          style={{ minWidth: 48, padding: "2px 8px" }}
          onClick={() => selected && openProject(selected.name)}
        >
          Open
        </XPButton>
      </div>
      <div className="xp-explorer-address">
        <span className="font-bold">Address</span>
        <div className="xp-input flex-1" style={{ display: "flex", alignItems: "center" }}>
          C:\Portfolio\Projects
        </div>
      </div>
      <div className="flex-1 p-4 grid grid-cols-2 sm:grid-cols-4 gap-4 content-start xp-scrollbar overflow-auto">
        {portfolio.projects.map((p) => (
          <div
            key={p.name}
            className={`flex flex-col items-center text-center p-2 cursor-pointer hover:bg-[#316AC5] hover:text-white group ${
              selectedName === p.name ? "bg-[#316AC5] text-white" : ""
            }`}
            title={p.description}
            onClick={() => setSelectedName(p.name)}
            onDoubleClick={() => openProject(p.name)}
          >
            <FolderIcon size={48} />
            <span
              className={`text-[11px] mt-2 ${
                selectedName === p.name ? "text-white" : "group-hover:text-white"
              }`}
            >
              {p.name}
            </span>
          </div>
        ))}
      </div>
      <div className="xp-explorer-status xp-bevel-inset">
        {selected ? (
          <>
            <div>{selected.description}</div>
            <div>Tech Stack : {selected.tech.join(", ")}</div>
          </>
        ) : (
          `${portfolio.projects.length} object(s)`
        )}
      </div>
    </div>
  );
}
