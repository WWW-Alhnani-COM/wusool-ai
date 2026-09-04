import { finalCtaContent } from "@/data/content";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export function FinalCTA() {
  return (
    <section className="py-28 sm:py-40 border-t border-base-line">
      <Container className="flex flex-col items-end text-right gap-8">
        <div className="flex flex-col gap-2">
          <h2 className="font-display text-3xl sm:text-5xl text-ink">{finalCtaContent.question}</h2>
          <p className="font-display text-2xl sm:text-4xl text-brass">{finalCtaContent.statement}</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button to="/طلب-استشارة">{finalCtaContent.ctaPrimary}</Button>
          <Button to="/تواصل" variant="secondary">
            {finalCtaContent.ctaSecondary}
          </Button>
        </div>
      </Container>
    </section>
  );
}
