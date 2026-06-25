import { AmbientBackdrop } from "@/components/ui/backdrop";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { Hero } from "@/components/sections/hero";
import { LogoMarquee } from "@/components/sections/marquee";
import { Platform } from "@/components/sections/platform";
import { Agents } from "@/components/sections/agents";
import { Orchestration } from "@/components/sections/orchestration";
import { ConsolePreview } from "@/components/sections/console-preview";
import { Integrations } from "@/components/sections/integrations";
import { Metrics } from "@/components/sections/metrics";
import { Testimonials } from "@/components/sections/testimonials";
import { Pricing } from "@/components/sections/pricing";
import { CTA } from "@/components/sections/cta";

export default function Home() {
  return (
    <>
      <AmbientBackdrop />
      <Navbar />
      <main className="relative">
        <Hero />
        <LogoMarquee />
        <Platform />
        <Agents />
        <Orchestration />
        <ConsolePreview />
        <Integrations />
        <Metrics />
        <Testimonials />
        <Pricing />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
