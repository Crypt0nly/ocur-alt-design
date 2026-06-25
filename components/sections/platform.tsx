import { Cpu, Boxes, Network, ShieldCheck, Activity } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

const pipeline = ["Plan", "Delegate", "Execute", "Verify"];

function CardShell({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <Reveal
      delay={delay}
      className={cn(
        "group relative overflow-hidden rounded-3xl border border-white/[0.07] bg-ink-900/40 p-7 backdrop-blur-sm transition-colors duration-500 hover:border-white/[0.14]",
        className
      )}
    >
      <div className="surface-raised pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="relative">{children}</div>
    </Reveal>
  );
}

function IconChip({ icon: Icon }: { icon: typeof Cpu }) {
  return (
    <span className="grid h-11 w-11 place-items-center rounded-2xl border border-white/10 bg-white/[0.03] text-iris-200">
      <Icon className="h-5 w-5" strokeWidth={1.75} />
    </span>
  );
}

export function Platform() {
  return (
    <section id="platform" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-8xl px-5 sm:px-8">
        <SectionHeading
          kicker="The platform"
          title={
            <>
              An operating system,{" "}
              <span className="text-chalk-muted">not another chatbot.</span>
            </>
          }
          description="Ocur is built like an OS for work: a kernel that orchestrates, a workforce of agents that act, and a shared memory that makes the whole company smarter over time."
        />

        <div className="mt-14 grid gap-4 lg:grid-cols-3">
          {/* Kernel — wide */}
          <CardShell className="lg:col-span-2">
            <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
              <div className="max-w-sm">
                <IconChip icon={Cpu} />
                <h3 className="mt-5 text-xl font-semibold tracking-tight text-chalk">
                  One kernel, total coordination
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-chalk-muted">
                  The orchestration core breaks goals into work, routes each
                  task to the right agent, resolves conflicts, and drives
                  everything toward the outcome — continuously.
                </p>
              </div>

              {/* pipeline visual */}
              <div className="flex shrink-0 flex-col gap-2.5">
                {pipeline.map((step, i) => (
                  <div key={step} className="flex items-center gap-3">
                    <div className="relative flex flex-col items-center">
                      <span className="grid h-7 w-7 place-items-center rounded-lg border border-white/10 bg-ink-850 font-mono text-2xs text-iris-200">
                        {i + 1}
                      </span>
                      {i < pipeline.length - 1 && (
                        <span className="absolute top-7 h-2.5 w-px bg-gradient-to-b from-iris-400/50 to-transparent" />
                      )}
                    </div>
                    <span className="rounded-lg border border-white/[0.07] bg-white/[0.02] px-3 py-1.5 text-xs font-medium text-chalk-soft">
                      {step}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </CardShell>

          {/* Agents */}
          <CardShell delay={0.06}>
            <IconChip icon={Boxes} />
            <h3 className="mt-5 text-xl font-semibold tracking-tight text-chalk">
              A workforce, not a prompt
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-chalk-muted">
              Specialized agents for every function — each with its own tools,
              memory, and the exact authority you grant.
            </p>
          </CardShell>

          {/* Memory */}
          <CardShell delay={0.12}>
            <IconChip icon={Network} />
            <h3 className="mt-5 text-xl font-semibold tracking-tight text-chalk">
              Shared company memory
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-chalk-muted">
              A living knowledge graph every agent reads and writes — context
              that compounds with every decision.
            </p>
          </CardShell>

          {/* Governance */}
          <CardShell delay={0.18}>
            <IconChip icon={ShieldCheck} />
            <h3 className="mt-5 text-xl font-semibold tracking-tight text-chalk">
              Guardrails by design
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-chalk-muted">
              Policies, approvals, and spend limits enforced on every action —
              with humans in the loop exactly where you want them.
            </p>
          </CardShell>

          {/* Observability */}
          <CardShell delay={0.24}>
            <IconChip icon={Activity} />
            <h3 className="mt-5 text-xl font-semibold tracking-tight text-chalk">
              See every decision
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-chalk-muted">
              Real-time traces of what ran, why it ran, and what it cost — a
              complete, exportable audit trail.
            </p>
          </CardShell>
        </div>
      </div>
    </section>
  );
}
