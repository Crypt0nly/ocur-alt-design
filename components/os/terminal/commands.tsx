import type { ReactNode } from "react";
import { agents, metrics, pricing, integrations } from "@/components/os/data";

function Ok({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline gap-2">
      <span className="phosphor">[ ok ]</span>
      <span className="phosphor-soft">{label}</span>
      <span className="flex-1 overflow-hidden text-phos-dim">
        {" "}
        {".".repeat(40)}
      </span>
      <span className="phosphor-soft">{value}</span>
    </div>
  );
}

export const BANNER: ReactNode = (
  <pre className="phosphor whitespace-pre text-[10px] leading-[1.15] sm:text-xs">
    {`█████ █████ █   █ ████
█   █ █     █   █ █   █
█   █ █     █   █ ████
█   █ █     █   █ █  █
█████ █████ █████ █   █   O P E R A T I N G   S Y S T E M`}
  </pre>
);

export const BOOT: ReactNode[] = [
  <span key="b0" className="phosphor-dim">booting Ocur OS v4.0 — kernel cold start…</span>,
  <Ok key="b1" label="kernel" value="online" />,
  <Ok key="b2" label="memory.graph" value="1.42M nodes" />,
  <Ok key="b3" label="agents" value="6 ready" />,
  <Ok key="b4" label="integrations" value="14 connected" />,
  <Ok key="b5" label="governance" value="enforced" />,
  <div key="b6" className="py-2">{BANNER}</div>,
  <span key="b7" className="phosphor-soft">
    Welcome. This is Ocur — the operating system that runs your company.
  </span>,
  <span key="b8" className="phosphor-dim">
    Type <span className="phosphor">help</span> to list commands, or click one below. Type{" "}
    <span className="phosphor">desktop</span> to switch interfaces.
  </span>,
];

const HELP: { cmd: string; desc: string }[] = [
  { cmd: "about", desc: "what Ocur is" },
  { cmd: "agents", desc: "the autonomous workforce" },
  { cmd: "workflows", desc: "multi-agent processes running now" },
  { cmd: "memory", desc: "the company knowledge graph" },
  { cmd: "integrations", desc: "connected systems of record" },
  { cmd: "pricing", desc: "plans" },
  { cmd: "metrics", desc: "live impact" },
  { cmd: "access", desc: "request access" },
  { cmd: "whoami", desc: "who you are" },
  { cmd: "banner", desc: "redraw the logo" },
  { cmd: "clear", desc: "clear the screen" },
  { cmd: "desktop", desc: "switch to the graphical desktop" },
];

const workflows = [
  { name: "Q3 EMEA Expansion", agents: 6, pct: 68, state: "running" },
  { name: "Month-end Close — May", agents: 2, pct: 100, state: "review" },
  { name: "Enterprise onboarding — ACME", agents: 4, pct: 34, state: "running" },
  { name: "Support backlog cleanup", agents: 1, pct: 82, state: "running" },
];

function bar(pct: number) {
  const filled = Math.round(pct / 10);
  return "█".repeat(filled) + "░".repeat(10 - filled);
}

export const COMMANDS: Record<string, () => ReactNode> = {
  help: () => (
    <div className="space-y-0.5">
      <p className="phosphor-dim">available commands —</p>
      {HELP.map((h) => (
        <div key={h.cmd} className="flex gap-3">
          <span className="phosphor w-28 shrink-0">{h.cmd}</span>
          <span className="phosphor-soft">{h.desc}</span>
        </div>
      ))}
    </div>
  ),

  about: () => (
    <div className="space-y-1 phosphor-soft">
      <p>
        <span className="phosphor-gold">Ocur</span> is the AI operating system for companies.
      </p>
      <p>A workforce of agents — orchestrated by one kernel — runs revenue,</p>
      <p>finance, support, and operations end to end.</p>
      <p className="phosphor-dim">Observable in real time. Always accountable to you.</p>
    </div>
  ),

  agents: () => (
    <div className="space-y-0.5">
      <p className="phosphor-dim">workforce — 6 agents</p>
      {agents.map((a) => (
        <div key={a.name} className="flex items-center gap-2">
          <span className={a.state === "active" ? "phosphor" : "phosphor-dim"}>
            {a.state === "active" ? "●" : "○"}
          </span>
          <span className="phosphor w-20 shrink-0">{a.name}</span>
          <span className="phosphor-dim w-24 shrink-0">{a.role}</span>
          <span className="phosphor-soft truncate">{a.task}</span>
        </div>
      ))}
    </div>
  ),

  workflows: () => (
    <div className="space-y-0.5">
      <p className="phosphor-dim">workflows — {workflows.length} active</p>
      {workflows.map((w) => (
        <div key={w.name} className="flex items-center gap-2">
          <span className="phosphor-soft w-56 shrink-0 truncate">{w.name}</span>
          <span className="phosphor">{bar(w.pct)}</span>
          <span className="phosphor-dim w-10 text-right">{w.pct}%</span>
          <span className={w.state === "review" ? "phosphor-gold" : "phosphor"}>{w.state}</span>
        </div>
      ))}
    </div>
  ),

  memory: () => (
    <div className="space-y-0.5 phosphor-soft">
      <p className="phosphor-dim">memory.graph</p>
      <p>nodes ......... 1.42M</p>
      <p>sources ....... 14 connected</p>
      <p>embeddings .... 8.9M indexed</p>
      <p>freshness ..... 98% under 24h</p>
    </div>
  ),

  integrations: () => (
    <div className="space-y-1">
      <p className="phosphor-dim">connected — {integrations.length}+ systems</p>
      <p className="phosphor-soft">{integrations.join("  ·  ")}</p>
      <p className="phosphor-dim">+ anything via MCP, REST, and webhooks.</p>
    </div>
  ),

  pricing: () => (
    <div className="space-y-2">
      {pricing.map((t) => (
        <div key={t.name}>
          <p>
            <span className={t.featured ? "phosphor-gold" : "phosphor"}>{t.name}</span>{" "}
            <span className="phosphor-soft">— {t.price}</span>
            {t.featured && <span className="phosphor-dim"> (most popular)</span>}
          </p>
          <p className="phosphor-dim pl-2">{t.features.join(" · ")}</p>
        </div>
      ))}
      <p className="phosphor-dim">run `access` to get started.</p>
    </div>
  ),

  metrics: () => (
    <div className="space-y-0.5 phosphor-soft">
      <p className="phosphor-dim">live impact</p>
      {metrics.map((m) => (
        <p key={m.label}>
          <span className="phosphor">{m.value.padEnd(9)}</span>
          {m.label} <span className="phosphor-dim">({m.sub})</span>
        </p>
      ))}
    </div>
  ),

  access: () => (
    <div className="space-y-1 phosphor-soft">
      <p>
        <span className="phosphor-gold">→</span> Request access at{" "}
        <span className="phosphor underline">ocur.ai/access</span>
      </p>
      <p>or email <span className="phosphor">founders@ocur.ai</span>.</p>
      <p className="phosphor-dim">We stand up your first agents in under two weeks.</p>
    </div>
  ),

  whoami: () => (
    <div className="phosphor-soft">
      <p>guest@ocur — a prospective customer with great taste.</p>
      <p className="phosphor-dim">permissions: read-only (for now).</p>
    </div>
  ),

  ls: () => (
    <p className="phosphor-soft">
      about agents workflows memory integrations pricing metrics access
    </p>
  ),
};
