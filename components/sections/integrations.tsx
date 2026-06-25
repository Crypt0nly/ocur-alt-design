import {
  MessageSquare,
  Mail,
  Building2,
  CreditCard,
  Calculator,
  Database,
  Github,
  SquareKanban,
  FileText,
  Folder,
  Boxes,
  Plug,
  type LucideIcon,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";

const tools: { name: string; cat: string; icon: LucideIcon }[] = [
  { name: "Slack", cat: "Comms", icon: MessageSquare },
  { name: "Gmail", cat: "Comms", icon: Mail },
  { name: "Salesforce", cat: "CRM", icon: Building2 },
  { name: "HubSpot", cat: "CRM", icon: Boxes },
  { name: "Stripe", cat: "Payments", icon: CreditCard },
  { name: "QuickBooks", cat: "Finance", icon: Calculator },
  { name: "Snowflake", cat: "Data", icon: Database },
  { name: "GitHub", cat: "Dev", icon: Github },
  { name: "Linear", cat: "Dev", icon: SquareKanban },
  { name: "Notion", cat: "Docs", icon: FileText },
  { name: "Drive", cat: "Docs", icon: Folder },
  { name: "Custom", cat: "MCP · REST", icon: Plug },
];

export function Integrations() {
  return (
    <section id="integrations" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-8xl px-5 sm:px-8">
        <SectionHeading
          align="center"
          kicker="Integrations"
          title={
            <>
              Plugs into the stack you{" "}
              <span className="text-chalk-muted">already run.</span>
            </>
          }
          description="Agents act through your real systems of record. Connect in minutes — or wire anything with the open MCP, REST, and webhook layer."
        />

        <div className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {tools.map((t, i) => (
            <Reveal
              key={t.name}
              delay={(i % 6) * 0.04}
              className="group flex flex-col items-center gap-3 rounded-2xl border border-white/[0.07] bg-ink-900/40 px-4 py-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-white/[0.16] hover:bg-ink-900/70"
            >
              <span className="grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-white/[0.03] text-chalk-soft transition-colors group-hover:text-iris-200">
                <t.icon className="h-5 w-5" strokeWidth={1.75} />
              </span>
              <span className="text-center">
                <span className="block text-sm font-medium text-chalk">
                  {t.name}
                </span>
                <span className="font-mono text-2xs uppercase tracking-wider text-chalk-faint">
                  {t.cat}
                </span>
              </span>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <p className="mt-8 text-center font-mono text-2xs uppercase tracking-[0.15em] text-chalk-faint">
            + 200 more connectors · bring your own via MCP
          </p>
        </Reveal>
      </div>
    </section>
  );
}
