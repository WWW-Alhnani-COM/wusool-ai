'use client';

import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

import { finalCtaContent } from '@/data/content';
import { Container } from '@/components/ui/Container';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const MotionLink = motion(Link);

export function FinalCTA() {
  const reducedMotion = useReducedMotion();

  return (
    <section
      id="final-cta"
      dir="rtl"
      className="
        relative
        overflow-hidden
        border-t
        border-base-line
        bg-base
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
          bg-brass/[0.045]
          blur-[140px]
        "
      />

      {/* Technical grid */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-[0.035]
          [background-image:linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)]
          [background-size:64px_64px]
        "
      />

      <Container className="relative">
        <div
          className="
            relative
            mx-auto
            max-w-5xl
            overflow-hidden
            border
            border-base-line
            bg-base/80
            backdrop-blur-sm
          "
        >
          {/* Top technical bar */}
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
                  font-mono
                  text-[10px]
                  font-medium
                  tracking-[0.18em]
                  text-ink-faint
                "
              >
                JITHR AI
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
              01 / 01
            </span>
          </div>

          {/* Main content */}
          <div
            className="
              relative
              px-6
              py-16
              sm:px-10
              sm:py-20
              lg:px-16
              lg:py-24
            "
          >
            {/* Decorative central structure */}
            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                left-1/2
                top-1/2
                h-[420px]
                w-[420px]
                -translate-x-1/2
                -translate-y-1/2
                opacity-30
                sm:h-[520px]
                sm:w-[520px]
              "
            >
              {/* Main vertical axis */}
              <span
                className="
                  absolute
                  left-1/2
                  top-0
                  h-full
                  w-px
                  -translate-x-1/2
                  bg-gradient-to-b
                  from-transparent
                  via-brass/40
                  to-transparent
                "
              />

              {/* Horizontal axis */}
              <span
                className="
                  absolute
                  left-0
                  top-1/2
                  h-px
                  w-full
                  -translate-y-1/2
                  bg-gradient-to-r
                  from-transparent
                  via-brass/30
                  to-transparent
                "
              />

              {/* Branch lines */}
              <span
                className="
                  absolute
                  left-1/2
                  top-1/2
                  h-px
                  w-[42%]
                  origin-left
                  -rotate-[28deg]
                  bg-gradient-to-l
                  from-brass/40
                  to-transparent
                "
              />

              <span
                className="
                  absolute
                  left-1/2
                  top-1/2
                  h-px
                  w-[42%]
                  origin-left
                  rotate-[28deg]
                  bg-gradient-to-l
                  from-brass/40
                  to-transparent
                "
              />

              <span
                className="
                  absolute
                  left-1/2
                  top-1/2
                  h-px
                  w-[34%]
                  origin-left
                  -rotate-[148deg]
                  bg-gradient-to-r
                  from-brass/25
                  to-transparent
                "
              />

              <span
                className="
                  absolute
                  left-1/2
                  top-1/2
                  h-px
                  w-[34%]
                  origin-left
                  rotate-[148deg]
                  bg-gradient-to-r
                  from-brass/25
                  to-transparent
                "
              />

              {/* Nodes */}
              <span
                className="
                  absolute
                  left-1/2
                  top-1/2
                  h-2
                  w-2
                  -translate-x-1/2
                  -translate-y-1/2
                  rounded-full
                  bg-brass/70
                "
              />

              <span
                className="
                  absolute
                  left-[19%]
                  top-[30%]
                  h-1.5
                  w-1.5
                  rounded-full
                  bg-brass/40
                "
              />

              <span
                className="
                  absolute
                  right-[19%]
                  top-[30%]
                  h-1.5
                  w-1.5
                  rounded-full
                  bg-brass/40
                "
              />

              <span
                className="
                  absolute
                  bottom-[30%]
                  left-[19%]
                  h-1.5
                  w-1.5
                  rounded-full
                  bg-brass/40
                "
              />

              <span
                className="
                  absolute
                  bottom-[30%]
                  right-[19%]
                  h-1.5
                  w-1.5
                  rounded-full
                  bg-brass/40
                "
              />
            </div>

            {/* Content */}
            <motion.div
              initial={
                reducedMotion
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 24 }
              }
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{
                duration: reducedMotion ? 0 : 0.7,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="
                relative
                z-10
                mx-auto
                max-w-3xl
                text-center
              "
            >
              {/* Eyebrow */}
              <div className="mb-7 flex items-center justify-center gap-3">
                <span
                  aria-hidden="true"
                  className="h-px w-10 bg-brass/60"
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
                  JITHR AI
                </span>

                <span
                  aria-hidden="true"
                  className="h-px w-10 bg-brass/60"
                />
              </div>

              {/* Question */}
              <h2
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
                {finalCtaContent.question}
              </h2>

              {/* Statement */}
              <p
                className="
                  mx-auto
                  mt-7
                  max-w-2xl
                  font-display
                  text-lg
                  font-medium
                  leading-8
                  text-ink-muted
                  sm:mt-8
                  sm:text-xl
                  sm:leading-9
                  lg:text-2xl
                "
              >
                {finalCtaContent.statement}
              </p>

              {/* Actions */}
              <div
                className="
                  mt-10
                  flex
                  flex-col
                  items-center
                  justify-center
                  gap-3
                  sm:mt-12
                  sm:flex-row
                  sm:gap-4
                "
              >
                {/* Primary CTA */}
                <MotionLink
                  to="/طلب-استشارة"
                  whileHover={
                    reducedMotion ? undefined : { y: -2 }
                  }
                  whileTap={
                    reducedMotion ? undefined : { scale: 0.98 }
                  }
                  transition={{
                    duration: reducedMotion ? 0 : 0.2,
                  }}
                  className="
                    group
                    inline-flex
                    min-h-12
                    w-full
                    items-center
                    justify-center
                    gap-3
                    border
                    border-brass
                    bg-brass
                    px-7
                    py-3
                    text-sm
                    font-semibold
                    text-base
                    transition-all
                    duration-300
                    hover:bg-brass/90
                    sm:w-auto
                  "
                >
                  <span>{finalCtaContent.ctaPrimary}</span>

                  <span
                    aria-hidden="true"
                    className="
                      text-base
                      transition-transform
                      duration-300
                      group-hover:-translate-x-1
                    "
                  >
                    ←
                  </span>
                </MotionLink>

                {/* Secondary CTA */}
                <MotionLink
                  to="/الحلول"
                  whileHover={
                    reducedMotion ? undefined : { y: -2 }
                  }
                  whileTap={
                    reducedMotion ? undefined : { scale: 0.98 }
                  }
                  transition={{
                    duration: reducedMotion ? 0 : 0.2,
                  }}
                  className="
                    group
                    inline-flex
                    min-h-12
                    w-full
                    items-center
                    justify-center
                    gap-3
                    border
                    border-base-line
                    bg-base
                    px-7
                    py-3
                    text-sm
                    font-medium
                    text-ink
                    transition-all
                    duration-300
                    hover:border-brass/50
                    hover:bg-ink/[0.02]
                    sm:w-auto
                  "
                >
                  <span>{finalCtaContent.ctaSecondary}</span>

                  <span
                    aria-hidden="true"
                    className="
                      text-base
                      text-ink-faint
                      transition-transform
                      duration-300
                      group-hover:-translate-x-1
                      group-hover:text-brass
                    "
                  >
                    ←
                  </span>
                </MotionLink>
              </div>
            </motion.div>
          </div>

          {/* Bottom technical bar */}
          <div
            className="
              flex
              flex-col
              gap-3
              border-t
              border-base-line
              px-5
              py-4
              sm:flex-row
              sm:items-center
              sm:justify-between
              sm:px-7
              lg:px-8
            "
          >
            <span
              className="
                text-[10px]
                tracking-[0.12em]
                text-ink-faint
              "
            >
              الذكاء • الأتمتة • التشغيل
            </span>

            <span
              className="
                font-mono
                text-[10px]
                tracking-[0.12em]
                text-ink-faint
              "
            >
              JITHR / SAUDI ARABIA
            </span>
          </div>
        </div>
      </Container>
    </section>
  );
}
