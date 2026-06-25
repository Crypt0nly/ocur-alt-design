import type { Metadata } from "next";
import {
  TrendingUp,
  Wallet,
  Headphones,
  Workflow,
  Users,
  Megaphone,
  Scale,
  ShieldAlert,
  BarChart3,
  Plus,
  Boxes,
  CheckCircle2,
  AlertTriangle,
  Gauge,
  type LucideIcon,
} from "lucide-react";
import {
  PageHeader,
  Btn,
  Segmented,
  StatTile,
  StatusBadge,
  Tag,
  IconChip,
} from "@/components/dashboard/ui";

export const metadata: Metadata = { title: "Agents · Ocur" };

type State = "active" | "idle" | "paused";

type Agent = {
  name: string;
  role: string;
  icon: LucideIcon;
  state: State;
  task: string;
  tasks: number;
  success: number;
  latency: string;
  model: string;
  tools: string[];
};

const agents: Agent[] = [
  { name: "Atlas", role: "Revenue", icon: TrendingUp, state: "active", task: "Following up — Vantage (Series B)", tasks: 248, success: 96, latency: "1.4s", model: "Ocur-Prime", tools: ["Salesforce", "Gmail", "Calendar"] },
  { name: "Ledger", role: "Finance", icon: Wallet, state: "active", task: "Reconciling May ledgers", tasks: 96, success: 99, latency: "2.1s", model: "Ocur-Prime", tools: ["QuickBooks", "Stripe", "Snowflake"] },
  { name: "Echo", role: "Support", icon: Headphones, state: "active", task: "Clearing ticket backlog", tasks: 412, success: 94, latency: "0.9s", model: "Ocur-Swift", tools: ["Zendesk", "Slack", "Docs"] },
  { name: "Forge", role: "Operations", icon: Workflow, state: "active", task: "Rerouting EU vendor SLA", tasks: 173, success: 97, latency: "1.7s", model: "Ocur-Prime", tools: ["Linear", "PagerDuty", "S3"] },
  { name: "Cohort", role: "People", icon: Users, state: "idle", task: "Awaiting interview feedback", tasks: 38, success: 98, latency: "1.2s", model: "Ocur-Swift", tools: ["Greenhouse", "Gmail", "Notion"] },
  { name: "Spark", role: "Growth", icon: Megaphone, state: "active", task: "Launching EMEA campaign", tasks: 121, success: 92, latency: "1.5s", model: "Ocur-Prime", tools: ["HubSpot", "GA4", "Figma"] },
  { name: "Quill", role: "Legal", icon: Scale, state: "paused", task: "Paused — awaiting counsel review", tasks: 27, success: 99, latency: "3.0s", model: "Ocur-Prime", tools: ["Ironclad", "Drive", "DocuSign"] },
  { name: "Sentinel", role: "Security", icon: ShieldAlert, state: "active", task: "Monitoring access anomalies", tasks: 64, success: 99, latency: "0.6s", model: "Ocur-Swift", tools: ["Okta", "GitHub", "Datadog"] },
  { name: "Beacon", role: "Analytics", icon: BarChart3, state: "active", task: "Refreshing exec dashboards", tasks: 89, success: 98, latency: "2.4s", model: "Ocur-Prime", tools: ["Snowflake", "dbt", "Looker"] },
];

const toneFor: Record<State, "mint" | "faint" | "amber"> = {
  active: "mint",
  idle: "faint",
  paused: "amber",
};

function AgentCard({ a }: { a: Agent }) {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-3xl border border-white/[0.07] bg-ink-900/40 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-white/[0.16]">
      <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[radial-gradient(closest-side,rgba(113,103,250,0.14),transparent)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="relative flex items-start justify-between">
        <IconChip icon={a.icon} className="h-11 w-11" />
        <StatusBadge tone={toneFor[a.state]} pulse={a.state === "active"}>
          {a.state}
        </StatusBadge>
      </div>

      <div className="relative mt-4 flex items-baseline gap-2">
        <h3 className="text-lg font-semibold tracking-tight text-chalk">{a.name}</h3>
        <span className="font-mono text-2xs uppercase tracking-[0.15em] text-iris-300/90">
          {a.role}
        </span>
      </div>
      <p className="relative mt-1.5 line-clamp-1 text-xs text-chalk-muted">{a.task}</p>

      <div className="relative mt-5 grid grid-cols-3 gap-2 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-3 text-center">
        <div>
          <p className="text-sm font-semibold text-chalk">{a.tasks}</p>
          <p className="font-mono text-[10px] text-chalk-faint">tasks/24h</p>
        </div>
        <div className="border-x border-white/[0.06]">
          <p className="text-sm font-semibold text-mint-400">{a.success}%</p>
          <p className="font-mono text-[10px] text-chalk-faint">success</p>
        </div>
        <div>
          <p className="text-sm font-semibold text-chalk">{a.latency}</p>
          <p className="font-mono text-[10px] text-chalk-faint">latency</p>
        </div>
      </div>

      <div className="relative mt-4 flex flex-wrap gap-1.5">
        {a.tools.map((t) => (
          <Tag key={t}>{t}</Tag>
        ))}
      </div>

      <div className="relative mt-5 flex items-center justify-between border-t border-white/[0.06] pt-4">
        <span className="font-mono text-2xs text-chalk-faint">{a.model}</span>
        <button className="text-xs font-medium text-iris-200 transition-colors hover:text-iris-100">
          Manage →
        </button>
      </div>
    </div>
  );
}

export default function AgentsPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <PageHeader
        title="Agents"
        description="Your autonomous workforce. Deploy, configure, and supervise every agent — each coordinates through the kernel."
      >
        <Segmented items={["All", "Active", "Idle", "Paused"]} active="All" />
        <Btn variant="primary" icon={Plus}>
          Deploy agent
        </Btn>
      </PageHeader>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatTile label="Active agents" value="7 / 9" icon={Boxes} sub="2 idle or paused" />
        <StatTile label="Tasks · 24h" value="1,268" icon={Gauge} delta={18} />
        <StatTile label="Avg success" value="96.8%" icon={CheckCircle2} delta={2} />
        <StatTile label="Escalations" value="4" icon={AlertTriangle} sub="all resolved" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {agents.map((a) => (
          <AgentCard key={a.name} a={a} />
        ))}
      </div>
    </div>
  );
}
