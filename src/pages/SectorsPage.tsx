import { sectors } from "@/data/sectors";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FinalCTA } from "@/components/sections/FinalCTA";

export function SectorsPage() {
  return (
    <>
      <section className="pt-16 sm:pt-24 pb-16">
        <Container>
          <SectionHeading
            eyebrow="القطاعات"
            heading="نفس المسار... حل مختلف لكل قطاع"
            description="أمثلة توضح كيف يتحرك الطلب فعليًا من التواصل إلى النتيجة، حسب طبيعة نشاطك."
          />
        </Container>
      </section>

      <section className="pb-24">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-base-line rounded-2xl overflow-hidden">
            {sectors.map((sector) => (
              <article key={sector.slug} id={sector.slug} className="bg-base p-7 sm:p-9 flex flex-col gap-6 text-right scroll-mt-24">
                <div className="flex flex-col gap-1">
                  <h2 className="font-display text-xl sm:text-2xl text-ink">{sector.title}</h2>
                  <span className="text-brass text-sm">{sector.tagline}</span>
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-ink text-sm sm:text-base">{sector.scenario.trigger}</p>
                  <ol className="flex flex-col gap-1.5 mt-1">
                    {sector.scenario.steps.map((step) => (
                      <li key={step} className="flex items-center gap-3 text-ink-muted text-sm">
                        <span className="text-brass shrink-0">↓</span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <FinalCTA />
    </>
  );
}
