import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import { services } from "@/data/services";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function ServicesGrid() {
  const reducedMotion = useReducedMotion();

  return (
    <section
      id="services"
      dir="rtl"
      className="
        border-t
        border-base-line
        py-24
        sm:py-32
        lg:py-40
      "
    >
      <Container>
        {/* Section heading */}
        <div className="mb-14 sm:mb-20 lg:mb-24">
          <SectionHeading
            heading="الحلول"
            description="كل حل يبدأ من مشكلة حقيقية تعيق وصولك."
          />
        </div>

        {/* Solutions list */}
        <div className="border-t border-base-line">
          {services.map((service, index) => (
            <motion.div
              key={service.slug}
              initial={
                reducedMotion
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 24 }
              }
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.15,
              }}
              transition={{
                duration: reducedMotion ? 0 : 0.55,
                delay: reducedMotion ? 0 : index * 0.04,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group border-b border-base-line"
            >
              <Link
                to={`/الحلول#${service.slug}`}
                className="
                  relative
                  block
                  py-7
                  outline-none
                  sm:py-9
                  lg:py-10
                "
              >
                {/* Active line */}
                <span
                  aria-hidden="true"
                  className="
                    absolute
                    right-0
                    top-0
                    h-full
                    w-px
                    origin-top
                    scale-y-0
                    bg-brass
                    transition-transform
                    duration-500
                    ease-out
                    group-hover:scale-y-100
                    group-focus-visible:scale-y-100
                  "
                />

                <div
                  className="
                    grid
                    grid-cols-1
                    gap-6
                    pr-5
                    sm:grid-cols-[70px_minmax(240px,0.9fr)_minmax(300px,1.4fr)]
                    sm:items-start
                    sm:gap-8
                    sm:pr-7
                    lg:grid-cols-[90px_minmax(300px,0.9fr)_minmax(400px,1.4fr)_auto]
                    lg:items-center
                    lg:gap-10
                    lg:pr-8
                  "
                >
                  {/* Number */}
                  <div className="flex items-center gap-3">
                    <span
                      className="
                        font-mono
                        text-xs
                        tracking-[0.18em]
                        text-ink-faint
                        transition-colors
                        duration-300
                        group-hover:text-brass
                        group-focus-visible:text-brass
                        sm:text-sm
                      "
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span
                      aria-hidden="true"
                      className="
                        hidden
                        h-px
                        w-5
                        bg-base-line
                        transition-all
                        duration-300
                        group-hover:w-8
                        group-hover:bg-brass/60
                        sm:block
                      "
                    />
                  </div>

                  {/* Title */}
                  <div>
                    <h3
                      className="
                        font-display
                        text-xl
                        font-semibold
                        leading-tight
                        text-ink
                        transition-transform
                        duration-500
                        ease-out
                        group-hover:-translate-x-1
                        sm:text-2xl
                        lg:text-3xl
                      "
                    >
                      {service.title}
                    </h3>
                  </div>

                  {/* Summary */}
                  <div>
                    <p
                      className="
                        max-w-2xl
                        text-sm
                        leading-7
                        text-ink-muted
                        transition-colors
                        duration-300
                        group-hover:text-ink
                        sm:text-base
                        sm:leading-8
                      "
                    >
                      {service.summary}
                    </p>

                    {/* Detail points */}
                    {service.points.length > 0 && (
                      <div
                        className="
                          mt-5
                          grid
                          max-h-0
                          grid-rows-[0fr]
                          overflow-hidden
                          opacity-0
                          transition-all
                          duration-500
                          ease-out
                          group-hover:max-h-40
                          group-hover:grid-rows-[1fr]
                          group-hover:opacity-100
                          group-focus-within:max-h-40
                          group-focus-within:grid-rows-[1fr]
                          group-focus-within:opacity-100
                        "
                      >
                        <div className="min-h-0">
                          <div
                            className="
                              flex
                              flex-wrap
                              gap-x-5
                              gap-y-2
                              border-t
                              border-base-line
                              pt-4
                            "
                          >
                            {service.points.map((point) => (
                              <span
                                key={point}
                                className="
                                  flex
                                  items-center
                                  gap-2
                                  text-xs
                                  text-ink-faint
                                  sm:text-sm
                                "
                              >
                                <span
                                  aria-hidden="true"
                                  className="
                                    h-1
                                    w-1
                                    rounded-full
                                    bg-brass
                                  "
                                />

                                {point}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Arrow */}
                  <div
                    className="
                      hidden
                      justify-self-start
                      lg:flex
                      lg:items-center
                    "
                  >
                    <span
                      aria-hidden="true"
                      className="
                        flex
                        h-10
                        w-10
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-base-line
                        text-lg
                        text-ink-faint
                        transition-all
                        duration-500
                        group-hover:border-brass/60
                        group-hover:bg-brass
                        group-hover:text-base
                        group-focus-visible:border-brass/60
                        group-focus-visible:bg-brass
                        group-focus-visible:text-base
                      "
                    >
                      ←
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Bottom statement */}
        <motion.div
          initial={
            reducedMotion
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: 20 }
          }
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.2,
          }}
          transition={{
            duration: reducedMotion ? 0 : 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            mt-14
            flex
            items-center
            justify-between
            gap-6
            border-t
            border-base-line
            pt-6
            sm:mt-20
            sm:pt-8
          "
        >
          <span
            className="
              text-xs
              tracking-[0.18em]
              text-ink-faint
              sm:text-sm
            "
          >
            منظومة واحدة
          </span>

          <span
            aria-hidden="true"
            className="
              h-px
              flex-1
              bg-base-line
            "
          />

          <span
            className="
              text-xs
              text-ink-faint
              sm:text-sm
            "
          >
            09 حلول
          </span>
        </motion.div>
      </Container>
    </section>
  );
}
