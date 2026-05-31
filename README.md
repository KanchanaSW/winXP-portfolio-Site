# Windows XP Portfolio

A personal portfolio that simulates the Windows XP desktop in the browser.

## Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS (layout/spacing only)
- Vanilla CSS for XP chrome (`styles/xp.css`)
- Framer Motion (window drag & animations)
- Zustand (desktop/window state)

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Customize content

Edit **[`portfolio.config.ts`](portfolio.config.ts)** — your name, bio, projects, skills, resume, blog posts, and contact email all live in one file.

Place your headshot at `public/images/photo.jpg` (or update the `photo` path in the config).

Optional fields not wired to the XP UI: `messages` (chat), `wallpaper` (macOS-style; desktop uses the default XP gradient).

## Shutdown sound (optional)

Add a licensed `shutdown.mp3` to `public/sounds/` for the Turn Off Computer easter egg.

## Build

```bash
npm run build
npm start
```
