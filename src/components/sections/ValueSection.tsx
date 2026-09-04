import { motion } from "framer-motion";
import { valueContent } from "@/data/content";
import { Container } from "@/components/ui/Container";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function ValueSection() {
  const reducedMotion = useReducedMotion();

  return (
    <section className="py-24 sm:py-32 border-t border-base-line">
      <Container className="flex flex-col gap-16">
        <div className="flex flex-wrap justify-end gap-x-3 gap-y-2 text-right">
          {valueContent.outcomes.map((outcome, i) => (
            <motion.span
              key={outcome}
              initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.5, delay: reducedMotion ? 0 : i * 0.08 }}
              className="font-display text-3xl sm:text-5xl text-ink"
            >
              {outcome}
              {i < valueContent.outcomes.length - 1 && <span className="text-ink-faint mx-3">/</span>}
            </motion.span>
          ))}
        </div>

        <div className="flex flex-col gap-3 items-end text-right">
          {valueContent.shifts.map((shift) => (
            <p key={shift} className="text-ink-muted text-base sm:text-lg">
              {shift}
            </p>
          ))}
        </div>
      </Container>
    </section>
  );
}
