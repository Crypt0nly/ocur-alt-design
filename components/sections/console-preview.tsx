import Link from "next/link";
import { ArrowRight, Activity, Sparkles, Boxes } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { LogoMark } from "@/components/brand/logo";

const kpis = [
  { label: "Tasks automated", value: "1,284", sub: "today", icon: Boxes },
  { label: "Human hours saved", value: "3,910", sub: "this week", icon: Sparkles },
  { label: "Cost / task", value: "$0.04", sub: "−38% MoM", icon: Activity },
];

const bars = [38, 52, 44, 67, 58, 81, 72, 90, 76, 88, 95, 84];

const feed = [
  { agent: "Atlas", text: "Booked 3 meetings · ACME, Vantage, Lumen", tone: "mint" },
  { agent: "Ledger", text: "May close complete — 0 exceptions", tone: "mint" },
  { agent: "Echo", text: "Resolved 142 tickets · CSAT 4.9", tone: "mint" },
  { agent: "Forge", text: "SLA breach predicted — rerouted vendor", tone: "iris" },
];

export function ConsolePreview() {
  return (
    <section id="console" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-8xl px-5 sm:px-8">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <Reveal>
            <span className="kicker justify-center">
              <span className="h-1 w-1 rounded-full bg-iris-400" />
              The console
            </span>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-chalk sm:text-4xl lg:text-[2.75rem] lg:leading-[1.08]">
              Mission control for your{" "}
              <span className="text-spectral">entire company</span>.
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mx-auto mt-5 max-w-xl text-pretty text-lg leading-relaxed text-chalk-muted">
              One pane of glass for every agent, process, and decision — with
              the controls to step in whenever you choose.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.16}>
          <div className="relative">
            <div className="pointer-events-none absolute -inset-x-10 -top-10 bottom-0 -z-10 rounded-[3rem] bg-[radial-gradient(60%_60%_at_50%_0%,rgba(113,103,250,0.16),transparent)] blur-2xl" />

            <div className="overflow-hidden rounded-4xl border border-white/[0.08] bg-ink-900/70 shadow-panel backdrop-blur-xl">
              {/* chrome */}
              <div className="flex items-center justify-between border-b border-white/[0.07] px-5 py-3">
                <div className="flex items-center gap-3">
                  <LogoMark className="h-5 w-5" />
                  <span className="font-mono text-2xs uppercase tracking-[0.16em] text-chalk-faint">
                    ocur · overview
                  </span>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 px-2.5 py-1 font-mono text-2xs text-mint-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-mint-400" />
                  6 agents online
                </span>
              </div>

              {/* body */}
              <div className="grid gap-px bg-white/[0.05] lg:grid-cols-3">
                {/* KPIs + chart */}
                <div className="bg-ink-900 p-6 lg:col-span-2">
                  <div className="grid gap-3 sm:grid-cols-3">
                    {kpis.map((k) => (
                      <div
                        key={k.label}
                        className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4"
                      >
                        <k.icon className="h-4 w-4 text-iris-200" />
                        <p className="mt-3 text-2xl font-semibold tracking-tight text-chalk">
                          {k.value}
                        </p>
                        <p className="mt-0.5 text-2xs text-chalk-faint">
                          {k.label} · {k.sub}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* chart */}
                  <div className="mt-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-chalk-soft">
                        Throughput · last 12h
                      </span>
                      <span className="font-mono text-2xs text-mint-400">
                        ▲ 24%
                      </span>
                    </div>
                    <div className="mt-5 flex h-28 items-end gap-1.5">
                      {bars.map((h, i) => (
                        <div
                          key={i}
                          className="flex-1 rounded-t bg-gradient-to-t from-iris-600/40 to-iris-400/80"
                          style={{ height: `${h}%` }}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* activity feed */}
                <div className="bg-ink-900 p-6">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-chalk-soft">
                      Live activity
                    </span>
                    <span className="font-mono text-2xs text-chalk-faint">
                      auto
                    </span>
                  </div>
                  <ul className="mt-4 space-y-3">
                    {feed.map((f, i) => (
                      <li key={i} className="flex gap-3">
                        <span
                          className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${
                            f.tone === "iris" ? "bg-iris-400" : "bg-mint-400"
                          }`}
                        />
                        <p className="text-xs leading-relaxed text-chalk-muted">
                          <span className="font-medium text-chalk-soft">
                            {f.agent}
                          </span>{" "}
                          {f.text}
                        </p>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/dashboard"
                    className="mt-6 inline-flex items-center gap-1.5 text-xs font-medium text-iris-200 transition-colors hover:text-iris-100"
                  >
                    View all activity
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="mt-10 flex justify-center">
          <Link href="/dashboard" className="btn-primary">
            Open the live console
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
