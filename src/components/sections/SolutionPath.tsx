import { motion } from "framer-motion";
import { solutionContent } from "@/data/content";
import { Container } from "@/components/ui/Container";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function SolutionPath() {
  const reducedMotion = useReducedMotion();
  const { path } = solutionContent;

  return (
    <section className="py-24 sm:py-32 border-t border-base-line">
      <Container className="flex flex-col gap-16">
        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl leading-[1.15] text-ink text-right max-w-2xl mr-0 ml-auto">
          {solutionContent.heading}
        </h2>

        <div className="flex flex-col sm:flex-row-reverse sm:items-center gap-6 sm:gap-0">
          {path.map((stage, i) => (
            <div key={stage} className="flex sm:flex-1 items-center gap-4">
              <motion.div
                initial={reducedMotion ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, margin: "-15% 0px" }}
                transition={{ duration: 0.4, delay: reducedMotion ? 0 : i * 0.08 }}
                className="flex flex-col items-center gap-3 shrink-0"
              >
                <span className="h-12 w-12 rounded-full border border-brass/60 bg-base-raised flex items-center justify-center text-brass text-sm">
                  {i + 1}
                </span>
                <span className="text-ink text-sm sm:text-base whitespace-nowrap">{stage}</span>
              </motion.div>
              {i < path.length - 1 && (
                <span className="hidden sm:block flex-1 h-px bg-base-line mx-2" aria-hidden />
              )}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
