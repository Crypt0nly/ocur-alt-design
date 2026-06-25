import type { Metadata } from "next";
import { Sidebar } from "@/components/dashboard/sidebar";
import { Topbar } from "@/components/dashboard/topbar";

export const metadata: Metadata = {
  title: "Console · Ocur",
  description: "Mission control for your autonomous company.",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen bg-ink-950">
      {/* subtle top glow */}
      <div className="pointer-events-none fixed inset-x-0 top-0 -z-0 h-80 bg-[radial-gradient(60%_100%_at_50%_0%,rgba(113,103,250,0.10),transparent)]" />
      <Sidebar />
      <div className="relative lg:pl-[260px]">
        <Topbar />
        <main className="px-5 py-7 sm:px-8 sm:py-8">{children}</main>
      </div>
    </div>
  );
}
