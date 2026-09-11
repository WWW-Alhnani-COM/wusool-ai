'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

import { valueContent } from '@/data/content';
import { Container } from '@/components/ui/Container';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export function ValueSection() {
  const reducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);

  const activeOutcome = valueContent.outcomes[activeIndex];
  const activeShift = valueContent.shifts[activeIndex];

  return (
    <section
      id="value"
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
          h-[560px]
          w-[560px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-brass/[0.035]
          blur-[130px]
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
              THE IMPACT
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
            من الأتمتة إلى أثر واضح.
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
            عندما تعمل الأنظمة معًا، لا يكون أثر الذكاء مجرد تقنية جديدة،
            بل تحسنًا واضحًا في التشغيل وتجربة الضيف وتركيز الفريق.
          </p>
        </div>

        {/* Interactive value system */}
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
                JITHR AI / IMPACT
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
              {String(activeIndex + 1).padStart(2, '0')} /{' '}
              {String(valueContent.outcomes.length).padStart(2, '0')}
            </span>
          </div>

          <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
            {/* Outcomes navigation */}
            <div className="border-b border-base-line lg:border-b-0 lg:border-l">
              {valueContent.outcomes.map((outcome, index) => {
                const isActive = index === activeIndex;

                return (
                  <button
                    key={outcome}
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
                        duration: reducedMotion ? 0 : 0.35,
                        ease: [0.22, 1, 0.36, 1],
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
                      {String(index + 1).padStart(2, '0')}
                    </span>

                    {/* Outcome */}
                    <span
                      className={`
                        min-w-0
                        flex-1
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
                      {outcome}
                    </span>

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

            {/* Active value detail */}
            <div
              className="
                relative
                flex
                min-h-[430px]
                flex-col
                justify-between
                overflow-hidden
                px-6
                py-8
                sm:min-h-[470px]
                sm:px-10
                sm:py-10
                lg:min-h-[560px]
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

              {/* Large background number */}
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
                  text-[160px]
                  font-semibold
                  leading-none
                  tracking-[-0.08em]
                  text-ink/[0.035]
                  sm:left-8
                  sm:text-[200px]
                  lg:left-10
                  lg:text-[250px]
                "
              >
                {String(activeIndex + 1).padStart(2, '0')}
              </motion.div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
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
                      OUTCOME {String(activeIndex + 1).padStart(2, '0')}
                    </span>
                  </div>

                  {/* Outcome */}
                  <h3
                    className="
                      max-w-xl
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
                    {activeOutcome}
                  </h3>

                  {/* Shift label */}
                  <div className="mt-10 max-w-xl">
                    <div
                      className="
                        mb-4
                        text-[11px]
                        font-medium
                        tracking-[0.16em]
                        text-ink-faint
                      "
                    >
                      التحول
                    </div>

                    <div
                      className="
                        border-r
                        border-brass
                        pr-5
                        text-base
                        leading-8
                        text-ink-muted
                        sm:text-lg
                        sm:leading-9
                      "
                    >
                      {activeShift}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Bottom progress */}
              <div className="relative z-10 mt-12">
                <div className="mb-4 flex items-center justify-between">
                  <span
                    className="
                      text-xs
                      text-ink-faint
                    "
                  >
                    أثر المنظومة
                  </span>

                  <span
                    className="
                      font-mono
                      text-xs
                      text-ink-faint
                    "
                  >
                    {Math.round(
                      ((activeIndex + 1) /
                        valueContent.outcomes.length) *
                        100,
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
                          valueContent.outcomes.length) *
                        100
                      }%`,
                    }}
                    transition={{
                      duration: reducedMotion ? 0 : 0.45,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  />
                </div>

                {/* Markers */}
                <div
                  className="
                    mt-4
                    grid
                    grid-cols-6
                    gap-2
                  "
                >
                  {valueContent.outcomes.map((outcome, index) => (
                    <button
                      key={`marker-${outcome}`}
                      type="button"
                      aria-label={`الانتقال إلى النتيجة ${index + 1}`}
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
            الذكاء لا يضيف طبقة جديدة فقط،
            <span className="text-ink-muted">
              {' '}
              بل يصنع أثرًا يظهر في كل جزء من التشغيل.
            </span>
          </p>
        </div>
      </Container>
    </section>
  );
}
