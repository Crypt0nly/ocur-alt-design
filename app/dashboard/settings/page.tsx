import type { Metadata } from "next";
import { ChevronDown, Plus, KeyRound, Trash2 } from "lucide-react";
import {
  PageHeader,
  Btn,
  Panel,
  Segmented,
  StatusBadge,
  Avatar,
  Progress,
} from "@/components/dashboard/ui";
import { cn } from "@/lib/utils";

export const metadata: Metadata = { title: "Settings · Ocur" };

function Row({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-sm text-chalk">{label}</p>
        {hint && <p className="mt-0.5 text-2xs text-chalk-faint">{hint}</p>}
      </div>
      <div className="shrink-0">{children}</div>
    </div>
  );
}

function Input({ value, className }: { value: string; className?: string }) {
  return (
    <div
      className={cn(
        "h-9 min-w-[220px] rounded-xl border border-white/[0.09] bg-ink-950/60 px-3.5 text-sm leading-9 text-chalk-soft",
        className
      )}
    >
      {value}
    </div>
  );
}

function Select({ value }: { value: string }) {
  return (
    <div className="flex h-9 min-w-[220px] items-center justify-between rounded-xl border border-white/[0.09] bg-ink-950/60 px-3.5 text-sm text-chalk-soft">
      {value}
      <ChevronDown className="h-4 w-4 text-chalk-faint" />
    </div>
  );
}

function Toggle({ on }: { on: boolean }) {
  return (
    <span
      className={cn(
        "relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors",
        on ? "bg-iris-500/70" : "bg-white/10"
      )}
    >
      <span
        className={cn(
          "inline-block h-4 w-4 transform rounded-full bg-chalk transition-transform",
          on ? "translate-x-4" : "translate-x-0.5"
        )}
      />
    </span>
  );
}

const members = [
  { name: "Dana Rourke", email: "dana@northwind.co", role: "Owner", initials: "DR", tone: "iris" as const, status: "active" },
  { name: "Amir Mansour", email: "amir@northwind.co", role: "Admin", initials: "AM", tone: "mint" as const, status: "active" },
  { name: "Jia Lin", email: "jia@northwind.co", role: "Member", initials: "JL", tone: "faint" as const, status: "active" },
  { name: "Marco Reyes", email: "marco@northwind.co", role: "Member", initials: "MR", tone: "amber" as const, status: "invited" },
];

const keys = [
  { name: "Production", masked: "sk_live_••••••••4a2f", used: "2m ago" },
  { name: "CI pipeline", masked: "sk_live_••••••••9c1d", used: "1d ago" },
];

export default function SettingsPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <PageHeader title="Settings" description="Configure your workspace, team, kernel, and security.">
        <Btn>Discard</Btn>
        <Btn variant="primary">Save changes</Btn>
      </PageHeader>

      {/* Organization */}
      <Panel title="Organization">
        <div className="divide-y divide-white/[0.05]">
          <Row label="Workspace name">
            <Input value="Northwind" />
          </Row>
          <Row label="Workspace URL" hint="Used for SSO and share links">
            <Input value="ocur.com/northwind" />
          </Row>
          <Row label="Data region" hint="Where memory and logs are stored">
            <Select value="EU · Frankfurt" />
          </Row>
          <Row label="Plan">
            <StatusBadge tone="iris" dot={false}>
              Enterprise
            </StatusBadge>
          </Row>
        </div>
      </Panel>

      {/* Members */}
      <Panel
        title="Members & roles"
        action={
          <Btn icon={Plus} className="h-8">
            Invite
          </Btn>
        }
      >
        <div className="divide-y divide-white/[0.05]">
          {members.map((m) => (
            <div key={m.email} className="flex items-center gap-3 px-6 py-3.5">
              <Avatar initials={m.initials} className="h-9 w-9" />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-chalk">{m.name}</p>
                <p className="truncate font-mono text-2xs text-chalk-faint">{m.email}</p>
              </div>
              {m.status === "invited" && (
                <StatusBadge tone="amber">invited</StatusBadge>
              )}
              <div className="flex h-8 w-28 items-center justify-between rounded-lg border border-white/[0.08] bg-ink-950/60 px-3 text-xs text-chalk-soft">
                {m.role}
                <ChevronDown className="h-3.5 w-3.5 text-chalk-faint" />
              </div>
            </div>
          ))}
        </div>
      </Panel>

      {/* Kernel */}
      <Panel title="Kernel configuration">
        <div className="divide-y divide-white/[0.05]">
          <Row label="Default model tier" hint="Agents may override per task">
            <Select value="Ocur-Prime" />
          </Row>
          <Row label="Max concurrency" hint="Parallel agents the kernel may run">
            <Input value="64 agents" />
          </Row>
          <Row label="Autonomy level" hint="How much agents do before checking in">
            <Segmented items={["Assisted", "Supervised", "Autonomous"]} active="Supervised" />
          </Row>
          <Row label="Require approval above budget">
            <Toggle on />
          </Row>
          <Row label="Pause agent on repeated failure">
            <Toggle on />
          </Row>
        </div>
      </Panel>

      {/* Security */}
      <Panel title="Security">
        <div className="divide-y divide-white/[0.05]">
          <Row label="SSO / SAML" hint="Okta · configured">
            <Toggle on />
          </Row>
          <Row label="Enforce two-factor auth">
            <Toggle on />
          </Row>
          <Row label="Session timeout">
            <Select value="8 hours" />
          </Row>
        </div>
        <div className="border-t border-white/[0.06] px-6 py-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-chalk">API keys</p>
            <Btn icon={KeyRound} className="h-8">
              Create key
            </Btn>
          </div>
          <div className="mt-3 space-y-2">
            {keys.map((k) => (
              <div
                key={k.name}
                className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-2.5"
              >
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium text-chalk">{k.name}</p>
                  <p className="truncate font-mono text-2xs text-chalk-faint">{k.masked}</p>
                </div>
                <span className="font-mono text-2xs text-chalk-faint">used {k.used}</span>
                <button className="rounded-lg border border-white/10 px-2.5 py-1 text-2xs text-chalk-muted transition-colors hover:border-red-500/40 hover:text-red-400">
                  Revoke
                </button>
              </div>
            ))}
          </div>
        </div>
      </Panel>

      {/* Billing */}
      <Panel title="Billing & usage">
        <div className="p-6">
          <div className="flex flex-col gap-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-medium text-chalk">Enterprise</p>
              <p className="mt-0.5 text-2xs text-chalk-faint">Renews Jan 1, 2027 · billed annually</p>
            </div>
            <Btn>Manage billing</Btn>
          </div>
          <div className="mt-5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-chalk-soft">Task usage · this period</span>
              <span className="font-mono text-2xs text-chalk-faint">1.84M / 3.00M</span>
            </div>
            <Progress value={61} tone="mint" className="mt-2" />
          </div>
        </div>
      </Panel>

      {/* Danger zone */}
      <Panel title="Danger zone" className="border-red-500/20">
        <div className="divide-y divide-white/[0.05]">
          <Row label="Pause all agents" hint="Immediately halt every running agent and workflow">
            <button className="rounded-xl border border-amber-500/30 bg-amber-500/5 px-3.5 py-2 text-xs font-medium text-amber-400 transition-colors hover:bg-amber-500/10">
              Pause everything
            </button>
          </Row>
          <Row label="Delete workspace" hint="Permanently remove Northwind and all its memory">
            <button className="inline-flex items-center gap-1.5 rounded-xl border border-red-500/30 bg-red-500/5 px-3.5 py-2 text-xs font-medium text-red-400 transition-colors hover:bg-red-500/10">
              <Trash2 className="h-3.5 w-3.5" />
              Delete
            </button>
          </Row>
        </div>
      </Panel>
    </div>
  );
}
