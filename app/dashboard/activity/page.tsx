import type { Metadata } from "next";
import {
  Download,
  Search,
  Activity as ActivityIcon,
  Zap,
  ShieldCheck,
  AlertTriangle,
  Cpu,
  DollarSign,
  type LucideIcon,
} from "lucide-react";
import {
  PageHeader,
  Btn,
  Segmented,
  StatTile,
  Panel,
} from "@/components/dashboard/ui";
import { cn } from "@/lib/utils";

export const metadata: Metadata = { title: "Activity · Ocur" };

type Kind = "action" | "approval" | "alert" | "system";

type Event = {
  t: string;
  actor: string;
  text: string;
  meta?: string;
  kind: Kind;
  cost?: string;
};

const kindMeta: Record<Kind, { icon: LucideIcon; ring: string; dot: string }> = {
  action: { icon: Zap, ring: "border-iris-500/30 text-iris-200", dot: "bg-mint-400" },
  approval: { icon: ShieldCheck, ring: "border-iris-500/30 text-iris-200", dot: "bg-iris-400" },
  alert: { icon: AlertTriangle, ring: "border-amber-500/30 text-amber-400", dot: "bg-amber-400" },
  system: { icon: Cpu, ring: "border-white/10 text-chalk-muted", dot: "bg-chalk-faint" },
};

const today: Event[] = [
  { t: "16:32", actor: "Echo", text: "resolved 142 support tickets", meta: "CSAT 4.9 · 0 escalations", kind: "action" },
  { t: "16:18", actor: "Ledger", text: "closed the May books", meta: "0 exceptions · signed off", kind: "action" },
  { t: "15:54", actor: "Atlas", text: "booked 3 meetings", meta: "ACME, Vantage, Lumen", kind: "action" },
  { t: "15:40", actor: "Kernel", text: "requested approval for EMEA campaign spend", meta: "routed to finance@northwind", kind: "approval", cost: "€480k" },
  { t: "15:12", actor: "Sentinel", text: "flagged unusual login location", meta: "auto-challenged · resolved", kind: "alert" },
  { t: "14:47", actor: "Forge", text: "predicted SLA breach → rerouted vendor", meta: "CloudWorks → Hyperion", kind: "action" },
  { t: "14:05", actor: "Kernel", text: "scaled agent pool +4", meta: "load 1.2k tasks/min", kind: "system" },
];

const yesterday: Event[] = [
  { t: "19:21", actor: "Spark", text: "shipped 4 landing-page variants", meta: "experiment #18 live", kind: "action" },
  { t: "18:02", actor: "Quill", text: "blocked auto-send of vendor contract", meta: "held for counsel review", kind: "alert" },
  { t: "11:30", actor: "Cohort", text: "onboarded 2 new hires", meta: "access provisioned", kind: "action" },
];

function Row({ e, last }: { e: Event; last: boolean }) {
  const m = kindMeta[e.kind];
  const Icon = m.icon;
  return (
    <div className="flex gap-4 px-6">
      <div className="flex flex-col items-center">
        <span className={cn("grid h-9 w-9 shrink-0 place-items-center rounded-full border bg-ink-850", m.ring)}>
          <Icon className="h-4 w-4" strokeWidth={1.75} />
        </span>
        {!last && <span className="my-1 w-px flex-1 bg-white/[0.07]" />}
      </div>
      <div className="flex flex-1 items-start justify-between gap-4 pb-6">
        <div className="min-w-0">
          <p className="text-sm text-chalk-soft">
            <span className="font-medium text-chalk">{e.actor}</span> {e.text}
          </p>
          {e.meta && <p className="mt-0.5 font-mono text-2xs text-chalk-faint">{e.meta}</p>}
        </div>
        <div className="flex shrink-0 items-center gap-3">
          {e.cost && (
            <span className="rounded-md bg-iris-500/15 px-1.5 py-0.5 font-mono text-2xs text-iris-200">
              {e.cost}
            </span>
          )}
          <span className="font-mono text-2xs text-chalk-faint">{e.t}</span>
        </div>
      </div>
    </div>
  );
}

export default function ActivityPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <PageHeader
        title="Activity"
        description="A complete, exportable trace of every decision — what ran, why, and what it cost."
      >
        <Segmented items={["All", "Actions", "Approvals", "Alerts"]} active="All" />
        <Btn icon={Search}>Filter</Btn>
        <Btn variant="primary" icon={Download}>
          Export
        </Btn>
      </PageHeader>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatTile label="Events · 24h" value="8,412" icon={ActivityIcon} delta={14} />
        <StatTile label="Actions taken" value="7,980" icon={Zap} delta={15} />
        <StatTile label="Approvals" value="38" icon={ShieldCheck} sub="3 pending" />
        <StatTile label="Cost · 24h" value="$1,940" icon={DollarSign} delta={-38} />
      </div>

      <Panel title="Event log" action={<span className="font-mono text-2xs text-chalk-faint">live stream</span>}>
        <div className="px-0 py-5">
          <p className="px-6 pb-4 font-mono text-2xs uppercase tracking-[0.18em] text-chalk-faint">
            Today
          </p>
          {today.map((e, i) => (
            <Row key={i} e={e} last={false} />
          ))}
          <p className="px-6 pb-4 pt-2 font-mono text-2xs uppercase tracking-[0.18em] text-chalk-faint">
            Yesterday
          </p>
          {yesterday.map((e, i) => (
            <Row key={i} e={e} last={i === yesterday.length - 1} />
          ))}
        </div>
      </Panel>
    </div>
  );
}
