'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

import { services } from '@/data/services';
import { Container } from '@/components/ui/Container';
import { FinalCTA } from '@/components/sections/FinalCTA';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export function SolutionsPage() {
  const reducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);

  const activeService = services[activeIndex];

  return (
    <>
      {/* Intro */}
      <section
        dir="rtl"
        className="
          relative
          overflow-hidden
          border-b
          border-base-line
          bg-base
          pt-24
          pb-16
          sm:pt-32
          sm:pb-20
          lg:pt-40
          lg:pb-24
        "
      >
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            left-1/2
            top-1/2
            h-[520px]
            w-[520px]
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            bg-brass/[0.04]
            blur-[140px]
          "
        />

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            inset-0
            opacity-[0.025]
            [background-image:linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)]
            [background-size:64px_64px]
          "
        />

        <Container className="relative">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 flex items-center justify-center gap-3">
              <span
                aria-hidden="true"
                className="h-px w-8 bg-brass/70"
              />

              <span
                className="
                  font-mono
                  text-[10px]
                  font-medium
                  tracking-[0.22em]
                  text-brass
                "
              >
                SOLUTIONS
              </span>

              <span
                aria-hidden="true"
                className="h-px w-8 bg-brass/70"
              />
            </div>

            <h1
              className="
                font-display
                text-4xl
                font-semibold
                leading-[1.12]
                tracking-tight
                text-ink
                sm:text-5xl
                lg:text-6xl
                xl:text-7xl
              "
            >
              نبني الذكاء داخل عمليات منشأتك.
            </h1>

            <p
              className="
                mx-auto
                mt-7
                max-w-2xl
                text-sm
                leading-8
                text-ink-muted
                sm:text-base
                sm:leading-8
                lg:text-lg
              "
            >
              حلول أتمتة وذكاء اصطناعي تربط التواصل والأنظمة والبيانات
              والعمليات في منظومة واحدة.
            </p>
          </div>
        </Container>
      </section>

      {/* Solutions System */}
      <section
        dir="rtl"
        className="
          relative
          overflow-hidden
          border-b
          border-base-line
          py-20
          sm:py-28
          lg:py-32
        "
      >
        <Container>
          <div
            className="
              relative
              overflow-hidden
              border
              border-base-line
              bg-base
            "
          >
            {/* Header */}
            <div
              className="
                flex
                items-center
                justify-between
                border-b
                border-base-line
                px-5
                py-4
                sm:px-7
                lg:px-8
              "
            >
              <div className="flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="h-1.5 w-1.5 rounded-full bg-brass"
                />

                <span
                  className="
                    font-mono
                    text-[10px]
                    tracking-[0.16em]
                    text-ink-faint
                  "
                >
                  JITHR AI / SOLUTIONS
                </span>
              </div>

              <span
                className="
                  font-mono
                  text-[10px]
                  tracking-[0.14em]
                  text-ink-faint
                "
              >
                {String(activeIndex + 1).padStart(2, '0')} /{' '}
                {String(services.length).padStart(2, '0')}
              </span>
            </div>

            <div className="grid lg:grid-cols-[0.85fr_1.15fr]">
              {/* Navigation */}
              <div
                className="
                  border-b
                  border-base-line
                  lg:border-b-0
                  lg:border-l
                "
              >
                {services.map((service, index) => {
                  const isActive = index === activeIndex;

                  return (
                    <button
                      key={service.slug}
                      type="button"
                      onMouseEnter={() => setActiveIndex(index)}
                      onFocus={() => setActiveIndex(index)}
                      onClick={() => setActiveIndex(index)}
                      className="
                        group
                        relative
                        flex
                        w-full
                        items-center
                        gap-4
                        border-b
                        border-base-line
                        px-5
                        py-5
                        text-right
                        outline-none
                        transition-colors
                        duration-300
                        last:border-b-0
                        hover:bg-ink/[0.02]
                        focus-visible:bg-ink/[0.03]
                        sm:px-7
                        sm:py-6
                        lg:px-8
                      "
                    >
                      {/* Active indicator */}
                      <motion.span
                        aria-hidden="true"
                        className="
                          absolute
                          right-0
                          top-0
                          h-full
                          w-px
                          origin-center
                          bg-brass
                        "
                        animate={{
                          scaleY: isActive ? 1 : 0,
                        }}
                        transition={{
                          duration: reducedMotion ? 0 : 0.3,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                      />

                      {/* Number */}
                      <span
                        className={`
                          flex
                          h-9
                          w-9
                          shrink-0
                          items-center
                          justify-center
                          border
                          font-mono
                          text-[10px]
                          tracking-[0.08em]
                          transition-all
                          duration-300
                          sm:h-10
                          sm:w-10
                          ${
                            isActive
                              ? 'border-brass/60 bg-brass text-base'
                              : 'border-base-line text-ink-faint group-hover:border-brass/40 group-hover:text-brass'
                          }
                        `}
                      >
                        {String(index + 1).padStart(2, '0')}
                      </span>

                      {/* Solution title */}
                      <span
                        className={`
                          min-w-0
                          flex-1
                          font-display
                          text-sm
                          font-medium
                          leading-7
                          transition-colors
                          duration-300
                          sm:text-base
                          ${
                            isActive
                              ? '!text-brass'
                              : '!text-white'
                          }
                        `}
                      >
                        {service.title}
                      </span>

                      {/* Arrow */}
                      <span
                        aria-hidden="true"
                        className={`
                          hidden
                          text-base
                          transition-all
                          duration-300
                          sm:block
                          ${
                            isActive
                              ? '-translate-x-1 text-brass opacity-100'
                              : 'text-ink-faint opacity-0 group-hover:opacity-100'
                          }
                        `}
                      >
                        ←
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Detail Panel */}
              <div
                className="
                  relative
                  flex
                  min-h-[520px]
                  flex-col
                  justify-between
                  overflow-hidden
                  px-6
                  py-8
                  sm:min-h-[580px]
                  sm:px-10
                  sm:py-10
                  lg:min-h-[680px]
                  lg:px-14
                  lg:py-14
                "
              >
                {/* Technical grid */}
                <div
                  aria-hidden="true"
                  className="
                    pointer-events-none
                    absolute
                    inset-0
                    opacity-[0.035]
                    [background-image:linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)]
                    [background-size:48px_48px]
                  "
                />

                {/* Ambient glow */}
                <div
                  aria-hidden="true"
                  className="
                    pointer-events-none
                    absolute
                    left-1/2
                    top-1/2
                    h-[380px]
                    w-[380px]
                    -translate-x-1/2
                    -translate-y-1/2
                    rounded-full
                    bg-brass/[0.035]
                    blur-[120px]
                  "
                />

                {/* Large number */}
                <motion.div
                  key={`number-${activeIndex}`}
                  initial={
                    reducedMotion
                      ? { opacity: 0 }
                      : { opacity: 0, x: 30 }
                  }
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  transition={{
                    duration: reducedMotion ? 0 : 0.45,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  aria-hidden="true"
                  className="
                    pointer-events-none
                    absolute
                    left-5
                    top-0
                    font-mono
                    text-[170px]
                    font-semibold
                    leading-none
                    tracking-[-0.08em]
                    text-ink/[0.035]
                    sm:left-8
                    sm:text-[220px]
                    lg:left-10
                    lg:text-[280px]
                  "
                >
                  {String(activeIndex + 1).padStart(2, '0')}
                </motion.div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeService.slug}
                    initial={
                      reducedMotion
                        ? { opacity: 1 }
                        : { opacity: 0, y: 16 }
                    }
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    exit={
                      reducedMotion
                        ? { opacity: 1 }
                        : { opacity: 0, y: -10 }
                    }
                    transition={{
                      duration: reducedMotion ? 0 : 0.35,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="relative z-10"
                  >
                    {/* Label */}
                    <div className="mb-8 flex items-center gap-3">
                      <span
                        aria-hidden="true"
                        className="h-px w-10 bg-brass"
                      />

                      <span
                        className="
                          font-mono
                          text-[10px]
                          tracking-[0.18em]
                          text-brass
                        "
                      >
                        SOLUTION{' '}
                        {String(activeIndex + 1).padStart(2, '0')}
                      </span>
                    </div>

                    {/* Title */}
                    <h2
                      className="
                        max-w-2xl
                        font-display
                        text-4xl
                        font-semibold
                        leading-[1.12]
                        tracking-tight
                        text-ink
                        sm:text-5xl
                        lg:text-6xl
                      "
                    >
                      {activeService.title}
                    </h2>

                    {/* Description */}
                    <p
                      className="
                        mt-7
                        max-w-2xl
                        text-base
                        leading-8
                        text-ink-muted
                        sm:text-lg
                        sm:leading-9
                      "
                    >
                      {activeService.summary}
                    </p>

                    {/* Capabilities */}
                    {activeService.points.length > 0 && (
                      <div className="mt-10 max-w-2xl">
                        <div
                          className="
                            mb-5
                            flex
                            items-center
                            gap-3
                          "
                        >
                          <span
                            aria-hidden="true"
                            className="h-px w-6 bg-base-line"
                          />

                          <span
                            className="
                              text-[10px]
                              font-medium
                              tracking-[0.16em]
                              text-ink-faint
                            "
                          >
                            نطاق الحل
                          </span>
                        </div>

                        <ul className="grid gap-0 border-t border-base-line sm:grid-cols-2">
                          {activeService.points.map(
                            (point, pointIndex) => (
                              <li
                                key={point}
                                className="
                                  flex
                                  min-h-14
                                  items-center
                                  gap-3
                                  border-b
                                  border-base-line
                                  py-3
                                  text-sm
                                  leading-7
                                  text-ink-muted
                                  sm:px-4
                                  sm:odd:border-l
                                  sm:odd:pl-0
                                  sm:even:pr-4
                                "
                              >
                                <span
                                  aria-hidden="true"
                                  className="
                                    h-1
                                    w-1
                                    shrink-0
                                    rounded-full
                                    bg-brass
                                  "
                                />

                                <span>
                                  {point}
                                </span>

                                <span
                                  aria-hidden="true"
                                  className="
                                    mr-auto
                                    font-mono
                                    text-[9px]
                                    text-ink-faint
                                  "
                                >
                                  {String(pointIndex + 1).padStart(
                                    2,
                                    '0',
                                  )}
                                </span>
                              </li>
                            ),
                          )}
                        </ul>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>

                {/* Bottom progress */}
                <div className="relative z-10 mt-12">
                  <div className="mb-4 flex items-center justify-between">
                    <span
                      className="
                        text-[10px]
                        font-medium
                        tracking-[0.12em]
                        text-ink-faint
                      "
                    >
                      منظومة الحلول
                    </span>

                    <span
                      className="
                        font-mono
                        text-[10px]
                        tracking-[0.12em]
                        text-ink-faint
                      "
                    >
                      {Math.round(
                        ((activeIndex + 1) / services.length) * 100,
                      )}
                      %
                    </span>
                  </div>

                  <div className="h-px w-full bg-base-line">
                    <motion.div
                      className="h-px bg-brass"
                      animate={{
                        width: `${
                          ((activeIndex + 1) /
                            services.length) *
                          100
                        }%`,
                      }}
                      transition={{
                        duration: reducedMotion ? 0 : 0.45,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    />
                  </div>

                  <div className="mt-4 grid grid-cols-9 gap-1.5">
                    {services.map((service, index) => (
                      <button
                        key={`marker-${service.slug}`}
                        type="button"
                        aria-label={`الانتقال إلى الحل ${index + 1}`}
                        onMouseEnter={() => setActiveIndex(index)}
                        onFocus={() => setActiveIndex(index)}
                        onClick={() => setActiveIndex(index)}
                        className="
                          group
                          flex
                          justify-center
                          py-2
                        "
                      >
                        <span
                          className={`
                            h-1
                            w-full
                            transition-all
                            duration-300
                            ${
                              index <= activeIndex
                                ? 'bg-brass'
                                : 'bg-base-line group-hover:bg-brass/40'
                            }
                          `}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Final CTA */}
      <FinalCTA />
    </>
  );
}
