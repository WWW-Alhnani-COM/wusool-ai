import { motion } from "framer-motion";
import { heroContent } from "@/data/content";
import { Button } from "@/components/ui/Button";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function Hero() {
  const reducedMotion = useReducedMotion();

  const heroBackground =
    "/src/assets/sequence/ezgif-frame-001.jpg";

  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      {/* =========================================================
          HERO BACKGROUND
          ========================================================= */}

      <div className="absolute inset-0 z-0">
        <img
          src={heroBackground}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Dark cinematic overlay */}
        <div className="absolute inset-0 bg-black/55" />

        {/* Gradient for text readability */}
        <div className="absolute inset-0 bg-gradient-to-l from-black/80 via-black/45 to-black/20" />

        {/* Subtle bottom fade */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/70 to-transparent" />
      </div>

      {/* =========================================================
          DECORATIVE CONNECTION LINE
          ========================================================= */}

      <svg
        className="absolute z-[1] -top-10 left-1/2 -translate-x-1/2 w-[140%] max-w-3xl opacity-30 pointer-events-none"
        viewBox="0 0 600 300"
        fill="none"
        aria-hidden="true"
      >
        <motion.path
          d="M 20 250 C 150 250, 180 60, 320 80 C 430 95, 460 220, 580 200"
          stroke="#C89B5C"
          strokeWidth="1.5"
          strokeLinecap="round"
          initial={
            reducedMotion
              ? { pathLength: 1 }
              : { pathLength: 0 }
          }
          animate={{ pathLength: 1 }}
          transition={{
            duration: 1.6,
            ease: [0.22, 1, 0.36, 1],
          }}
        />
      </svg>

      {/* =========================================================
          HERO CONTENT
          ========================================================= */}

      <div className="relative z-10 min-h-screen container-page section-px flex items-center">
        <div className="w-full flex flex-col items-end text-right gap-8 max-w-4xl mr-0 ml-auto py-32">
          
          {/* Headline */}
          <motion.h1
            initial={
              reducedMotion
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 16 }
            }
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              font-display
              text-4xl
              sm:text-5xl
              lg:text-7xl
              leading-[1.1]
              text-white
              max-w-4xl
              drop-shadow-[0_4px_20px_rgba(0,0,0,0.45)]
            "
          >
            {heroContent.headline}
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={
              reducedMotion
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 16 }
            }
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              delay: 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              text-white/85
              text-lg
              sm:text-xl
              lg:text-2xl
              leading-relaxed
              max-w-2xl
              drop-shadow-[0_3px_15px_rgba(0,0,0,0.5)]
            "
          >
            {heroContent.subheadline}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={
              reducedMotion
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 16 }
            }
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              delay: 0.3,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              flex
              flex-col
              sm:flex-row
              gap-4
              w-full
              sm:w-auto
              items-stretch
              sm:items-center
            "
          >
            <Button to="/طلب-استشارة">
              {heroContent.ctaPrimary}
            </Button>

            <Button
              to="/كيف-نعمل"
              variant="secondary"
            >
              {heroContent.ctaSecondary}
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
