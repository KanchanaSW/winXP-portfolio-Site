"use client";

import { XPButton } from "@/components/xp/XPButton";
import { portfolio } from "@/portfolio.config";

export function BlogWindow() {
  if (!portfolio.blog) {
    return (
      <div className="p-4 text-[11px]">
        Blog URL not configured. Add a blog URL in portfolio.config.ts.
      </div>
    );
  }

  const openHome = () => {
    window.open(portfolio.blog, "_blank", "noopener");
  };

  return (
    <div className="flex flex-col h-full min-h-[360px]">
      <div className="xp-explorer-toolbar">
        <XPButton
          style={{ minWidth: 48, padding: "2px 8px" }}
          onClick={openHome}
        >
          Home
        </XPButton>
        <XPButton disabled style={{ minWidth: 32, padding: "2px 8px" }}>
          ◀ Back
        </XPButton>
        <XPButton disabled style={{ minWidth: 32, padding: "2px 8px" }}>
          ▶ Forward
        </XPButton>
        <XPButton disabled style={{ minWidth: 32, padding: "2px 8px" }}>
          Stop
        </XPButton>
        <XPButton disabled style={{ minWidth: 32, padding: "2px 8px" }}>
          Refresh
        </XPButton>
      </div>
      <div className="xp-explorer-address">
        <span className="font-bold">Address</span>
        <div
          className="xp-input flex-1"
          style={{ display: "flex", alignItems: "center" }}
        >
          {portfolio.blog}
        </div>
      </div>
      <div className="flex-1 p-4 xp-scrollbar overflow-auto text-[11px] bg-white mx-1 mb-1 xp-bevel-inset">
        <h2 className="text-base font-bold m-0 mb-1">{portfolio.blogTitle}</h2>
        <p className="m-0 mb-4 text-[#666] leading-relaxed">
          {portfolio.blogDescription}
        </p>
        <p className="font-bold m-0 mb-2">Articles</p>
        <ul className="m-0 pl-4 list-disc">
          {portfolio.blogPosts.map((post) => (
            <li key={post.url} className="mb-2">
              <button
                type="button"
                className="text-[#0000EE] underline text-left bg-transparent border-0 p-0 cursor-pointer font-inherit text-inherit"
                onClick={() =>
                  window.open(post.url, "_blank", "noopener")
                }
              >
                {post.title}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="xp-explorer-status xp-bevel-inset">
        {portfolio.blogPosts.length} article(s) — Double-click Home to visit blog
      </div>
    </div>
  );
}
