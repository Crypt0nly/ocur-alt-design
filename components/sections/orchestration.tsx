import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";

const steps = [
  {
    title: "State the intent",
    body: "Give Ocur an outcome in plain language — or let an event, schedule, or threshold trigger it automatically.",
  },
  {
    title: "The kernel plans",
    body: "Goals are decomposed into a dependency-aware plan, with budgets, policies, and checkpoints attached.",
  },
  {
    title: "Agents execute",
    body: "Work routes to the right agents in parallel, each with the tools and the exact authority you granted.",
  },
  {
    title: "Verify & report",
    body: "Outputs are checked against policy, escalated when needed, and returned with a complete, exportable trace.",
  },
];

type TraceLine = {
  t: string;
  actor: string;
  msg: string;
  kind?: "ok" | "wait";
};

const trace: TraceLine[] = [
  { t: "09:24:01", actor: "kernel", msg: 'received "Launch Q3 EMEA expansion"' },
  { t: "09:24:02", actor: "kernel", msg: "decomposed into 6 workstreams" },
  { t: "09:24:03", actor: "atlas", msg: "built target account list — 312 accounts" },
  { t: "09:24:05", actor: "spark", msg: "drafted localized campaign", kind: "wait" },
  { t: "09:24:06", actor: "ledger", msg: "modeled budget impact +€480k" },
  { t: "09:24:08", actor: "forge", msg: "provisioned 3 vendor contracts" },
  { t: "09:24:09", actor: "kernel", msg: "checkpoint — human approval requested", kind: "ok" },
];

const actorColor: Record<string, string> = {
  kernel: "text-iris-300",
  atlas: "text-mint-400",
  spark: "text-mint-400",
  ledger: "text-mint-400",
  forge: "text-mint-400",
};

export function Orchestration() {
  return (
    <section id="orchestration" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-8xl px-5 sm:px-8">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-16">
          {/* Steps */}
          <div>
            <SectionHeading
              kicker="Orchestration"
              title={
                <>
                  From a single sentence to{" "}
                  <span className="text-spectral">coordinated execution</span>.
                </>
              }
              description="Ocur runs a continuous loop — plan, delegate, execute, verify — so intent becomes outcome without you wiring the steps together."
            />

            <ol className="mt-12 space-y-2">
              {steps.map((s, i) => (
                <Reveal as="li" key={s.title} delay={i * 0.08}>
                  <div className="group flex gap-5">
                    <div className="flex flex-col items-center">
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/10 bg-ink-850 font-mono text-sm text-iris-200">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {i < steps.length - 1 && (
                        <span className="my-1 w-px flex-1 bg-gradient-to-b from-white/15 to-transparent" />
                      )}
                    </div>
                    <div className="pb-7 pt-1.5">
                      <h3 className="text-base font-semibold text-chalk">
                        {s.title}
                      </h3>
                      <p className="mt-1.5 max-w-md text-sm leading-relaxed text-chalk-muted">
                        {s.body}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>

          {/* Live trace console */}
          <Reveal delay={0.15} className="lg:pt-16">
            <div className="overflow-hidden rounded-3xl border border-white/[0.08] bg-ink-900/70 shadow-panel backdrop-blur-xl">
              {/* window chrome */}
              <div className="flex items-center justify-between border-b border-white/[0.07] px-5 py-3.5">
                <div className="flex items-center gap-1.5">
                  <span className="h-3 w-3 rounded-full bg-white/10" />
                  <span className="h-3 w-3 rounded-full bg-white/10" />
                  <span className="h-3 w-3 rounded-full bg-white/10" />
                </div>
                <span className="font-mono text-2xs uppercase tracking-[0.18em] text-chalk-faint">
                  live trace · run #8842
                </span>
                <span className="inline-flex items-center gap-1.5 font-mono text-2xs text-mint-400">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mint-400 opacity-60" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-mint-400" />
                  </span>
                  running
                </span>
              </div>

              {/* log */}
              <div className="space-y-2.5 p-5 font-mono text-xs leading-relaxed sm:p-6">
                {trace.map((l, i) => (
                  <Reveal
                    key={i}
                    delay={0.2 + i * 0.05}
                    y={6}
                    className="flex flex-wrap items-baseline gap-x-3 gap-y-1"
                  >
                    <span className="text-chalk-faint">{l.t}</span>
                    <span className={`w-14 ${actorColor[l.actor] ?? "text-chalk-soft"}`}>
                      {l.actor}
                    </span>
                    <span className="flex-1 text-chalk-soft/90">
                      <span className="mr-1.5 text-chalk-faint">
                        {l.kind === "ok" ? "✓" : l.kind === "wait" ? "⏸" : "▸"}
                      </span>
                      {l.msg}
                    </span>
                  </Reveal>
                ))}
                <div className="flex items-center gap-2 pt-1 text-chalk-faint">
                  <span className="h-3.5 w-1.5 animate-pulse bg-iris-300" />
                  <span>awaiting approval — finance@northwind</span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
