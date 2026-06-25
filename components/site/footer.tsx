import Link from "next/link";
import { Logo } from "@/components/brand/logo";

const columns: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Platform",
    links: [
      { label: "The Kernel", href: "/#orchestration" },
      { label: "Agent Workforce", href: "/#agents" },
      { label: "Memory Graph", href: "/#platform" },
      { label: "Integrations", href: "/#integrations" },
      { label: "Console", href: "/dashboard" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Manifesto", href: "#" },
      { label: "Customers", href: "/#proof" },
      { label: "Blog", href: "#" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Documentation", href: "#" },
      { label: "Changelog", href: "#" },
      { label: "Trust & Security", href: "#" },
      { label: "System status", href: "#" },
      { label: "Contact", href: "#" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative border-t border-white/[0.07] bg-ink-950">
      <div className="mx-auto max-w-8xl px-5 py-16 sm:px-8 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div className="max-w-xs">
            <Logo />
            <p className="mt-5 text-sm leading-relaxed text-chalk-muted">
              The AI operating system that runs your company — a coordinated
              workforce of agents, orchestrated end to end.
            </p>
            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-3 py-1.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mint-400 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-mint-400" />
              </span>
              <span className="font-mono text-2xs uppercase tracking-[0.15em] text-chalk-soft">
                All systems operational
              </span>
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="font-mono text-2xs uppercase tracking-[0.18em] text-chalk-faint">
                {col.title}
              </h4>
              <ul className="mt-4 space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-sm text-chalk-soft/85 transition-colors hover:text-chalk"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-white/[0.07] pt-8 sm:flex-row sm:items-center">
          <p className="text-2xs text-chalk-faint">
            © {2026} Ocur Systems, Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="#"
              className="text-2xs text-chalk-faint transition-colors hover:text-chalk-soft"
            >
              Privacy
            </Link>
            <Link
              href="#"
              className="text-2xs text-chalk-faint transition-colors hover:text-chalk-soft"
            >
              Terms
            </Link>
            <Link
              href="#"
              className="text-2xs text-chalk-faint transition-colors hover:text-chalk-soft"
            >
              SOC 2 · Type II
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
