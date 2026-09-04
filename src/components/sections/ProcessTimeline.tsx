import { motion } from "framer-motion";
import { processSteps } from "@/data/process";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function ProcessTimeline() {
  const reducedMotion = useReducedMotion();

  return (
    <section className="py-24 sm:py-32 border-t border-base-line" id="how-we-work">
      <Container className="flex flex-col gap-14">
        <SectionHeading heading="كيف نعمل" description="من أول تواصل معنا، إلى نظام يعمل فعليًا." />

        <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-base-line rounded-2xl overflow-hidden">
          {processSteps.map((step, i) => (
            <motion.li
              key={step.order}
              initial={reducedMotion ? { opacity: 1 } : { opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.4, delay: reducedMotion ? 0 : i * 0.05 }}
              className="bg-base p-7 sm:p-8 flex flex-col gap-4"
            >
              <span className="text-brass font-display text-3xl">{step.order}</span>
              <span className="text-ink font-display text-xl">{step.title}</span>
              <span className="text-ink-muted text-sm leading-relaxed">{step.description}</span>
            </motion.li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
