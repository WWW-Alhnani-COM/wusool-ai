import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useRef, useState } from "react";
import { problemContent } from "@/data/content";
import { Container } from "@/components/ui/Container";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function ProblemSection() {
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (reducedMotion) return;

    const nextIndex = Math.min(
      problemContent.points.length - 1,
      Math.floor(latest * problemContent.points.length)
    );

    setActiveIndex(nextIndex);
  });

  const currentPoint = problemContent.points[activeIndex];
  const totalPoints = problemContent.points.length;

  return (
    <section
      ref={sectionRef}
      className="relative h-[800vh] bg-base"
      dir="rtl"
    >
      <div className="sticky top-0 flex h-screen w-full items-center overflow-hidden">
        <Container className="relative flex h-full w-full items-center justify-center">
          {/* Background glow */}
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brass/5 blur-[120px]"
            aria-hidden="true"
          />

          <div className="relative z-10 flex w-full max-w-5xl flex-col items-center justify-center text-center">
            {/* Section heading */}
            <motion.div
              initial={
                reducedMotion
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 30 }
              }
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mb-16 max-w-4xl"
            >
              <span className="mb-5 block text-sm font-medium tracking-[0.25em] text-brass uppercase">
                المشكلة
              </span>

              <h2 className="font-display text-4xl font-bold leading-[1.1] tracking-tight text-ink sm:text-5xl md:text-6xl lg:text-7xl">
                {problemContent.heading}
              </h2>
            </motion.div>

            {/* Counter */}
            <div className="mb-8 flex items-center gap-4 text-sm tracking-[0.2em]">
              <span className="font-mono text-brass">
                {String(activeIndex + 1).padStart(2, "0")}
              </span>

              <span className="h-px w-12 bg-base-line" />

              <span className="font-mono text-ink/40">
                {String(totalPoints).padStart(2, "0")}
              </span>
            </div>

            {/* Current problem */}
            <div className="relative flex min-h-[150px] w-full items-center justify-center overflow-hidden px-4 sm:min-h-[190px] md:min-h-[230px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentPoint}
                  initial={
                    reducedMotion
                      ? { opacity: 1, y: 0, filter: "blur(0px)" }
                      : {
                          opacity: 0,
                          y: 45,
                          filter: "blur(12px)",
                          scale: 0.96,
                        }
                  }
                  animate={{
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)",
                    scale: 1,
                  }}
                  exit={
                    reducedMotion
                      ? { opacity: 0 }
                      : {
                          opacity: 0,
                          y: -35,
                          filter: "blur(10px)",
                          scale: 1.02,
                        }
                  }
                  transition={{
                    duration: reducedMotion ? 0 : 0.65,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="absolute inset-x-0 flex items-center justify-center"
                >
                  <p className="font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl md:text-5xl lg:text-6xl">
                    {currentPoint}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Progress line */}
            <div className="mt-12 flex w-full max-w-md flex-col items-center gap-4">
              <div className="h-px w-full overflow-hidden bg-base-line">
                <motion.div
                  className="h-full origin-right bg-brass"
                  animate={{
                    scaleX:
                      totalPoints <= 1
                        ? 1
                        : (activeIndex + 1) / totalPoints,
                  }}
                  transition={{
                    duration: reducedMotion ? 0 : 0.45,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                />
              </div>

              <span className="text-xs tracking-[0.2em] text-ink/40">
                مرّر للاستمرار
              </span>
            </div>
          </div>

          {/* Side vertical indicator */}
          <div className="absolute right-4 top-1/2 hidden -translate-y-1/2 flex-col gap-2 sm:right-6 md:flex">
            {problemContent.points.map((point, index) => (
              <motion.span
                key={point}
                animate={{
                  width: index === activeIndex ? 22 : 6,
                  opacity: index === activeIndex ? 1 : 0.25,
                }}
                transition={{
                  duration: reducedMotion ? 0 : 0.3,
                }}
                className="block h-1 rounded-full bg-brass"
              />
            ))}
          </div>
        </Container>
      </div>
    </section>
  );
}
