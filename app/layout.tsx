import type { Metadata, Viewport } from "next";
import "./globals.css";
import "../styles/xp.css";
import { portfolio } from "@/portfolio.config";

const bioFirstLine = portfolio.bio.split("\n")[0]?.trim() ?? portfolio.title;

export const metadata: Metadata = {
  title: `${portfolio.name} — Portfolio`,
  description: bioFirstLine,
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
