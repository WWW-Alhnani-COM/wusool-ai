import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { services } from "@/data/services";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useReducedMotion } from "@/hooks/useReducedMotion";

// Deliberately not a uniform rounded-card grid (the "SaaS-card kit" default).
// Each service is a numbered row that expands its detail on hover/focus —
// reads more like an index/menu than a stack of identical cards.
export function ServicesGrid() {
  const reducedMotion = useReducedMotion();

  return (
    <section className="py-24 sm:py-32 border-t border-base-line" id="services">
      <Container className="flex flex-col gap-14">
        <SectionHeading heading="الحلول" description="كل حل يبدأ من مشكلة حقيقية تعيق وصولك." />

        <ul className="flex flex-col">
          {services.map((service, i) => (
            <motion.li
              key={service.slug}
              id={service.slug}
              initial={reducedMotion ? { opacity: 1 } : { opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.5, delay: reducedMotion ? 0 : i * 0.03 }}
              className="group border-b border-base-line first:border-t"
            >
              <Link
                to={`/الحلول#${service.slug}`}
                className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-8 py-6 sm:py-7"
              >
                <span className="text-ink-faint text-sm w-10 shrink-0">{String(i + 1).padStart(2, "0")}</span>
                <span className="font-display text-xl sm:text-2xl text-ink group-hover:text-brass transition-colors sm:w-72 shrink-0">
                  {service.title}
                </span>
                <span className="text-ink-muted text-sm sm:text-base leading-relaxed">{service.summary}</span>
              </Link>
            </motion.li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
