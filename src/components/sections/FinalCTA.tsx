import { finalCtaContent } from "@/data/content";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export function FinalCTA() {
  return (
    <section
      className="
        border-t
        border-base-line
        py-28
        sm:py-40
      "
      dir="rtl"
    >
      <Container
        className="
          flex
          flex-col
          items-start
          gap-8
          text-left
        "
      >
        <div
          className="
            flex
            flex-col
            items-start
            gap-2
          "
        >
          <h2
            className="
              font-display
              text-3xl
              leading-tight
              text-ink
              sm:text-5xl
            "
          >
            {finalCtaContent.question}
          </h2>

          <p
            className="
              font-display
              text-2xl
              leading-tight
              text-brass
              sm:text-4xl
            "
          >
            {finalCtaContent.statement}
          </p>
        </div>

        <div
          className="
            flex
            flex-col
            gap-4
            sm:flex-row
          "
        >
          <Button to="/طلب-استشارة">
            {finalCtaContent.ctaPrimary}
          </Button>

          <Button
            to="/تواصل"
            variant="secondary"
          >
            {finalCtaContent.ctaSecondary}
          </Button>
        </div>
      </Container>
    </section>
  );
}
