import { Container } from "@/components/ui/Container";

interface LegalPageProps {
  title: string;
}

// Placeholder shell — legal copy (privacy policy / terms) needs to be
// written and reviewed by the business/legal owner, not generated here.
export function LegalPage({ title }: LegalPageProps) {
  return (
    <section className="pt-16 sm:pt-24 pb-24">
      <Container className="max-w-prose mr-0 ml-auto text-right flex flex-col gap-6">
        <h1 className="font-display text-3xl sm:text-4xl text-ink">{title}</h1>
        <p className="text-ink-muted leading-relaxed">
          هذه الصفحة قيد الإعداد. سيتم إضافة المحتوى الرسمي بعد مراجعته من الشركة.
        </p>
      </Container>
    </section>
  );
}
