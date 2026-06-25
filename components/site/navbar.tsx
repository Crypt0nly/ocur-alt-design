"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { cn } from "@/lib/utils";

const links = [
  { label: "Platform", href: "/#platform" },
  { label: "Agents", href: "/#agents" },
  { label: "Orchestration", href: "/#orchestration" },
  { label: "Pricing", href: "/#pricing" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={cn(
          "mx-auto flex h-16 max-w-8xl items-center justify-between px-5 transition-all duration-500 sm:px-8",
          scrolled &&
            "supports-[backdrop-filter]:bg-ink-950/60 backdrop-blur-xl"
        )}
      >
        <Link
          href="/"
          className="transition-opacity hover:opacity-80"
          aria-label="Ocur home"
        >
          <Logo />
        </Link>

        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 lg:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-full px-3.5 py-2 text-sm text-chalk-soft/90 transition-colors hover:text-chalk"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Link href="/dashboard" className="btn-ghost">
            Console
          </Link>
          <Link href="/#cta" className="btn-primary">
            Request access
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-chalk lg:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* hairline under bar when scrolled */}
      <div
        className={cn(
          "h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-opacity duration-500",
          scrolled ? "opacity-100" : "opacity-0"
        )}
      />

      {/* Mobile sheet */}
      {open && (
        <div className="fixed inset-0 top-16 z-40 bg-ink-950/95 backdrop-blur-xl lg:hidden">
          <div className="flex flex-col gap-1 px-6 py-6">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-2xl px-4 py-3.5 text-lg text-chalk-soft transition-colors hover:bg-white/5 hover:text-chalk"
              >
                {l.label}
              </Link>
            ))}
            <div className="mt-4 flex flex-col gap-3">
              <Link
                href="/dashboard"
                onClick={() => setOpen(false)}
                className="btn-ghost w-full"
              >
                Open console
              </Link>
              <Link
                href="/#cta"
                onClick={() => setOpen(false)}
                className="btn-primary w-full"
              >
                Request access
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
