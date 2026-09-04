import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { sectors } from "@/data/sectors";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useReducedMotion } from "@/hooks/useReducedMotion";

// Sector selector + live scenario panel — shows what actually happens per
// industry instead of a static wall of named cards.
export function SectorsShowcase() {
  const [activeSlug, setActiveSlug] = useState(sectors[0].slug);
  const active = sectors.find((s) => s.slug === activeSlug) ?? sectors[0];
  const reducedMotion = useReducedMotion();

  return (
    <section className="py-24 sm:py-32 border-t border-base-line" id="sectors">
      <Container className="flex flex-col gap-14">
        <SectionHeading heading="القطاعات" description="نفس المنطق، بحل مختلف حسب طبيعة نشاطك." />

        <div className="flex flex-wrap gap-2">
          {sectors.map((sector) => (
            <button
              key={sector.slug}
              type="button"
              id={sector.slug}
              onClick={() => setActiveSlug(sector.slug)}
              className={`px-4 py-2 rounded-full text-sm border transition-colors ${
                sector.slug === activeSlug
                  ? "border-brass text-brass bg-brass/10"
                  : "border-base-line text-ink-muted hover:text-ink hover:border-ink-faint"
              }`}
              aria-pressed={sector.slug === activeSlug}
            >
              {sector.title}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active.slug}
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reducedMotion ? { opacity: 1 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-2xl border border-base-line bg-base-raised p-6 sm:p-10 flex flex-col gap-8"
          >
            <div className="flex flex-col gap-2 text-right">
              <span className="font-display text-2xl sm:text-3xl text-ink">{active.title}</span>
              <span className="text-brass">{active.tagline}</span>
            </div>

            <div className="flex flex-col gap-4">
              <p className="text-ink text-base sm:text-lg">{active.scenario.trigger}</p>
              <ol className="flex flex-col gap-3">
                {active.scenario.steps.map((step) => (
                  <li key={step} className="flex items-center gap-4 text-ink-muted text-sm sm:text-base">
                    <span className="text-brass shrink-0">↓</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </motion.div>
        </AnimatePresence>
      </Container>
    </section>
  );
}
