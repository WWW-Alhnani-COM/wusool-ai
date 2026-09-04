import { ContactForm } from "@/components/forms/ContactForm";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WhatsAppCTA } from "@/components/ui/WhatsAppCTA";

export function ContactPage() {
  return (
    <section className="pt-16 sm:pt-24 pb-24">
      <Container className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-14">
        <div className="flex flex-col gap-8">
          <SectionHeading eyebrow="تواصل معنا" heading="خلّنا نسمع احتياجك" />
          <WhatsAppCTA />
        </div>
        <ContactForm />
      </Container>
    </section>
  );
}
