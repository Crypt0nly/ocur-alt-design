import {
  TrendingUp,
  Wallet,
  Headphones,
  Workflow,
  Users,
  Megaphone,
  ArrowUpRight,
  type LucideIcon,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";

type Agent = {
  name: string;
  role: string;
  icon: LucideIcon;
  description: string;
  skills: string[];
  metric: string;
};

const agents: Agent[] = [
  {
    name: "Atlas",
    role: "Revenue",
    icon: TrendingUp,
    description:
      "Sources and qualifies pipeline, runs personalized outreach, books meetings, and keeps the CRM honest.",
    skills: ["Prospecting", "CRM sync", "Forecasting"],
    metric: "248 deals advanced this week",
  },
  {
    name: "Ledger",
    role: "Finance",
    icon: Wallet,
    description:
      "Reconciles transactions, runs payroll, closes the books on schedule, and flags anomalies before they grow.",
    skills: ["Reconciliation", "Payroll", "Close"],
    metric: "$4.2M reconciled · 0 exceptions",
  },
  {
    name: "Echo",
    role: "Support",
    icon: Headphones,
    description:
      "Resolves tickets across every channel, drafts knowledge-base articles, and escalates only the true edge cases.",
    skills: ["Omnichannel", "Triage", "Self-serve docs"],
    metric: "94% resolved without a human",
  },
  {
    name: "Forge",
    role: "Operations",
    icon: Workflow,
    description:
      "Routes work, coordinates vendors, monitors SLAs, and files compliance the moment a threshold is crossed.",
    skills: ["Routing", "Vendors", "SLA watch"],
    metric: "37 workflows running now",
  },
  {
    name: "Cohort",
    role: "People",
    icon: Users,
    description:
      "Screens candidates, schedules interviews, onboards new hires, and answers policy questions instantly.",
    skills: ["Screening", "Onboarding", "Policy"],
    metric: "12 hires onboarded this month",
  },
  {
    name: "Spark",
    role: "Growth",
    icon: Megaphone,
    description:
      "Plans campaigns, drafts and ships content, runs experiments, and reports on CAC and payback in real time.",
    skills: ["Campaigns", "Content", "Experiments"],
    metric: "18 experiments live",
  },
];

function AgentCard({ agent, delay }: { agent: Agent; delay: number }) {
  const Icon = agent.icon;
  return (
    <Reveal
      delay={delay}
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-white/[0.07] bg-ink-900/40 p-7 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-white/[0.16] hover:shadow-panel"
    >
      <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[radial-gradient(closest-side,rgba(113,103,250,0.16),transparent)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="relative flex items-start justify-between">
        <span className="grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-white/[0.03] text-iris-200">
          <Icon className="h-5 w-5" strokeWidth={1.75} />
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.02] px-2.5 py-1 font-mono text-2xs uppercase tracking-wider text-chalk-muted">
          <span className="h-1.5 w-1.5 rounded-full bg-mint-400" />
          online
        </span>
      </div>

      <div className="relative mt-5 flex items-baseline gap-2">
        <h3 className="text-lg font-semibold tracking-tight text-chalk">
          {agent.name}
        </h3>
        <span className="font-mono text-2xs uppercase tracking-[0.15em] text-iris-300/90">
          {agent.role}
        </span>
      </div>

      <p className="relative mt-2.5 text-sm leading-relaxed text-chalk-muted">
        {agent.description}
      </p>

      <div className="relative mt-5 flex flex-wrap gap-2">
        {agent.skills.map((s) => (
          <span
            key={s}
            className="rounded-lg border border-white/[0.07] bg-white/[0.02] px-2.5 py-1 text-2xs text-chalk-soft/80"
          >
            {s}
          </span>
        ))}
      </div>

      <div className="hairline relative mt-6" />
      <div className="relative mt-4 flex items-center justify-between">
        <span className="font-mono text-2xs text-chalk-faint">
          {agent.metric}
        </span>
        <ArrowUpRight className="h-4 w-4 text-chalk-faint transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-chalk" />
      </div>
    </Reveal>
  );
}

export function Agents() {
  return (
    <section id="agents" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-8xl px-5 sm:px-8">
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            kicker="The workforce"
            title={
              <>
                Meet the agents that{" "}
                <span className="text-spectral">run the work</span>.
              </>
            }
            description="Each Ocur agent owns a function end to end. Deploy the full org or start with one — they coordinate through the kernel automatically."
          />
          <Reveal
            delay={0.1}
            className="shrink-0 rounded-2xl border border-white/[0.07] bg-ink-900/40 px-5 py-4 backdrop-blur-sm"
          >
            <p className="font-mono text-2xs uppercase tracking-[0.15em] text-chalk-faint">
              Active agents
            </p>
            <p className="mt-1 text-2xl font-semibold tracking-tight text-chalk">
              24<span className="text-chalk-faint">/org avg</span>
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {agents.map((a, i) => (
            <AgentCard key={a.name} agent={a} delay={(i % 3) * 0.06} />
          ))}
        </div>
      </div>
    </section>
  );
}
