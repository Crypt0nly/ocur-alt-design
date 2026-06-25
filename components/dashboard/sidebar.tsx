"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Boxes,
  Workflow,
  Network,
  Plug,
  Activity,
  ShieldCheck,
  Settings,
  ChevronsUpDown,
  type LucideIcon,
} from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { cn } from "@/lib/utils";

type NavItem = {
  label: string;
  icon: LucideIcon;
  href: string;
  badge?: string;
};

const main: NavItem[] = [
  { label: "Overview", icon: LayoutDashboard, href: "/dashboard" },
  { label: "Agents", icon: Boxes, href: "/dashboard/agents", badge: "9" },
  { label: "Workflows", icon: Workflow, href: "/dashboard/workflows", badge: "37" },
  { label: "Memory", icon: Network, href: "/dashboard/memory" },
  { label: "Integrations", icon: Plug, href: "/dashboard/integrations" },
  { label: "Activity", icon: Activity, href: "/dashboard/activity" },
];

const system: NavItem[] = [
  { label: "Governance", icon: ShieldCheck, href: "/dashboard/governance", badge: "3" },
  { label: "Settings", icon: Settings, href: "/dashboard/settings" },
];

function NavLink({ item, active }: { item: NavItem; active: boolean }) {
  const Icon = item.icon;
  return (
    <Link
      href={item.href}
      className={cn(
        "group flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition-colors",
        active
          ? "bg-white/[0.06] text-chalk"
          : "text-chalk-muted hover:bg-white/[0.03] hover:text-chalk-soft"
      )}
    >
      <Icon
        className={cn(
          "h-[18px] w-[18px]",
          active ? "text-iris-200" : "text-chalk-faint group-hover:text-chalk-soft"
        )}
        strokeWidth={1.75}
      />
      <span className="flex-1">{item.label}</span>
      {item.badge && (
        <span
          className={cn(
            "rounded-md px-1.5 py-0.5 font-mono text-2xs",
            active ? "bg-iris-500/15 text-iris-200" : "bg-white/[0.05] text-chalk-muted"
          )}
        >
          {item.badge}
        </span>
      )}
    </Link>
  );
}

export function Sidebar() {
  const pathname = usePathname();
  const isActive = (href: string) =>
    href === "/dashboard" ? pathname === href : pathname.startsWith(href);

  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-[260px] flex-col border-r border-white/[0.07] bg-ink-950/80 backdrop-blur-xl lg:flex">
      <div className="flex h-16 items-center px-5">
        <Link href="/" aria-label="Ocur home" className="hover:opacity-80">
          <Logo />
        </Link>
      </div>

      {/* Org switcher */}
      <div className="px-3">
        <button className="flex w-full items-center gap-3 rounded-xl border border-white/[0.07] bg-white/[0.02] px-3 py-2.5 text-left transition-colors hover:bg-white/[0.04]">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-spectral text-xs font-semibold text-ink-950">
            N
          </span>
          <span className="flex-1 leading-tight">
            <span className="block text-sm font-medium text-chalk">Northwind</span>
            <span className="block text-2xs text-chalk-faint">Enterprise plan</span>
          </span>
          <ChevronsUpDown className="h-4 w-4 text-chalk-faint" />
        </button>
      </div>

      <nav className="mt-6 flex-1 space-y-6 overflow-y-auto px-3">
        <div className="space-y-1">
          <p className="px-3 pb-1 font-mono text-2xs uppercase tracking-[0.18em] text-chalk-faint">
            Operate
          </p>
          {main.map((i) => (
            <NavLink key={i.label} item={i} active={isActive(i.href)} />
          ))}
        </div>
        <div className="space-y-1">
          <p className="px-3 pb-1 font-mono text-2xs uppercase tracking-[0.18em] text-chalk-faint">
            System
          </p>
          {system.map((i) => (
            <NavLink key={i.label} item={i} active={isActive(i.href)} />
          ))}
        </div>
      </nav>

      {/* System health */}
      <div className="border-t border-white/[0.07] p-3">
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
          <div className="flex items-center justify-between">
            <span className="font-mono text-2xs uppercase tracking-[0.15em] text-chalk-faint">
              Kernel
            </span>
            <span className="inline-flex items-center gap-1.5 font-mono text-2xs text-mint-400">
              <span className="h-1.5 w-1.5 rounded-full bg-mint-400" />
              healthy
            </span>
          </div>
          <div className="mt-2.5 h-1.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
            <div className="h-full w-[42%] rounded-full bg-spectral" />
          </div>
          <p className="mt-2 text-2xs text-chalk-faint">
            42% load · 1.2k tasks/min
          </p>
        </div>
      </div>
    </aside>
  );
}
