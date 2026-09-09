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
   * تغيير النص يبقى مرتبطًا بالتمرير
   * حتى عند تفعيل reduced motion.
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
                translate-y-4
                px-4
                sm:mb-14
                sm:translate-y-5
                lg:mb-16
                lg:translate-y-6
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
                  xl:text-6xl
                "
              >
                كل نقطة توقف... تعيق نمو العمل.
              </h2>
            </motion.div>

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
          </div>
        </Container>
      </div>
    </section>
  );
}
