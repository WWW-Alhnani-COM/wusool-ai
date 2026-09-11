
'use client';

import { motion } from 'framer-motion';

import { ContactForm } from '@/components/forms/ContactForm';
import { WhatsAppCTA } from '@/components/ui/WhatsAppCTA';
import { Container } from '@/components/ui/Container';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export default function ConsultationPage() {
  const reducedMotion = useReducedMotion();

  return (
    <>
      {/* =========================================================
          HERO
      ========================================================= */}
      <section
        dir="rtl"
        className="
          relative
          overflow-hidden
          border-b
          border-base-line
          bg-base
          pt-28
          pb-20
          sm:pt-36
          sm:pb-28
          lg:pt-44
          lg:pb-32
        "
      >
        {/* Atmosphere */}
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            left-1/2
            top-1/2
            h-[560px]
            w-[560px]
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            bg-brass/[0.04]
            blur-[150px]
          "
        />

        {/* Technical grid */}
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            inset-0
            opacity-[0.025]
            [background-image:linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)]
            [background-size:64px_64px]
          "
        />

        <Container className="relative">
          <div className="mx-auto max-w-5xl text-center">
            <motion.div
              initial={
                reducedMotion
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 16 }
              }
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: reducedMotion ? 0 : 0.6,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mb-7 flex items-center justify-center gap-3"
            >
              <span
                aria-hidden="true"
                className="h-px w-8 bg-brass/70"
              />

              <span
                className="
                  font-mono
                  text-[10px]
                  font-medium
                  tracking-[0.22em]
                  text-brass
                "
              >
                CONTACT JITHR AI
              </span>

              <span
                aria-hidden="true"
                className="h-px w-8 bg-brass/70"
              />
            </motion.div>

            <motion.h1
              initial={
                reducedMotion
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 20 }
              }
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: reducedMotion ? 0 : 0.7,
                delay: reducedMotion ? 0 : 0.04,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="
                font-display
                text-5xl
                font-semibold
                leading-[1.08]
                tracking-tight
                text-ink
                sm:text-6xl
                lg:text-7xl
                xl:text-8xl
              "
            >
              لنبني منظومة أذكى
              <br />
              <span className="text-ink-muted">لمنشأتك.</span>
            </motion.h1>

            <motion.p
              initial={
                reducedMotion
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 16 }
              }
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: reducedMotion ? 0 : 0.7,
                delay: reducedMotion ? 0 : 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="
                mx-auto
                mt-8
                max-w-2xl
                text-base
                leading-8
                text-ink-muted
                sm:text-lg
                sm:leading-9
              "
            >
              أخبرنا عن منشأتك واحتياجك، وسنبدأ بفهم العمليات
              التي يمكن للذكاء والأتمتة أن تجعلها أكثر كفاءة.
            </motion.p>
          </div>
        </Container>
      </section>

      {/* =========================================================
          CONTACT SYSTEM
      ========================================================= */}
      <section
        dir="rtl"
        className="
          relative
          overflow-hidden
          border-b
          border-base-line
          py-20
          sm:py-28
          lg:py-32
        "
      >
        <Container>
          <div
            className="
              relative
              overflow-hidden
              border
              border-base-line
              bg-base
            "
          >
            {/* Header */}
            <div
              className="
                flex
                items-center
                justify-between
                border-b
                border-base-line
                px-5
                py-4
                sm:px-7
                lg:px-8
              "
            >
              <div className="flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="h-1.5 w-1.5 rounded-full bg-brass"
                />

                <span
                  className="
                    font-mono
                    text-[10px]
                    tracking-[0.16em]
                    text-ink-faint
                  "
                >
                  JITHR AI / CONTACT
                </span>
              </div>

              <span
                className="
                  font-mono
                  text-[10px]
                  tracking-[0.14em]
                  text-ink-faint
                "
              >
                01 / 01
              </span>
            </div>

            <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
              {/* =================================================
                  CONTACT INFO
              ================================================= */}
              <div
                className="
                  relative
                  overflow-hidden
                  border-b
                  border-base-line
                  px-6
                  py-10
                  sm:px-10
                  sm:py-12
                  lg:border-b-0
                  lg:border-l
                  lg:px-12
                  lg:py-14
                "
              >
                {/* Technical grid */}
                <div
                  aria-hidden="true"
                  className="
                    pointer-events-none
                    absolute
                    inset-0
                    opacity-[0.035]
                    [background-image:linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)]
                    [background-size:48px_48px]
                  "
                />

                {/* Glow */}
                <div
                  aria-hidden="true"
                  className="
                    pointer-events-none
                    absolute
                    left-0
                    top-1/2
                    h-[360px]
                    w-[360px]
                    -translate-x-1/2
                    -translate-y-1/2
                    rounded-full
                    bg-brass/[0.035]
                    blur-[120px]
                  "
                />

                <div className="relative z-10">
                  <div className="mb-8 flex items-center gap-3">
                    <span
                      aria-hidden="true"
                      className="h-px w-10 bg-brass"
                    />

                    <span
                      className="
                        font-mono
                        text-[10px]
                        tracking-[0.18em]
                        text-brass
                      "
                    >
                      ابدأ من هنا
                    </span>
                  </div>

                  <h2
                    className="
                      max-w-xl
                      font-display
                      text-3xl
                      font-semibold
                      leading-[1.2]
                      tracking-tight
                      text-ink
                      sm:text-4xl
                      lg:text-5xl
                    "
                  >
                    أخبرنا بما تريد
                    <br />
                    <span className="text-ink-muted">
                      أن تجعلَه أذكى.
                    </span>
                  </h2>

                  <p
                    className="
                      mt-6
                      max-w-lg
                      text-sm
                      leading-8
                      text-ink-muted
                      sm:text-base
                    "
                  >
                    سواء كنت تبحث عن أتمتة خدمة العملاء،
                    الحجوزات، المبيعات، المتابعة أو ربط أنظمتك،
                    ابدأ بوصف احتياجك وسنبني من هناك.
                  </p>

                  {/* Process */}
                  <div className="mt-12">
                    <div className="border-t border-base-line">
                      <ContactStep
                        number="01"
                        title="أخبرنا"
                        description="شاركنا احتياج منشأتك."
                      />

                      <ContactStep
                        number="02"
                        title="نفهم"
                        description="نفهم العمليات والتحديات الحالية."
                      />

                      <ContactStep
                        number="03"
                        title="نبني"
                        description="نحدد الحل المناسب لمنشأتك."
                        last
                      />
                    </div>
                  </div>

                  {/* WhatsApp */}
                  <div className="mt-10">
                    <WhatsAppCTA />
                  </div>
                </div>
              </div>

              {/* =================================================
                  FORM
              ================================================= */}
              <div
                className="
                  relative
                  overflow-hidden
                  px-6
                  py-10
                  sm:px-10
                  sm:py-12
                  lg:px-14
                  lg:py-14
                "
              >
                {/* Background number */}
                <div
                  aria-hidden="true"
                  className="
                    pointer-events-none
                    absolute
                    left-4
                    top-0
                    font-mono
                    text-[180px]
                    font-semibold
                    leading-none
                    tracking-[-0.08em]
                    text-ink/[0.035]
                    sm:left-8
                    sm:text-[230px]
                    lg:text-[280px]
                  "
                >
                  01
                </div>

                <div className="relative z-10">
                  <div className="mb-8">
                    <span
                      className="
                        font-mono
                        text-[10px]
                        tracking-[0.18em]
                        text-brass
                      "
                    >
                      PROJECT BRIEF
                    </span>

                    <h2
                      className="
                        mt-4
                        font-display
                        text-2xl
                        font-semibold
                        text-ink
                        sm:text-3xl
                      "
                    >
                      تفاصيل التواصل
                    </h2>

                    <p
                      className="
                        mt-3
                        max-w-lg
                        text-sm
                        leading-7
                        text-ink-muted
                      "
                    >
                      املأ البيانات التالية وسنتمكن من فهم طلبك
                      بشكل أفضل.
                    </p>
                  </div>

                  <ContactForm />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* =========================================================
          FINAL STATEMENT
      ========================================================= */}
      <section
        dir="rtl"
        className="
          relative
          overflow-hidden
          border-b
          border-base-line
          py-24
          sm:py-32
          lg:py-40
        "
      >
        <Container>
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-7 flex items-center justify-center gap-3">
              <span
                aria-hidden="true"
                className="h-px w-8 bg-brass/60"
              />

              <span
                className="
                  font-mono
                  text-[10px]
                  tracking-[0.18em]
                  text-brass
                "
              >
                JITHR AI
              </span>

              <span
                aria-hidden="true"
                className="h-px w-8 bg-brass/60"
              />
            </div>

            <h2
              className="
                font-display
                text-4xl
                font-semibold
                leading-[1.15]
                tracking-tight
                text-ink
                sm:text-5xl
                lg:text-6xl
              "
            >
              كل منظومة تبدأ
              <br />
              <span className="text-ink-muted">
                بفهم الاحتياج.
              </span>
            </h2>

            <div
              aria-hidden="true"
              className="mx-auto mt-9 h-px w-16 bg-brass"
            />
          </div>
        </Container>
      </section>
    </>
  );
}

function ContactStep({
  number,
  title,
  description,
  last = false,
}: {
  number: string;
  title: string;
  description: string;
  last?: boolean;
}) {
  return (
    <div
      className={`
        flex
        items-center
        gap-4
        py-5
        ${last ? '' : 'border-b border-base-line'}
      `}
    >
      <span
        className="
          flex
          h-9
          w-9
          shrink-0
          items-center
          justify-center
          border
          border-base-line
          font-mono
          text-[10px]
          text-ink-faint
        "
      >
        {number}
      </span>

      <div className="min-w-0">
        <h3 className="text-sm font-medium text-ink">
          {title}
        </h3>

        <p className="mt-1 text-xs leading-6 text-ink-faint">
          {description}
        </p>
      </div>
    </div>
  );
}

