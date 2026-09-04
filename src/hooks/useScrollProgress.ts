import { useEffect, useRef, useState } from "react";

/**
 * Returns scroll progress (0 → 1) through a tall wrapper element, meant to
 * be used with a sticky child inside it. 0 = wrapper top just reached the
 * viewport top; 1 = wrapper bottom reached the viewport bottom.
 *
 * Uses rAF-throttled scroll/resize listeners instead of a library — this is
 * the only piece of the sequence that needs to run on every scroll tick, so
 * it's kept dependency-free and cheap.
 */
export function useScrollProgress<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [progress, setProgress] = useState(0);
  const frame = useRef<number | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const compute = () => {
      const rect = el.getBoundingClientRect();
      const viewportH = window.innerHeight;
      const total = rect.height - viewportH;
      if (total <= 0) {
        setProgress(rect.top <= 0 ? 1 : 0);
        return;
      }
      const scrolled = Math.min(Math.max(-rect.top, 0), total);
      setProgress(scrolled / total);
    };

    const onScroll = () => {
      if (frame.current !== null) return;
      frame.current = requestAnimationFrame(() => {
        compute();
        frame.current = null;
      });
    };

    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame.current !== null) cancelAnimationFrame(frame.current);
    };
  }, []);

  return { ref, progress };
}
