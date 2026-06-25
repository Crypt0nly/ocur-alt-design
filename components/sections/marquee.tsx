const companies = [
  "Northwind",
  "Hyperion",
  "Lumen",
  "Vantage",
  "Meridian",
  "Atlas Robotics",
  "Cobalt",
  "Forge",
  "Ardent",
  "Polaris",
];

export function LogoMarquee() {
  return (
    <section className="relative py-16 sm:py-20">
      <div className="mx-auto max-w-8xl px-5 sm:px-8">
        <p className="text-center font-mono text-2xs uppercase tracking-[0.22em] text-chalk-faint">
          The operating layer behind modern companies
        </p>
        <div className="mask-fade-x relative mt-9 overflow-hidden">
          <div className="flex w-max animate-marquee gap-14 pr-14">
            {[...companies, ...companies].map((c, i) => (
              <span
                key={`${c}-${i}`}
                className="whitespace-nowrap text-xl font-semibold tracking-tight text-chalk-soft/35 transition-colors hover:text-chalk-soft/70"
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
