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
    const compute = () => {
      const element = ref.current;

      if (!element) {
        return;
      }

      const rect =
        element.getBoundingClientRect();

      /*
       * الموضع الحقيقي للـHero داخل الصفحة.
       *
       * لا نعتمد على rect.top وحده لأن
       * mobile browsers تغير ارتفاع الـviewport
       * أثناء ظهور/اختفاء شريط العنوان.
       */
      const elementTop =
        window.scrollY + rect.top;

      /*
       * المسافة الفعلية التي يمكن للمستخدم
       * التمرير خلالها داخل الـHero.
       */
      const viewportHeight =
        window.innerHeight;

      const elementHeight =
        element.offsetHeight;

      const scrollDistance =
        Math.max(
          elementHeight -
            viewportHeight,
          1,
        );

      /*
       * مقدار التمرير منذ بداية الـHero.
       */
      const scrollPosition =
        window.scrollY -
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
            ) < 0.0005
          ) {
            return current;
          }

          return nextProgress;
        },
      );
    };

    const requestCompute =
      () => {
        if (
          frame.current !==
          null
        ) {
          return;
        }

        frame.current =
          window.requestAnimationFrame(
            () => {
              compute();

              frame.current =
                null;
            },
          );
      };

    /*
     * حساب أولي.
     */
    compute();

    /*
     * الصفحة.
     */
    window.addEventListener(
      "scroll",
      requestCompute,
      {
        passive: true,
      },
    );

    /*
     * تغيير حجم الشاشة.
     */
    window.addEventListener(
      "resize",
      requestCompute,
    );

    /*
     * تدوير الهاتف.
     */
    window.addEventListener(
      "orientationchange",
      requestCompute,
    );

    /*
     * Mobile Safari / Chrome
     * visual viewport.
     */
    const visualViewport =
      window.visualViewport;

    if (visualViewport) {
      visualViewport.addEventListener(
        "resize",
        requestCompute,
      );

      visualViewport.addEventListener(
        "scroll",
        requestCompute,
      );
    }

    /*
     * في حال تغير ارتفاع الـHero
     * بعد تحميل الصور أو الخطوط.
     */
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
