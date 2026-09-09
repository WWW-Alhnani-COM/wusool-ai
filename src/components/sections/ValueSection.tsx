import { motion } from "framer-motion";

import { valueContent } from "@/data/content";
import { Container } from "@/components/ui/Container";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function ValueSection() {
  const reducedMotion = useReducedMotion();

  return (
    <section
      className="
        border-t
        border-base-line
        py-24
        sm:py-32
        lg:py-40
      "
      dir="rtl"
    >
      <Container className="flex flex-col gap-16 sm:gap-20 lg:gap-24">
        {/* Outcomes */}
        <div
          className="
            grid
            grid-cols-2
            border-y
            border-base-line
            lg:grid-cols-4
          "
        >
          {valueContent.outcomes.map((outcome, i) => (
            <motion.div
              key={outcome}
              initial={
                reducedMotion
                  ? {
                      opacity: 1,
                      y: 0,
                    }
                  : {
                      opacity: 0,
                      y: 20,
                    }
              }
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                margin: "-10% 0px",
              }}
              transition={{
                duration: reducedMotion ? 0 : 0.6,
                delay: reducedMotion ? 0 : i * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="
                relative
                flex
                min-h-[150px]
                items-center
                justify-center
                px-4
                py-8
                text-center
                sm:min-h-[190px]
                sm:px-6
                sm:py-10
                lg:min-h-[220px]
                lg:px-8
                lg:py-12
              "
            >
              {/* Vertical divider */}
              {i > 0 && (
                <span
                  aria-hidden="true"
                  className="
                    absolute
                    right-0
                    top-1/2
                    hidden
                    h-16
                    w-px
                    -translate-y-1/2
                    bg-base-line
                    lg:block
                  "
                />
              )}

              {/* Mobile divider */}
              {i % 2 !== 0 && (
                <span
                  aria-hidden="true"
                  className="
                    absolute
                    right-0
                    top-1/2
                    h-14
                    w-px
                    -translate-y-1/2
                    bg-base-line
                    lg:hidden
                  "
                />
              )}

              <span
                className="
                  font-display
                  text-2xl
                  font-semibold
                  leading-tight
                  tracking-tight
                  text-ink
                  transition-transform
                  duration-500
                  ease-out
                  hover:-translate-y-1
                  sm:text-3xl
                  md:text-4xl
                  lg:text-4xl
                  xl:text-5xl
                "
              >
                {outcome}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Supporting shifts */}
        <div
          className="
            flex
            flex-col
            items-end
            gap-3
            text-right
          "
        >
          {valueContent.shifts.map((shift, i) => (
            <motion.p
              key={shift}
              initial={
                reducedMotion
                  ? {
                      opacity: 1,
                      y: 0,
                    }
                  : {
                      opacity: 0,
                      y: 10,
                    }
              }
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                margin: "-10% 0px",
              }}
              transition={{
                duration: reducedMotion ? 0 : 0.5,
                delay: reducedMotion ? 0 : i * 0.06,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="
                text-sm
                leading-7
                text-ink-muted
                sm:text-base
                sm:leading-8
                lg:text-lg
              "
            >
              {shift}
            </motion.p>
          ))}
        </div>
      </Container>
    </section>
  );
}
