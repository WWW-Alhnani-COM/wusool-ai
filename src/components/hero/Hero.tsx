import { motion } from "framer-motion";
import { heroContent } from "@/data/content";
import { Button } from "@/components/ui/Button";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useIsLowPowerDevice } from "@/hooks/useIsLowPowerDevice";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { sequenceFrames } from "@/data/process";
import { useEffect, useMemo, useState } from "react";

// ============================================================
// HERO SCROLL SETTINGS
// ============================================================

// عدد ارتفاعات الشاشة التي يحتاجها المستخدم
// للانتقال من Frame 001 إلى Frame 050.
//
// الرقم الأكبر = حركة أبطأ وأكثر سينمائية.
const HERO_SCROLL_LENGTH_VH = 500;

// للأجهزة الضعيفة
const HERO_SCROLL_LENGTH_VH_LIGHT = 320;

// عدد الصور التي يتم تحميلها حول الصورة الحالية
const PRELOAD_WINDOW = 3;

export function Hero() {
  const reducedMotion = useReducedMotion();
  const lowPower = useIsLowPowerDevice();

  const { ref, progress } =
    useScrollProgress<HTMLDivElement>();

  const frames = sequenceFrames;
  const frameCount = frames.length;

  // ==========================================================
  // ACTIVE FRAME
  // ==========================================================

  const activeIndex = useMemo(() => {
    if (frameCount === 0) {
      return 0;
    }

    const normalizedProgress = Math.max(
      0,
      Math.min(1, progress),
    );

    const index = Math.floor(
      normalizedProgress * frameCount,
    );

    return Math.min(
      index,
      frameCount - 1,
    );
  }, [progress, frameCount]);

  // ==========================================================
  // PRELOAD NEARBY FRAMES
  // ==========================================================

  const [loadedFrames, setLoadedFrames] =
    useState<Set<number>>(
      () => new Set([0]),
    );

  useEffect(() => {
    if (frameCount === 0) {
      return;
    }

    setLoadedFrames((previous) => {
      const next = new Set(previous);

      for (
        let i =
          activeIndex - PRELOAD_WINDOW;
        i <=
        activeIndex + PRELOAD_WINDOW;
        i++
      ) {
        if (
          i >= 0 &&
          i < frameCount
        ) {
          next.add(i);
        }
      }

      return next;
    });
  }, [
    activeIndex,
    frameCount,
  ]);

  // ==========================================================
  // SCROLL LENGTH
  // ==========================================================

  const scrollLength =
    lowPower
      ? HERO_SCROLL_LENGTH_VH_LIGHT
      : HERO_SCROLL_LENGTH_VH;

  // ==========================================================
  // EMPTY STATE
  // ==========================================================

  if (frameCount === 0) {
    return null;
  }

  // ==========================================================
  // REDUCED MOTION
  // ==========================================================

  if (reducedMotion) {
    const firstFrame = frames[0];

    return (
      <section
        className="relative min-h-screen w-full overflow-hidden"
        aria-label="رحلة الوصول"
      >
        {/* Background */}
        <img
          src={firstFrame.src}
          alt={firstFrame.alt}
          className="
            absolute
            inset-0
            h-full
            w-full
            object-cover
          "
        />

        {/* Dark overlay */}
        <div
          className="
            absolute
            inset-0
            bg-black/55
          "
        />

        {/* Gradient */}
        <div
          className="
            absolute
            inset-0
            bg-gradient-to-l
            from-black/85
            via-black/45
            to-black/20
          "
        />

        {/* Content */}
        <div
          className="
            relative
            z-10
            min-h-screen
            container-page
            section-px
            flex
            items-center
          "
        >
          <HeroContent />
        </div>
      </section>
    );
  }

  // ==========================================================
  // CINEMATIC SCROLL HERO
  // ==========================================================

  return (
    <section
      ref={ref}
      className="relative w-full"
      style={{
        height: `${scrollLength}vh`,
      }}
      aria-label="رحلة الوصول من التواصل إلى النتيجة"
    >
      {/* ======================================================
          STICKY VIEWPORT
          ====================================================== */}

      <div
        className="
          sticky
          top-0
          h-screen
          w-full
          overflow-hidden
          bg-black
        "
      >
        {/* ====================================================
            FRAME STACK
            ==================================================== */}

        <div
          className="
            absolute
            inset-0
            h-full
            w-full
          "
        >
          {frames.map(
            (frame, index) => {
              if (
                !loadedFrames.has(index)
              ) {
                return null;
              }

              const isActive =
                index === activeIndex;

              return (
                <img
                  key={frame.id}
                  src={frame.src}
                  alt={frame.alt}
                  loading={
                    index === 0
                      ? "eager"
                      : "lazy"
                  }
                  decoding="async"
                  className="
                    absolute
                    inset-0
                    h-full
                    w-full
                    object-cover
                    transition-opacity
                    duration-150
                    ease-linear
                  "
                  style={{
                    opacity:
                      isActive
                        ? 1
                        : 0,
                  }}
                />
              );
            },
          )}
        </div>

        {/* ====================================================
            CINEMATIC DARK OVERLAY
            ==================================================== */}

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            z-[2]
            bg-black/35
          "
        />

        {/* ====================================================
            RIGHT SIDE GRADIENT
            ==================================================== */}

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            z-[3]
            bg-gradient-to-l
            from-black/85
            via-black/45
            to-transparent
          "
        />

        {/* ====================================================
            BOTTOM GRADIENT
            ==================================================== */}

        <div
          className="
            pointer-events-none
            absolute
            inset-x-0
            bottom-0
            z-[3]
            h-48
            bg-gradient-to-t
            from-black/80
            to-transparent
          "
        />

        {/* ====================================================
            TOP GRADIENT
            ==================================================== */}

        <div
          className="
            pointer-events-none
            absolute
            inset-x-0
            top-0
            z-[3]
            h-32
            bg-gradient-to-b
            from-black/45
            to-transparent
          "
        />

        {/* ====================================================
            DECORATIVE AI CONNECTION LINE
            ==================================================== */}

        <svg
          className="
            pointer-events-none
            absolute
            -top-10
            left-1/2
            z-[4]
            w-[140%]
            max-w-3xl
            -translate-x-1/2
            opacity-30
          "
          viewBox="0 0 600 300"
          fill="none"
          aria-hidden="true"
        >
          <motion.path
            d="
              M 20 250
              C 150 250,
              180 60,
              320 80
              C 430 95,
              460 220,
              580 200
            "
            stroke="#C89B5C"
            strokeWidth="1.5"
            strokeLinecap="round"
            initial={{
              pathLength: 0,
            }}
            animate={{
              pathLength: 1,
            }}
            transition={{
              duration: 1.6,
              ease: [
                0.22,
                1,
                0.36,
                1,
              ],
            }}
          />
        </svg>

        {/* ====================================================
            HERO CONTENT
            ==================================================== */}

        <div
          className="
            relative
            z-10
            min-h-screen
            container-page
            section-px
            flex
            items-center
          "
        >
          <HeroContent />
        </div>

        {/* ====================================================
            FRAME INDICATOR
            ==================================================== */}

        <div
          className="
            absolute
            bottom-8
            left-1/2
            z-20
            -translate-x-1/2
            flex
            flex-col
            items-center
            gap-3
          "
          aria-hidden="true"
        >
          <span
            className="
              text-xs
              tracking-[0.2em]
              text-white/60
              tabular-nums
            "
          >
            {String(
              activeIndex + 1,
            ).padStart(2, "0")}
            {" / "}
            {String(
              frameCount,
            ).padStart(2, "0")}
          </span>

          <div
            className="
              h-px
              w-24
              overflow-hidden
              bg-white/20
            "
          >
            <div
              className="
                h-full
                bg-[#C89B5C]
                transition-[width]
                duration-100
              "
              style={{
                width: `${
                  ((activeIndex + 1) /
                    frameCount) *
                  100
                }%`,
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// HERO CONTENT
// ============================================================

function HeroContent() {
  const reducedMotion =
    useReducedMotion();

  return (
    <div
      className="
        w-full
        flex
        flex-col
        items-end
        text-right
        gap-8
        max-w-4xl
        mr-0
        ml-auto
        py-32
      "
    >
      {/* ======================================================
          HEADLINE
          ====================================================== */}

      <motion.h1
        initial={
          reducedMotion
            ? {
                opacity: 1,
                y: 0,
              }
            : {
                opacity: 0,
                y: 16,
              }
        }
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.7,
          ease: [
            0.22,
            1,
            0.36,
            1,
          ],
        }}
        className="
          font-display
          text-4xl
          leading-[1.1]
          text-white
          sm:text-5xl
          lg:text-7xl
          max-w-4xl
          drop-shadow-[0_4px_20px_rgba(0,0,0,0.55)]
        "
      >
        {heroContent.headline}
      </motion.h1>

      {/* ======================================================
          SUBHEADLINE
          ====================================================== */}

      <motion.p
        initial={
          reducedMotion
            ? {
                opacity: 1,
                y: 0,
              }
            : {
                opacity: 0,
                y: 16,
              }
        }
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.7,
          delay: 0.15,
          ease: [
            0.22,
            1,
            0.36,
            1,
          ],
        }}
        className="
          max-w-2xl
          text-lg
          leading-relaxed
          text-white/85
          sm:text-xl
          lg:text-2xl
          drop-shadow-[0_3px_15px_rgba(0,0,0,0.5)]
        "
      >
        {heroContent.subheadline}
      </motion.p>

      {/* ======================================================
          CTA BUTTONS
          ====================================================== */}

      <motion.div
        initial={
          reducedMotion
            ? {
                opacity: 1,
                y: 0,
              }
            : {
                opacity: 0,
                y: 16,
              }
        }
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.7,
          delay: 0.3,
          ease: [
            0.22,
            1,
            0.36,
            1,
          ],
        }}
        className="
          flex
          flex-col
          items-stretch
          gap-4
          sm:flex-row
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
  );
}
