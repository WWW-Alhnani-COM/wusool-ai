```tsx
'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

import { aboutContent } from '@/data/content';
import { Container } from '@/components/ui/Container';
import { FinalCTA } from '@/components/sections/FinalCTA';
import { useReducedMotion } from '@/hooks/useReducedMotion';

type AboutSection = {
  id: string;
  label: string;
  title: string;
  text: string;
};

export function AboutPage() {
  const reducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);

  const sections: AboutSection[] = [
    {
      id: 'who-we-are',
      label: 'من نحن',
      title: 'نبني الذكاء الذي تنمو عليه منشأتك.',
      text: aboutContent.whoWeAre,
    },
    {
      id: 'what-we-do',
      label: 'ماذا نفعل',
      title: 'نحوّل الذكاء إلى منظومة تعمل.',
      text: aboutContent.whatWeDo,
    },
    {
      id: 'how-we-work',
      label: 'كيف نعمل',
      title: 'نفهم أولًا، ثم نبني.',
      text: aboutContent.howWeWork,
    },
  ];

  const activeSection = sections[activeIndex];

  return (
    <>
      {/* =========================================================
          HERO
      ========================================================= */}
      <section
        dir="rtl"
        className="
          relative
          overflow-hidden
          border-b
          border-base-line
          bg-base
          pt-28
          pb-20
          sm:pt-36
          sm:pb-28
          lg:pt-44
          lg:pb-36
        "
      >
        {/* Atmosphere */}
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
            bg-brass/[0.04]
            blur-[150px]
          "
        />

        {/* Technical grid */}
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
          <div className="mx-auto max-w-5xl text-center">
            <div className="mb-7 flex items-center justify-center gap-3">
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
                ABOUT JITHR AI
              </span>

              <span
                aria-hidden="true"
                className="h-px w-8 bg-brass/70"
              />
            </div>

            <motion.h1
              initial={
                reducedMotion
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 20 }
              }
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: reducedMotion ? 0 : 0.7,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="
                font-display
                text-5xl
                font-semibold
                leading-[1.08]
                tracking-tight
                text-ink
                sm:text-6xl
                lg:text-7xl
                xl:text-8xl
              "
            >
              جِذع
              <span className="text-brass"> AI</span>
            </motion.h1>

            <motion.p
              initial={
                reducedMotion
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 16 }
              }
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: reducedMotion ? 0 : 0.7,
                delay: reducedMotion ? 0 : 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="
                mx-auto
                mt-7
                max-w-3xl
                font-display
                text-xl
                font-medium
                leading-9
                text-ink-muted
                sm:text-2xl
                sm:leading-10
                lg:text-3xl
                lg:leading-[1.7]
              "
            >
              نبني الذكاء الذي تنمو عليه منشأتك.
            </motion.p>

            <motion.div
              initial={
                reducedMotion
                  ? { opacity: 1 }
                  : { opacity: 0 }
              }
              animate={{ opacity: 1 }}
              transition={{
                duration: reducedMotion ? 0 : 0.7,
                delay: reducedMotion ? 0 : 0.16,
              }}
              className="mx-auto mt-10 h-px w-20 bg-brass"
            />
          </div>
        </Container>
      </section>

      {/* =========================================================
          WHO WE ARE / WHAT WE DO / HOW WE WORK
      ========================================================= */}
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
            {/* System header */}
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
                  JITHR AI / ABOUT
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
                {String(sections.length).padStart(2, '0')}
              </span>
            </div>

            <div className="grid lg:grid-cols-[0.72fr_1.28fr]">
              {/* Navigation */}
              <div
                className="
                  border-b
                  border-base-line
                  lg:border-b-0
                  lg:border-l
                "
              >
                {sections.map((section, index) => {
                  const isActive = index === activeIndex;

                  return (
                    <button
                      key={section.id}
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
                          text-[10px]
                          tracking-[0.08em]
                          transition-all
                          duration-300
                          ${
                            isActive
                              ? 'border-brass/60 bg-brass text-base'
                              : 'border-base-line text-ink-faint group-hover:border-brass/40 group-hover:text-brass'
                          }
                        `}
                      >
                        {String(index + 1).padStart(2, '0')}
                      </span>

                      <span
                        className={`
                          flex-1
                          font-display
                          text-base
                          font-medium
                          transition-colors
                          duration-300
                          sm:text-lg
                          ${
                            isActive
                              ? 'text-ink'
                              : 'text-ink-muted group-hover:text-ink'
                          }
                        `}
                      >
                        {section.label}
                      </span>

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

              {/* Detail */}
              <div
                className="
                  relative
                  flex
                  min-h-[520px]
                  flex-col
                  justify-between
                  overflow-hidden
                  px-6
                  py-9
                  sm:min-h-[560px]
                  sm:px-10
                  sm:py-11
                  lg:min-h-[620px]
                  lg:px-14
                  lg:py-14
                "
              >
                {/* Grid */}
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

                {/* Ambient */}
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
                    left-4
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
                    key={activeSection.id}
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
                        {activeSection.label}
                      </span>
                    </div>

                    <h2
                      className="
                        max-w-2xl
                        font-display
                        text-4xl
                        font-semibold
                        leading-[1.14]
                        tracking-tight
                        text-ink
                        sm:text-5xl
                        lg:text-6xl
                      "
                    >
                      {activeSection.title}
                    </h2>

                    <p
                      className="
                        mt-8
                        max-w-2xl
                        text-base
                        leading-9
                        text-ink-muted
                        sm:text-lg
                        sm:leading-10
                        lg:text-xl
                        lg:leading-10
                      "
                    >
                      {activeSection.text}
                    </p>
                  </motion.div>
                </AnimatePresence>

                {/* Progress */}
                <div className="relative z-10 mt-14">
                  <div className="mb-4 flex items-center justify-between">
                    <span
                      className="
                        text-[10px]
                        font-medium
                        tracking-[0.12em]
                        text-ink-faint
                      "
                    >
                      جِذع AI
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
                        ((activeIndex + 1) / sections.length) * 100,
                      )}
                      %
                    </span>
                  </div>

                  <div className="h-px w-full bg-base-line">
                    <motion.div
                      className="h-px bg-brass"
                      animate={{
                        width: `${
                          ((activeIndex + 1) / sections.length) * 100
                        }%`,
                      }}
                      transition={{
                        duration: reducedMotion ? 0 : 0.45,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    />
                  </div>

                  <div className="mt-4 grid grid-cols-3 gap-2">
                    {sections.map((section, index) => (
                      <button
                        key={`marker-${section.id}`}
                        type="button"
                        aria-label={`الانتقال إلى ${section.label}`}
                        onMouseEnter={() => setActiveIndex(index)}
                        onFocus={() => setActiveIndex(index)}
                        onClick={() => setActiveIndex(index)}
                        className="group flex justify-center py-2"
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

      {/* =========================================================
          JITHR PRINCIPLE
      ========================================================= */}
      <section
        dir="rtl"
        className="
          relative
          overflow-hidden
          border-b
          border-base-line
          py-24
          sm:py-32
          lg:py-40
        "
      >
        <Container>
          <div className="mx-auto max-w-5xl">
            <div className="mb-10 text-center">
              <span
                className="
                  font-mono
                  text-[10px]
                  font-medium
                  tracking-[0.22em]
                  text-brass
                "
              >
                THE JITHR PRINCIPLE
              </span>
            </div>

            <div
              className="
                relative
                overflow-hidden
                border
                border-base-line
                px-6
                py-14
                sm:px-10
                sm:py-16
                lg:px-16
                lg:py-20
              "
            >
              {/* Central trunk */}
              <div
                aria-hidden="true"
                className="
                  pointer-events-none
                  absolute
                  bottom-0
                  left-1/2
                  top-0
                  w-px
                  -translate-x-1/2
                  bg-gradient-to-b
                  from-transparent
                  via-brass/30
                  to-transparent
                "
              />

              <div
                aria-hidden="true"
                className="
                  pointer-events-none
                  absolute
                  left-1/2
                  top-1/2
                  h-3
                  w-3
                  -translate-x-1/2
                  -translate-y-1/2
                  rounded-full
                  bg-brass
                "
              />

              <div className="relative grid gap-12 sm:grid-cols-2 sm:gap-16">
                <PrincipleItem
                  side="right"
                  number="01"
                  title="تواصل"
                />

                <PrincipleItem
                  side="left"
                  number="02"
                  title="بيانات"
                />

                <PrincipleItem
                  side="right"
                  number="03"
                  title="ذكاء"
                />

                <PrincipleItem
                  side="left"
                  number="04"
                  title="أتمتة"
                />
              </div>

              <div className="relative mt-14 text-center sm:mt-16">
                <span
                  className="
                    inline-flex
                    border
                    border-brass/40
                    bg-base
                    px-5
                    py-2
                    font-display
                    text-sm
                    font-medium
                    text-ink
                    sm:text-base
                  "
                >
                  منظومة واحدة
                </span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* =========================================================
          CLOSING STATEMENT
      ========================================================= */}
      <section
        dir="rtl"
        className="
          relative
          overflow-hidden
          border-b
          border-base-line
          py-24
          sm:py-32
          lg:py-40
        "
      >
        <Container>
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-7 flex items-center justify-center gap-3">
              <span
                aria-hidden="true"
                className="h-px w-8 bg-brass/60"
              />

              <span
                className="
                  font-mono
                  text-[10px]
                  tracking-[0.18em]
                  text-brass
                "
              >
                JITHR AI
              </span>

              <span
                aria-hidden="true"
                className="h-px w-8 bg-brass/60"
              />
            </div>

            <h2
              className="
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
              الجِذع قوي عندما تعمل فروعه معًا.
            </h2>

            <div
              aria-hidden="true"
              className="mx-auto mt-9 h-px w-16 bg-brass"
            />
          </div>
        </Container>
      </section>

      <FinalCTA />
    </>
  );
}

function PrincipleItem({
  number,
  title,
  side,
}: {
  number: string;
  title: string;
  side: 'right' | 'left';
}) {
  return (
    <div
      className={`
        flex
        items-center
        gap-4
        ${
          side === 'right'
            ? 'sm:justify-end sm:pr-10'
            : 'sm:justify-start sm:pl-10'
        }
      `}
    >
      <span
        className="
          flex
          h-10
          w-10
          shrink-0
          items-center
          justify-center
          border
          border-base-line
          font-mono
          text-[10px]
          text-ink-faint
        "
      >
        {number}
      </span>

      <span
        className="
          font-display
          text-xl
          font-medium
          text-ink
          sm:text-2xl
        "
      >
        {title}
      </span>
    </div>
  );
}
```
