import { AnimatePresence, motion } from "framer-motion";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  heroContent,
  heroStages,
  type HeroStage,
} from "@/data/content";

import { sequenceFrames } from "@/data/process";
import { Button } from "@/components/ui/Button";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useIsLowPowerDevice } from "@/hooks/useIsLowPowerDevice";
import { useScrollProgress } from "@/hooks/useScrollProgress";

// ============================================================
// CONFIGURATION
// ============================================================

const HERO_SCROLL_LENGTH_VH = 500;
const HERO_SCROLL_LENGTH_VH_LIGHT = 320;

const TEXT_EXIT_DURATION = 0.28;
const TEXT_ENTER_DURATION = 0.55;

// ============================================================
// HELPERS
// ============================================================

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function getStageForFrame(
  frame: number,
  stages: HeroStage[],
): HeroStage {
  return (
    stages.find(
      (stage) =>
        frame >= stage.startFrame &&
        frame <= stage.endFrame,
    ) ?? stages[0]
  );
}

// ============================================================
// HERO
// ============================================================

export function Hero() {
  const reducedMotion = useReducedMotion();
  const lowPower = useIsLowPowerDevice();

  const { ref, progress } =
    useScrollProgress<HTMLDivElement>();

  const frames = sequenceFrames;
  const frameCount = frames.length;

  const canvasRef =
    useRef<HTMLCanvasElement | null>(null);

  const imagesRef =
    useRef<HTMLImageElement[]>([]);

  const contextRef =
    useRef<CanvasRenderingContext2D | null>(null);

  const animationFrameRef =
    useRef<number | null>(null);

  const resizeObserverRef =
    useRef<ResizeObserver | null>(null);

  const lastFrameRef =
    useRef(-1);

  const [preloaded, setPreloaded] =
    useState(false);

  // ==========================================================
  // FRAME CALCULATION
  // ==========================================================

  const safeProgress = clamp(progress, 0, 1);

  const activeIndex =
    frameCount > 0
      ? Math.min(
          frameCount - 1,
          Math.round(
            safeProgress * (frameCount - 1),
          ),
        )
      : 0;

  const activeFrame =
    activeIndex + 1;

  const activeStage = useMemo(
    () =>
      getStageForFrame(
        activeFrame,
        heroStages,
      ),
    [activeFrame],
  );

  // ==========================================================
  // PRELOAD ALL IMAGES
  // ==========================================================

  useEffect(() => {
    if (frameCount === 0) {
      return;
    }

    let cancelled = false;

    const preloadImages = async () => {
      const results =
        await Promise.all(
          frames.map(async (frame) => {
            const image =
              new Image();

            image.decoding = "async";
            image.loading = "eager";
            image.src = frame.src;

            try {
              await image.decode();
            } catch {
              await new Promise<void>(
                (resolve) => {
                  if (
                    image.complete
                  ) {
                    resolve();
                    return;
                  }

                  image.onload = () =>
                    resolve();

                  image.onerror = () =>
                    resolve();
                },
              );
            }

            return image;
          }),
        );

      if (
        cancelled
      ) {
        return;
      }

      imagesRef.current =
        results;

      setPreloaded(true);
    };

    preloadImages();

    return () => {
      cancelled = true;
      imagesRef.current = [];
    };
  }, [frames, frameCount]);

  // ==========================================================
  // CANVAS RESIZE
  // ==========================================================

  const resizeCanvas = useCallback(() => {
    const canvas =
      canvasRef.current;

    if (!canvas) {
      return;
    }

    const rect =
      canvas.getBoundingClientRect();

    const dpr =
      Math.min(
        window.devicePixelRatio || 1,
        lowPower ? 1.5 : 2,
      );

    const width =
      Math.max(
        1,
        Math.round(
          rect.width * dpr,
        ),
      );

    const height =
      Math.max(
        1,
        Math.round(
          rect.height * dpr,
        ),
      );

    if (
      canvas.width !== width ||
      canvas.height !== height
    ) {
      canvas.width = width;
      canvas.height = height;
    }

    const context =
      contextRef.current;

    if (context) {
      context.setTransform(
        1,
        0,
        0,
        1,
        0,
        0,
      );
    }
  }, [lowPower]);

  // ==========================================================
  // DRAW FRAME
  // ==========================================================

  const drawFrame =
    useCallback(
      (frameIndex: number) => {
        const canvas =
          canvasRef.current;

        const image =
          imagesRef.current[
            frameIndex
          ];

        if (
          !canvas ||
          !image ||
          !image.complete ||
          !image.naturalWidth ||
          !image.naturalHeight
        ) {
          return;
        }

        resizeCanvas();

        let context =
          contextRef.current;

        if (!context) {
          context =
            canvas.getContext(
              "2d",
              {
                alpha: false,
                desynchronized: true,
              },
            );

          if (!context) {
            return;
          }

          contextRef.current =
            context;
        }

        const canvasWidth =
          canvas.width;

        const canvasHeight =
          canvas.height;

        const imageWidth =
          image.naturalWidth;

        const imageHeight =
          image.naturalHeight;

        const scale =
          Math.max(
            canvasWidth /
              imageWidth,
            canvasHeight /
              imageHeight,
          );

        const drawWidth =
          imageWidth * scale;

        const drawHeight =
          imageHeight * scale;

        const offsetX =
          (canvasWidth -
            drawWidth) /
          2;

        const offsetY =
          (canvasHeight -
            drawHeight) /
          2;

        context.setTransform(
          1,
          0,
          0,
          1,
          0,
          0,
        );

        /*
         * Important:
         *
         * We intentionally do not clear the canvas
         * before drawing a new frame.
         *
         * The previous frame remains visible until
         * the next valid frame is ready.
         *
         * This prevents black flashes.
         */

        context.drawImage(
          image,
          offsetX,
          offsetY,
          drawWidth,
          drawHeight,
        );

        lastFrameRef.current =
          frameIndex;
      },
      [resizeCanvas],
    );

  // ==========================================================
  // INITIAL CANVAS + RESIZE OBSERVER
  // ==========================================================

  useEffect(() => {
    if (!preloaded) {
      return;
    }

    resizeCanvas();

    drawFrame(
      clamp(
        activeIndex,
        0,
        frameCount - 1,
      ),
    );

    const canvas =
      canvasRef.current;

    if (!canvas) {
      return;
    }

    const resizeObserver =
      new ResizeObserver(() => {
        resizeCanvas();

        const currentFrame =
          lastFrameRef.current;

        if (
          currentFrame >= 0
        ) {
          drawFrame(
            currentFrame,
          );
        }
      });

    resizeObserver.observe(
      canvas,
    );

    resizeObserverRef.current =
      resizeObserver;

    return () => {
      resizeObserver.disconnect();

      resizeObserverRef.current =
        null;
    };
  }, [
    preloaded,
    resizeCanvas,
    drawFrame,
    activeIndex,
    frameCount,
  ]);

  // ==========================================================
  // FRAME SCRUBBING
  // ==========================================================

  useEffect(() => {
    if (
      !preloaded ||
      frameCount === 0
    ) {
      return;
    }

    if (
      activeIndex ===
      lastFrameRef.current
    ) {
      return;
    }

    if (
      animationFrameRef.current !==
      null
    ) {
      cancelAnimationFrame(
        animationFrameRef.current,
      );
    }

    animationFrameRef.current =
      requestAnimationFrame(() => {
        drawFrame(
          activeIndex,
        );

        animationFrameRef.current =
          null;
      });

    return () => {
      if (
        animationFrameRef.current !==
        null
      ) {
        cancelAnimationFrame(
          animationFrameRef.current,
        );

        animationFrameRef.current =
          null;
      }
    };
  }, [
    activeIndex,
    preloaded,
    frameCount,
    drawFrame,
  ]);

  // ==========================================================
  // SCROLL LENGTH
  // ==========================================================

  const scrollLength =
    lowPower
      ? HERO_SCROLL_LENGTH_VH_LIGHT
      : HERO_SCROLL_LENGTH_VH;

  // ==========================================================
  // EMPTY
  // ==========================================================

  if (frameCount === 0) {
    return null;
  }

  // ==========================================================
  // REDUCED MOTION
  // ==========================================================

  if (reducedMotion) {
    return (
      <section
        className="
          relative
          min-h-screen
          w-full
          overflow-hidden
          bg-base
        "
        aria-label="جِذع AI"
      >
        <img
          src={frames[0].src}
          alt={frames[0].alt}
          loading="eager"
          decoding="async"
          className="
            absolute
            inset-0
            h-full
            w-full
            object-cover
          "
        />

        <HeroOverlays />

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
          <HeroContent
            stage={heroStages[0]}
            reducedMotion
          />
        </div>
      </section>
    );
  }

  // ==========================================================
  // CINEMATIC HERO
  // ==========================================================

  return (
    <section
      ref={ref}
      className="
        relative
        w-full
        bg-base
      "
      style={{
        height: `${scrollLength}vh`,
      }}
      aria-label="جِذع AI — منظومة الحلول الذكية"
    >
      <div
        className="
          sticky
          top-0
          h-screen
          w-full
          overflow-hidden
          bg-base
        "
      >
        {/* ====================================================
            CANVAS
            ==================================================== */}

        <div
          className="
            absolute
            inset-0
            h-full
            w-full
            bg-base
          "
        >
          <canvas
            ref={canvasRef}
            aria-hidden="true"
            className="
              absolute
              inset-0
              h-full
              w-full
              select-none
              pointer-events-none
            "
          />
        </div>

        {/* ====================================================
            OVERLAYS
            ==================================================== */}

        <HeroOverlays />

        {/* ====================================================
            CONTENT
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
          <AnimatePresence
            mode="wait"
            initial={false}
          >
            <motion.div
              key={`${activeStage.startFrame}-${activeStage.endFrame}`}
              className="w-full"
              initial={{
                opacity: 0,
                y: 18,
                filter:
                  "blur(3px)",
              }}
              animate={{
                opacity: 1,
                y: 0,
                filter:
                  "blur(0px)",
              }}
              exit={{
                opacity: 0,
                y: -14,
                filter:
                  "blur(2px)",
              }}
              transition={{
                enter: {
                  duration:
                    TEXT_ENTER_DURATION,
                  ease: [
                    0.22,
                    1,
                    0.36,
                    1,
                  ],
                },
                exit: {
                  duration:
                    TEXT_EXIT_DURATION,
                  ease: [
                    0.4,
                    0,
                    1,
                    1,
                  ],
                },
              }}
            >
              <HeroContent
                stage={
                  activeStage
                }
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ====================================================
            LOADING
            ==================================================== */}

        {!preloaded && (
          <div
            className="
              pointer-events-none
              absolute
              bottom-8
              right-8
              z-20
              hidden
              text-xs
              text-ink/40
              sm:block
              font-english
            "
          >
            Loading
          </div>
        )}
      </div>
    </section>
  );
}

// ============================================================
// HERO CONTENT
// ============================================================

type HeroContentProps = {
  stage: HeroStage;
  reducedMotion?: boolean;
};

function HeroContent({
  stage,
  reducedMotion = false,
}: HeroContentProps) {
  return (
    <div
      className="
        w-full
        max-w-4xl
        mx-auto
        flex
        flex-col
        items-center
        text-center
        py-32
      "
    >
      {/* ======================================================
          STAGE LABEL
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
                y: 10,
              }
        }
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.4,
        }}
        className="
          mb-5
          flex
          items-center
          justify-center
          gap-3
          text-center
          text-sm
          font-medium
          text-brass
        "
      >
        <span
          className="
            h-px
            w-10
            bg-brass/70
          "
        />

        <span>
          {stage.label}
        </span>

        <span
          className="
            h-px
            w-10
            bg-brass/70
          "
        />
      </motion.div>

      {/* ======================================================
          HEADLINE
          ====================================================== */}

      <motion.h1
        initial={
          reducedMotion
            ? {
                opacity: 1,
                y: 0,
                filter:
                  "blur(0px)",
              }
            : {
                opacity: 0,
                y: 20,
                filter:
                  "blur(3px)",
              }
        }
        animate={{
          opacity: 1,
          y: 0,
          filter:
            "blur(0px)",
        }}
        transition={{
          duration: 0.55,
          delay: 0.04,
          ease: [
            0.22,
            1,
            0.36,
            1,
          ],
        }}
        className="
          w-full
          font-display
          font-bold
          text-4xl
          leading-[1.08]
          tracking-tight
          text-center
          text-ink
          sm:text-5xl
          lg:text-7xl
          max-w-4xl
          mx-auto
          drop-shadow-[0_5px_30px_rgba(23,23,23,0.12)]
        "
      >
        {stage.headline}
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
                filter:
                  "blur(0px)",
              }
            : {
                opacity: 0,
                y: 16,
                filter:
                  "blur(3px)",
              }
        }
        animate={{
          opacity: 1,
          y: 0,
          filter:
            "blur(0px)",
        }}
        transition={{
          duration: 0.55,
          delay: 0.13,
          ease: [
            0.22,
            1,
            0.36,
            1,
          ],
        }}
        className="
          mt-6
          w-full
          max-w-2xl
          mx-auto
          text-center
          text-lg
          leading-relaxed
          text-ink/70
          sm:text-xl
          lg:text-2xl
          drop-shadow-[0_3px_18px_rgba(23,23,23,0.10)]
        "
      >
        {stage.subheadline}
      </motion.p>

      {/* ======================================================
          CTA
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
                y: 14,
              }
        }
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.5,
          delay: 0.2,
          ease: [
            0.22,
            1,
            0.36,
            1,
          ],
        }}
        className="
          mt-8
          flex
          flex-col
          items-center
          justify-center
          gap-4
          sm:flex-row
          sm:justify-center
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

// ============================================================
// CINEMATIC OVERLAYS
// ============================================================

function HeroOverlays() {
  return (
    <>
      <div
        className="
          pointer-events-none
          absolute
          inset-0
          z-[2]
          bg-white/10
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          z-[3]
          bg-gradient-to-l
          from-white/70
          via-white/25
          to-transparent
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          inset-x-0
          bottom-0
          z-[3]
          h-64
          bg-gradient-to-t
          from-white/80
          via-white/25
          to-transparent
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          inset-x-0
          top-0
          z-[3]
          h-40
          bg-gradient-to-b
          from-white/65
          to-transparent
        "
      />

      {/* ======================================================
          SUBTLE NETWORK LINE
          ====================================================== */}

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
          opacity-25
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

      {/* ======================================================
          VIGNETTE
          ====================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          z-[4]
          bg-[radial-gradient(circle_at_center,transparent_40%,rgba(255,255,255,0.28)_100%)]
        "
      />
    </>
  );
}
