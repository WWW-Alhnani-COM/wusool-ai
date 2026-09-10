import {
  useEffect,
  useRef,
  useState,
} from "react";

export function useScrollProgress<
  T extends HTMLElement,
>() {
  const ref =
    useRef<T | null>(null);

  const [progress, setProgress] =
    useState(0);

  const frame =
    useRef<number | null>(null);

  useEffect(() => {
    const getScrollTop = () => {
      return Math.max(
        window.scrollY || 0,
        document.documentElement.scrollTop || 0,
        document.body.scrollTop || 0,
      );
    };

    const compute = () => {
      const element = ref.current;

      if (!element) {
        return;
      }

      const rect =
        element.getBoundingClientRect();

      const scrollTop =
        getScrollTop();

      const elementTop =
        scrollTop + rect.top;

      const elementHeight =
        rect.height;

      const viewportHeight =
        window.visualViewport?.height ||
        window.innerHeight;

      const scrollDistance =
        Math.max(
          elementHeight -
            viewportHeight,
          1,
        );

      const scrollPosition =
        scrollTop -
        elementTop;

      const nextProgress =
        Math.min(
          Math.max(
            scrollPosition /
              scrollDistance,
            0,
          ),
          1,
        );

      setProgress(
        (current) => {
          if (
            Math.abs(
              current -
                nextProgress,
            ) < 0.0001
          ) {
            return current;
          }

          return nextProgress;
        },
      );
    };

    const requestCompute = () => {
      if (
        frame.current !==
        null
      ) {
        return;
      }

      frame.current =
        window.requestAnimationFrame(
          () => {
            frame.current =
              null;

            compute();
          },
        );
    };

    compute();

    window.addEventListener(
      "scroll",
      requestCompute,
      {
        passive: true,
      },
    );

    window.addEventListener(
      "resize",
      requestCompute,
      {
        passive: true,
      },
    );

    window.addEventListener(
      "orientationchange",
      requestCompute,
      {
        passive: true,
      },
    );

    const visualViewport =
      window.visualViewport;

    if (visualViewport) {
      visualViewport.addEventListener(
        "resize",
        requestCompute,
        {
          passive: true,
        },
      );

      visualViewport.addEventListener(
        "scroll",
        requestCompute,
        {
          passive: true,
        },
      );
    }

    const resizeObserver =
      new ResizeObserver(() => {
        requestCompute();
      });

    const element =
      ref.current;

    if (element) {
      resizeObserver.observe(
        element,
      );
    }

    return () => {
      window.removeEventListener(
        "scroll",
        requestCompute,
      );

      window.removeEventListener(
        "resize",
        requestCompute,
      );

      window.removeEventListener(
        "orientationchange",
        requestCompute,
      );

      if (visualViewport) {
        visualViewport.removeEventListener(
          "resize",
          requestCompute,
        );

        visualViewport.removeEventListener(
          "scroll",
          requestCompute,
        );
      }

      resizeObserver.disconnect();

      if (
        frame.current !==
        null
      ) {
        window.cancelAnimationFrame(
          frame.current,
        );

        frame.current =
          null;
      }
    };
  }, []);

  return {
    ref,
    progress,
  };
}
