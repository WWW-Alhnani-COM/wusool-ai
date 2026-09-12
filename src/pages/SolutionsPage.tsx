'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { services } from '@/data/services';
import { Container } from '@/components/ui/Container';
import { FinalCTA } from '@/components/sections/FinalCTA';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export function SolutionsPage() {
  const reducedMotion = useReducedMotion();
  const location = useLocation();
  const [activeIndex, setActiveIndex] = useState(0);

  const activeService = services[activeIndex];

  /*
   * Handle deep links such as:
   * /الحلول#ai-agent
   * /الحلول#bookings-automation
   * /الحلول#customer-service-automation
   */
  useEffect(() => {
    const hash = location.hash.replace(/^#/, '');

    if (!hash) return;

    let targetIndex = -1;

    try {
      const decodedHash = decodeURIComponent(hash);

      targetIndex = services.findIndex(
        (service) => service.slug === decodedHash,
      );
    } catch {
      return;
    }

    if (targetIndex === -1) return;

    // Activate the requested solution
    setActiveIndex(targetIndex);

    // Wait until React renders the active solution
    const firstFrame = window.requestAnimationFrame(() => {
      const secondFrame = window.requestAnimationFrame(() => {
        const target = document.getElementById('solutions-system');

        if (!target) return;

        const headerOffset = 88;

        const targetTop =
          target.getBoundingClientRect().top +
          window.scrollY -
          headerOffset;

        window.scrollTo({
          top: Math.max(0, targetTop),
          left: 0,
          behavior: reducedMotion ? 'auto' : 'smooth',
        });
      });

      return () => window.cancelAnimationFrame(secondFrame);
    });

    return () => window.cancelAnimationFrame(firstFrame);
  }, [location.hash, reducedMotion]);

  return (
    <>
      {/* INTRO */}
      <section
        dir="rtl"
        className="relative overflow-hidden border-b border-line bg-base py-24 md:py-32"
      >
        <Container>
          <div className="max-w-4xl">
            <motion.div
              initial={
                reducedMotion
                  ? false
                  : {
                      opacity: 0,
                      y: 24,
                    }
              }
              animate={
                reducedMotion
                  ? undefined
                  : {
                      opacity: 1,
                      y: 0,
                    }
              }
              transition={{
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div className="mb-6 flex items-center gap-3">
                <span className="h-px w-10 bg-brass" />

                <span className="text-xs font-medium tracking-[0.25em] text-brass">
                  الحلول
                </span>
              </div>

              <h1 className="text-4xl font-bold leading-[1.15] tracking-tight text-white md:text-6xl">
                أنظمة ذكية
                <br />
                <span className="text-brass">تعمل لأجلك</span>
              </h1>

              <p className="mt-8 max-w-2xl text-base leading-8 text-ink-muted md:text-lg">
                نبني أنظمة أتمتة مدعومة بالذكاء الاصطناعي تساعد منشآت
                الضيافة والسياحة على إدارة العملاء والحجوزات والمبيعات
                والعمليات من مكان واحد.
              </p>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* SOLUTIONS SYSTEM */}
      <section
        id="solutions-system"
        dir="rtl"
        className="relative overflow-hidden border-b border-line bg-raised py-20 md:py-28"
      >
        {/* Ambient glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-1/2 top-1/2 h-[500px] w-[500px] -translate-y-1/2 translate-x-1/2 rounded-full bg-brass/5 blur-[120px]"
        />

        <Container>
          <div className="relative">
            {/* Section header */}
            <div className="mb-12 flex flex-col justify-between gap-6 md:mb-16 md:flex-row md:items-end">
              <div>
                <div className="mb-4 flex items-center gap-3">
                  <span className="h-px w-8 bg-brass" />

                  <span className="text-xs font-medium tracking-[0.22em] text-brass">
                    SYSTEMS
                  </span>
                </div>

                <h2 className="text-3xl font-bold tracking-tight text-white md:text-5xl">
                  منظومة الحلول
                </h2>
              </div>

              <p className="max-w-md text-sm leading-7 text-ink-muted">
                اختر الحل المناسب لاستكشاف كيفية بناء منظومة أتمتة
                متكاملة لمنشأتك.
              </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12">
              {/* SERVICES LIST */}
              <div className="relative">
                <div className="absolute right-0 top-0 hidden h-full w-px bg-line md:block" />

                <div className="space-y-1">
                  {services.map((service, index) => {
                    const isActive = index === activeIndex;

                    return (
                      <button
                        key={service.slug}
                        type="button"
                        onClick={() => {
                          setActiveIndex(index);

                          const nextHash = `#${service.slug}`;

                          if (window.location.hash !== nextHash) {
                            window.history.replaceState(
                              null,
                              '',
                              `${window.location.pathname}${nextHash}`,
                            );
                          }
                        }}
                        className={`group relative flex w-full items-center justify-between gap-4 border-b border-line px-5 py-5 text-right transition-colors duration-200 md:border-b-0 md:py-4 md:pr-8 ${
                          isActive
                            ? 'bg-white/[0.025]'
                            : 'hover:bg-white/[0.015]'
                        }`}
                      >
                        {/* Active indicator */}
                        <span
                          className={`absolute right-0 top-0 hidden h-full w-[2px] transition-opacity duration-200 md:block ${
                            isActive ? 'bg-brass opacity-100' : 'opacity-0'
                          }`}
                        />

                        <div className="flex min-w-0 items-center gap-4">
                          <span
                            className={`font-mono text-[10px] tracking-[0.2em] transition-colors ${
                              isActive
                                ? 'text-brass'
                                : 'text-ink-faint group-hover:text-ink-muted'
                            }`}
                          >
                            {String(index + 1).padStart(2, '0')}
                          </span>

                          <span
                            className={`truncate text-sm font-medium transition-colors md:text-base ${
                              isActive
                                ? '!text-brass'
                                : '!text-white group-hover:text-brass'
                            }`}
                          >
                            {service.title}
                          </span>
                        </div>

                        <span
                          className={`shrink-0 text-xs transition-all duration-200 ${
                            isActive
                              ? 'translate-x-0 text-brass opacity-100'
                              : 'translate-x-2 text-ink-faint opacity-0 group-hover:translate-x-0 group-hover:opacity-100'
                          }`}
                        >
                          ←
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* ACTIVE SERVICE DETAIL */}
              <div className="relative min-h-[480px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeService.slug}
                    initial={
                      reducedMotion
                        ? false
                        : {
                            opacity: 0,
                            y: 12,
                          }
                    }
                    animate={
                      reducedMotion
                        ? undefined
                        : {
                            opacity: 1,
                            y: 0,
                          }
                    }
                    exit={
                      reducedMotion
                        ? undefined
                        : {
                            opacity: 0,
                            y: -8,
                          }
                    }
                    transition={{
                      duration: reducedMotion ? 0 : 0.3,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="relative h-full"
                  >
                    <div className="relative overflow-hidden border border-line bg-base p-6 md:p-8 lg:p-10">
                      {/* Technical grid */}
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 opacity-[0.035]"
                        style={{
                          backgroundImage:
                            'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)',
                          backgroundSize: '32px 32px',
                        }}
                      />

                      {/* Corner markers */}
                      <span className="absolute right-0 top-0 h-8 w-px bg-brass/60" />
                      <span className="absolute right-0 top-0 h-px w-8 bg-brass/60" />

                      <span className="absolute bottom-0 left-0 h-8 w-px bg-brass/60" />
                      <span className="absolute bottom-0 left-0 h-px w-8 bg-brass/60" />

                      <div className="relative">
                        {/* Number */}
                        <div className="mb-8 flex items-center justify-between">
                          <span className="font-mono text-xs tracking-[0.2em] text-brass">
                            {String(activeIndex + 1).padStart(2, '0')} /{' '}
                            {String(services.length).padStart(2, '0')}
                          </span>

                          <span className="h-px flex-1 bg-line mx-4" />

                          <span className="font-mono text-[10px] tracking-[0.16em] text-ink-faint">
                            SYSTEM
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="text-3xl font-bold leading-tight text-white md:text-4xl">
                          {activeService.title}
                        </h3>

                        {/* Description */}
                        <p className="mt-6 max-w-2xl text-sm leading-8 text-ink-muted md:text-base">
                          {activeService.description}
                        </p>

                        {/* Details */}
                        <div className="mt-10 grid gap-4 sm:grid-cols-2">
                          {activeService.features?.map((feature, index) => (
                            <div
                              key={`${activeService.slug}-${index}`}
                              className="border border-line bg-white/[0.015] p-4"
                            >
                              <div className="flex items-start gap-3">
                                <span className="mt-1 h-1.5 w-1.5 shrink-0 bg-brass" />

                                <span className="text-sm leading-7 text-ink-muted">
                                  {feature}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Progress */}
                        <div className="mt-10">
                          <div className="mb-3 flex items-center justify-between">
                            <span className="font-mono text-[10px] tracking-[0.16em] text-ink-faint">
                              SOLUTION
                            </span>

                            <span className="font-mono text-[10px] text-brass">
                              {Math.round(
                                ((activeIndex + 1) / services.length) * 100,
                              )}
                              %
                            </span>
                          </div>

                          <div className="h-px w-full bg-line">
                            <motion.div
                              initial={
                                reducedMotion
                                  ? undefined
                                  : {
                                      width: 0,
                                    }
                              }
                              animate={{
                                width: `${
                                  ((activeIndex + 1) / services.length) * 100
                                }%`,
                              }}
                              transition={{
                                duration: reducedMotion ? 0 : 0.4,
                                ease: [0.22, 1, 0.36, 1],
                              }}
                              className="h-px bg-brass"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Mobile indicators */}
            <div className="mt-8 flex items-center justify-center gap-2 lg:hidden">
              {services.map((service, index) => (
                <button
                  key={service.slug}
                  type="button"
                  aria-label={`الانتقال إلى ${service.title}`}
                  onClick={() => setActiveIndex(index)}
                  className={`h-1 transition-all duration-200 ${
                    index === activeIndex
                      ? 'w-8 bg-brass'
                      : 'w-2 bg-line'
                  }`}
                />
              ))}
            </div>
          </div>
        </Container>
      </section>

      <FinalCTA />
    </>
  );
}
