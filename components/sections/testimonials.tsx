import { Quote } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";

function Avatar({ initials }: { initials: string }) {
  return (
    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-spectral text-xs font-semibold text-ink-950">
      {initials}
    </span>
  );
}

export function Testimonials() {
  return (
    <section id="proof" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-8xl px-5 sm:px-8">
        <SectionHeading
          kicker="Proof"
          title={
            <>
              Companies that run on{" "}
              <span className="text-spectral">Ocur</span>.
            </>
          }
        />

        <div className="mt-12 grid gap-4 lg:grid-cols-2">
          {/* Featured */}
          <Reveal className="relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/[0.08] bg-ink-900/50 p-8 backdrop-blur-sm sm:p-10">
            <div className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-[radial-gradient(closest-side,rgba(113,103,250,0.18),transparent)]" />
            <Quote className="h-8 w-8 text-iris-300/70" />
            <p className="relative mt-6 text-pretty text-2xl font-medium leading-snug tracking-tight text-chalk sm:text-[1.7rem]">
              "Ocur didn't just automate tasks — it gave us an operating layer.
              We run a 40-person company with the output of two hundred."
            </p>
            <div className="relative mt-8 flex items-center gap-3">
              <Avatar initials="DR" />
              <div>
                <p className="text-sm font-medium text-chalk">Dana Rourke</p>
                <p className="text-xs text-chalk-muted">
                  Co-founder & CEO, Northwind
                </p>
              </div>
            </div>
          </Reveal>

          {/* Two stacked */}
          <div className="flex flex-col gap-4">
            <Reveal
              delay={0.08}
              className="rounded-3xl border border-white/[0.07] bg-ink-900/40 p-8 backdrop-blur-sm"
            >
              <p className="text-pretty text-lg leading-relaxed text-chalk-soft">
                "Our month-end close went from nine days to nine hours. Finance
                finally spends its time on strategy, not spreadsheets."
              </p>
              <div className="mt-6 flex items-center gap-3">
                <Avatar initials="AM" />
                <div>
                  <p className="text-sm font-medium text-chalk">Amir Mansour</p>
                  <p className="text-xs text-chalk-muted">CFO, Meridian</p>
                </div>
              </div>
            </Reveal>

            <Reveal
              delay={0.14}
              className="rounded-3xl border border-white/[0.07] bg-ink-900/40 p-8 backdrop-blur-sm"
            >
              <p className="text-pretty text-lg leading-relaxed text-chalk-soft">
                "Support quality went up while headcount stayed flat. Echo
                handles the volume; my team handles the hard problems."
              </p>
              <div className="mt-6 flex items-center gap-3">
                <Avatar initials="JL" />
                <div>
                  <p className="text-sm font-medium text-chalk">Jia Lin</p>
                  <p className="text-xs text-chalk-muted">
                    VP Customer Experience, Lumen
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
