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

  /*
   * مهم:
   * لا نربط تغيير النص بـ reducedMotion.
   * حتى على الهاتف يجب أن يتغير النص مع التمرير.
   */
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const total = problemContent.points.length;

    const index = Math.min(
      total - 1,
      Math.max(0, Math.floor(latest * total)),
    );

    setActiveIndex((current) =>
      current === index ? current : index,
    );
  });

  const totalPoints = problemContent.points.length;
  const currentPoint = problemContent.points[activeIndex];

  return (
    <section
      ref={sectionRef}
      dir="rtl"
      className="relative h-[300vh] bg-base"
    >
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
          sm:pt-24
          lg:pt-28
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
              h-[280px]
              w-[280px]
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
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 30 }
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
                كل نقطة توقف... تعيق نمو العمل.
              </h2>
            </motion.div>

            {/* Counter */}
            <div
              className="
                mb-5
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
                "
              >
                {String(activeIndex + 1).padStart(2, '0')}
              </span>

              <span
                className="h-px w-8 bg-base-line sm:w-12"
              />

              <span
                className="
                  font-mono
                  text-sm
                  tracking-[0.2em]
                  text-ink/40
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
                min-h-[120px]
                w-full
                items-center
                justify-center
                overflow-hidden
                px-5
                sm:min-h-[160px]
                sm:px-8
                md:min-h-[200px]
                lg:min-h-[230px]
              "
            >
              <AnimatePresence
                mode="wait"
                initial={false}
              >
                <motion.div
                  key={activeIndex}
                  initial={
                    reducedMotion
                      ? {
                          opacity: 1,
                          y: 0,
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
                          y: -25,
                          filter: 'blur(8px)',
                          scale: 1.02,
                        }
                  }
                  transition={{
                    duration: reducedMotion ? 0 : 0.5,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="
                    absolute
                    inset-0
                    flex
                    items-center
                    justify-center
                  "
                >
                  <p
                    className="
                      max-w-3xl
                      px-2
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
                      (activeIndex + 1) /
                      totalPoints,
                  }}
                  transition={{
                    duration: reducedMotion ? 0 : 0.3,
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

            {/* Mobile scroll hint */}
            <div
              className="
                mt-5
                flex
                items-center
                gap-2
                text-[10px]
                text-ink/30
                sm:hidden
              "
            >
              <span>اسحب للأعلى</span>

              <motion.span
                animate={
                  reducedMotion
                    ? undefined
                    : {
                        y: [0, 5, 0],
                      }
                }
                transition={{
                  duration: 1.4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                ↓
              </motion.span>
            </div>
          </div>

          {/* Desktop indicator */}
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
            {problemContent.points.map(
              (point, index) => (
                <motion.span
                  key={point}
                  animate={{
                    width:
                      index === activeIndex
                        ? 20
                        : 5,
                    opacity:
                      index === activeIndex
                        ? 1
                        : 0.2,
                  }}
                  transition={{
                    duration:
                      reducedMotion ? 0 : 0.25,
                  }}
                  className="
                    block
                    h-1
                    rounded-full
                    bg-brass
                  "
                />
              ),
            )}
          </div>
        </Container>
      </div>
    </section>
  );
}
