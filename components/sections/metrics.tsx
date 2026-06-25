import { Reveal } from "@/components/ui/reveal";

const stats = [
  { value: "70%", label: "of routine operations run autonomously" },
  { value: "11×", label: "faster cycle times across functions" },
  { value: "24/7", label: "always-on, every timezone, no backlog" },
  { value: "$2.4M", label: "average annual operating savings" },
];

export function Metrics() {
  return (
    <section className="relative py-20 sm:py-24">
      <div className="mx-auto max-w-8xl px-5 sm:px-8">
        <div className="overflow-hidden rounded-4xl border border-white/[0.07] bg-ink-900/40 backdrop-blur-sm">
          <div className="grid divide-y divide-white/[0.07] sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x">
            {stats.map((s, i) => (
              <Reveal
                key={s.label}
                delay={i * 0.08}
                className="px-8 py-10 text-center lg:py-12"
              >
                <p className="text-5xl font-semibold tracking-tightest text-spectral lg:text-6xl">
                  {s.value}
                </p>
                <p className="mx-auto mt-3 max-w-[14rem] text-sm leading-relaxed text-chalk-muted">
                  {s.label}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
