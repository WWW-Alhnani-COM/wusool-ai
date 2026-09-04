import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export function NotFoundPage() {
  return (
    <section className="py-32">
      <Container className="flex flex-col items-end text-right gap-6">
        <span className="font-display text-6xl text-brass">404</span>
        <h1 className="font-display text-2xl sm:text-3xl text-ink">هذا المسار غير موجود.</h1>
        <p className="text-ink-muted">يبدو أنك وصلت لصفحة مو موجودة — خلنا نرجعك للطريق الصحيح.</p>
        <Button to="/">الرجوع للرئيسية</Button>
      </Container>
    </section>
  );
}
