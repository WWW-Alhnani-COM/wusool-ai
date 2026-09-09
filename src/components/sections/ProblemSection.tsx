'use client';

import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from 'framer-motion';
import { useRef, useState } from 'react';

import { problemContent } from '@/data/content';
import { Container } from '@/components/ui/Container';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export function ProblemSection() {
  const reducedMotion = useReducedMotion();

  const sectionRef = useRef<HTMLElement>(null);

  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (reducedMotion) return;

    const index = Math.min(
      problemContent.points.length - 1,
      Math.floor(latest * problemContent.points.length),
    );

    setActiveIndex(index);
  });

  const totalPoints = problemContent.points.length;
  const currentPoint = problemContent.points[activeIndex];

  return (
    <section
      ref={sectionRef}
      dir="rtl"
      className="relative h-[800vh] bg-base"
    >
      {/* 
        Header-safe viewport

        pt-20:
        مساحة للهيدر على الهاتف

        lg:pt-24:
        مساحة أكبر للهيدر على الكمبيوتر
      */}
      <div
        className="
          sticky
          top-0
          z-10
          flex
          h-screen
          w-full
          items-center
          overflow-hidden
          pt-20
          lg:pt-24
        "
      >
        <Container
          className="
            relative
            flex
            h-full
            w-full
            items-center
            justify-center
          "
        >
          {/* Background glow */}
          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              left-1/2
              top-1/2
              h-[300px]
              w-[300px]
              -translate-x-1/2
              -translate-y-1/2
              rounded-full
              bg-brass/5
              blur-[100px]
              sm:h-[400px]
              sm:w-[400px]
              lg:h-[500px]
              lg:w-[500px]
            "
          />

          {/* Main content */}
          <div
            className="
              relative
              z-20
              flex
              w-full
              max-w-5xl
              -translate-y-4
              flex-col
              items-center
              justify-center
              text-center
              sm:-translate-y-6
              lg:-translate-y-8
            "
          >
            {/* Heading */}
            <motion.div
              initial={
                reducedMotion
                  ? {
                      opacity: 1,
                      y: 0,
                    }
                  : {
                      opacity: 0,
                      y: 30,
                    }
              }
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.3,
              }}
              transition={{
                duration: reducedMotion ? 0 : 0.8,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="
                mb-10
                w-full
                max-w-4xl
                px-4
                sm:mb-14
                lg:mb-16
              "
            >
              <span
                className="
                  mb-4
                  block
                  text-xs
                  font-medium
                  uppercase
                  tracking-[0.25em]
                  text-brass
                  sm:mb-5
                  sm:text-sm
                "
              >
                المشكلة
              </span>

              <h2
                className="
                  font-display
                  text-3xl
                  font-bold
                  leading-[1.15]
                  tracking-tight
                  text-ink
                  sm:text-4xl
                  md:text-5xl
                  lg:text-6xl
                  xl:text-7xl
                "
              >
                {problemContent.heading}
              </h2>
            </motion.div>

            {/* Counter */}
            <div
              className="
                mb-6
                flex
                items-center
                gap-3
                sm:mb-8
                sm:gap-4
              "
            >
              <span
                className="
                  font-mono
                  text-sm
                  tracking-[0.2em]
                  text-brass
                  sm:text-base
                "
              >
                {String(activeIndex + 1).padStart(2, '0')}
              </span>

              <span
                aria-hidden="true"
                className="
                  h-px
                  w-8
                  bg-base-line
                  sm:w-12
                "
              />

              <span
                className="
                  font-mono
                  text-sm
                  tracking-[0.2em]
                  text-ink/40
                  sm:text-base
                "
              >
                {String(totalPoints).padStart(2, '0')}
              </span>
            </div>

            {/* Current point */}
            <div
              className="
                relative
                flex
                min-h-[110px]
                w-full
                items-center
                justify-center
                overflow-hidden
                px-5
                sm:min-h-[150px]
                sm:px-8
                md:min-h-[180px]
                lg:min-h-[220px]
              "
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={
                    reducedMotion
                      ? {
                          opacity: 1,
                          y: 0,
                          filter: 'blur(0px)',
                          scale: 1,
                        }
                      : {
                          opacity: 0,
                          y: 35,
                          filter: 'blur(10px)',
                          scale: 0.97,
                        }
                  }
                  animate={{
                    opacity: 1,
                    y: 0,
                    filter: 'blur(0px)',
                    scale: 1,
                  }}
                  exit={
                    reducedMotion
                      ? {
                          opacity: 0,
                        }
                      : {
                          opacity: 0,
                          y: -30,
                          filter: 'blur(8px)',
                          scale: 1.02,
                        }
                  }
                  transition={{
                    duration: reducedMotion ? 0 : 0.55,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="
                    absolute
                    inset-x-0
                    flex
                    w-full
                    items-center
                    justify-center
                  "
                >
                  <p
                    className="
                      max-w-3xl
                      font-display
                      text-2xl
                      font-semibold
                      leading-[1.35]
                      text-ink
                      sm:text-3xl
                      md:text-4xl
                      lg:text-5xl
                      xl:text-6xl
                    "
                  >
                    {currentPoint}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Progress */}
            <div
              className="
                mt-8
                flex
                w-full
                max-w-xs
                flex-col
                items-center
                gap-3
                px-4
                sm:mt-10
                sm:max-w-md
                sm:gap-4
              "
            >
              <div
                className="
                  h-px
                  w-full
                  overflow-hidden
                  bg-base-line
                "
              >
                <motion.div
                  className="
                    h-full
                    origin-right
                    bg-brass
                  "
                  animate={{
                    scaleX:
                      totalPoints <= 1
                        ? 1
                        : (activeIndex + 1) / totalPoints,
                  }}
                  transition={{
                    duration: reducedMotion ? 0 : 0.35,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                />
              </div>

              <span
                className="
                  text-[10px]
                  tracking-[0.2em]
                  text-ink/40
                  sm:text-xs
                "
              >
                مرّر للاستمرار
              </span>
            </div>
          </div>

          {/* Desktop side indicator */}
          <div
            className="
              absolute
              right-3
              top-1/2
              hidden
              -translate-y-1/2
              flex-col
              gap-2
              md:right-5
              md:flex
              lg:right-8
            "
          >
            {problemContent.points.map((point, index) => (
              <motion.span
                key={point}
                animate={{
                  width: index === activeIndex ? 20 : 5,
                  opacity:
                    index === activeIndex ? 1 : 0.2,
                }}
                transition={{
                  duration: reducedMotion ? 0 : 0.25,
                }}
                className="
                  block
                  h-1
                  rounded-full
                  bg-brass
                "
              />
            ))}
          </div>
        </Container>
      </div>
    </section>
  );
}
