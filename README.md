<div align="center">

# Ocur

### The AI Operating System for companies.

A premium, high-end marketing site and product console for **Ocur** — an agentic
operating system that runs a company. A coordinated workforce of AI agents handles
revenue, finance, support, and operations, orchestrated by a single kernel,
observable in real time, and always accountable to a human.

</div>

---

## ✦ Concept

Ocur is framed as an **operating system for work**, not another chatbot:

- **The Kernel** — the orchestration core that decomposes goals into plans, routes
  work to the right agents, resolves conflicts, and drives toward outcomes.
- **The Agent Workforce** — specialized agents (Atlas/Revenue, Ledger/Finance,
  Echo/Support, Forge/Operations, Cohort/People, Spark/Growth), each with its own
  tools, memory, and granted authority.
- **Shared Memory** — a living company knowledge graph every agent reads and writes.
- **Governance** — policies, approvals, and spend limits enforced on every action,
  with humans in the loop where it matters.
- **Observability** — real-time traces of what ran, why, and what it cost.

## ✦ What's inside

| Route | Description |
| --- | --- |
| `/` | The marketing site — hero with a live orchestration visual, the platform bento, the agent workforce, an execution-trace walkthrough, a console preview, integrations, metrics, testimonials, pricing, and CTA. |
| `/dashboard` | The **live product console** — sidebar, command bar, KPI tiles with sparklines, throughput chart, agent workforce monitor, an approvals queue, a live activity feed, and running workflows. |

## ✦ Design language

- **Obsidian + platinum** monochrome base with a single restrained **spectral**
  accent (iris → mint), in the spirit of premium product design.
- **Inter** for UI/body, **JetBrains Mono** for the OS / console aesthetic.
- Ambient grids, layered glows, film-grain texture, glassmorphism, and tasteful
  motion (scroll reveals, animated orchestration pulses) — all reduced-motion aware.
- Fully responsive, from a 390px phone to wide desktop.

## ✦ Tech stack

- [Next.js 14](https://nextjs.org/) (App Router) + React 18 + TypeScript
- [Tailwind CSS](https://tailwindcss.com/) with a custom design system
- [Framer Motion](https://www.framer.com/motion/) for motion
- [Lucide](https://lucide.dev/) icons

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
  layout.tsx            # fonts, metadata, root shell
  page.tsx              # landing page composition
  globals.css           # design tokens, base styles, utilities
  dashboard/            # the product console (layout + overview)
components/
  brand/                # logo & mark
  sections/             # landing page sections
  dashboard/            # sidebar, topbar, console widgets
  visuals/              # the animated orchestration core
  ui/                   # primitives (reveal, backdrop, headings)
lib/
  utils.ts              # cn() class merge helper
tailwind.config.ts      # the Ocur design system
```

> All product copy, metrics, and customer names are illustrative.
