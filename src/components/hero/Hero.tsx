import { motion } from "framer-motion";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { heroContent } from "@/data/content";
import { sequenceFrames } from "@/data/process";
import { Button } from "@/components/ui/Button";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useIsLowPowerDevice } from "@/hooks/useIsLowPowerDevice";
import { useScrollProgress } from "@/hooks/useScrollProgress";

// ============================================================
// HERO SCROLL CONFIGURATION
// ============================================================

const HERO_SCROLL_LENGTH_VH = 500;
const HERO_SCROLL_LENGTH_VH_LIGHT = 320;

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

  const animationFrameRef =
    useRef<number | null>(null);

  const lastFrameRef =
    useRef(-1);

  const [preloaded, setPreloaded] =
    useState(false);

  // ==========================================================
  // PRELOAD + DECODE ALL FRAMES
  // ==========================================================

  useEffect(() => {
    if (frameCount === 0) {
      return;
    }

    let cancelled = false;

    const preloadImages = async () => {
      const loadedImages: HTMLImageElement[] = [];

      for (const frame of frames) {
        if (cancelled) {
          return;
        }

        const image = new Image();

        image.decoding = "async";
        image.loading = "eager";
        image.src = frame.src;

        try {
          await image.decode();
        } catch {
          await new Promise<void>((resolve) => {
            image.onload = () => resolve();
            image.onerror = () => resolve();
          });
        }

        loadedImages.push(image);
      }

      if (cancelled) {
        return;
      }

      imagesRef.current = loadedImages;
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
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    const rect = canvas.getBoundingClientRect();

    const dpr = Math.min(
      window.devicePixelRatio || 1,
      lowPower ? 1.5 : 2,
    );

    const width = Math.max(
      1,
      Math.round(rect.width * dpr),
    );

    const height = Math.max(
      1,
      Math.round(rect.height * dpr),
    );

    if (
      canvas.width !== width ||
      canvas.height !== height
    ) {
      canvas.width = width;
      canvas.height = height;
    }
  }, [lowPower]);

  // ==========================================================
  // DRAW FRAME
  // ==========================================================

  const drawFrame = useCallback(
    (frameIndex: number) => {
      const canvas = canvasRef.current;
      const image =
        imagesRef.current[frameIndex];

      if (!canvas || !image) {
        return;
      }

      resizeCanvas();

      const context =
        canvas.getContext("2d", {
          alpha: false,
          desynchronized: true,
        });

      if (!context) {
        return;
      }

      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;

      const imageWidth = image.naturalWidth;
      const imageHeight = image.naturalHeight;

      if (
        !imageWidth ||
        !imageHeight
      ) {
        return;
      }

      // ======================================================
      // COVER CALCULATION
      // ======================================================

      const scale = Math.max(
        canvasWidth / imageWidth,
        canvasHeight / imageHeight,
      );

      const drawWidth =
        imageWidth * scale;

      const drawHeight =
        imageHeight * scale;

      const offsetX =
        (canvasWidth - drawWidth) / 2;

      const offsetY =
        (canvasHeight - drawHeight) / 2;

      // ======================================================
      // DRAW
      // ======================================================

      context.setTransform(
        1,
        0,
        0,
        1,
        0,
        0,
      );

      // Never expose transparent/black canvas
      // between frames.
      context.fillStyle = "#000";
      context.fillRect(
        0,
        0,
        canvasWidth,
        canvasHeight,
      );

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
  // DRAW CURRENT FRAME
  // ==========================================================

  useEffect(() => {
    if (
      !preloaded ||
      frameCount === 0
    ) {
      return;
    }

    const safeProgress = Math.max(
      0,
      Math.min(1, progress),
    );

    const frameIndex = Math.min(
      frameCount - 1,
      Math.round(
        safeProgress *
          (frameCount - 1),
      ),
    );

    if (
      frameIndex ===
      lastFrameRef.current
    ) {
      return;
    }

    if (
      animationFrameRef.current !== null
    ) {
      cancelAnimationFrame(
        animationFrameRef.current,
      );
    }

    animationFrameRef.current =
      requestAnimationFrame(() => {
        drawFrame(frameIndex);

        animationFrameRef.current =
          null;
      });

    return () => {
      if (
        animationFrameRef.current !== null
      ) {
        cancelAnimationFrame(
          animationFrameRef.current,
        );

        animationFrameRef.current =
          null;
      }
    };
  }, [
    progress,
    preloaded,
    frameCount,
    drawFrame,
  ]);

  // ==========================================================
  // INITIAL CANVAS FRAME
  // ==========================================================

  useEffect(() => {
    if (!preloaded) {
      return;
    }

    resizeCanvas();

    drawFrame(0);

    const handleResize = () => {
      resizeCanvas();

      if (
        lastFrameRef.current >= 0
      ) {
        drawFrame(
          lastFrameRef.current,
        );
      }
    };

    window.addEventListener(
      "resize",
      handleResize,
      { passive: true },
    );

    return () => {
      window.removeEventListener(
        "resize",
        handleResize,
      );
    };
  }, [
    preloaded,
    resizeCanvas,
    drawFrame,
  ]);

  // ==========================================================
  // ACTIVE FRAME
  // ==========================================================

  const safeProgress = Math.max(
    0,
    Math.min(1, progress),
  );

  const activeIndex =
    frameCount > 0
      ? Math.min(
          frameCount - 1,
          Math.round(
            safeProgress *
              (frameCount - 1),
          ),
        )
      : 0;

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
    return (
      <section
        className="
          relative
          min-h-screen
          w-full
          overflow-hidden
          bg-black
        "
        aria-label="رحلة الوصول"
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
          <HeroContent />
        </div>
      </section>
    );
  }

  // ==========================================================
  // CINEMATIC CANVAS SCROLL HERO
  // ==========================================================

  return (
    <section
      ref={ref}
      className="
        relative
        w-full
        bg-black
      "
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
            CANVAS
            ==================================================== */}

        <div
          className="
            absolute
            inset-0
            h-full
            w-full
            bg-black
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
            CINEMATIC OVERLAYS
            ==================================================== */}

        <HeroOverlays />

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
            FRAME COUNTER
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
        >
          <span
            className="
              text-xs
              tracking-[0.2em]
              text-white/65
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

        {/* ====================================================
            LOADING INDICATOR
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
              text-white/40
              sm:block
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
// CINEMATIC OVERLAYS
// ============================================================

function HeroOverlays() {
  return (
    <>
      {/* Main dark overlay */}
      <div
        className="
          pointer-events-none
          absolute
          inset-0
          z-[2]
          bg-black/30
        "
      />

      {/* Right-side readability gradient */}
      <div
        className="
          pointer-events-none
          absolute
          inset-0
          z-[3]
          bg-gradient-to-l
          from-black/85
          via-black/40
          to-transparent
        "
      />

      {/* Bottom cinematic fade */}
      <div
        className="
          pointer-events-none
          absolute
          inset-x-0
          bottom-0
          z-[3]
          h-56
          bg-gradient-to-t
          from-black/85
          via-black/30
          to-transparent
        "
      />

      {/* Top cinematic fade */}
      <div
        className="
          pointer-events-none
          absolute
          inset-x-0
          top-0
          z-[3]
          h-36
          bg-gradient-to-b
          from-black/45
          to-transparent
        "
      />

      {/* ======================================================
          AI CONNECTION LINE
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
    </>
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
