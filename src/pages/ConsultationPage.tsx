import { ConsultationForm } from "@/components/forms/ConsultationForm";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function ConsultationPage() {
  return (
    <section className="pt-16 sm:pt-24 pb-24">
      <Container className="flex flex-col gap-10 max-w-3xl mr-0 ml-auto">
        <SectionHeading
          eyebrow="ابدأ رحلة الوصول"
          heading="طلب استشارة"
          description="عبّي التفاصيل التالية، وراح نراجع احتياجك ونتواصل معك لتحديد الخطوة التالية."
        />
        <ConsultationForm />
      </Container>
    </section>
  );
}
