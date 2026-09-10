import { useEffect, useRef, useState } from "react";

/**
 * Returns scroll progress (0 → 1) through a tall wrapper element.
 *
 * Designed for scroll-driven sections with a sticky child.
 * Works reliably on desktop and mobile, including mobile viewport changes.
 */
export function useScrollProgress<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [progress, setProgress] = useState(0);
  const frame = useRef<number | null>(null);

  useEffect(() => {
    const compute = () => {
      const el = ref.current;

      if (!el) return;

      const rect = el.getBoundingClientRect();

      // Absolute position of the wrapper in the document.
      const absoluteTop = window.scrollY + rect.top;

      // The amount of scroll available inside the tall wrapper.
      const scrollDistance = Math.max(
        el.offsetHeight - window.innerHeight,
        1,
      );

      // Current scroll position relative to the wrapper.
      const currentScroll = window.scrollY - absoluteTop;

      const nextProgress = Math.min(
        Math.max(currentScroll / scrollDistance, 0),
        1,
      );

      setProgress((current) =>
        Math.abs(current - nextProgress) < 0.001
          ? current
          : nextProgress,
      );
    };

    const scheduleCompute = () => {
      if (frame.current !== null) return;

      frame.current = window.requestAnimationFrame(() => {
        compute();
        frame.current = null;
      });
    };

    compute();

    window.addEventListener("scroll", scheduleCompute, {
      passive: true,
    });

    window.addEventListener("resize", scheduleCompute);

    window.addEventListener(
      "orientationchange",
      scheduleCompute,
    );

    // Mobile browsers can change the visual viewport when
    // the address bar appears/disappears.
    const visualViewport = window.visualViewport;

    visualViewport?.addEventListener(
      "resize",
      scheduleCompute,
    );

    visualViewport?.addEventListener(
      "scroll",
      scheduleCompute,
    );

    return () => {
      window.removeEventListener(
        "scroll",
        scheduleCompute,
      );

      window.removeEventListener(
        "resize",
        scheduleCompute,
      );

      window.removeEventListener(
        "orientationchange",
        scheduleCompute,
      );

      visualViewport?.removeEventListener(
        "resize",
        scheduleCompute,
      );

      visualViewport?.removeEventListener(
        "scroll",
        scheduleCompute,
      );

      if (frame.current !== null) {
        window.cancelAnimationFrame(frame.current);
      }
    };
  }, []);

  return { ref, progress };
}
