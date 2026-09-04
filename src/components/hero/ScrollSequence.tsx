import { useEffect, useMemo, useState } from "react";
import { sequenceFrames } from "@/data/process";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useIsLowPowerDevice } from "@/hooks/useIsLowPowerDevice";

// How many viewport-heights of scroll distance the sequence plays across.
// Higher = slower/more deliberate scrub. Kept lower on low-power devices
// so the section doesn't feel like a long empty scroll on a small phone.
const SCROLL_LENGTH_VH = 420;
const SCROLL_LENGTH_VH_LIGHT = 260;

export function ScrollSequence() {
  const frames = sequenceFrames;
  const frameCount = frames.length;
  const reducedMotion = useReducedMotion();
  const lowPower = useIsLowPowerDevice();
  const { ref, progress } = useScrollProgress<HTMLDivElement>();

  const activeIndex = useMemo(() => {
    if (frameCount === 0) return 0;
    const idx = Math.floor(progress * frameCount);
    return Math.min(idx, frameCount - 1);
  }, [progress, frameCount]);

  // Preload the active frame plus a small neighbourhood around it, instead
  // of every frame up front — cheap on first paint, no pop-in as you scroll.
  const [loaded, setLoaded] = useState<Set<number>>(new Set([0]));
  useEffect(() => {
    const window_ = 2;
    setLoaded((prev) => {
      const next = new Set(prev);
      for (let i = activeIndex - window_; i <= activeIndex + window_; i++) {
        if (i >= 0 && i < frameCount) next.add(i);
      }
      return next;
    });
  }, [activeIndex, frameCount]);

  const scrollLength = lowPower ? SCROLL_LENGTH_VH_LIGHT : SCROLL_LENGTH_VH;

  // Reduced-motion / low-power fallback: render as a plain static section
  // (final frame + full text list) with no sticky pin and no scroll-driven
  // playback at all, per prefers-reduced-motion.
  if (reducedMotion) {
    const last = frames[frameCount - 1];
    return (
      <section className="container-page section-px py-24" aria-label="رحلة الوصول">
        <img
          src={last.src}
          alt={last.alt}
          className="w-full max-w-md mx-auto rounded-2xl border border-base-line"
        />
        <ol className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm text-ink-muted">
          {frames.map((f) => (
            <li key={f.id}>{f.caption}</li>
          ))}
        </ol>
      </section>
    );
  }

  return (
    <section
      ref={ref}
      className="relative"
      style={{ height: `${scrollLength}vh` }}
      aria-label="رحلة العميل من التواصل إلى الوصول"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Frame stack — cross-fade between the active frame and its neighbours */}
        <div className="relative w-full max-w-md aspect-[3/4] sm:aspect-square lg:max-w-lg">
          {frames.map((frame, i) => {
            if (!loaded.has(i)) return null;
            const isActive = i === activeIndex;
            return (
              <img
                key={frame.id}
                src={frame.src}
                alt={frame.alt}
                loading={i === 0 ? "eager" : "lazy"}
                className="absolute inset-0 w-full h-full object-contain transition-opacity duration-500 ease-path"
                style={{ opacity: isActive ? 1 : 0 }}
              />
            );
          })}
        </div>

        {/* Synced caption + progress dots */}
        <div className="absolute bottom-10 sm:bottom-14 inset-x-0 flex flex-col items-center gap-5 px-6">
          <p className="font-display text-lg sm:text-2xl text-ink text-center" aria-live="polite">
            {frames[activeIndex].caption}
          </p>
          <div className="flex items-center gap-2">
            {frames.map((frame, i) => (
              <span
                key={frame.id}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === activeIndex ? "w-6 bg-brass" : "w-1.5 bg-base-line"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
