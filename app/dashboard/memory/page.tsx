import type { Metadata } from "next";
import {
  Plus,
  Search,
  Database,
  Layers,
  Clock,
  Network,
  FileText,
  MessageSquare,
  Building2,
  Mail,
  Github,
  BookText,
  type LucideIcon,
} from "lucide-react";
import {
  PageHeader,
  Btn,
  StatTile,
  StatusBadge,
  Panel,
} from "@/components/dashboard/ui";
import { LogoMark } from "@/components/brand/logo";

export const metadata: Metadata = { title: "Memory · Ocur" };

const nodes = [
  { label: "Customers", x: 50, y: 10 },
  { label: "Deals", x: 85, y: 30 },
  { label: "Products", x: 85, y: 72 },
  { label: "People", x: 50, y: 90 },
  { label: "Vendors", x: 15, y: 72 },
  { label: "Policies", x: 15, y: 30 },
];

function MemoryGraph() {
  return (
    <div className="relative mx-auto aspect-[16/11] w-full max-w-[560px]">
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden>
        <defs>
          <linearGradient id="mem-line" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#7167FA" stopOpacity="0.55" />
            <stop offset="1" stopColor="#5EE6C8" stopOpacity="0.15" />
          </linearGradient>
        </defs>
        {nodes.map((n) => (
          <line key={n.label} x1="50" y1="50" x2={n.x} y2={n.y} stroke="url(#mem-line)" strokeWidth="0.4" />
        ))}
        {/* a couple cross links */}
        <line x1={nodes[0].x} y1={nodes[0].y} x2={nodes[1].x} y2={nodes[1].y} stroke="url(#mem-line)" strokeWidth="0.3" />
        <line x1={nodes[2].x} y1={nodes[2].y} x2={nodes[3].x} y2={nodes[3].y} stroke="url(#mem-line)" strokeWidth="0.3" />
        <circle cx="50" cy="50" r="26" fill="url(#mem-line)" opacity="0.05" />
      </svg>

      <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
        <div className="grid h-20 w-20 place-items-center rounded-full border border-white/10 bg-ink-850/90 shadow-glow backdrop-blur-xl">
          <div className="flex flex-col items-center gap-1">
            <LogoMark className="h-6 w-6" />
            <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-chalk-soft">
              Graph
            </span>
          </div>
        </div>
      </div>

      {nodes.map((n) => (
        <div
          key={n.label}
          className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${n.x}%`, top: `${n.y}%` }}
        >
          <div className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-ink-850/80 px-2.5 py-1.5 backdrop-blur-xl">
            <span className="h-1.5 w-1.5 rounded-full bg-mint-400" />
            <span className="text-xs font-medium text-chalk">{n.label}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

const writes = [
  { agent: "Atlas", text: "linked account Vantage → signal “Series B raised”", t: "2m" },
  { agent: "Echo", text: "clustered 142 tickets → theme “billing confusion”", t: "8m" },
  { agent: "Ledger", text: "recorded May close facts (revenue, AR, runway)", t: "21m" },
  { agent: "Sentinel", text: "noted new trusted device for jia@northwind", t: "34m" },
  { agent: "Beacon", text: "updated definition of the North-Star metric", t: "52m" },
];

const sources: { name: string; meta: string; sync: string; icon: LucideIcon }[] = [
  { name: "Documents", meta: "12,480 docs · Drive", sync: "2m ago", icon: FileText },
  { name: "Slack", meta: "1.2M messages", sync: "live", icon: MessageSquare },
  { name: "Salesforce", meta: "38k records · CRM", sync: "5m ago", icon: Building2 },
  { name: "Gmail", meta: "412k threads", sync: "1m ago", icon: Mail },
  { name: "Codebase", meta: "9 repos · GitHub", sync: "8m ago", icon: Github },
  { name: "Wiki", meta: "3,210 pages · Notion", sync: "3m ago", icon: BookText },
];

export default function MemoryPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <PageHeader
        title="Memory"
        description="The living knowledge graph every agent reads and writes — context that compounds with every decision."
      >
        <Btn icon={Search}>Query memory</Btn>
        <Btn variant="primary" icon={Plus}>
          Add source
        </Btn>
      </PageHeader>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatTile label="Memory nodes" value="1.42M" icon={Network} delta={6} />
        <StatTile label="Sources" value="14" icon={Database} sub="all healthy" />
        <StatTile label="Embeddings" value="8.9M" icon={Layers} sub="indexed" />
        <StatTile label="Freshness" value="98%" icon={Clock} sub="under 24h old" />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          <Panel
            title="Knowledge graph"
            action={<StatusBadge tone="mint" pulse>live</StatusBadge>}
          >
            <div className="p-6">
              <MemoryGraph />
            </div>
          </Panel>

          <Panel title="Recent memory writes">
            <ul className="divide-y divide-white/[0.05]">
              {writes.map((w, i) => (
                <li key={i} className="flex items-start gap-3 px-6 py-3.5">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-iris-400" />
                  <p className="flex-1 text-xs leading-relaxed text-chalk-muted">
                    <span className="font-medium text-chalk-soft">{w.agent}</span> {w.text}
                  </p>
                  <span className="font-mono text-2xs text-chalk-faint">{w.t}</span>
                </li>
              ))}
            </ul>
          </Panel>
        </div>

        <Panel title="Connected sources">
          <ul className="divide-y divide-white/[0.05]">
            {sources.map((s) => (
              <li key={s.name} className="flex items-center gap-3 px-6 py-3.5">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[0.03] text-chalk-soft">
                  <s.icon className="h-4 w-4" strokeWidth={1.75} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-chalk">{s.name}</p>
                  <p className="truncate font-mono text-2xs text-chalk-faint">{s.meta}</p>
                </div>
                <span className="shrink-0 text-right font-mono text-2xs text-chalk-faint">
                  {s.sync}
                </span>
              </li>
            ))}
          </ul>
          <div className="p-4">
            <Btn icon={Plus} className="w-full justify-center">
              Connect a source
            </Btn>
          </div>
        </Panel>
      </div>
    </div>
  );
}
