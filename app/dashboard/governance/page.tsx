import type { Metadata } from "next";
import {
  Plus,
  Check,
  ShieldCheck,
  ScrollText,
  Wallet,
  Ban,
  type LucideIcon,
} from "lucide-react";
import {
  PageHeader,
  Btn,
  StatTile,
  StatusBadge,
  Panel,
} from "@/components/dashboard/ui";
import { cn } from "@/lib/utils";

export const metadata: Metadata = { title: "Governance · Ocur" };

const approvals = [
  { title: "Spend €480k on Q3 EMEA campaign", agent: "Spark", reason: "Above finance threshold" },
  { title: "Sign vendor contract — CloudWorks", agent: "Forge", reason: "Legal review required" },
  { title: "Send Q2 brief to the board", agent: "Atlas", reason: "External comms" },
];

const policies: { name: string; scope: string; on: boolean }[] = [
  { name: "Spend over €100k requires approval", scope: "Finance", on: true },
  { name: "PII must stay in the EU region", scope: "Data", on: true },
  { name: "External comms need human review", scope: "Comms", on: true },
  { name: "Production deploys gated by tests", scope: "Engineering", on: true },
  { name: "Vendor contracts route to legal", scope: "Legal", on: true },
  { name: "Auto-pause agent on 3 failures", scope: "Reliability", on: false },
];

const spend: { fn: string; used: number; budget: number }[] = [
  { fn: "Revenue", used: 148, budget: 200 },
  { fn: "Growth", used: 96, budget: 120 },
  { fn: "Operations", used: 74, budget: 180 },
  { fn: "People", used: 40, budget: 100 },
];

const blocked: { agent: string; text: string; reason: string; tone: "red" | "amber" }[] = [
  { agent: "Spark", text: "attempted spend €620k", reason: "over campaign budget", tone: "red" },
  { agent: "Echo", text: "tried to share customer PII", reason: "data-residency policy", tone: "red" },
  { agent: "Forge", text: "auto-send external email", reason: "held for review", tone: "amber" },
];

function Toggle({ on }: { on: boolean }) {
  return (
    <span
      className={cn(
        "relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors",
        on ? "bg-iris-500/70" : "bg-white/10"
      )}
    >
      <span
        className={cn(
          "inline-block h-4 w-4 transform rounded-full bg-chalk transition-transform",
          on ? "translate-x-4" : "translate-x-0.5"
        )}
      />
    </span>
  );
}

export default function GovernancePage() {
  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <PageHeader
        title="Governance"
        description="Policies, approvals, and budgets enforced on every action — with humans in the loop exactly where you want them."
      >
        <Btn variant="primary" icon={Plus}>
          New policy
        </Btn>
      </PageHeader>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatTile label="Active policies" value="24" icon={ScrollText} sub="5 scopes" />
        <StatTile label="Pending approvals" value="3" icon={ShieldCheck} sub="oldest 18m" />
        <StatTile label="Spend · month" value="$358k" icon={Wallet} sub="of $600k budget" />
        <StatTile label="Blocked · 24h" value="12" icon={Ban} sub="all by policy" />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          {/* Approvals */}
          <Panel
            title="Pending approvals"
            action={
              <span className="rounded-md bg-iris-500/15 px-1.5 py-0.5 font-mono text-2xs text-iris-200">
                {approvals.length}
              </span>
            }
          >
            <div className="space-y-3 p-4">
              {approvals.map((a) => (
                <div key={a.title} className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-medium leading-snug text-chalk">{a.title}</p>
                      <p className="mt-1.5 text-2xs text-chalk-faint">
                        <span className="font-mono text-iris-300/90">{a.agent}</span> · {a.reason}
                      </p>
                    </div>
                    <div className="flex shrink-0 gap-2">
                      <button className="inline-flex items-center gap-1.5 rounded-lg bg-chalk px-3 py-1.5 text-xs font-medium text-ink-950 transition-colors hover:bg-white">
                        <Check className="h-3.5 w-3.5" />
                        Approve
                      </button>
                      <button className="rounded-lg border border-white/10 bg-white/[0.02] px-3 py-1.5 text-xs text-chalk-soft transition-colors hover:bg-white/[0.05]">
                        Review
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Panel>

          {/* Policies */}
          <Panel title="Policies">
            <div className="divide-y divide-white/[0.05]">
              {policies.map((p) => (
                <div key={p.name} className="flex items-center gap-4 px-6 py-3.5">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-chalk">{p.name}</p>
                    <p className="font-mono text-2xs uppercase tracking-wider text-chalk-faint">
                      {p.scope}
                    </p>
                  </div>
                  <StatusBadge tone={p.on ? "mint" : "faint"} dot={false}>
                    {p.on ? "enforced" : "off"}
                  </StatusBadge>
                  <Toggle on={p.on} />
                </div>
              ))}
            </div>
          </Panel>
        </div>

        {/* Right column */}
        <div className="space-y-4">
          <Panel title="Spend by function" action={<span className="font-mono text-2xs text-chalk-faint">this month</span>}>
            <div className="space-y-4 p-6">
              {spend.map((s) => {
                const pct = Math.round((s.used / s.budget) * 100);
                const hot = pct >= 80;
                return (
                  <div key={s.fn}>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-chalk-soft">{s.fn}</span>
                      <span className="font-mono text-2xs text-chalk-faint">
                        ${s.used}k / ${s.budget}k
                      </span>
                    </div>
                    <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
                      <div
                        className={cn(
                          "h-full rounded-full",
                          hot ? "bg-amber-400" : "bg-gradient-to-r from-iris-500 to-mint-400"
                        )}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </Panel>

          <Panel title="Recently blocked">
            <ul className="divide-y divide-white/[0.05]">
              {blocked.map((b, i) => (
                <li key={i} className="flex items-start gap-3 px-6 py-3.5">
                  <Ban
                    className={cn(
                      "mt-0.5 h-4 w-4 shrink-0",
                      b.tone === "red" ? "text-red-400" : "text-amber-400"
                    )}
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs leading-relaxed text-chalk-soft">
                      <span className="font-medium text-chalk">{b.agent}</span> {b.text}
                    </p>
                    <p className="font-mono text-2xs text-chalk-faint">{b.reason}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Panel>
        </div>
      </div>
    </div>
  );
}
