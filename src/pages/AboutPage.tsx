import { aboutContent } from "@/data/content";
import { Container } from "@/components/ui/Container";
import { FinalCTA } from "@/components/sections/FinalCTA";

export function AboutPage() {
  return (
    <>
      <section className="pt-16 sm:pt-24 pb-24">
        <Container className="flex flex-col items-end text-right gap-12 max-w-3xl mr-0 ml-auto">
          <h1 className="font-display text-3xl sm:text-5xl text-ink leading-[1.2]">
            من أول تواصل... إلى الوصول.
          </h1>

          <div className="flex flex-col gap-8 w-full">
            <AboutBlock label="من نحن" text={aboutContent.whoWeAre} />
            <AboutBlock label="ماذا نفعل" text={aboutContent.whatWeDo} />
            <AboutBlock label="كيف نعمل" text={aboutContent.howWeWork} />
          </div>
        </Container>
      </section>
      <FinalCTA />
    </>
  );
}

function AboutBlock({ label, text }: { label: string; text: string }) {
  return (
    <div className="flex flex-col gap-2 border-t border-base-line pt-6">
      <span className="text-brass text-sm">{label}</span>
      <p className="text-ink text-lg sm:text-xl leading-relaxed">{text}</p>
    </div>
  );
}
