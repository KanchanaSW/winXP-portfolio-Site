import { ReactNode } from "react";

export function XPFlagIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden>
      <rect x="1" y="1" width="8" height="8" fill="#FF0000" />
      <rect x="11" y="1" width="8" height="8" fill="#00FF00" />
      <rect x="1" y="11" width="8" height="8" fill="#0000FF" />
      <rect x="11" y="11" width="8" height="8" fill="#FFFF00" />
    </svg>
  );
}

export function FolderIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden>
      <path
        d="M4 12h16l4 4h20v24H4V12z"
        fill="#FFD700"
        stroke="#C4A000"
        strokeWidth="1"
      />
      <path d="M4 12h14l3 4H4v-4z" fill="#FFEC8B" />
    </svg>
  );
}

export function UserIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden>
      <circle cx="24" cy="16" r="10" fill="#87CEEB" stroke="#4A90C2" />
      <ellipse cx="24" cy="40" rx="16" ry="12" fill="#87CEEB" stroke="#4A90C2" />
    </svg>
  );
}

export function DocumentIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden>
      <rect x="10" y="4" width="28" height="40" fill="#fff" stroke="#808080" />
      <path d="M14 12h20M14 18h20M14 24h14" stroke="#316AC5" strokeWidth="2" />
    </svg>
  );
}

export function EnvelopeIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden>
      <rect x="6" y="12" width="36" height="24" fill="#fff" stroke="#808080" />
      <path d="M6 12l18 14 18-14" fill="none" stroke="#808080" strokeWidth="2" />
    </svg>
  );
}

export function GlobeIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden>
      <circle cx="24" cy="24" r="20" fill="#4A90D9" stroke="#1E5A9E" />
      <ellipse
        cx="24"
        cy="24"
        rx="8"
        ry="20"
        fill="none"
        stroke="#87CEEB"
        strokeWidth="2"
      />
      <path
        d="M4 24h40M8 14h32M8 34h32"
        stroke="#87CEEB"
        strokeWidth="2"
        fill="none"
      />
    </svg>
  );
}

export function GearIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden>
      <circle cx="24" cy="24" r="8" fill="#C0C0C0" stroke="#606060" />
      {[0, 45, 90, 135].map((deg) => (
        <rect
          key={deg}
          x="22"
          y="4"
          width="4"
          height="10"
          fill="#808080"
          transform={`rotate(${deg} 24 24)`}
        />
      ))}
    </svg>
  );
}

export function InfoIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" className="xp-message-box-icon" aria-hidden>
      <circle cx="16" cy="16" r="14" fill="#316AC5" stroke="#0A246A" />
      <text x="16" y="22" textAnchor="middle" fill="#fff" fontSize="18" fontWeight="bold">
        i
      </text>
    </svg>
  );
}

export function NetworkTrayIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" className="xp-tray-icon" aria-hidden>
      <rect x="1" y="10" width="3" height="5" fill="#90EE90" />
      <rect x="6" y="7" width="3" height="8" fill="#90EE90" />
      <rect x="11" y="4" width="3" height="11" fill="#90EE90" />
    </svg>
  );
}

export function VolumeTrayIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" className="xp-tray-icon" aria-hidden>
      <path d="M2 5h3l4-3v12l-4-3H2V5z" fill="#C0C0C0" />
      <path d="M11 6c1 1 1 3 0 4M13 4c2 2 2 6 0 8" stroke="#C0C0C0" fill="none" />
    </svg>
  );
}

export const WINDOW_ICONS: Record<string, ReactNode> = {
  about: <UserIcon size={16} />,
  projects: <FolderIcon size={16} />,
  skills: <GearIcon size={16} />,
  resume: <DocumentIcon size={16} />,
  contact: <EnvelopeIcon size={16} />,
  blog: <GlobeIcon size={16} />,
};
