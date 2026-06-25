import type { Metadata } from "next";
import {
  Plus,
  Plug,
  Activity,
  LayoutGrid,
  HeartPulse,
  MessageSquare,
  Mail,
  Building2,
  CreditCard,
  Database,
  Github,
  FileText,
  Calculator,
  LifeBuoy,
  SquareKanban,
  Boxes,
  Siren,
  type LucideIcon,
} from "lucide-react";
import {
  PageHeader,
  Btn,
  Segmented,
  StatTile,
  StatusBadge,
} from "@/components/dashboard/ui";

export const metadata: Metadata = { title: "Integrations · Ocur" };

type Conn = {
  name: string;
  cat: string;
  icon: LucideIcon;
  state: "connected" | "syncing" | "error";
  calls: string;
  sync: string;
};

const connected: Conn[] = [
  { name: "Slack", cat: "Comms", icon: MessageSquare, state: "connected", calls: "48.2k", sync: "live" },
  { name: "Gmail", cat: "Comms", icon: Mail, state: "connected", calls: "12.9k", sync: "1m ago" },
  { name: "Salesforce", cat: "CRM", icon: Building2, state: "connected", calls: "31.4k", sync: "5m ago" },
  { name: "Stripe", cat: "Payments", icon: CreditCard, state: "connected", calls: "6.1k", sync: "2m ago" },
  { name: "Snowflake", cat: "Data", icon: Database, state: "syncing", calls: "2.3k", sync: "syncing…" },
  { name: "GitHub", cat: "Dev", icon: Github, state: "connected", calls: "9.7k", sync: "8m ago" },
  { name: "Notion", cat: "Docs", icon: FileText, state: "connected", calls: "4.4k", sync: "3m ago" },
  { name: "QuickBooks", cat: "Finance", icon: Calculator, state: "error", calls: "—", sync: "auth expired" },
];

const available: { name: string; cat: string; icon: LucideIcon }[] = [
  { name: "Zendesk", cat: "Support", icon: LifeBuoy },
  { name: "Linear", cat: "Dev", icon: SquareKanban },
  { name: "HubSpot", cat: "CRM", icon: Boxes },
  { name: "PagerDuty", cat: "Ops", icon: Siren },
];

function Toggle({ on }: { on: boolean }) {
  return (
    <span
      className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
        on ? "bg-iris-500/70" : "bg-white/10"
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-chalk transition-transform ${
          on ? "translate-x-4" : "translate-x-0.5"
        }`}
      />
    </span>
  );
}

const tone = { connected: "mint", syncing: "iris", error: "red" } as const;

export default function IntegrationsPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <PageHeader
        title="Integrations"
        description="Agents act through your real systems of record. Connect in minutes — or wire anything via the open MCP, REST, and webhook layer."
      >
        <Segmented items={["All", "Connected", "Available"]} active="All" />
        <Btn variant="primary" icon={Plus}>
          Browse catalog
        </Btn>
      </PageHeader>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatTile label="Connected" value="14" icon={Plug} sub="across 8 categories" />
        <StatTile label="API calls · 24h" value="184k" icon={Activity} delta={9} />
        <StatTile label="Categories" value="8" icon={LayoutGrid} sub="Comms, CRM, Data…" />
        <StatTile label="Health" value="13 / 14" icon={HeartPulse} sub="1 needs attention" />
      </div>

      <div>
        <h2 className="mb-3 text-sm font-medium text-chalk">Connected</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {connected.map((c) => (
            <div
              key={c.name}
              className="group rounded-3xl border border-white/[0.07] bg-ink-900/40 p-5 backdrop-blur-sm transition-colors duration-300 hover:border-white/[0.16]"
            >
              <div className="flex items-start justify-between">
                <span className="grid h-11 w-11 place-items-center rounded-2xl border border-white/10 bg-white/[0.03] text-chalk-soft transition-colors group-hover:text-iris-200">
                  <c.icon className="h-5 w-5" strokeWidth={1.75} />
                </span>
                <Toggle on={c.state !== "error"} />
              </div>
              <div className="mt-4 flex items-baseline gap-2">
                <p className="text-sm font-medium text-chalk">{c.name}</p>
                <span className="font-mono text-2xs uppercase tracking-wider text-chalk-faint">
                  {c.cat}
                </span>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <StatusBadge tone={tone[c.state]} pulse={c.state !== "connected"}>
                  {c.state}
                </StatusBadge>
                <span className="font-mono text-2xs text-chalk-faint">{c.sync}</span>
              </div>
              <p className="mt-3 border-t border-white/[0.06] pt-3 font-mono text-2xs text-chalk-faint">
                {c.calls} calls · 24h
              </p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="mb-3 text-sm font-medium text-chalk">Available</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {available.map((a) => (
            <div
              key={a.name}
              className="flex items-center gap-3 rounded-3xl border border-white/[0.07] bg-ink-900/40 p-5 backdrop-blur-sm"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-white/10 bg-white/[0.03] text-chalk-soft">
                <a.icon className="h-5 w-5" strokeWidth={1.75} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-chalk">{a.name}</p>
                <span className="font-mono text-2xs uppercase tracking-wider text-chalk-faint">
                  {a.cat}
                </span>
              </div>
              <Btn className="shrink-0">Connect</Btn>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
