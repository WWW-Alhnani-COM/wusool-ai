import { Hero } from "@/components/hero/Hero";
import { ScrollSequence } from "@/components/hero/ScrollSequence";
import { ProblemSection } from "@/components/sections/ProblemSection";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { ValueSection } from "@/components/sections/ValueSection";
import { FinalCTA } from "@/components/sections/FinalCTA";

export function HomePage() {
  return (
    <>
      <Hero />
      <ProblemSection />
      <ScrollSequence />
      <ServicesGrid />
      <ProcessTimeline />
      <ValueSection />
      <FinalCTA />
    </>
  );
}
