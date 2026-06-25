import Link from "next/link";
import { Check, ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

type Tier = {
  name: string;
  blurb: string;
  price: string;
  period?: string;
  cta: string;
  href: string;
  featured?: boolean;
  features: string[];
};

const tiers: Tier[] = [
  {
    name: "Launch",
    blurb: "Automate your first functions.",
    price: "$2,400",
    period: "/mo",
    cta: "Start with Launch",
    href: "/#cta",
    features: [
      "Up to 5 agents",
      "Core integrations",
      "Shared company memory",
      "Standard guardrails",
      "Email support",
    ],
  },
  {
    name: "Scale",
    blurb: "Run the company on Ocur.",
    price: "$8,900",
    period: "/mo",
    cta: "Choose Scale",
    href: "/#cta",
    featured: true,
    features: [
      "Unlimited agents",
      "All integrations + MCP",
      "Advanced governance & approvals",
      "SSO / SAML & RBAC",
      "99.99% SLA",
      "Priority support",
    ],
  },
  {
    name: "Enterprise",
    blurb: "For regulated & global orgs.",
    price: "Custom",
    cta: "Talk to sales",
    href: "/#cta",
    features: [
      "Self-hosted or private VPC",
      "Custom agents & models",
      "Dedicated kernel & isolation",
      "SOC 2, HIPAA, audit exports",
      "Solutions engineering",
      "Premier 24/7 support",
    ],
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-8xl px-5 sm:px-8">
        <SectionHeading
          align="center"
          kicker="Pricing"
          title={
            <>
              Scales with what you{" "}
              <span className="text-spectral">put on autopilot</span>.
            </>
          }
          description="Start with a single function or deploy the whole org. No per-seat tax — you pay for outcomes, not logins."
        />

        <div className="mt-14 grid items-start gap-4 lg:grid-cols-3">
          {tiers.map((tier, i) => (
            <Reveal
              key={tier.name}
              delay={i * 0.08}
              className={cn(
                "relative flex flex-col rounded-3xl border p-8 backdrop-blur-sm",
                tier.featured
                  ? "border-iris-500/40 bg-ink-900/70 shadow-glow"
                  : "border-white/[0.07] bg-ink-900/40"
              )}
            >
              {tier.featured && (
                <>
                  <div className="pointer-events-none absolute -inset-px -z-10 rounded-3xl bg-[radial-gradient(120%_60%_at_50%_0%,rgba(113,103,250,0.22),transparent)]" />
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-spectral px-3 py-1 font-mono text-2xs uppercase tracking-wider text-ink-950">
                    Most popular
                  </span>
                </>
              )}

              <h3 className="text-lg font-semibold tracking-tight text-chalk">
                {tier.name}
              </h3>
              <p className="mt-1.5 text-sm text-chalk-muted">{tier.blurb}</p>

              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-4xl font-semibold tracking-tightest text-chalk">
                  {tier.price}
                </span>
                {tier.period && (
                  <span className="text-sm text-chalk-faint">{tier.period}</span>
                )}
              </div>

              <Link
                href={tier.href}
                className={cn(
                  "mt-6 w-full",
                  tier.featured ? "btn-primary" : "btn-ghost"
                )}
              >
                {tier.cta}
                <ArrowUpRight className="h-4 w-4" />
              </Link>

              <div className="hairline my-7" />

              <ul className="space-y-3">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm">
                    <Check
                      className={cn(
                        "mt-0.5 h-4 w-4 shrink-0",
                        tier.featured ? "text-mint-400" : "text-iris-300"
                      )}
                      strokeWidth={2.5}
                    />
                    <span className="text-chalk-soft/90">{f}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
