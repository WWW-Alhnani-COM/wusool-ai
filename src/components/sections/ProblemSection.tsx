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
    const total = problemContent.points.length;

    const index = Math.min(
      total - 1,
      Math.max(0, Math.floor(latest * total)),
    );

    setActiveIndex((current) =>
      current === index ? current : index,
    );
  });

  const currentPoint = problemContent.points[activeIndex];

  const isLastPoint =
    activeIndex === problemContent.points.length - 1;

  return (
    <section
      ref={sectionRef}
      dir="rtl"
      className="
        relative
        z-20
        isolate
        h-[300vh]
        bg-base
      "
    >
      <div
        className="
          sticky
          top-20
          z-20
          flex
          h-[calc(100vh-5rem)]
          w-full
          items-center
          sm:top-24
          sm:h-[calc(100vh-6rem)]
          lg:top-28
          lg:h-[calc(100vh-7rem)]
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
    px-5
    py-16
    sm:px-8
    sm:py-20
    lg:px-10
    lg:py-24
  "
>
          {/* Background atmosphere */}
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

          {/* Main content */}
          <div
            className="
              relative
              z-30
              flex
              w-full
              max-w-5xl
              flex-col
              items-center
              justify-center
              text-center
            "
          >
            {/* Section heading */}
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
                amount: 0.2,
              }}
              transition={{
                duration: reducedMotion ? 0 : 0.8,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="
                mb-6
                w-full
                max-w-4xl
                px-4
                sm:mb-8
                lg:mb-10
              "
            >
              <span
                className="
                  mb-3
                  block
                  text-xs
                  font-medium
                  uppercase
                  tracking-[0.25em]
                  text-brass
                  sm:mb-4
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
                "
              >
                {problemContent.heading}
              </h2>
            </motion.div>

            {/* Problem story */}
            <div
              className="
                relative
                flex
                min-h-[130px]
                w-full
                items-center
                justify-center
                px-5
                sm:min-h-[160px]
                sm:px-8
                md:min-h-[190px]
                lg:min-h-[220px]
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
                    flex-col
                    items-center
                    justify-center
                  "
                >
                  <span
                    className="
                      mb-3
                      text-xs
                      font-medium
                      uppercase
                      tracking-[0.22em]
                      text-brass/80
                      sm:mb-4
                      sm:text-sm
                    "
                  >
                    {String(activeIndex + 1).padStart(2, '0')}
                  </span>

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
                mt-5
                flex
                items-center
                justify-center
                gap-2
                sm:mt-6
              "
              aria-hidden="true"
            >
              {problemContent.points.map((_, index) => {
                const isActive = index === activeIndex;

                return (
                  <span
                    key={index}
                    className={`
                      h-1
                      rounded-full
                      transition-all
                      duration-300
                      ${
                        isActive
                          ? 'w-8 bg-brass'
                          : 'w-1.5 bg-ink/15'
                      }
                    `}
                  />
                );
              })}
            </div>

            {/* Final message */}
            <motion.div
              initial={false}
              animate={{
                opacity: isLastPoint ? 1 : 0,
                y: isLastPoint ? 0 : 12,
              }}
              transition={{
                duration: reducedMotion ? 0 : 0.4,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="
                pointer-events-none
                mt-6
                max-w-3xl
                text-center
                sm:mt-8
              "
              aria-hidden={!isLastPoint}
            >
              <p
                className="
                  font-display
                  text-xl
                  font-semibold
                  leading-relaxed
                  text-ink
                  sm:text-2xl
                  lg:text-3xl
                "
              >
                المشكلة ليست في كثرة الأنظمة.
              </p>

              <p
                className="
                  mt-2
                  font-display
                  text-xl
                  font-bold
                  leading-relaxed
                  text-brass
                  sm:text-2xl
                  lg:text-3xl
                "
              >
                المشكلة أنها لا تعمل معًا.
              </p>
            </motion.div>
          </div>
        </Container>
      </div>
    </section>
  );
}

