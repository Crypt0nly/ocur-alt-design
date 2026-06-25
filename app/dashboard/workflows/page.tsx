import type { Metadata } from "next";
import {
  Plus,
  Play,
  CalendarClock,
  CheckCircle2,
  Activity,
  Wallet,
  Target,
  ShieldAlert,
  UserPlus,
  type LucideIcon,
} from "lucide-react";
import {
  PageHeader,
  Btn,
  Segmented,
  StatTile,
  StatusBadge,
  Panel,
  Progress,
} from "@/components/dashboard/ui";

export const metadata: Metadata = { title: "Workflows · Ocur" };

type WState = "running" | "scheduled" | "review" | "completed";

type Flow = {
  name: string;
  trigger: string;
  agents: string[];
  progress: number;
  state: WState;
  when: string;
};

const flows: Flow[] = [
  { name: "Q3 EMEA Expansion", trigger: "Manual · directive", agents: ["A", "S", "L", "F"], progress: 68, state: "running", when: "started 2h ago" },
  { name: "Enterprise onboarding — ACME", trigger: "Trigger · deal won", agents: ["F", "C", "E"], progress: 34, state: "running", when: "started 40m ago" },
  { name: "Support backlog cleanup", trigger: "Schedule · hourly", agents: ["E"], progress: 82, state: "running", when: "started 12m ago" },
  { name: "Month-end Close — May", trigger: "Schedule · monthly", agents: ["L", "B"], progress: 100, state: "review", when: "awaiting sign-off" },
  { name: "Weekly pipeline review", trigger: "Schedule · Mon 08:00", agents: ["A", "B"], progress: 0, state: "scheduled", when: "in 3 days" },
  { name: "Quarterly access audit", trigger: "Schedule · quarterly", agents: ["S"], progress: 0, state: "scheduled", when: "in 9 days" },
  { name: "Renewal outreach — Q2 cohort", trigger: "Trigger · 60d pre-renewal", agents: ["A", "E"], progress: 100, state: "completed", when: "2h ago" },
];

const stateTone: Record<WState, "mint" | "iris" | "amber" | "faint"> = {
  running: "mint",
  scheduled: "iris",
  review: "amber",
  completed: "faint",
};

const templates: { name: string; desc: string; icon: LucideIcon }[] = [
  { name: "Month-end close", desc: "Reconcile, review, and report — hands-off.", icon: Wallet },
  { name: "Lead → meeting", desc: "Qualify inbound and book the call.", icon: Target },
  { name: "Incident response", desc: "Detect, triage, mitigate, and post-mortem.", icon: ShieldAlert },
  { name: "Employee onboarding", desc: "Provision, schedule, and welcome new hires.", icon: UserPlus },
];

function Avatars({ initials }: { initials: string[] }) {
  return (
    <div className="flex -space-x-2">
      {initials.map((i, idx) => (
        <span
          key={idx}
          className="grid h-6 w-6 place-items-center rounded-full border border-ink-900 bg-gradient-to-br from-iris-400 to-mint-400 text-[10px] font-semibold text-ink-950"
        >
          {i}
        </span>
      ))}
    </div>
  );
}

export default function WorkflowsPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <PageHeader
        title="Workflows"
        description="Multi-agent processes that run on triggers, schedules, or a single directive — fully traced end to end."
      >
        <Segmented items={["Running", "Scheduled", "Completed", "Drafts"]} active="Running" />
        <Btn variant="primary" icon={Plus}>
          New workflow
        </Btn>
      </PageHeader>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatTile label="Running now" value="37" icon={Play} delta={4} />
        <StatTile label="Scheduled" value="18" icon={CalendarClock} sub="next in 3h" />
        <StatTile label="Completed · 24h" value="206" icon={CheckCircle2} delta={11} />
        <StatTile label="Success rate" value="98.4%" icon={Activity} delta={1} />
      </div>

      <Panel title="Workflows" action={<span className="font-mono text-2xs text-chalk-faint">{flows.length} shown</span>}>
        {/* header row */}
        <div className="hidden grid-cols-[1.6fr_0.6fr_1fr_0.7fr_0.8fr] gap-4 border-b border-white/[0.06] px-6 py-2.5 font-mono text-2xs uppercase tracking-wider text-chalk-faint lg:grid">
          <span>Workflow</span>
          <span>Agents</span>
          <span>Progress</span>
          <span>Status</span>
          <span className="text-right">Last run</span>
        </div>
        <div className="divide-y divide-white/[0.05]">
          {flows.map((f) => (
            <div
              key={f.name}
              className="grid grid-cols-1 gap-3 px-6 py-4 transition-colors hover:bg-white/[0.02] lg:grid-cols-[1.6fr_0.6fr_1fr_0.7fr_0.8fr] lg:items-center lg:gap-4"
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-chalk">{f.name}</p>
                <p className="font-mono text-2xs text-chalk-faint">{f.trigger}</p>
              </div>
              <div>
                <Avatars initials={f.agents} />
              </div>
              <div className="flex items-center gap-3">
                <Progress
                  value={f.progress}
                  tone={f.state === "review" ? "spectral" : "mint"}
                  className="max-w-[140px]"
                />
                <span className="font-mono text-2xs text-chalk-muted">{f.progress}%</span>
              </div>
              <div>
                <StatusBadge tone={stateTone[f.state]} pulse={f.state === "running"}>
                  {f.state}
                </StatusBadge>
              </div>
              <p className="font-mono text-2xs text-chalk-faint lg:text-right">{f.when}</p>
            </div>
          ))}
        </div>
      </Panel>

      <div>
        <h2 className="mb-3 text-sm font-medium text-chalk">Start from a template</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {templates.map((t) => (
            <button
              key={t.name}
              className="group rounded-3xl border border-white/[0.07] bg-ink-900/40 p-5 text-left backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-white/[0.16]"
            >
              <span className="grid h-10 w-10 place-items-center rounded-2xl border border-white/10 bg-white/[0.03] text-iris-200">
                <t.icon className="h-[18px] w-[18px]" strokeWidth={1.75} />
              </span>
              <p className="mt-4 text-sm font-medium text-chalk">{t.name}</p>
              <p className="mt-1 text-xs leading-relaxed text-chalk-muted">{t.desc}</p>
              <span className="mt-4 inline-block font-mono text-2xs text-iris-200 opacity-0 transition-opacity group-hover:opacity-100">
                use template →
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
