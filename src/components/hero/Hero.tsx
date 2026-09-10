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

// ------------------------------------------------------------
// Cinematic motion
// ------------------------------------------------------------

const AUTO_PLAY_SPEED = 0.018;

const SCRUB_EASE = 0.045;

const VIDEO_TIME_EASE = 0.085;

const ZOOM_AMOUNT = 0.095;

// Last percentage of each scene used for crossfade.
const SCENE_CROSSFADE = 0.12;

// Scroll gesture multiplier.
const SCROLL_GESTURE_GAIN = 1.15;

// Delay before considering scrolling stopped.
const SCROLL_STOP_DELAY = 120;

// Minimum movement required before considering
// a gesture an actual scroll.
const SCROLL_EPSILON = 0.00005;

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

function lerp(
  current: number,
  target: number,
  amount: number,
) {
  return (
    current +
    (target - current) * amount
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
  ) as Record<
    string,
    string
  >;

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
  // CINEMATIC REFS
  // ==========================================================

  /**
   * Current cinematic position.
   *
   * This is intentionally NOT directly equal
   * to the page scroll progress.
   */
  const smoothProgressRef =
    useRef(0);

  /**
   * Desired cinematic position.
   */
  const targetProgressRef =
    useRef(0);

  /**
   * Last page scroll progress.
   */
  const previousScrollProgressRef =
    useRef(0);

  /**
   * Page progress when the current
   * scroll gesture started.
   */
  const scrollAnchorProgressRef =
    useRef(0);

  /**
   * Cinematic position when the current
   * scroll gesture started.
   */
  const virtualAnchorProgressRef =
    useRef(0);

  /**
   * Whether the user is currently scrolling.
   */
  const isScrollingRef =
    useRef(false);

  /**
   * RAF.
   */
  const animationFrameRef =
    useRef<number | null>(null);

  /**
   * Timer used to detect scroll stop.
   */
  const scrollStopTimerRef =
    useRef<number | null>(null);

  /**
   * Prevent duplicate scroll initialization.
   */
  const scrollInitializedRef =
    useRef(false);

  /**
   * Prevent unnecessary React stage updates.
   */
  const lastStageRef =
    useRef(-1);

  /**
   * Last active scene.
   */
  const lastSceneRef =
    useRef(0);

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

              video.load();

              if (
                video.readyState >= 2
              ) {
                return;
              }

              await new Promise<void>(
                (resolve) => {
                  let resolved = false;

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

    smoothProgressRef.current =
      initial;

    targetProgressRef.current =
      initial;

    previousScrollProgressRef.current =
      initial;

    scrollAnchorProgressRef.current =
      initial;

    virtualAnchorProgressRef.current =
      initial;

    scrollInitializedRef.current =
      true;
  }, []);

  // ==========================================================
  // SCROLL GESTURE DETECTION
  // ==========================================================

  useEffect(() => {
    const handleScroll =
      () => {
        const nextProgress =
          clamp(
            progress,
            0,
            1,
          );

        const previous =
          previousScrollProgressRef.current;

        if (
          !scrollInitializedRef.current
        ) {
          previousScrollProgressRef.current =
            nextProgress;

          scrollInitializedRef.current =
            true;

          return;
        }

        const delta =
          nextProgress - previous;

        previousScrollProgressRef.current =
          nextProgress;

        if (
          Math.abs(delta) <
          SCROLL_EPSILON
        ) {
          return;
        }

        // ----------------------------------------------------
        // START OF SCROLL GESTURE
        // ----------------------------------------------------

        if (
          !isScrollingRef.current
        ) {
          isScrollingRef.current =
            true;

          /**
           * Remember the page position where
           * this gesture started.
           */
          scrollAnchorProgressRef.current =
            nextProgress;

          /**
           * Remember the cinematic position
           * where this gesture started.
           */
          virtualAnchorProgressRef.current =
            smoothProgressRef.current;
        }

        // ----------------------------------------------------
        // MAP PAGE SCROLL → CINEMATIC TARGET
        // ----------------------------------------------------

        const scrollDelta =
          nextProgress -
          scrollAnchorProgressRef.current;

        const target =
          virtualAnchorProgressRef.current +
          scrollDelta *
            SCROLL_GESTURE_GAIN;

        targetProgressRef.current =
          clamp(
            target,
            0,
            1,
          );

        // ----------------------------------------------------
        // RESET STOP TIMER
        // ----------------------------------------------------

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

              /**
               * Autoplay continues from exactly
               * where the cinematic timeline is.
               */
              virtualAnchorProgressRef.current =
                smoothProgressRef.current;

              scrollAnchorProgressRef.current =
                previousScrollProgressRef.current;

              targetProgressRef.current =
                smoothProgressRef.current;
            },
            SCROLL_STOP_DELAY,
          );
      };

    window.addEventListener(
      "scroll",
      handleScroll,
      {
        passive: true,
      },
    );

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll,
      );

      if (
        scrollStopTimerRef.current !==
        null
      ) {
        window.clearTimeout(
          scrollStopTimerRef.current,
        );

        scrollStopTimerRef.current =
          null;
      }
    };
  }, [progress]);

  // ==========================================================
  // VIDEO CONTROL
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

        const desiredTime =
          clamp(
            desiredProgress,
            0,
            1,
          ) * duration;

        const currentTime =
          video.currentTime;

        const nextTime =
          lerp(
            currentTime,
            desiredTime,
            VIDEO_TIME_EASE,
          );

        if (
          Math.abs(
            nextTime -
              currentTime,
          ) > 0.004
        ) {
          try {
            video.currentTime =
              nextTime;
          } catch {
            // Ignore seek errors during
            // metadata/loading transitions.
          }
        }
      },
      [],
    );

  // ==========================================================
  // KEEP VIDEO PAUSED
  // ==========================================================

  const keepVideoPaused =
    useCallback(
      (
        video: HTMLVideoElement,
      ) => {
        if (!video.paused) {
          video.pause();
        }
      },
      [],
    );

  // ==========================================================
  // CINEMATIC RAF LOOP
  // ==========================================================

  useEffect(() => {
    if (
      !videosReady ||
      sceneAssets.length === 0
    ) {
      return;
    }

    let cancelled = false;

    const render =
      () => {
        if (cancelled) {
          return;
        }

        // ====================================================
        // AUTOPLAY WHEN NOT SCROLLING
        // ====================================================

        if (
          !isScrollingRef.current
        ) {
          const current =
            smoothProgressRef.current;

          const next =
            clamp(
              current +
                AUTO_PLAY_SPEED /
                  1000,
              0,
              1,
            );

          targetProgressRef.current =
            next;
        }

        // ====================================================
        // SMOOTH CINEMATIC TIMELINE
        // ====================================================

        const current =
          smoothProgressRef.current;

        const target =
          targetProgressRef.current;

        let nextProgress =
          lerp(
            current,
            target,
            SCRUB_EASE,
          );

        if (
          Math.abs(
            target -
              nextProgress,
          ) < 0.00002
        ) {
          nextProgress =
            target;
        }

        smoothProgressRef.current =
          nextProgress;

        // ====================================================
        // SCENE
        // ====================================================

        const sceneCount =
          sceneAssets.length;

        const {
          sceneIndex,
          sceneProgress,
        } =
          getSceneProgress(
            nextProgress,
            sceneCount,
          );

        // ====================================================
        // ACTIVE SCENE STATE
        // ====================================================

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

        // ====================================================
        // CURRENT VIDEO
        // ====================================================

        const currentVideo =
          videoRefs.current[
            sceneIndex
          ];

        if (currentVideo) {
          keepVideoPaused(
            currentVideo,
          );

          updateVideo(
            currentVideo,
            sceneProgress,
          );
        }

        // ====================================================
        // NEXT VIDEO
        // ====================================================

        const nextSceneIndex =
          Math.min(
            sceneCount - 1,
            sceneIndex + 1,
          );

        const nextVideo =
          videoRefs.current[
            nextSceneIndex
          ];

        const crossfadeStart =
          1 - SCENE_CROSSFADE;

        const transitionProgress =
          sceneProgress >
          crossfadeStart
            ? clamp(
                (sceneProgress -
                  crossfadeStart) /
                  SCENE_CROSSFADE,
                0,
                1,
              )
            : 0;

        if (
          nextVideo &&
          nextSceneIndex !==
            sceneIndex
        ) {
          keepVideoPaused(
            nextVideo,
          );

          if (
            transitionProgress > 0
          ) {
            updateVideo(
              nextVideo,
              0,
            );
          }
        }

        // ====================================================
        // ZOOM
        // ====================================================

        const currentScale =
          1 +
          sceneProgress *
            ZOOM_AMOUNT;

        const nextScale =
          1 +
          transitionProgress *
            ZOOM_AMOUNT;

        if (currentVideo) {
          currentVideo.style.transform =
            `scale(${currentScale})`;

          currentVideo.style.opacity =
            String(
              1 -
                transitionProgress,
            );
        }

        if (
          nextVideo &&
          nextSceneIndex !==
            sceneIndex
        ) {
          nextVideo.style.transform =
            `scale(${nextScale})`;

          nextVideo.style.opacity =
            String(
              transitionProgress,
            );
        }

        // ====================================================
        // HERO NARRATIVE STAGE
        // ====================================================

        /**
         * Map cinematic progress to
         * the existing 50-frame narrative.
         */
        const virtualFrame =
          Math.min(
            50,
            Math.max(
              1,
              Math.round(
                nextProgress *
                  49 +
                  1,
              ),
            ),
          );

        if (
          virtualFrame !==
          lastStageRef.current
        ) {
          lastStageRef.current =
            virtualFrame;

          setActiveStageFrame(
            virtualFrame,
          );
        }

        // ====================================================
        // NEXT RAF
        // ====================================================

        animationFrameRef.current =
          window.requestAnimationFrame(
            render,
          );
      };

    animationFrameRef.current =
      window.requestAnimationFrame(
        render,
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
    videosReady,
    keepVideoPaused,
    updateVideo,
  ]);

  // ==========================================================
  // SCROLL LENGTH
  // ==========================================================

  const scrollLength =
    isMobile
      ? HERO_SCROLL_LENGTH_VH_MOBILE
      : HERO_SCROLL_LENGTH_VH;

  // ==========================================================
  // ACTIVE STAGE
  // ==========================================================

  const activeStage =
    useMemo(
      () =>
        getStageForFrame(
          activeStageFrame,
          heroStages,
        ),
      [activeStageFrame],
    );

  // ==========================================================
  // EMPTY VIDEO STATE
  // ==========================================================

  if (
    sceneAssets.length === 0
  ) {
    return (
      <section
        ref={ref}
        className="
          relative
          w-full
          bg-base
          m-0
          p-0
        "
        style={{
          height: `${scrollLength}vh`,
        }}
      >
        <div
          className="
            sticky
            top-0
            flex
            h-screen
            w-full
            items-center
            justify-center
            bg-base
          "
        >
          <HeroContent
            stage={
              heroStages[0]
            }
            reducedMotion={
              reducedMotion
            }
          />
        </div>
      </section>
    );
  }

  // ==========================================================
  // HERO
  // ==========================================================

  return (
    <section
      ref={ref}
      className="
        relative
        w-full
        bg-base
        m-0
        p-0
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
          left-0
          h-screen
          w-full
          overflow-hidden
          bg-base
          m-0
          p-0
        "
      >
        {/* ==================================================
            VIDEO BACKGROUND
            ================================================== */}

        <div
          className="
            absolute
            inset-0
            z-0
            h-full
            w-full
            overflow-hidden
            bg-base
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

              if (
                !isCurrent &&
                !isNext
              ) {
                return null;
              }

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
                        : 0,
                    transform:
                      "scale(1)",
                  }}
                />
              );
            },
          )}
        </div>

        {/* ==================================================
            CINEMATIC COLOR LAYER
            ================================================== */}

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
            from-white/75
            via-white/20
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
            h-72
            bg-gradient-to-t
            from-white/85
            via-white/30
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
            from-white/70
            to-transparent
          "
        />

        {/* ==================================================
            NETWORK LINE
            ================================================== */}

        <svg
          className="
            pointer-events-none
            absolute
            -top-10
            left-1/2
            z-[4]
            w-[180%]
            max-w-3xl
            -translate-x-1/2
            opacity-25
            sm:w-[140%]
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
              duration:
                reducedMotion
                  ? 0
                  : 1.6,
              ease: [
                0.22,
                1,
                0.36,
                1,
              ],
            }}
          />
        </svg>

        {/* ==================================================
            VIGNETTE
            ================================================== */}

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            z-[4]
            bg-[radial-gradient(circle_at_center,transparent_40%,rgba(255,255,255,0.28)_100%)]
          "
        />

        {/* ==================================================
            CONTENT
            ================================================== */}

        <div
          className="
            absolute
            inset-0
            z-10
            h-screen
            w-full
            container-page
            section-px
            flex
            items-center
            m-0
          "
        >
          <AnimatePresence
            mode="wait"
            initial={false}
          >
            <motion.div
              key={`${activeStage.startFrame}-${activeStage.endFrame}`}
              className="w-full"
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
                      y: 18,
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
              exit={
                reducedMotion
                  ? {
                      opacity: 1,
                      y: 0,
                      filter:
                        "blur(0px)",
                    }
                  : {
                      opacity: 0,
                      y: -14,
                      filter:
                        "blur(2px)",
                    }
              }
              transition={
                reducedMotion
                  ? {
                      duration: 0,
                    }
                  : {
                      enter: {
                        duration:
                          0.55,
                        ease: [
                          0.22,
                          1,
                          0.36,
                          1,
                        ],
                      },
                      exit: {
                        duration:
                          0.28,
                        ease: [
                          0.4,
                          0,
                          1,
                          1,
                        ],
                      },
                    }
              }
            >
              <HeroContent
                stage={
                  activeStage
                }
                reducedMotion={
                  reducedMotion
                }
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ==================================================
            LOADING
            ================================================== */}

        {!videosReady && (
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
        px-2
        sm:px-0
        py-0
      "
    >
      {/* ==================================================
          STAGE LABEL
          ================================================== */}

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
          duration:
            reducedMotion
              ? 0
              : 0.4,
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
            w-8
            sm:w-10
            bg-brass/70
          "
        />

        <span>
          {stage.label}
        </span>

        <span
          className="
            h-px
            w-8
            sm:w-10
            bg-brass/70
          "
        />
      </motion.div>

      {/* ==================================================
          HEADLINE
          ================================================== */}

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
          duration:
            reducedMotion
              ? 0
              : 0.55,
          delay:
            reducedMotion
              ? 0
              : 0.04,
          ease: [
            0.22,
            1,
            0.36,
            1,
          ],
        }}
        className="
          w-full
          max-w-4xl
          mx-auto
          font-display
          font-bold
          text-3xl
          leading-[1.12]
          tracking-tight
          text-center
          text-ink
          sm:text-5xl
          lg:text-7xl
          drop-shadow-[0_5px_30px_rgba(23,23,23,0.12)]
        "
      >
        {stage.headline}
      </motion.h1>

      {/* ==================================================
          SUBHEADLINE
          ================================================== */}

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
          duration:
            reducedMotion
              ? 0
              : 0.55,
          delay:
            reducedMotion
              ? 0
              : 0.13,
          ease: [
            0.22,
            1,
            0.36,
            1,
          ],
        }}
        className="
          mt-5
          sm:mt-6
          w-full
          max-w-2xl
          mx-auto
          px-2
          text-center
          text-base
          leading-relaxed
          text-ink/70
          sm:text-xl
          lg:text-2xl
          drop-shadow-[0_3px_18px_rgba(23,23,23,0.10)]
        "
      >
        {stage.subheadline}
      </motion.p>

      {/* ==================================================
          CTA
          ================================================== */}

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
          duration:
            reducedMotion
              ? 0
              : 0.5,
          delay:
            reducedMotion
              ? 0
              : 0.2,
          ease: [
            0.22,
            1,
            0.36,
            1,
          ],
        }}
        className="
          mt-7
          sm:mt-8
          flex
          flex-col
          items-center
          justify-center
          gap-3
          sm:flex-row
          sm:gap-4
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
