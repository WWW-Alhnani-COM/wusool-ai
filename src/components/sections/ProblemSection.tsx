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

  /*
   * Interactive technical grid state
   */
  const mouseX = useRef(50);
  const mouseY = useRef(50);
  const gridX = useRef(0);
  const gridY = useRef(0);

  const gridRef = useRef<HTMLDivElement>(null);

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

    /*
     * Move the technical grid with scroll.
     *
     * The movement is intentionally subtle so the grid
     * feels like a physical technical surface rather than
     * a normal background animation.
     */
    if (!reducedMotion && gridRef.current) {
      const scrollX = latest * 70;
      const scrollY = latest * 140;

      gridX.current = scrollX;
      gridY.current = scrollY;

      gridRef.current.style.transform = `
        translate3d(
          ${scrollX}px,
          ${scrollY}px,
          0
        )
      `;
    }
  });

  const handlePointerMove = (
    event: React.PointerEvent<HTMLElement>,
  ) => {
    if (reducedMotion || !sectionRef.current) {
      return;
    }

    const rect = sectionRef.current.getBoundingClientRect();

    const x =
      ((event.clientX - rect.left) / rect.width) * 100;

    const y =
      ((event.clientY - rect.top) / rect.height) * 100;

    mouseX.current = Math.max(0, Math.min(100, x));
    mouseY.current = Math.max(0, Math.min(100, y));

    sectionRef.current.style.setProperty(
      '--pointer-x',
      `${mouseX.current}%`,
    );

    sectionRef.current.style.setProperty(
      '--pointer-y',
      `${mouseY.current}%`,
    );
  };

  const handlePointerLeave = () => {
    if (reducedMotion || !sectionRef.current) {
      return;
    }

    sectionRef.current.style.setProperty(
      '--pointer-x',
      '50%',
    );

    sectionRef.current.style.setProperty(
      '--pointer-y',
      '50%',
    );
  };

  const currentPoint = problemContent.points[activeIndex];

  const isLastPoint =
    activeIndex === problemContent.points.length - 1;

  return (
    <section
      ref={sectionRef}
      dir="rtl"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={
        {
          '--pointer-x': '50%',
          '--pointer-y': '50%',
        } as React.CSSProperties
      }
      className="
        relative
        z-20
        isolate
        h-[300vh]
        overflow-hidden
        bg-base
      "
    >
      {/* =====================================================
          INTERACTIVE TECHNICAL BACKGROUND
          ===================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          z-0
          overflow-hidden
        "
      >
        {/* Base technical grid */}
        <div
          ref={gridRef}
          className="
            absolute
            -inset-[120px]
            will-change-transform
            opacity-[0.18]
          "
          style={{
            backgroundImage: `
              linear-gradient(
                to right,
                rgba(200,155,92,0.13) 1px,
                transparent 1px
              ),
              linear-gradient(
                to bottom,
                rgba(200,155,92,0.13) 1px,
                transparent 1px
              )
            `,
            backgroundSize: '64px 64px',
          }}
        />

        {/* Fine secondary grid */}
        <div
          className="
            absolute
            -inset-[120px]
            opacity-[0.09]
          "
          style={{
            backgroundImage: `
              linear-gradient(
                to right,
                rgba(255,255,255,0.08) 1px,
                transparent 1px
              ),
              linear-gradient(
                to bottom,
                rgba(255,255,255,0.08) 1px,
                transparent 1px
              )
            `,
            backgroundSize: '16px 16px',
          }}
        />

        {/* Cursor-following technical glow */}
        <div
          className="
            absolute
            h-[420px]
            w-[420px]
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            bg-brass/[0.055]
            blur-[110px]
            transition-[left,top]
            duration-300
            ease-out
          "
          style={{
            left: 'var(--pointer-x)',
            top: 'var(--pointer-y)',
          }}
        />

        {/* Cursor-following sharp radial grid highlight */}
        <div
          className="
            absolute
            inset-0
            opacity-80
          "
          style={{
            background: `
              radial-gradient(
                360px circle at var(--pointer-x) var(--pointer-y),
                rgba(200,155,92,0.10),
                rgba(200,155,92,0.035) 35%,
                transparent 70%
              )
            `,
          }}
        />

        {/* Center atmospheric glow */}
        <div
          className="
            absolute
            left-1/2
            top-1/2
            h-[500px]
            w-[500px]
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            bg-brass/[0.025]
            blur-[130px]
          "
        />

        {/* Technical center point */}
        <div
          className="
            absolute
            left-1/2
            top-1/2
            h-2
            w-2
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            bg-brass/30
            shadow-[0_0_30px_rgba(200,155,92,0.35)]
          "
        />

        {/* Horizontal technical scan line */}
        <motion.div
          aria-hidden="true"
          className="
            absolute
            left-0
            right-0
            h-px
            bg-gradient-to-r
            from-transparent
            via-brass/15
            to-transparent
          "
          animate={
            reducedMotion
              ? {
                  top: '50%',
                }
              : {
                  top: ['20%', '80%', '20%'],
                }
          }
          transition={
            reducedMotion
              ? {
                  duration: 0,
                }
              : {
                  duration: 12,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }
          }
        />

        {/* Vertical technical scan line */}
        <motion.div
          aria-hidden="true"
          className="
            absolute
            bottom-0
            top-0
            w-px
            bg-gradient-to-b
            from-transparent
            via-brass/10
            to-transparent
          "
          animate={
            reducedMotion
              ? {
                  left: '50%',
                }
              : {
                  left: ['20%', '80%', '20%'],
                }
          }
          transition={
            reducedMotion
              ? {
                  duration: 0,
                }
              : {
                  duration: 16,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }
          }
        />
      </div>

      {/* =====================================================
          EDGE VIGNETTE
          ===================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          z-[1]
          bg-[radial-gradient(circle_at_center,transparent_25%,rgba(5,5,5,0.55)_100%)]
        "
      />

      {/* =====================================================
          STICKY CONTENT
          ===================================================== */}

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
            z-30
            flex
            w-full
            max-w-4xl
            translate-y-8
            flex-col
            items-center
            justify-center
            text-center
            sm:translate-y-10
            lg:translate-y-12
          "
        >
          {/* =================================================
              MAIN ATMOSPHERE
              ================================================= */}

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              left-1/2
              top-1/2
              h-[240px]
              w-[240px]
              -translate-x-1/2
              -translate-y-1/2
              rounded-full
              bg-brass/5
              blur-[90px]
              sm:h-[340px]
              sm:w-[340px]
              lg:h-[420px]
              lg:w-[420px]
            "
          />

          {/* =================================================
              MAIN CONTENT
              ================================================= */}

          <div
            className="
              relative
              z-30
              flex
              w-full
              max-w-4xl
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
                mb-5
                w-full
                max-w-3xl
                px-4
                sm:mb-7
                lg:mb-8
              "
            >
              <span
                className="
                  mb-3
                  block
                  text-[10px]
                  font-medium
                  uppercase
                  tracking-[0.25em]
                  text-brass
                  sm:mb-4
                  sm:text-xs
                "
              >
                المشكلة
              </span>

              <h2
                className="
                  font-display
                  text-2xl
                  font-bold
                  leading-[1.15]
                  tracking-tight
                  text-ink
                  sm:text-3xl
                  md:text-4xl
                  lg:text-5xl
                "
              >
                {problemContent.heading}
              </h2>
            </motion.div>

            {/* =================================================
                PROBLEM STORY
                ================================================= */}

            <div
              className="
                relative
                flex
                min-h-[100px]
                w-full
                items-center
                justify-center
                px-5
                sm:min-h-[120px]
                sm:px-8
                md:min-h-[145px]
                lg:min-h-[170px]
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
                      text-[10px]
                      font-medium
                      uppercase
                      tracking-[0.22em]
                      text-brass/80
                      sm:mb-4
                      sm:text-xs
                    "
                  >
                    {String(activeIndex + 1).padStart(2, '0')}
                  </span>

                  <p
                    className="
                      max-w-2xl
                      px-2
                      font-display
                      text-xl
                      font-semibold
                      leading-[1.35]
                      text-ink
                      sm:text-2xl
                      md:text-3xl
                      lg:text-4xl
                      xl:text-5xl
                    "
                  >
                    {currentPoint}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* =================================================
                PROGRESS
                ================================================= */}

            <div
              className="
                mt-7
                flex
                items-center
                justify-center
                gap-2
                sm:mt-9
                lg:mt-10
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
                          ? 'w-7 bg-brass'
                          : 'w-1.5 bg-ink/15'
                      }
                    `}
                  />
                );
              })}
            </div>

            {/* =================================================
                FINAL MESSAGE
                ================================================= */}

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
                mt-8
                max-w-2xl
                text-center
                sm:mt-10
                lg:mt-12
              "
              aria-hidden={!isLastPoint}
            >
              <p
                className="
                  font-display
                  text-lg
                  font-semibold
                  leading-relaxed
                  text-ink
                  sm:text-xl
                  lg:text-2xl
                "
              >
                المشكلة ليست في كثرة الأنظمة.
              </p>

              <p
                className="
                  mt-2
                  font-display
                  text-lg
                  font-bold
                  leading-relaxed
                  text-brass
                  sm:text-xl
                  lg:text-2xl
                "
              >
                المشكلة أنها لا تعمل معًا.
              </p>
            </motion.div>

            {/* Bottom spacing */}
            <div
              aria-hidden="true"
              className="
                h-8
                w-full
                sm:h-12
                lg:h-16
              "
            />
          </div>
        </Container>
      </div>
    </section>
  );
}
