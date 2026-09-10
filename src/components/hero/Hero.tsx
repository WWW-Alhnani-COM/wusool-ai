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
// الـ scroll يحدد موضع الفيديو مباشرة.

const ZOOM_AMOUNT = 0.095;

// نسبة بسيطة لعمل crossfade بين المشاهد.
const SCENE_CROSSFADE = 0.12;

// سرعة autoplay الخفيفة جدًا عند عدم التمرير.

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
// VIDEO ASSETS
// ============================================================

const videoModules =
  import.meta.glob(
    "/src/assets/public/videos/scene-*.mp4",
    {
      eager: true,
      query: "?url",
      import: "default",
    },
  ) as Record<string, string>;

const sceneAssets: SceneAsset[] =
  Object.entries(videoModules)
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
              ".mp4",
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
    videosReady,
    setVideosReady,
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
  // VIDEO REFS
  // ==========================================================

  const videoRefs =
    useRef<
      HTMLVideoElement[]
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
   * RAF الخاص بالـ idle autoplay.
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
  // VIDEO ELEMENT MANAGEMENT
  // ==========================================================

  const setVideoRef =
    useCallback(
      (
        index: number,
        element:
          | HTMLVideoElement
          | null,
      ) => {
        if (!element) {
          return;
        }

        videoRefs.current[index] =
          element;
      },
      [],
    );

  // ==========================================================
  // VIDEO PRELOADING
  // ==========================================================

  useEffect(() => {
    if (
      sceneAssets.length === 0
    ) {
      return;
    }

    let cancelled = false;

    const prepareVideos =
      async () => {
        const videos =
          videoRefs.current;

        const preloadPromises =
          sceneAssets.map(
            async (
              _scene,
              index,
            ) => {
              const video =
                videos[index];

              if (!video) {
                return;
              }

              video.muted = true;
              video.playsInline = true;
              video.preload = "auto";

              /*
               * الفيديوهات لا تعمل تلقائيًا.
               * Hero هو الذي يتحكم فيها.
               */
              video.autoplay = false;
              video.loop = false;

              video.load();

              if (
                video.readyState >= 2
              ) {
                return;
              }

              await new Promise<void>(
                (resolve) => {
                  let resolved =
                    false;

                  const cleanup =
                    () => {
                      video.removeEventListener(
                        "loadeddata",
                        handleReady,
                      );

                      video.removeEventListener(
                        "canplay",
                        handleReady,
                      );

                      video.removeEventListener(
                        "error",
                        handleError,
                      );
                    };

                  const resolveOnce =
                    () => {
                      if (resolved) {
                        return;
                      }

                      resolved = true;

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

                  video.addEventListener(
                    "loadeddata",
                    handleReady,
                    {
                      once: true,
                    },
                  );

                  video.addEventListener(
                    "canplay",
                    handleReady,
                    {
                      once: true,
                    },
                  );

                  video.addEventListener(
                    "error",
                    handleError,
                    {
                      once: true,
                    },
                  );
                },
              );
            },
          );

        await Promise.all(
          preloadPromises,
        );

        if (!cancelled) {
          setVideosReady(true);
        }
      };

    const timer =
      window.setTimeout(
        prepareVideos,
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
     * أوقف كل الفيديوهات حتى لا يحدث
     * تعارض بين playback و currentTime.
     */
    if (
      !isScrollingRef.current
    ) {
      isScrollingRef.current =
        true;

      videoRefs.current.forEach(
        (video) => {
          if (
            video &&
            !video.paused
          ) {
            video.pause();
          }
        },
      );
    }

    /*
     * اكتشاف توقف الـ scroll.
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
  // DIRECT VIDEO SEEK
  // ==========================================================

  const updateVideo =
    useCallback(
      (
        video: HTMLVideoElement,
        desiredProgress: number,
      ) => {
        if (
          !video ||
          !Number.isFinite(
            video.duration,
          ) ||
          video.duration <= 0
        ) {
          return;
        }

        const duration =
          video.duration;

        /*
         * Scroll progress → video time
         */
        const desiredTime =
          clamp(
            desiredProgress,
            0,
            1,
          ) * duration;

        /*
         * DIRECT SEEK
         *
         * لا lerp.
         * لا easing.
         * لا interpolation.
         */
        if (
          Math.abs(
            video.currentTime -
              desiredTime,
          ) > 0.001
        ) {
          try {
            video.currentTime =
              desiredTime;
          } catch {
            /*
             * قد يحدث أثناء تغيير metadata.
             */
          }
        }
      },
      [],
    );

  // ==========================================================
  // PAUSE INACTIVE VIDEOS
  // ==========================================================

  const pauseInactiveVideos =
    useCallback(
      (
        activeIndex: number,
      ) => {
        videoRefs.current.forEach(
          (
            video,
            index,
          ) => {
            if (
              video &&
              index !== activeIndex &&
              !video.paused
            ) {
              video.pause();
            }
          },
        );
      },
      [],
    );

  // ==========================================================
  // PLAY ACTIVE VIDEO
  // ==========================================================

  const playActiveVideo =
    useCallback(
      async (
        video:
          | HTMLVideoElement
          | undefined,
      ) => {
        if (!video) {
          return;
        }

        if (!video.paused) {
          return;
        }

        try {
          await video.play();
        } catch {
          /*
           * المتصفح قد يمنع autoplay.
           * الفيديو muted لذلك غالبًا لن يحدث ذلك.
           */
        }
      },
      [],
    );

  // ==========================================================
  // MAIN VIDEO TIMELINE
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

        const activeVideo =
          videoRefs.current[
            sceneIndex
          ];

        /*
         * إيقاف الفيديوهات غير النشطة.
         */
        pauseInactiveVideos(
          sceneIndex,
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
         * تحديث الفيديو مباشرة.
         */
        if (activeVideo) {
          updateVideo(
            activeVideo,
            sceneProgress,
          );
        }

        /*
         * crossfade بسيط بين المشاهد.
         */
        const nextVideo =
          videoRefs.current[
            sceneIndex + 1
          ];

        if (
          nextVideo &&
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

          const nextSceneProgress =
            fadeProgress;

          updateVideo(
            nextVideo,
            nextSceneProgress,
          );
        }

        /*
         * عندما لا يوجد scroll،
         * نسمح بحركة idle صغيرة جدًا.
         */
        if (
          !isScrollingRef.current &&
          activeVideo &&
          videosReady &&
          !reducedMotion
        ) {
          void playActiveVideo(
            activeVideo,
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
  }, [
    pauseInactiveVideos,
    playActiveVideo,
    reducedMotion,
    updateVideo,
    videosReady,
  ]);

  // ==========================================================
  // REDUCED MOTION
  // ==========================================================

  useEffect(() => {
    if (!reducedMotion) {
      return;
    }

    videoRefs.current.forEach(
      (video) => {
        if (
          video &&
          !video.paused
        ) {
          video.pause();
        }
      },
    );
  }, [reducedMotion]);

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

      videoRefs.current.forEach(
        (video) => {
          if (video) {
            video.pause();
          }
        },
      );
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
            VIDEO BACKGROUND
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
                <video
                  key={scene.id}
                  ref={(element) =>
                    setVideoRef(
                      index,
                      element,
                    )
                  }
                  src={scene.src}
                  muted
                  playsInline
                  preload="auto"
                  autoPlay={false}
                  loop={false}
                  aria-hidden="true"
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
          "
        >
          <div
            className="
              mx-auto
              w-full
              max-w-7xl
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
  relative
  max-w-3xl
  ml-auto
  rounded-[28px]
  border
  border-white/10
  bg-white/[0.06]
  px-6
  py-8
  text-right
  backdrop-blur-[6px]
  shadow-[0_12px_50px_rgba(0,0,0,0.08)]
  sm:px-10
  sm:py-10
  lg:px-12
  lg:py-12
"
                dir="rtl"
              >
                {/* ==========================================
                    EYEBROW
                    ========================================== */}

                <div
                  className="
                    mb-5
                    inline-flex
                    items-center
                    rounded-full
                    border
                    border-white/15
                    bg-white/10
                    px-4
                    py-2
                    text-xs
                    font-medium
                    text-white/80
                    backdrop-blur-md
                  "
                >
                  <span
                    className="
                      mr-2
                      h-1.5
                      w-1.5
                      rounded-full
                      bg-white
                    "
                  />

                  {heroContent.eyebrow}
                </div>

                {/* ==========================================
                    LABEL
                    ========================================== */}

                <div
                  className="
                    mb-4
                    text-sm
                    font-medium
                    tracking-wide
                    text-white/65
                  "
                >
                  {currentStage?.label}
                </div>

                {/* ==========================================
                    MAIN HEADLINE
                    ========================================== */}

                <h1
                  className="
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

                {/* ==========================================
                    SUBHEADLINE
                    ========================================== */}

                <p
                  className="
                    mt-6
                    max-w-2xl
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
                    justify-start
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
  className="border-white/40 text-white hover:border-white/70 hover:text-white"
>
  {heroContent.ctaSecondary}
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
            BRAND / TOP
            ================================================== */}

        <div
          className="
            absolute
            left-5
            right-5
            top-5
            z-30
            flex
            items-center
            justify-between
            sm:left-8
            sm:right-8
            sm:top-8
            lg:left-12
            lg:right-12
          "
          dir="rtl"
        >
          <div
            className="
              text-lg
              font-bold
              tracking-tight
              text-white
              sm:text-xl
            "
          >
            {heroContent.brand}
          </div>

          <div
            className="
              hidden
              text-xs
              text-white/50
              sm:block
            "
          >
            {heroContent.scrollLabel}
          </div>
        </div>

        {/* ==================================================
            SCROLL INDICATOR
            ================================================== */}

        <div
          className="
            absolute
            bottom-6
            left-1/2
            z-30
            -translate-x-1/2
            text-center
          "
          dir="rtl"
        >
          <div
            className="
              mb-2
              text-[10px]
              font-medium
              tracking-wider
              text-white/50
            "
          >
            {heroContent.scrollLabel}
          </div>

          <div
            className="
              mx-auto
              h-8
              w-px
              overflow-hidden
              bg-white/20
            "
          >
            <motion.div
              animate={{
                y: [0, 16, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="
                h-3
                w-full
                bg-white/80
              "
            />
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
