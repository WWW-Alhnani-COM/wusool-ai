'use client';

import { motion } from 'framer-motion';

import { ContactForm } from '@/components/forms/ContactForm';
import { WhatsAppCTA } from '@/components/ui/WhatsAppCTA';
import { Container } from '@/components/ui/Container';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export default function ConsultationPage() {
const reducedMotion = useReducedMotion();

return ( <main dir="rtl" className="bg-base">
{/* =========================================================
HERO
========================================================= */} <section
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
       lg:pb-36
     "
   >
{/* Ambient light */} <div
       aria-hidden="true"
       className="
         pointer-events-none
         absolute
         left-1/2
         top-1/2
         h-[600px]
         w-[600px]
         -translate-x-1/2
         -translate-y-1/2
         rounded-full
         bg-brass/[0.045]
         blur-[160px]
       "
     />

```
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
            CONSULTATION / JITHR AI
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
              : { opacity: 0, y: 22 }
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
          لنبدأ من احتياج
          <br />
          <span className="text-ink-muted">منشأتك.</span>
        </motion.h1>

        <motion.p
          initial={
            reducedMotion
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: 18 }
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
          شاركنا التحدي الذي تواجهه، وسنفهم عمليات منشأتك
          ونحدد أين يمكن للذكاء والأتمتة أن يصنعا فرقًا حقيقيًا.
        </motion.p>
      </div>
    </Container>
  </section>

  {/* =========================================================
      CONSULTATION SYSTEM
  ========================================================= */}
  <section
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
        {/* System header */}
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
              JITHR AI / CONSULTATION
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
              LEFT SIDE
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
            {/* Grid */}
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
                h-[380px]
                w-[380px]
                -translate-x-1/2
                -translate-y-1/2
                rounded-full
                bg-brass/[0.035]
                blur-[130px]
              "
            />

            {/* Background number */}
            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                -left-3
                top-0
                font-mono
                text-[220px]
                font-semibold
                leading-none
                tracking-[-0.08em]
                text-ink/[0.035]
                sm:text-[280px]
              "
            >
              01
            </div>

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
                  ابدأ هنا
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
                كل مشروع يبدأ
                <br />
                <span className="text-ink-muted">
                  بفهم واضح.
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
                لا نبدأ ببناء نظام قبل أن نفهم المشكلة.
                نبدأ من عمليات منشأتك، ثم نحدد أين يمكن
                للأتمتة والذكاء الاصطناعي أن يقدما قيمة فعلية.
              </p>

              {/* Steps */}
              <div className="mt-12 border-t border-base-line">
                <ConsultationStep
                  number="01"
                  title="شارك احتياجك"
                  description="أخبرنا بما تريد تحسينه أو أتمتته."
                />

                <ConsultationStep
                  number="02"
                  title="نفهم عملياتك"
                  description="نحدد التحديات والأنظمة والقنوات الحالية."
                />

                <ConsultationStep
                  number="03"
                  title="نحدد الاتجاه"
                  description="نقترح المسار المناسب لمنشأتك."
                  last
                />
              </div>

              <div className="mt-10">
                <WhatsAppCTA />
              </div>
            </div>
          </div>

          {/* =================================================
              RIGHT SIDE — FORM
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
                  START A CONVERSATION
                </span>

                <h2
                  className="
                    mt-4
                    font-display
                    text-2xl
                    font-semibold
                    tracking-tight
                    text-ink
                    sm:text-3xl
                  "
                >
                  طلب استشارة
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
                  اترك بيانات التواصل ووصفًا مختصرًا لاحتياجك،
                  وسنبدأ من هناك.
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
      CLOSING
  ========================================================= */}
  <section
    className="
      relative
      overflow-hidden
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
          من الاحتياج
          <br />
          <span className="text-ink-muted">
            تبدأ المنظومة.
          </span>
        </h2>

        <div
          aria-hidden="true"
          className="mx-auto mt-9 h-px w-16 bg-brass"
        />
      </div>
    </Container>
  </section>
</main>
```

);
}

function ConsultationStep({
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
className={`         group
        flex
        items-center
        gap-4
        py-5
        ${last ? '' : 'border-b border-base-line'}
      `}
> <span
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
       transition-colors
       duration-300
       group-hover:border-brass/60
       group-hover:text-brass
     "
   >
{number} </span>

```
  <div className="min-w-0">
    <h3
      className="
        text-sm
        font-medium
        text-ink
        transition-colors
        duration-300
        group-hover:text-brass
      "
    >
      {title}
    </h3>

    <p
      className="
        mt-1
        text-xs
        leading-6
        text-ink-faint
      "
    >
      {description}
    </p>
  </div>
</div>
);
}
