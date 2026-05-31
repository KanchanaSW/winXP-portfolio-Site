"use client";

import { XPButton } from "@/components/xp/XPButton";
import { portfolio } from "@/portfolio.config";

export function AboutWindow() {
  return (
    <div className="flex flex-col h-full min-h-0 sm:min-h-[280px] p-3 text-[11px]">
      <div className="flex flex-col sm:flex-row gap-4 flex-1">
        <div className="flex-shrink-0 flex justify-center sm:justify-start">
          <img
            src={portfolio.photo}
            alt={portfolio.name}
            width={100}
            height={100}
            className="object-cover border border-[#ACA899]"
            style={{ width: 100, height: 100 }}
          />
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="text-lg font-bold m-0 mb-1">{portfolio.name}</h2>
          <p className="text-[#666] m-0 mb-2">{portfolio.title}</p>
          <p className="m-0 mb-3 leading-relaxed whitespace-pre-line">
            {portfolio.bio}
          </p>
          <div className="flex items-center gap-2 flex-wrap">
            <span>✉️</span>
            <a
              href={`mailto:${portfolio.email}`}
              className="text-[#0000EE] underline break-all"
            >
              {portfolio.email}
            </a>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-2 mt-4 pt-3 border-t border-[#ACA899]">
        <XPButton
          onClick={() =>
            window.open(portfolio.github, "_blank", "noopener")
          }
        >
          GitHub
        </XPButton>
        <XPButton
          onClick={() =>
            window.open(portfolio.linkedin, "_blank", "noopener")
          }
        >
          LinkedIn
        </XPButton>
      </div>
    </div>
  );
}
