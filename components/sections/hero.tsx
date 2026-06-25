import Link from "next/link";
import { ArrowUpRight, ArrowRight, ShieldCheck } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { OrchestrationCore } from "@/components/visuals/orchestration-core";
import { LogoMark } from "@/components/brand/logo";

const trust = [
  "99.99% orchestration uptime",
  "SOC 2 Type II",
  "Self-hosted or on Ocur Cloud",
];

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 sm:pt-40 lg:pt-44">
      <div className="mx-auto grid max-w-8xl grid-cols-1 items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
        {/* Copy */}
        <div className="relative z-10 min-w-0 max-w-2xl">
          <Reveal>
            <span className="kicker rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-mint-400" />
              The AI Operating System · v4
            </span>
          </Reveal>

          <Reveal delay={0.06}>
            <h1 className="mt-6 text-balance text-5xl font-semibold leading-[1.02] tracking-tightest text-chalk sm:text-6xl lg:text-[4.4rem]">
              The operating system for the{" "}
              <span className="text-spectral">autonomous company</span>.
            </h1>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-chalk-soft/90">
              Ocur turns business intent into coordinated action. A workforce of
              AI agents runs revenue, finance, support, and operations —
              orchestrated by a single kernel, observable in real time, and
              always accountable to you.
            </p>
          </Reveal>

          {/* Command bar — intent to action */}
          <Reveal delay={0.18}>
            <div className="mt-8 flex items-center gap-3 rounded-2xl border border-white/10 bg-ink-900/60 px-4 py-3 backdrop-blur-xl">
              <LogoMark className="h-5 w-5 shrink-0" />
              <span className="min-w-0 flex-1 truncate text-sm text-chalk-muted">
                Ocur, close the books for May and brief the finance team…
              </span>
              <kbd className="hidden rounded-md border border-white/10 bg-white/[0.04] px-2 py-1 font-mono text-2xs text-chalk-soft sm:inline-block">
                ⏎
              </kbd>
            </div>
          </Reveal>

          <Reveal delay={0.24}>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link href="/#cta" className="btn-primary">
                Request access
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link href="/dashboard" className="btn-ghost">
                Open the console
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.3}>
            <ul className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3">
              {trust.map((t) => (
                <li
                  key={t}
                  className="flex items-center gap-2 text-xs text-chalk-muted"
                >
                  <ShieldCheck className="h-3.5 w-3.5 text-iris-300/80" />
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* Visual */}
        <Reveal delay={0.2} className="relative min-w-0">
          <div className="relative rounded-5xl border border-white/[0.07] bg-ink-900/30 p-6 backdrop-blur-sm sm:p-10">
            <div className="pointer-events-none absolute inset-0 rounded-5xl bg-grid-faint [background-size:38px_38px] opacity-40" />
            <OrchestrationCore />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
