<div align="center">

# Ocur OS

### The operating system that runs your company — with two faces.

Ocur is an AI operating system for companies. Instead of a conventional
marketing site, the experience **is** the OS: drive it as a graphical
**Desktop** or a living **Terminal**, and flip between them with one switch.

</div>

---

## ✦ The concept

Ocur runs a company on a coordinated workforce of AI agents, orchestrated by a
single kernel. The site embodies that idea by being an interface to the OS —
and like any real OS, it offers a GUI and a CLI:

- **🖥️ Desktop** — a bright, spatial OS. A top menubar, an aurora wallpaper, a
  dock, and **draggable, focusable windows**: Welcome, Agents, Activity, Kernel
  Monitor, Pricing, and Get Access.
- **⌨️ Terminal** — a living phosphor console with a boot sequence, CRT
  scanlines, and a **real command interpreter**. Type (or click) `about`,
  `agents`, `workflows`, `pricing`, `access`, `desktop`, `help`, `clear`…

A switch in the top bar flips the entire OS between the two. Your choice is
remembered, and **⌘`** (Ctrl+`) toggles modes from anywhere.

## ✦ Design language

Two deliberately opposite aesthetics, one brand:

| | Desktop | Terminal |
| --- | --- | --- |
| Surface | Bright "aurora" wallpaper, frosted white windows | Deep black with CRT scanlines + vignette |
| Ink | Warm near-black | Mint **phosphor** with text-glow (amber accents) |
| Accent | Electric **cobalt** + violet/coral | Phosphor green |
| Type | Space Grotesk | JetBrains Mono |

Both are fully responsive — windows tile into a scrollable stack on phones; the
terminal reflows — and the orbital Ocur mark adapts to either mode via
`currentColor`.

## ✦ Tech stack

- [Next.js 14](https://nextjs.org/) (App Router) + React 18 + TypeScript
- [Tailwind CSS](https://tailwindcss.com/) with a custom dual-mode design system
- [Lucide](https://lucide.dev/) icons
- No heavy UI deps — windows, dragging, the dock, and the terminal interpreter
  are all hand-built.

## ✦ Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

Build & serve production:

```bash
npm run build
npm run start
```

## ✦ Project structure

```
app/
  layout.tsx              # fonts (Space Grotesk + JetBrains Mono), metadata
  page.tsx                # renders <OcurOS />
  globals.css             # design tokens, CRT effects, wallpaper, glass chrome
components/
  os/
    os-shell.tsx          # mode state, the top switch, ⌘` shortcut, clock
    data.ts               # shared content (agents, metrics, pricing, …)
    desktop/
      desktop.tsx          # window manager + dock (spatial ↔ stacked)
      window.tsx           # draggable, focusable window chrome
      apps.tsx             # window contents (Welcome, Agents, Kernel, …)
    terminal/
      terminal.tsx         # boot, input, history, block caret, chips
      commands.tsx         # the command interpreter + ASCII banner
  brand/logo.tsx          # orbital mark (adapts via currentColor)
tailwind.config.ts        # dual-mode tokens + animations
```

> All product copy, metrics, and customer names are illustrative.
