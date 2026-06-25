import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { LogoMark } from "@/components/brand/logo";

export function CTA() {
  return (
    <section id="cta" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-8xl px-5 sm:px-8">
        <Reveal className="relative overflow-hidden rounded-[2.5rem] border border-white/[0.08] bg-ink-900/50 px-6 py-20 text-center backdrop-blur-xl sm:px-12 sm:py-28">
          {/* ambient */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-1/2 top-0 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(113,103,250,0.22),transparent)] blur-2xl" />
            <div className="absolute inset-0 bg-grid-faint [background-size:46px_46px] opacity-30 mask-fade-b" />
          </div>

          <div className="relative mx-auto max-w-2xl">
            <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl border border-white/10 bg-ink-850/80 shadow-glow-sm">
              <LogoMark className="h-8 w-8" />
            </span>

            <h2 className="mt-8 text-balance text-4xl font-semibold tracking-tightest text-chalk sm:text-5xl lg:text-6xl">
              Put your company on{" "}
              <span className="text-spectral">autopilot</span>.
            </h2>
            <p className="mx-auto mt-5 max-w-lg text-pretty text-lg leading-relaxed text-chalk-muted">
              Join the companies running on Ocur. We'll map your operations and
              stand up your first agents in under two weeks.
            </p>

            {/* email capture */}
            <form className="mx-auto mt-9 flex max-w-md flex-col gap-3 sm:flex-row">
              <input
                type="email"
                required
                placeholder="you@company.com"
                className="h-12 flex-1 rounded-full border border-white/10 bg-ink-950/60 px-5 text-sm text-chalk placeholder:text-chalk-faint outline-none transition-colors focus:border-iris-500/60"
                aria-label="Work email"
              />
              <button type="submit" className="btn-primary h-12 px-6">
                Request access
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </form>

            <p className="mt-5 text-2xs text-chalk-faint">
              Prefer a walkthrough?{" "}
              <Link href="#" className="text-chalk-soft underline-offset-4 hover:underline">
                Book a live demo
              </Link>{" "}
              · No credit card required
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
