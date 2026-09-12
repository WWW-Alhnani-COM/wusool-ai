import { motion } from "framer-motion";
import { solutionContent } from "@/data/content";
import { Container } from "@/components/ui/Container";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function SolutionPath() {
  const reducedMotion = useReducedMotion();
  const { path } = solutionContent;

  return (
    <section className="bg-[#050505] py-24 sm:py-32 border-t border-[#1D1D1D]">
      <Container className="flex flex-col gap-16">
        {/* Heading */}
        <h2
          className="
            font-display
            text-3xl
            sm:text-4xl
            lg:text-5xl
            leading-[1.15]
            text-[#F5F5F5]
            text-right
            max-w-2xl
            mr-0
            ml-auto
          "
        >
          {solutionContent.heading}
        </h2>

        {/* Solution path */}
        <div className="flex flex-col sm:flex-row-reverse sm:items-center gap-6 sm:gap-0">
          {path.map((stage, i) => (
            <div
              key={stage}
              className="flex sm:flex-1 items-center gap-4"
            >
              <motion.div
                initial={
                  reducedMotion
                    ? { scale: 1, opacity: 1 }
                    : { scale: 0.8, opacity: 0 }
                }
                whileInView={{
                  scale: 1,
                  opacity: 1,
                }}
                viewport={{
                  once: true,
                  margin: "-15% 0px",
                }}
                transition={{
                  duration: 0.4,
                  delay: reducedMotion ? 0 : i * 0.08,
                }}
                className="flex flex-col items-center gap-3 shrink-0"
              >
                {/* Number */}
                <span
                  className="
                    h-12
                    w-12
                    rounded-full
                    border
                    border-[#C89B5C]/60
                    bg-[#0B0B0B]
                    flex
                    items-center
                    justify-center
                    text-[#C89B5C]
                    text-sm
                    font-english
                  "
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* Service name */}
                <span
                  className="
                    text-[#F5F5F5]
                    text-sm
                    sm:text-base
                    whitespace-nowrap
                    font-medium
                  "
                >
                  {stage}
                </span>
              </motion.div>

              {/* Connecting line */}
              {i < path.length - 1 && (
                <span
                  className="
                    hidden
                    sm:block
                    flex-1
                    h-px
                    bg-[#1D1D1D]
                    mx-2
                  "
                  aria-hidden="true"
                />
              )}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
