'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

import { processSteps } from '@/data/process';
import { Container } from '@/components/ui/Container';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export function ProcessTimeline() {
  const reducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);

  const activeStep = processSteps[activeIndex];

  return (
    <section
      id="how-we-work"
      dir="rtl"
      className="
        relative
        overflow-hidden
        border-t
        border-base-line
        py-24
        sm:py-32
        lg:py-40
      "
    >
      {/* Ambient atmosphere */}
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
          bg-brass/[0.035]
          blur-[120px]
        "
      />

      <Container className="relative">
        {/* Header */}
        <div className="mx-auto mb-16 max-w-3xl text-center sm:mb-20 lg:mb-24">
          <div className="mb-5 flex items-center justify-center gap-3">
            <span
              aria-hidden="true"
              className="h-px w-8 bg-brass/60"
            />

            <span
              className="
                font-mono
                text-[11px]
                font-medium
                tracking-[0.24em]
                text-brass
              "
            >
              HOW WE WORK
            </span>

            <span
              aria-hidden="true"
              className="h-px w-8 bg-brass/60"
            />
          </div>

          <h2
            className="
              font-display
              text-3xl
              font-semibold
              leading-[1.2]
              tracking-tight
              text-ink
              sm:text-4xl
              lg:text-5xl
            "
          >
            من الفكرة إلى منظومة تعمل.
          </h2>

          <p
            className="
              mx-auto
              mt-6
              max-w-2xl
              text-sm
              leading-7
              text-ink-muted
              sm:text-base
              sm:leading-8
            "
          >
            لا نضيف نظامًا جديدًا إلى منشأتك فقط.
            نفهم عملياتك أولًا، ثم نبني الحل الذي يعمل داخلها.
          </p>
        </div>

        {/* Main interactive system */}
        <div
          className="
            relative
            overflow-hidden
            border
            border-base-line
            bg-base
          "
        >
          {/* Top status bar */}
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
                className="
                  h-1.5
                  w-1.5
                  rounded-full
                  bg-brass
                "
              />

              <span
                className="
                  text-[11px]
                  font-medium
                  tracking-[0.12em]
                  text-ink-faint
                "
              >
                JITHR AI / PROCESS
              </span>
            </div>

            <span
              className="
                font-mono
                text-[11px]
                tracking-[0.14em]
                text-ink-faint
              "
            >
              {activeStep.order} / {String(processSteps.length).padStart(2, '0')}
            </span>
          </div>

          <div className="grid lg:grid-cols-[0.85fr_1.15fr]">
            {/* Steps navigation */}
            <div className="border-b border-base-line lg:border-b-0 lg:border-l">
              {processSteps.map((step, index) => {
                const isActive = index === activeIndex;

                return (
                  <button
                    key={step.order}
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
                      gap-5
                      border-b
                      border-base-line
                      px-5
                      py-6
                      text-right
                      outline-none
                      transition-colors
                      duration-300
                      last:border-b-0
                      hover:bg-ink/[0.02]
                      focus-visible:bg-ink/[0.03]
                      sm:px-7
                      sm:py-7
                      lg:px-8
                    "
                  >
                    {/* Active indicator */}
                    <span
                      aria-hidden="true"
                      className="
                        absolute
                        right-0
                        top-0
                        h-full
                        w-px
                        origin-center
                        bg-brass
                        transition-transform
                        duration-500
                      "
                      style={{
                        transform: isActive
                          ? 'scaleY(1)'
                          : 'scaleY(0)',
                      }}
                    />

                    {/* Number */}
                    <span
                      className={`
                        flex
                        h-10
                        w-10
                        shrink-0
                        items-center
                        justify-center
                        border
                        font-mono
                        text-xs
                        tracking-[0.08em]
                        transition-all
                        duration-300
                        sm:h-11
                        sm:w-11
                        ${
                          isActive
                            ? 'border-brass/60 bg-brass text-base'
                            : 'border-base-line text-ink-faint group-hover:border-brass/40 group-hover:text-brass'
                        }
                      `}
                    >
                      {step.order}
                    </span>

                    {/* Title */}
                    <div className="min-w-0 flex-1">
                      <span
                        className={`
                          block
                          font-display
                          text-lg
                          font-medium
                          transition-colors
                          duration-300
                          sm:text-xl
                          ${
                            isActive
                              ? 'text-ink'
                              : 'text-ink-muted group-hover:text-ink'
                          }
                        `}
                      >
                        {step.title}
                      </span>

                      <span
                        className={`
                          mt-1
                          block
                          text-xs
                          transition-all
                          duration-300
                          sm:text-sm
                          ${
                            isActive
                              ? 'text-ink-muted'
                              : 'text-ink-faint'
                          }
                        `}
                      >
                        {index === 0 && 'نبدأ من احتياجك'}
                        {index === 1 && 'نفهم ما يحدث فعليًا'}
                        {index === 2 && 'نحدد ما يجب أن يتغير'}
                        {index === 3 && 'نبني ونربط الحل'}
                        {index === 4 && 'نحوّل الحل إلى واقع'}
                        {index === 5 && 'نستمر في التطوير'}
                      </span>
                    </div>

                    {/* Direction indicator */}
                    <span
                      aria-hidden="true"
                      className={`
                        hidden
                        text-lg
                        transition-all
                        duration-300
                        sm:block
                        ${
                          isActive
                            ? 'translate-x-1 text-brass opacity-100'
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

            {/* Active step detail */}
            <div
              className="
                relative
                flex
                min-h-[390px]
                flex-col
                justify-between
                overflow-hidden
                px-6
                py-8
                sm:min-h-[430px]
                sm:px-10
                sm:py-10
                lg:min-h-[520px]
                lg:px-14
                lg:py-14
              "
            >
              {/* Decorative grid */}
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

              {/* Large background number */}
              <motion.div
                key={`number-${activeIndex}`}
                initial={
                  reducedMotion
                    ? { opacity: 0 }
                    : { opacity: 0, x: 30 }
                }
                animate={{ opacity: 1, x: 0 }}
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
                  text-[150px]
                  font-semibold
                  leading-none
                  tracking-[-0.08em]
                  text-ink/[0.035]
                  sm:left-8
                  sm:text-[190px]
                  lg:left-10
                  lg:text-[230px]
                "
              >
                {activeStep.order}
              </motion.div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep.order}
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
                  {/* Eyebrow */}
                  <div className="mb-8 flex items-center gap-3">
                    <span className="h-px w-10 bg-brass" />

                    <span
                      className="
                        font-mono
                        text-[11px]
                        tracking-[0.18em]
                        text-brass
                      "
                    >
                      STEP {activeStep.order}
                    </span>
                  </div>

                  {/* Title */}
                  <h3
                    className="
                      max-w-xl
                      font-display
                      text-4xl
                      font-semibold
                      leading-[1.15]
                      tracking-tight
                      text-ink
                      sm:text-5xl
                      lg:text-6xl
                    "
                  >
                    {activeStep.title}
                  </h3>

                  {/* Description */}
                  <p
                    className="
                      mt-7
                      max-w-lg
                      text-base
                      leading-8
                      text-ink-muted
                      sm:text-lg
                      sm:leading-9
                    "
                  >
                    {activeStep.description}
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* Bottom process line */}
              <div className="relative z-10 mt-12">
                <div className="mb-4 flex items-center justify-between">
                  <span
                    className="
                      text-xs
                      text-ink-faint
                    "
                  >
                    رحلة التنفيذ
                  </span>

                  <span
                    className="
                      font-mono
                      text-xs
                      text-ink-faint
                    "
                  >
                    {Math.round(
                      ((activeIndex + 1) / processSteps.length) * 100,
                    )}
                    %
                  </span>
                </div>

                <div className="h-px w-full bg-base-line">
                  <motion.div
                    className="h-px bg-brass"
                    animate={{
                      width: `${
                        ((activeIndex + 1) / processSteps.length) * 100
                      }%`,
                    }}
                    transition={{
                      duration: reducedMotion ? 0 : 0.45,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  />
                </div>

                {/* Step markers */}
                <div className="mt-4 grid grid-cols-6 gap-2">
                  {processSteps.map((step, index) => (
                    <button
                      key={`marker-${step.order}`}
                      type="button"
                      aria-label={`الانتقال إلى الخطوة ${step.order}`}
                      onMouseEnter={() => setActiveIndex(index)}
                      onFocus={() => setActiveIndex(index)}
                      onClick={() => setActiveIndex(index)}
                      className="group flex justify-center py-2"
                    >
                      <span
                        className={`
                          h-1
                          w-full
                          max-w-12
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

        {/* Closing statement */}
        <div className="mx-auto mt-14 max-w-2xl text-center sm:mt-16">
          <p
            className="
              font-display
              text-lg
              leading-8
              text-ink
              sm:text-xl
            "
          >
            نبني الحل ليعمل داخل منظومتك،
            <span className="text-ink-muted">
              {' '}
              ثم نطوره مع نمو منشأتك.
            </span>
          </p>
        </div>
      </Container>
    </section>
  );
}
