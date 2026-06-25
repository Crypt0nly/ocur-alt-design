import {
  TrendingUp,
  Wallet,
  Headphones,
  Workflow,
  Users,
  Megaphone,
  Check,
  Clock,
  Download,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Panel, Delta, Sparkline } from "@/components/dashboard/ui";

/* ---------------- data ---------------- */

const kpis = [
  { label: "Tasks automated", value: "1,284", delta: 18, good: true, data: [12, 18, 14, 22, 19, 28, 31, 27, 34, 30, 38, 42] },
  { label: "Human hours saved", value: "3,910", delta: 12, good: true, data: [40, 44, 41, 50, 48, 55, 61, 58, 66, 70, 74, 80] },
  { label: "Active workflows", value: "37", delta: 4, good: true, data: [22, 25, 24, 28, 30, 29, 33, 31, 34, 35, 36, 37] },
  { label: "Operating spend", value: "$1,940", delta: -38, good: true, data: [80, 72, 66, 60, 54, 48, 44, 40, 36, 30, 28, 24] },
];

const throughput = [34, 41, 38, 52, 47, 58, 63, 55, 71, 66, 78, 74, 82, 77, 88, 84, 92, 86, 95, 90, 81, 73, 69, 64];

type Agent = {
  name: string; role: string; icon: LucideIcon; task: string; load: number; tasks: number; state: "active" | "idle";
};
const agents: Agent[] = [
  { name: "Atlas", role: "Revenue", icon: TrendingUp, task: "Following up — Vantage (Series B)", load: 72, tasks: 248, state: "active" },
  { name: "Echo", role: "Support", icon: Headphones, task: "Clearing ticket backlog", load: 88, tasks: 412, state: "active" },
  { name: "Ledger", role: "Finance", icon: Wallet, task: "Reconciling May ledgers", load: 40, tasks: 96, state: "active" },
  { name: "Forge", role: "Operations", icon: Workflow, task: "Rerouting EU vendor SLA", load: 64, tasks: 173, state: "active" },
  { name: "Spark", role: "Growth", icon: Megaphone, task: "Launching EMEA campaign", load: 55, tasks: 121, state: "active" },
  { name: "Cohort", role: "People", icon: Users, task: "Onboarding 3 engineers", load: 22, tasks: 38, state: "idle" },
];

const approvals = [
  { title: "Spend €480k on Q3 EMEA campaign", agent: "Spark", reason: "Above finance threshold" },
  { title: "Sign vendor contract — CloudWorks", agent: "Forge", reason: "Legal review required" },
  { title: "Send Q2 brief to the board", agent: "Atlas", reason: "External comms" },
];

const activity = [
  { t: "2m", agent: "Echo", text: "resolved 142 tickets · CSAT 4.9", tone: "mint" },
  { t: "6m", agent: "Ledger", text: "closed May books — 0 exceptions", tone: "mint" },
  { t: "11m", agent: "Atlas", text: "booked 3 meetings · ACME, Vantage, Lumen", tone: "mint" },
  { t: "18m", agent: "Forge", text: "predicted SLA breach → rerouted vendor", tone: "iris" },
  { t: "24m", agent: "Spark", text: "shipped 4 landing-page variants", tone: "mint" },
  { t: "31m", agent: "Cohort", text: "onboarded 2 new hires", tone: "mint" },
];

const workflows = [
  { name: "Q3 EMEA Expansion", agents: 6, progress: 68, state: "running" },
  { name: "Month-end Close — May", agents: 2, progress: 100, state: "review" },
  { name: "Enterprise onboarding — ACME", agents: 4, progress: 34, state: "running" },
  { name: "Support backlog cleanup", agents: 1, progress: 82, state: "running" },
];

/* ---------------- page ---------------- */

export default function DashboardOverview() {
  return (
    <div className="mx-auto max-w-7xl space-y-6">
      {/* header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="animate-fade-up">
          <h1 className="text-2xl font-semibold tracking-tight text-chalk">
            Good morning, Dana
          </h1>
          <p className="mt-1 text-sm text-chalk-muted">
            Here's everything Ocur ran while you were away.
          </p>
        </div>
        <div className="flex items-center gap-2 animate-fade-up animation-delay-100">
          <div className="flex rounded-xl border border-white/[0.08] bg-white/[0.02] p-1">
            {["24H", "7D", "30D"].map((t) => (
              <button
                key={t}
                className={cn(
                  "rounded-lg px-3 py-1.5 font-mono text-2xs transition-colors",
                  t === "7D"
                    ? "bg-white/[0.07] text-chalk"
                    : "text-chalk-faint hover:text-chalk-soft"
                )}
              >
                {t}
              </button>
            ))}
          </div>
          <button className="inline-flex h-9 items-center gap-1.5 rounded-xl border border-white/[0.08] bg-white/[0.02] px-3 text-xs text-chalk-soft transition-colors hover:bg-white/[0.05]">
            <Download className="h-3.5 w-3.5" />
            Export
          </button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((k, i) => (
          <div
            key={k.label}
            className={cn(
              "rounded-3xl border border-white/[0.07] bg-ink-900/40 p-5 backdrop-blur-sm animate-fade-up",
              i === 1 && "animation-delay-100",
              i === 2 && "animation-delay-200",
              i === 3 && "animation-delay-300"
            )}
          >
            <div className="flex items-center justify-between">
              <p className="text-xs text-chalk-muted">{k.label}</p>
              <Delta value={k.delta} good={k.good} />
            </div>
            <p className="mt-2 text-3xl font-semibold tracking-tight text-chalk">
              {k.value}
            </p>
            <div className="mt-2">
              <Sparkline data={k.data} />
            </div>
          </div>
        ))}
      </div>

      {/* main grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          {/* throughput */}
          <Panel
            title="Throughput"
            action={
              <div className="flex items-center gap-4 font-mono text-2xs text-chalk-faint">
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-sm bg-iris-400" />
                  tasks / hour
                </span>
                <span className="text-mint-400">▲ 24% vs. prev</span>
              </div>
            }
          >
            <div className="px-6 py-6">
              <div className="flex h-44 items-end gap-1.5">
                {throughput.map((h, i) => (
                  <div
                    key={i}
                    className="group/bar relative flex-1 rounded-t bg-gradient-to-t from-iris-600/30 to-iris-400/70 transition-colors hover:from-iris-500/50 hover:to-mint-400/80"
                    style={{ height: `${h}%` }}
                  >
                    <span className="pointer-events-none absolute -top-7 left-1/2 -translate-x-1/2 rounded-md border border-white/10 bg-ink-850 px-1.5 py-0.5 font-mono text-2xs text-chalk opacity-0 transition-opacity group-hover/bar:opacity-100">
                      {Math.round(h * 12)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-3 flex justify-between font-mono text-2xs text-chalk-faint">
                <span>00:00</span>
                <span>06:00</span>
                <span>12:00</span>
                <span>18:00</span>
                <span>now</span>
              </div>
            </div>
          </Panel>

          {/* agents */}
          <Panel
            title="Agent workforce"
            action={
              <span className="font-mono text-2xs text-chalk-faint">
                6 online
              </span>
            }
          >
            <div className="divide-y divide-white/[0.05]">
              {agents.map((a) => (
                <div
                  key={a.name}
                  className="flex items-center gap-4 px-6 py-3.5 transition-colors hover:bg-white/[0.02]"
                >
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[0.03] text-iris-200">
                    <a.icon className="h-4 w-4" strokeWidth={1.75} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline gap-2">
                      <span className="text-sm font-medium text-chalk">
                        {a.name}
                      </span>
                      <span className="font-mono text-2xs uppercase tracking-wider text-chalk-faint">
                        {a.role}
                      </span>
                    </div>
                    <p className="truncate text-xs text-chalk-muted">{a.task}</p>
                  </div>
                  <div className="hidden w-28 sm:block">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-2xs text-chalk-faint">
                        load
                      </span>
                      <span className="font-mono text-2xs text-chalk-muted">
                        {a.load}%
                      </span>
                    </div>
                    <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-iris-500 to-iris-300"
                        style={{ width: `${a.load}%` }}
                      />
                    </div>
                  </div>
                  <div className="hidden w-16 text-right sm:block">
                    <p className="text-sm font-medium text-chalk">{a.tasks}</p>
                    <p className="font-mono text-2xs text-chalk-faint">tasks</p>
                  </div>
                  <span
                    className={cn(
                      "h-2 w-2 shrink-0 rounded-full",
                      a.state === "active" ? "bg-mint-400" : "bg-chalk-faint"
                    )}
                  />
                </div>
              ))}
            </div>
          </Panel>
        </div>

        {/* right column */}
        <div className="space-y-6">
          {/* approvals */}
          <Panel
            title="Needs your approval"
            action={
              <span className="rounded-md bg-iris-500/15 px-1.5 py-0.5 font-mono text-2xs text-iris-200">
                {approvals.length}
              </span>
            }
          >
            <div className="space-y-3 p-4">
              {approvals.map((a) => (
                <div
                  key={a.title}
                  className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4"
                >
                  <p className="text-sm font-medium leading-snug text-chalk">
                    {a.title}
                  </p>
                  <p className="mt-1.5 flex items-center gap-1.5 text-2xs text-chalk-faint">
                    <span className="font-mono text-iris-300/90">{a.agent}</span>
                    · {a.reason}
                  </p>
                  <div className="mt-3 flex gap-2">
                    <button className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-chalk px-3 py-1.5 text-xs font-medium text-ink-950 transition-colors hover:bg-white">
                      <Check className="h-3.5 w-3.5" />
                      Approve
                    </button>
                    <button className="rounded-lg border border-white/10 bg-white/[0.02] px-3 py-1.5 text-xs text-chalk-soft transition-colors hover:bg-white/[0.05]">
                      Review
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </Panel>

          {/* activity */}
          <Panel
            title="Live activity"
            action={
              <span className="inline-flex items-center gap-1.5 font-mono text-2xs text-mint-400">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mint-400 opacity-60" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-mint-400" />
                </span>
                live
              </span>
            }
          >
            <ul className="space-y-1 p-3">
              {activity.map((f, i) => (
                <li
                  key={i}
                  className="flex gap-3 rounded-xl px-3 py-2 transition-colors hover:bg-white/[0.02]"
                >
                  <span
                    className={cn(
                      "mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full",
                      f.tone === "iris" ? "bg-iris-400" : "bg-mint-400"
                    )}
                  />
                  <p className="flex-1 text-xs leading-relaxed text-chalk-muted">
                    <span className="font-medium text-chalk-soft">
                      {f.agent}
                    </span>{" "}
                    {f.text}
                  </p>
                  <span className="font-mono text-2xs text-chalk-faint">
                    {f.t}
                  </span>
                </li>
              ))}
            </ul>
          </Panel>
        </div>
      </div>

      {/* workflows */}
      <Panel
        title="Workflows running"
        action={
          <button className="font-mono text-2xs text-iris-200 transition-colors hover:text-iris-100">
            view all →
          </button>
        }
      >
        <div className="grid gap-px overflow-hidden rounded-b-3xl bg-white/[0.05] sm:grid-cols-2 lg:grid-cols-4">
          {workflows.map((w) => (
            <div key={w.name} className="bg-ink-900 p-5">
              <div className="flex items-start justify-between gap-2">
                <p className="text-sm font-medium leading-snug text-chalk">
                  {w.name}
                </p>
                <span
                  className={cn(
                    "inline-flex shrink-0 items-center gap-1 rounded-md px-1.5 py-0.5 font-mono text-2xs",
                    w.state === "review"
                      ? "bg-iris-500/15 text-iris-200"
                      : "bg-mint-500/10 text-mint-400"
                  )}
                >
                  {w.state === "review" ? (
                    <Clock className="h-3 w-3" />
                  ) : (
                    <span className="h-1.5 w-1.5 rounded-full bg-mint-400" />
                  )}
                  {w.state}
                </span>
              </div>
              <p className="mt-1 font-mono text-2xs text-chalk-faint">
                {w.agents} agents · {w.progress}%
              </p>
              <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
                <div
                  className={cn(
                    "h-full rounded-full",
                    w.state === "review"
                      ? "bg-spectral"
                      : "bg-gradient-to-r from-iris-500 to-mint-400"
                  )}
                  style={{ width: `${w.progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}
