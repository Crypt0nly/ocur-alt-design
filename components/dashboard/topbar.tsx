"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Bell, Plus, PanelLeft } from "lucide-react";
import { Logo } from "@/components/brand/logo";

const titles: Record<string, string> = {
  "/dashboard": "Overview",
  "/dashboard/agents": "Agents",
  "/dashboard/workflows": "Workflows",
  "/dashboard/memory": "Memory",
  "/dashboard/integrations": "Integrations",
  "/dashboard/activity": "Activity",
  "/dashboard/governance": "Governance",
  "/dashboard/settings": "Settings",
};

export function Topbar() {
  const pathname = usePathname();
  const title = titles[pathname] ?? "Console";

  return (
    <header className="sticky top-0 z-20 border-b border-white/[0.07] bg-ink-950/70 backdrop-blur-xl">
      <div className="flex h-16 items-center gap-4 px-5 sm:px-8">
        {/* mobile brand / sidebar affordance */}
        <button
          className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 text-chalk-muted lg:hidden"
          aria-label="Toggle navigation"
        >
          <PanelLeft className="h-4 w-4" />
        </button>
        <div className="lg:hidden">
          <Logo wordmark={false} />
        </div>

        <div className="hidden lg:block">
          <h1 className="text-sm font-medium text-chalk">{title}</h1>
          <p className="font-mono text-2xs text-chalk-faint">
            Northwind · production
          </p>
        </div>

        {/* command */}
        <div className="mx-auto hidden w-full max-w-md items-center gap-2.5 rounded-xl border border-white/[0.08] bg-white/[0.02] px-3.5 py-2 text-sm text-chalk-faint transition-colors hover:border-white/[0.14] md:flex">
          <Search className="h-4 w-4" />
          <span className="flex-1">Ask Ocur, or search…</span>
          <kbd className="rounded-md border border-white/10 bg-white/[0.04] px-1.5 py-0.5 font-mono text-2xs">
            ⌘K
          </kbd>
        </div>

        <div className="ml-auto flex items-center gap-2">
          <Link
            href="#"
            className="hidden items-center gap-1.5 rounded-full bg-chalk px-3.5 py-2 text-sm font-medium text-ink-950 transition-colors hover:bg-white sm:inline-flex"
          >
            <Plus className="h-4 w-4" />
            New directive
          </Link>
          <button
            className="relative grid h-9 w-9 place-items-center rounded-full border border-white/10 text-chalk-muted transition-colors hover:text-chalk"
            aria-label="Notifications"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-iris-400" />
          </button>
          <span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-iris-400 to-mint-400 text-xs font-semibold text-ink-950">
            DR
          </span>
        </div>
      </div>
    </header>
  );
}
