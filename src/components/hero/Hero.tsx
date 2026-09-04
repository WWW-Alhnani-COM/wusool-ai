import { motion } from "framer-motion";
import { heroContent } from "@/data/content";
import { Button } from "@/components/ui/Button";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function Hero() {
  const reducedMotion = useReducedMotion();

  return (
    <section className="relative container-page section-px pt-16 sm:pt-24 pb-20 overflow-hidden">
      {/* One orchestrated load-in moment — the connective line drawing itself
          in behind the headline. No further hover/scroll effects competing
          for attention here. */}
      <svg
        className="absolute -top-10 left-1/2 -translate-x-1/2 w-[140%] max-w-3xl opacity-40 pointer-events-none"
        viewBox="0 0 600 300"
        fill="none"
      >
        <motion.path
          d="M 20 250 C 150 250, 180 60, 320 80 C 430 95, 460 220, 580 200"
          stroke="#C89B5C"
          strokeWidth="1.5"
          strokeLinecap="round"
          initial={reducedMotion ? { pathLength: 1 } : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
        />
      </svg>

      <div className="relative flex flex-col items-end text-right gap-8 max-w-3xl mr-0 ml-auto">
        <motion.h1
          initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.15] text-ink"
        >
          {heroContent.headline}
        </motion.h1>

        <motion.p
          initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="text-ink-muted text-lg sm:text-xl leading-relaxed max-w-xl"
        >
          {heroContent.subheadline}
        </motion.p>

        <motion.div
          initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
        >
          <Button to="/طلب-استشارة">{heroContent.ctaPrimary}</Button>
          <Button to="/كيف-نعمل" variant="secondary">
            {heroContent.ctaSecondary}
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
