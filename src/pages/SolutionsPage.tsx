import { services } from "@/data/services";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FinalCTA } from "@/components/sections/FinalCTA";

export function SolutionsPage() {
  return (
    <>
      <section className="pt-16 sm:pt-24 pb-16">
        <Container>
          <SectionHeading
            eyebrow="الحلول"
            heading="حلول تُبنى حول عملك، لا العكس"
            description="كل حل من هذه القائمة نقطة بداية — التنفيذ الفعلي يُصمَّم حسب أنظمتك وطريقة عملك."
          />
        </Container>
      </section>

      <section className="pb-24">
        <Container>
          <div className="flex flex-col">
            {services.map((service, i) => (
              <article
                key={service.slug}
                id={service.slug}
                className="grid grid-cols-1 sm:grid-cols-[4rem_1fr] gap-4 sm:gap-8 py-10 border-t border-base-line last:border-b scroll-mt-24"
              >
                <span className="text-ink-faint text-sm">{String(i + 1).padStart(2, "0")}</span>
                <div className="flex flex-col gap-4 text-right">
                  <h2 className="font-display text-2xl sm:text-3xl text-ink">{service.title}</h2>
                  <p className="text-ink-muted text-base sm:text-lg">{service.summary}</p>
                  {service.points.length > 0 && (
                    <ul className="flex flex-wrap justify-end gap-2 mt-2">
                      {service.points.map((point) => (
                        <li
                          key={point}
                          className="text-sm text-ink-muted border border-base-line rounded-full px-3 py-1.5"
                        >
                          {point}
                        </li>
                      ))}
                    </ul>
                  )}
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
