import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FinalCTA } from "@/components/sections/FinalCTA";

export function HowWeWorkPage() {
  return (
    <>
      <section className="pt-16 sm:pt-24 pb-8">
        <Container>
          <SectionHeading
            eyebrow="كيف نعمل"
            heading="رحلة بناء الحل، خطوة بخطوة"
            description="من أول مكالمة إلى نظام يعمل فعليًا، ثم يستمر بالتطور معك."
          />
        </Container>
      </section>
      <ProcessTimeline />
      <FinalCTA />
    </>
  );
}
