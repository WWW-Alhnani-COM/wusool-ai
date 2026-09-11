
import {
  AnimatePresence,
  motion,
} from "framer-motion";

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

import { Button } from "@/components/ui/Button";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useScrollProgress } from "@/hooks/useScrollProgress";

// ============================================================
// CONFIGURATION
// ============================================================

const HERO_SCROLL_LENGTH_VH = 560;
const HERO_SCROLL_LENGTH_VH_MOBILE = 480;

// ============================================================
// CINEMATIC MOTION
// ============================================================

// لا يوجد smoothing للـ scroll.
// الـ scroll يحدد موضع الـ timeline مباشرة.

const ZOOM_AMOUNT = 0.095;

// نسبة بسيطة لعمل crossfade بين المشاهد.
const SCENE_CROSSFADE = 0.12;

// يستخدم فقط لمعرفة انتهاء حركة التمرير.
// لا يؤخر الـ scroll نفسه.
const SCROLL_STOP_DELAY = 140;

// ============================================================
// TYPES
// ============================================================

type SceneAsset = {
  id: string;
  src: string;
};

// ============================================================
// HELPERS
// ============================================================

function clamp(
  value: number,
  min: number,
  max: number,
) {
  return Math.min(
    Math.max(value, min),
    max,
  );
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

function getSceneLocalProgress(
  timelineProgress: number,
  sceneIndex: number,
  sceneCount: number,
) {
  if (sceneCount <= 0) {
    return 0;
  }

  const sceneStart =
    sceneIndex / sceneCount;

  const sceneEnd =
    (sceneIndex + 1) / sceneCount;

  return clamp(
    (timelineProgress - sceneStart) /
      (sceneEnd - sceneStart),
    0,
    1,
  );
}

function getSceneIndex(
  timelineProgress: number,
  sceneCount: number,
) {
  if (sceneCount <= 1) {
    return 0;
  }

  return Math.min(
    sceneCount - 1,
    Math.floor(
      clamp(
        timelineProgress,
        0,
        0.999999,
      ) * sceneCount,
    ),
  );
}

function getSceneProgress(
  timelineProgress: number,
  sceneCount: number,
) {
  const sceneIndex =
    getSceneIndex(
      timelineProgress,
      sceneCount,
    );

  return {
    sceneIndex,
    sceneProgress:
      getSceneLocalProgress(
        timelineProgress,
        sceneIndex,
        sceneCount,
      ),
  };
}

// ============================================================
// GIF ASSETS
// ============================================================

const gifModules =
  import.meta.glob(
    "/src/assets/public/videos/scene-*.gif",
    {
      eager: true,
      query: "?url",
      import: "default",
    },
  ) as Record<string, string>;

const sceneAssets: SceneAsset[] =
  Object.entries(gifModules)
    .sort(([a], [b]) =>
      a.localeCompare(b),
    )
    .map(
      ([path, src]) => ({
        id:
          path
            .split("/")
            .pop()
            ?.replace(
              ".gif",
              "",
            ) ?? path,
        src,
      }),
    );

// ============================================================
// HERO
// ============================================================

export function Hero() {
  const reducedMotion =
    useReducedMotion();

  const {
    ref,
    progress,
  } =
    useScrollProgress<HTMLDivElement>();

  // ==========================================================
  // STATE
  // ==========================================================

  const [
    isMobile,
    setIsMobile,
  ] = useState(false);

  const [
    activeScene,
    setActiveScene,
  ] = useState(0);

  const [
    activeStageFrame,
    setActiveStageFrame,
  ] = useState(1);

  // ==========================================================
  // GIF REFS
  // ==========================================================

  const imageRefs =
    useRef<
      HTMLImageElement[]
    >([]);

  // ==========================================================
  // DIRECT TIMELINE REFS
  // ==========================================================

  /**
   * الموضع الحالي للـ timeline.
   *
   * مهم:
   * لا يوجد lerp أو smoothing هنا.
   * القيمة تساوي scroll progress مباشرة.
   */
  const timelineProgressRef =
    useRef(0);

  /**
   * آخر scroll progress.
   */
  const previousScrollProgressRef =
    useRef(0);

  /**
   * هل المستخدم يقوم بالتمرير الآن؟
   */
  const isScrollingRef =
    useRef(false);

  /**
   * RAF الخاص بالـ timeline.
   */
  const animationFrameRef =
    useRef<number | null>(null);

  /**
   * Timer لمعرفة توقف المستخدم عن التمرير.
   */
  const scrollStopTimerRef =
    useRef<number | null>(null);

  /**
   * منع تهيئة scroll أكثر من مرة.
   */
  const scrollInitializedRef =
    useRef(false);

  /**
   * منع تحديث React بدون داعٍ.
   */
  const lastStageRef =
    useRef(-1);

  /**
   * آخر scene.
   */
  const lastSceneRef =
    useRef(-1);

  // ==========================================================
  // RESPONSIVE
  // ==========================================================

  useEffect(() => {
    const updateViewport =
      () => {
        setIsMobile(
          window.innerWidth < 768,
        );
      };

    updateViewport();

    window.addEventListener(
      "resize",
      updateViewport,
      {
        passive: true,
      },
    );

    return () => {
      window.removeEventListener(
        "resize",
        updateViewport,
      );
    };
  }, []);

  // ==========================================================
  // GIF ELEMENT MANAGEMENT
  // ==========================================================

  const setImageRef =
    useCallback(
      (
        index: number,
        element:
          | HTMLImageElement
          | null,
      ) => {
        if (!element) {
          return;
        }

        imageRefs.current[index] =
          element;
      },
      [],
    );

  // ==========================================================
  // GIF PRELOADING
  // ==========================================================

  useEffect(() => {
    if (
      sceneAssets.length === 0
    ) {
      return;
    }

    let cancelled = false;

    const prepareImages =
      async () => {
        const images =
          imageRefs.current;

        const preloadPromises =
          sceneAssets.map(
            async (
              scene,
              index,
            ) => {
              const image =
                images[index];

              if (!image) {
                /*
                 * في حال لم يتم تركيب العنصر بعد،
                 * نقوم بتحميل الـGIF مباشرة.
                 */
                await new Promise<void>(
                  (resolve) => {
                    const preload =
                      new Image();

                    let resolved =
                      false;

                    const finish =
                      () => {
                        if (
                          resolved
                        ) {
                          return;
                        }

                        resolved =
                          true;

                        resolve();
                      };

                    preload.onload =
                      finish;

                    preload.onerror =
                      finish;

                    preload.src =
                      scene.src;

                    if (
                      preload.complete
                    ) {
                      finish();
                    }
                  },
                );

                return;
              }

              if (
                image.complete &&
                image.naturalWidth > 0
              ) {
                return;
              }

              await new Promise<void>(
                (resolve) => {
                  let resolved =
                    false;

                  const cleanup =
                    () => {
                      image.removeEventListener(
                        "load",
                        handleReady,
                      );

                      image.removeEventListener(
                        "error",
                        handleError,
                      );
                    };

                  const resolveOnce =
                    () => {
                      if (
                        resolved
                      ) {
                        return;
                      }

                      resolved =
                        true;

                      cleanup();
                      resolve();
                    };

                  const handleReady =
                    () => {
                      resolveOnce();
                    };

                  const handleError =
                    () => {
                      resolveOnce();
                    };

                  image.addEventListener(
                    "load",
                    handleReady,
                    {
                      once: true,
                    },
                  );

                  image.addEventListener(
                    "error",
                    handleError,
                    {
                      once: true,
                    },
                  );

                  if (
                    image.complete
                  ) {
                    resolveOnce();
                  }
                },
              );
            },
          );

        await Promise.all(
          preloadPromises,
        );

        /*
         * لا نحتاج videosReady هنا.
         * الـGIF يعمل تلقائيًا بمجرد تحميله.
         */
        if (cancelled) {
          return;
        }
      };

    const timer =
      window.setTimeout(
        prepareImages,
        50,
      );

    return () => {
      cancelled = true;

      window.clearTimeout(timer);
    };
  }, []);

  // ==========================================================
  // INITIAL SCROLL POSITION
  // ==========================================================

  useEffect(() => {
    const initial =
      clamp(
        progress,
        0,
        1,
      );

    timelineProgressRef.current =
      initial;

    previousScrollProgressRef.current =
      initial;

    scrollInitializedRef.current =
      true;
  }, []);

  // ==========================================================
  // DIRECT SCROLL → TIMELINE
  // ==========================================================

  useEffect(() => {
    /*
     * هذا هو الجزء الأهم.
     *
     * لا يوجد:
     *
     * targetProgress
     * smoothProgress
     * lerp
     * SCRUB_EASE
     * SCROLL_GESTURE_GAIN
     *
     * الـ progress الحالي للصفحة
     * ينتقل مباشرة إلى timeline.
     */

    const nextProgress =
      clamp(
        progress,
        0,
        1,
      );

    if (
      !scrollInitializedRef.current
    ) {
      previousScrollProgressRef.current =
        nextProgress;

      timelineProgressRef.current =
        nextProgress;

      scrollInitializedRef.current =
        true;

      return;
    }

    const previous =
      previousScrollProgressRef.current;

    const delta =
      nextProgress - previous;

    previousScrollProgressRef.current =
      nextProgress;

    if (
      Math.abs(delta) < 0.000001
    ) {
      return;
    }

    /*
     * DIRECT MAPPING
     */
    timelineProgressRef.current =
      nextProgress;

    /*
     * عند بدء التمرير:
     * الـGIF لا يحتاج pause/play.
     *
     * يبقى GIF يعمل بشكل طبيعي،
     * بينما الـscroll يتحكم في المشهد النشط.
     */
    if (
      !isScrollingRef.current
    ) {
      isScrollingRef.current =
        true;
    }

    /*
     * اكتشاف توقف الـscroll.
     */
    if (
      scrollStopTimerRef.current !==
      null
    ) {
      window.clearTimeout(
        scrollStopTimerRef.current,
      );
    }

    scrollStopTimerRef.current =
      window.setTimeout(
        () => {
          isScrollingRef.current =
            false;
        },
        SCROLL_STOP_DELAY,
      );
  }, [progress]);

  // ==========================================================
  // MAIN GIF TIMELINE
  // ==========================================================

  useEffect(() => {
    if (
      sceneAssets.length === 0
    ) {
      return;
    }

    let cancelled = false;

    const renderTimeline =
      () => {
        if (cancelled) {
          return;
        }

        const currentProgress =
          clamp(
            timelineProgressRef.current,
            0,
            1,
          );

        const {
          sceneIndex,
          sceneProgress,
        } =
          getSceneProgress(
            currentProgress,
            sceneAssets.length,
          );

        /*
         * حساب frame الحالي.
         *
         * 50 frame تقريبًا.
         */
        const totalFrames =
          50;

        const frame =
          Math.min(
            totalFrames,
            Math.max(
              1,
              Math.round(
                currentProgress *
                  (totalFrames - 1),
              ) + 1,
            ),
          );

        /*
         * تحديث stage النصي.
         */
        const stage =
          getStageForFrame(
            frame,
            heroStages,
          );

        const stageIndex =
          heroStages.indexOf(
            stage,
          );

        if (
          stageIndex !==
          lastStageRef.current
        ) {
          lastStageRef.current =
            stageIndex;

          setActiveStageFrame(
            frame,
          );
        }

        /*
         * تحديث scene.
         */
        if (
          sceneIndex !==
          lastSceneRef.current
        ) {
          lastSceneRef.current =
            sceneIndex;

          setActiveScene(
            sceneIndex,
          );
        }

        /*
         * ====================================================
         * GIF CROSSFADE
         * ====================================================
         *
         * الـGIF لا يدعم currentTime.
         *
         * لذلك:
         * - المشهد الحالي يظهر بشكل كامل.
         * - المشهد التالي يظهر تدريجيًا عند الاقتراب
         *   من نهاية المشهد الحالي.
         */

        const currentImage =
          imageRefs.current[
            sceneIndex
          ];

        const nextImage =
          imageRefs.current[
            sceneIndex + 1
          ];

        /*
         * إعادة ضبط الصور الأخرى حتى لا تبقى
         * صورة قديمة ظاهرة أثناء الانتقال.
         */
        imageRefs.current.forEach(
          (image, index) => {
            if (!image) {
              return;
            }

            if (
              index !== sceneIndex &&
              index !== sceneIndex + 1
            ) {
              image.style.opacity =
                "0";
            }
          },
        );

        if (currentImage) {
          currentImage.style.opacity =
            "1";
        }

        if (
          nextImage &&
          sceneProgress >
            1 - SCENE_CROSSFADE
        ) {
          const fadeProgress =
            clamp(
              (sceneProgress -
                (1 -
                  SCENE_CROSSFADE)) /
                SCENE_CROSSFADE,
              0,
              1,
            );

          nextImage.style.opacity =
            String(
              fadeProgress,
            );
        }

        /*
         * استمرار RAF.
         */
        animationFrameRef.current =
          window.requestAnimationFrame(
            renderTimeline,
          );
      };

    animationFrameRef.current =
      window.requestAnimationFrame(
        renderTimeline,
      );

    return () => {
      cancelled = true;

      if (
        animationFrameRef.current !==
        null
      ) {
        window.cancelAnimationFrame(
          animationFrameRef.current,
        );

        animationFrameRef.current =
          null;
      }
    };
  }, []);

  // ==========================================================
  // REDUCED MOTION
  // ==========================================================

  useEffect(() => {
    if (!reducedMotion) {
      return;
    }

    /*
     * GIF نفسه لا يمكن إيقافه بشكل موثوق
     * باستخدام pause().
     *
     * عند reduced motion نثبت المشهد
     * المرئي من ناحية الـopacity.
     */
    imageRefs.current.forEach(
      (image, index) => {
        if (!image) {
          return;
        }

        image.style.opacity =
          index === activeScene
            ? "1"
            : "0";
      },
    );
  }, [
    reducedMotion,
    activeScene,
  ]);

  // ==========================================================
  // CLEANUP
  // ==========================================================

  useEffect(() => {
    return () => {
      if (
        animationFrameRef.current !==
        null
      ) {
        window.cancelAnimationFrame(
          animationFrameRef.current,
        );
      }

      if (
        scrollStopTimerRef.current !==
        null
      ) {
        window.clearTimeout(
          scrollStopTimerRef.current,
        );
      }
    };
  }, []);

  // ==========================================================
  // MEMOIZED VALUES
  // ==========================================================

  const currentStage =
    useMemo(
      () =>
        getStageForFrame(
          activeStageFrame,
          heroStages,
        ),
      [activeStageFrame],
    );

  const scrollLength =
    isMobile
      ? HERO_SCROLL_LENGTH_VH_MOBILE
      : HERO_SCROLL_LENGTH_VH;

  const currentProgress =
    clamp(
      timelineProgressRef.current,
      0,
      1,
    );

  const scale =
    1 +
    currentProgress *
      ZOOM_AMOUNT;

  // ==========================================================
  // RENDER
  // ==========================================================

  return (
    <section
      ref={ref}
      className="relative"
      style={{
        height: `${scrollLength}vh`,
      }}
    >
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

        {/* ==================================================
            GIF BACKGROUND
            ================================================== */}

        <div
          className="
            absolute
            inset-0
            overflow-hidden
            bg-black
          "
        >
          {sceneAssets.map(
            (
              scene,
              index,
            ) => {
              const isCurrent =
                index ===
                activeScene;

              const isNext =
                index ===
                activeScene + 1;

              return (
                <img
                  key={scene.id}
                  ref={(element) =>
                    setImageRef(
                      index,
                      element,
                    )
                  }
                  src={scene.src}
                  alt=""
                  aria-hidden="true"
                  draggable={false}
                  className="
                    absolute
                    inset-0
                    h-full
                    w-full
                    object-cover
                    pointer-events-none
                    select-none
                    will-change-transform
                  "
                  style={{
                    opacity:
                      isCurrent
                        ? 1
                        : isNext
                          ? 0.001
                          : 0,
                    transform:
                      `scale(${scale})`,
                  }}
                />
              );
            },
          )}
        </div>

        {/* ==================================================
            GLASS / BLUR OVERLAY
            ================================================== */}

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            z-10
            bg-white/[0.04]
            backdrop-blur-[4px]
            backdrop-saturate-[120%]
          "
        />

        {/* ==================================================
            DARK CINEMATIC OVERLAY
            ================================================== */}

        <div
          className="
            absolute
            inset-0
            bg-black/25
            pointer-events-none
          "
        />

        {/* ==================================================
            GRADIENT
            ================================================== */}

        <div
          className="
            absolute
            inset-0
            bg-gradient-to-b
            from-black/45
            via-transparent
            to-black/65
            pointer-events-none
          "
        />

        {/* ==================================================
            SIDE VIGNETTE
            ================================================== */}

        <div
          className="
            absolute
            inset-0
            bg-[radial-gradient(
              ellipse_at_center,
              transparent_35%,
              rgba(0,0,0,0.45)_100%
            )]
            pointer-events-none
          "
        />

        {/* ==================================================
            NETWORK SVG / DECORATION
            ================================================== */}

        <div
          className="
            absolute
            inset-0
            pointer-events-none
            opacity-20
          "
        >
          <svg
            viewBox="0 0 1000 700"
            className="
              h-full
              w-full
            "
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              <linearGradient
                id="heroNetworkGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop
                  offset="0%"
                  stopColor="currentColor"
                  stopOpacity="0"
                />

                <stop
                  offset="50%"
                  stopColor="currentColor"
                  stopOpacity="0.45"
                />

                <stop
                  offset="100%"
                  stopColor="currentColor"
                  stopOpacity="0"
                />
              </linearGradient>
            </defs>

            <path
              d="
                M0 480
                C180 390 220 500 360 390
                S610 250 760 340
                S900 440 1000 300
              "
              fill="none"
              stroke="url(#heroNetworkGradient)"
              strokeWidth="1"
            />

            <path
              d="
                M0 580
                C160 500 270 600 410 480
                S650 350 800 430
                S910 500 1000 420
              "
              fill="none"
              stroke="url(#heroNetworkGradient)"
              strokeWidth="1"
            />

            <circle
              cx="360"
              cy="390"
              r="3"
              fill="currentColor"
            />

            <circle
              cx="760"
              cy="340"
              r="3"
              fill="currentColor"
            />

            <circle
              cx="800"
              cy="430"
              r="2"
              fill="currentColor"
            />
          </svg>
        </div>

        {/* ==================================================
            CONTENT
            ================================================== */}

        <div
          className="
            relative
            z-20
            flex
            h-full
            w-full
            items-center
            justify-center
          "
        >
          <div
            className="
              flex
              w-full
              justify-center
              px-5
              sm:px-8
              lg:px-12
            "
          >
            <AnimatePresence
              mode="wait"
              initial={false}
            >
              <motion.div
                key={
                  currentStage
                    ?.startFrame ??
                  activeStageFrame
                }
                initial={{
                  opacity: 0,
                  y: 12,
                  filter:
                    "blur(2px)",
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  filter:
                    "blur(0px)",
                }}
                exit={{
                  opacity: 0,
                  y: -8,
                  filter:
                    "blur(1px)",
                }}
                transition={{
                  duration: 0.12,
                  ease: "easeOut",
                }}
                className="
                  w-full
                  max-w-4xl
                  text-center
                "
                dir="rtl"
              >

                {/* LABEL */}

                <div
                  className="
                    mb-4
                    text-center
                    text-sm
                    font-medium
                    tracking-wide
                    text-white/65
                  "
                >
                  {currentStage?.label}
                </div>

                {/* MAIN HEADLINE */}

                <h1
                  className="
                    text-center
                    text-4xl
                    font-bold
                    leading-[1.12]
                    tracking-tight
                    text-white
                    sm:text-5xl
                    lg:text-6xl
                    xl:text-7xl
                  "
                >
                  {currentStage?.headline}
                </h1>

                {/* SUBHEADLINE */}

                <p
                  className="
                    mx-auto
                    mt-6
                    max-w-2xl
                    text-center
                    text-base
                    leading-8
                    text-white/75
                    sm:text-lg
                    lg:text-xl
                  "
                >
                  {
                    currentStage?.subheadline
                  }
                </p>

                {/* ==========================================
                    CTA
                    ========================================== */}

                <div
                  className="
                    mt-8
                    flex
                    flex-wrap
                    items-center
                    justify-center
                    gap-3
                  "
                >
                  <Button
                    to="/طلب-استشارة"
                  >
                    {
                      heroContent.ctaPrimary
                    }
                  </Button>

                  <Button
                    to="/كيف-نعمل"
                    variant="secondary"
                    className="
                      border-white/40
                      text-white
                      hover:border-white/70
                      hover:text-white
                    "
                  >
                    {
                      heroContent.ctaSecondary
                    }
                  </Button>
                </div>

                {/* ==========================================
                    MICROCOPY
                    ========================================== */}

                {"microcopy" in
                  heroContent &&
                  heroContent.microcopy && (
                    <div
                      className="
                        mt-4
                        text-xs
                        text-white/50
                        sm:text-sm
                      "
                    >
                      {
                        heroContent.microcopy
                      }
                    </div>
                  )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* ==================================================
            PROGRESS INDICATOR
            ================================================== */}

        <div
          className="
            absolute
            bottom-8
            right-5
            z-30
            hidden
            h-32
            w-px
            overflow-hidden
            bg-white/15
            sm:right-8
            sm:block
            lg:right-12
          "
        >
          <div
            className="
              absolute
              left-0
              top-0
              w-full
              bg-white/80
              transition-none
            "
            style={{
              height: `${
                currentProgress *
                100
              }%`,
            }}
          />
        </div>
      </div>
    </section>
  );
}
