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

      /*
       * موضع بداية الـ Hero الحقيقي
       * بالنسبة إلى الصفحة كاملة.
       */
      const scrollTop =
        getScrollTop();

      const elementTop =
        scrollTop + rect.top;

      /*
       * نستخدم الارتفاع الفعلي للعنصر
       * بدل الاعتماد على offsetHeight فقط.
       *
       * هذا أكثر استقرارًا مع vh على
       * متصفحات الجوال.
       */
      const elementHeight =
        rect.height;

      /*
       * ارتفاع الـ viewport الحالي.
       *
       * visualViewport أكثر دقة على الجوال
       * عندما يظهر أو يختفي شريط المتصفح.
       */
      const viewportHeight =
        window.visualViewport?.height ||
        window.innerHeight;

      /*
       * المسافة التي يتحرك خلالها
       * الـ Hero من أول Frame إلى آخر Frame.
       */
      const scrollDistance =
        Math.max(
          elementHeight -
            viewportHeight,
          1,
        );

      /*
       * مقدار التمرير داخل الـ Hero.
       */
      const scrollPosition =
        scrollTop -
        elementTop;

      /*
       * تحويل موضع التمرير إلى
       * قيمة بين 0 و 1.
       */
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

    /*
     * جدولة الحساب باستخدام RAF
     * لمنع تنفيذ الحساب عشرات المرات
     * أثناء السحب السريع على الهاتف.
     */
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
              frame.current =
                null;

              compute();
            },
          );
      };

    /*
     * الحساب الأولي.
     */
    compute();

    /*
     * الصفحة الرئيسية.
     */
    window.addEventListener(
      "scroll",
      requestCompute,
      {
        passive: true,
      },
    );

    /*
     * تغيير حجم نافذة المتصفح.
     */
    window.addEventListener(
      "resize",
      requestCompute,
      {
        passive: true,
      },
    );

    /*
     * تدوير الهاتف.
     */
    window.addEventListener(
      "orientationchange",
      requestCompute,
      {
        passive: true,
      },
    );

    /*
     * Mobile Safari / Chrome.
     *
     * visualViewport يتغير عندما تظهر
     * أو تختفي واجهة المتصفح على الهاتف.
     */
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

    /*
     * مراقبة تغير حجم الـ Hero.
     *
     * مهم لأن ارتفاع الـ Hero يعتمد
     * على viewport وقد يتغير على الجوال.
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

    /*
     * تنظيف الأحداث عند إزالة المكون.
     */
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
