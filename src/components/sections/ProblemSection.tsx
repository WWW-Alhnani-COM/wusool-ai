import { motion } from "framer-motion";
import { problemContent } from "@/data/content";
import { Container } from "@/components/ui/Container";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function ProblemSection() {
  const reducedMotion = useReducedMotion();

  return (
    <section className="py-24 sm:py-32">
      <Container className="flex flex-col gap-14">
        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl leading-[1.15] text-ink text-right max-w-2xl mr-0 ml-auto">
          {problemContent.heading}
        </h2>

        {/* Each point is a "stop" on the line — motion reveals them as the
            section scrolls into view, mirroring the "point of stoppage" idea
            rather than a generic staggered-card entrance. */}
        <ul className="relative flex flex-col">
          <span className="absolute top-0 bottom-0 right-3 sm:right-4 w-px bg-base-line" aria-hidden />
          {problemContent.points.map((point, i) => (
            <motion.li
              key={point}
              initial={reducedMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.5, delay: reducedMotion ? 0 : i * 0.05 }}
              className="relative flex items-center gap-5 py-4 pr-10 sm:pr-12 border-b border-base-line last:border-0"
            >
              <span className="absolute right-1.5 sm:right-2.5 h-3 w-3 rounded-full bg-base border border-brass" />
              <span className="text-ink text-base sm:text-lg">{point}</span>
            </motion.li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
