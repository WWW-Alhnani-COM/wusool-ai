'use client';

import { motion } from 'framer-motion';

import { ContactForm } from '@/components/forms/ContactForm';
import { Container } from '@/components/ui/Container';
import { WhatsAppCTA } from '@/components/ui/WhatsAppCTA';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const contactSteps = [
  {
    number: '01',
    title: 'نسمع احتياجك',
    description: 'نفهم التحدي والهدف الذي تريد الوصول إليه.',
  },
  {
    number: '02',
    title: 'نفهم عملياتك',
    description: 'ننظر إلى طريقة العمل والقنوات والأنظمة الموجودة لديك.',
  },
  {
    number: '03',
    title: 'نحدد الفرصة',
    description: 'نحدد أين يمكن للذكاء والأتمتة أن يصنعا أثرًا حقيقيًا.',
  },
];

const contactTopics = [
  'خدمة العملاء والتواصل',
  'الحجوزات والمواعيد',
  'المبيعات والعملاء المحتملون',
  'المتابعة الآلية',
  'ربط الأنظمة والقنوات',
  'تحليل البيانات والمحادثات',
];

export function ContactPage() {
  const reducedMotion = useReducedMotion();

  return (
    <main dir="rtl" className="bg-base">
      {/* =========================================================
          HERO
      ========================================================= */}
      <section
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
        {/* Ambient glow */}
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            left-1/2
            top-1/2
            h-[520px]
            w-[520px]
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            bg-brass/[0.045]
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
            opacity-[0.035]
            [background-image:linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)]
            [background-size:64px_64px]
          "
        />

        {/* Side technical lines */}
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            bottom-0
            right-[8%]
            top-0
            hidden
            w-px
            bg-gradient-to-b
            from-transparent
            via-base-line
            to-transparent
            lg:block
          "
        />

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            bottom-0
            left-[8%]
            top-0
            hidden
            w-px
            bg-gradient-to-b
            from-transparent
            via-base-line
            to-transparent
            lg:block
          "
        />

        <Container className="relative">
          <motion.div
            initial={
              reducedMotion
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 24 }
            }
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: reducedMotion ? 0 : 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              mx-auto
              max-w-4xl
              text-center
            "
          >
            {/* Eyebrow */}
            <div className="mb-7 flex items-center justify-center gap-3">
              <span
                aria-hidden="true"
                className="h-px w-10 bg-brass/60"
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
                className="h-px w-10 bg-brass/60"
              />
            </div>

            {/* Heading */}
            <h1
              className="
                font-display
                text-4xl
                font-semibold
                leading-[1.12]
                tracking-tight
                text-ink
                sm:text-5xl
                lg:text-6xl
                xl:text-7xl
              "
            >
              لنبني منظومة أذكى لمنشأتك.
            </h1>

            {/* Description */}
            <p
              className="
                mx-auto
                mt-7
                max-w-3xl
                font-display
                text-lg
                font-medium
                leading-8
                text-ink-muted
                sm:mt-8
                sm:text-xl
                sm:leading-9
                lg:text-2xl
              "
            >
              أخبرنا عن منشأتك واحتياجك، وسنبدأ بفهم العمليات التي يمكن
              للذكاء والأتمتة أن تجعلها أكثر كفاءة.
            </p>

            {/* Technical metadata */}
            <div
              className="
                mt-10
                flex
                flex-wrap
                items-center
                justify-center
                gap-x-6
                gap-y-3
                text-[10px]
                font-medium
                tracking-[0.12em]
                text-ink-faint
              "
            >
              <span>الضيافة</span>

              <span
                aria-hidden="true"
                className="h-1 w-1 rounded-full bg-brass/60"
              />

              <span>السياحة</span>

              <span
                aria-hidden="true"
                className="h-1 w-1 rounded-full bg-brass/60"
              />

              <span>الذكاء الاصطناعي</span>

              <span
                aria-hidden="true"
                className="h-1 w-1 rounded-full bg-brass/60"
              />

              <span>الأتمتة</span>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* =========================================================
          CONTACT SYSTEM
      ========================================================= */}
      <section
        className="
          relative
          overflow-hidden
          border-b
          border-base-line
          py-20
          sm:py-28
          lg:py-36
        "
      >
        {/* Background number */}
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            -left-10
            top-1/2
            -translate-y-1/2
            select-none
            font-mono
            text-[180px]
            font-bold
            leading-none
            text-ink/[0.025]
            sm:text-[240px]
            lg:text-[320px]
          "
        >
          01
        </div>

        <Container className="relative">
          <div
            className="
              grid
              grid-cols-1
              gap-14
              lg:grid-cols-[0.9fr_1.1fr]
              lg:gap-20
              xl:gap-28
            "
          >
            {/* =====================================================
                LEFT — PROJECT BRIEF
            ===================================================== */}
            <div className="flex flex-col">
              {/* Section label */}
              <div className="mb-8 flex items-center gap-4">
                <span
                  aria-hidden="true"
                  className="h-px w-12 bg-brass"
                />

                <span
                  className="
                    font-mono
                    text-[10px]
                    font-medium
                    tracking-[0.2em]
                    text-brass
                  "
                >
                  START HERE
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
                نفهم أولًا.
                <br />
                ثم نبني.
              </h2>

              <p
                className="
                  mt-6
                  max-w-xl
                  font-display
                  text-base
                  leading-8
                  text-ink-muted
                  sm:text-lg
                "
              >
                لا نبدأ من التقنية، بل من المشكلة. ندرس طريقة تشغيل
                منشأتك، ثم نحدد أين يمكن بناء أتمتة وذكاء يخدمان
                العمل فعلًا.
              </p>

              {/* Process steps */}
              <div className="mt-10 flex flex-col">
                {contactSteps.map((step, index) => (
                  <motion.div
                    key={step.number}
                    initial={
                      reducedMotion
                        ? { opacity: 1, x: 0 }
                        : { opacity: 0, x: 20 }
                    }
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{
                      once: true,
                      amount: 0.35,
                    }}
                    transition={{
                      duration: reducedMotion ? 0 : 0.5,
                      delay: reducedMotion
                        ? 0
                        : index * 0.08,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="
                      group
                      relative
                      border-t
                      border-base-line
                      py-6
                    "
                  >
                    {/* Active line */}
                    <span
                      aria-hidden="true"
                      className="
                        absolute
                        right-0
                        top-0
                        h-full
                        w-px
                        origin-top
                        scale-y-0
                        bg-brass
                        transition-transform
                        duration-500
                        group-hover:scale-y-100
                      "
                    />

                    <div className="flex gap-5 pr-5">
                      <span
                        className="
                          shrink-0
                          pt-1
                          font-mono
                          text-[10px]
                          tracking-[0.12em]
                          text-brass
                        "
                      >
                        {step.number}
                      </span>

                      <div>
                        <h3
                          className="
                            font-display
                            text-lg
                            font-semibold
                            text-ink
                            transition-colors
                            duration-300
                            group-hover:text-brass
                          "
                        >
                          {step.title}
                        </h3>

                        <p
                          className="
                            mt-2
                            max-w-md
                            text-sm
                            leading-7
                            text-ink-muted
                          "
                        >
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Topics */}
              <div className="mt-10">
                <div
                  className="
                    mb-5
                    font-mono
                    text-[10px]
                    font-medium
                    tracking-[0.16em]
                    text-ink-faint
                  "
                >
                  AREAS WE CAN AUTOMATE
                </div>

                <div className="flex flex-wrap gap-2">
                  {contactTopics.map((topic) => (
                    <span
                      key={topic}
                      className="
                        border
                        border-base-line
                        px-3
                        py-2
                        text-xs
                        text-ink-muted
                        transition-colors
                        duration-300
                        hover:border-brass/50
                        hover:text-ink
                      "
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>

              {/* WhatsApp */}
              <div className="mt-10 border-t border-base-line pt-8">
                <p
                  className="
                    mb-5
                    text-sm
                    leading-7
                    text-ink-muted
                  "
                >
                  تفضّل التواصل مباشرة؟
                </p>

                <WhatsAppCTA />
              </div>
            </div>

            {/* =====================================================
                RIGHT — FORM
            ===================================================== */}
            <div className="relative">
              {/* Form frame */}
              <div
                className="
                  relative
                  overflow-hidden
                  border
                  border-base-line
                  bg-base/80
                  backdrop-blur-sm
                "
              >
                {/* Top technical bar */}
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
                  "
                >
                  <div className="flex items-center gap-3">
                    <span
                      aria-hidden="true"
                      className="
                        h-1.5
                        w-1.5
                        rounded-full
                        bg-brass
                      "
                    />

                    <span
                      className="
                        font-mono
                        text-[10px]
                        font-medium
                        tracking-[0.18em]
                        text-ink-faint
                      "
                    >
                      PROJECT BRIEF
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
                    JITHR / 01
                  </span>
                </div>

                {/* Form intro */}
                <div
                  className="
                    border-b
                    border-base-line
                    px-6
                    py-8
                    sm:px-8
                    sm:py-10
                  "
                >
                  <div className="flex items-center gap-3">
                    <span
                      aria-hidden="true"
                      className="h-px w-8 bg-brass/60"
                    />

                    <span
                      className="
                        font-mono
                        text-[10px]
                        font-medium
                        tracking-[0.18em]
                        text-brass
                      "
                    >
                      GET IN TOUCH
                    </span>
                  </div>

                  <h2
                    className="
                      mt-5
                      font-display
                      text-2xl
                      font-semibold
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
                    شاركنا تفاصيل بسيطة عن منشأتك والتحدي الذي تريد
                    معالجته، وسنبدأ من هناك.
                  </p>
                </div>

                {/* Existing form */}
                <div className="p-6 sm:p-8 lg:p-10">
                  <ContactForm />
                </div>

                {/* Bottom technical indicator */}
                <div
                  className="
                    flex
                    items-center
                    justify-between
                    border-t
                    border-base-line
                    px-5
                    py-4
                    sm:px-7
                  "
                >
                  <span
                    className="
                      font-mono
                      text-[9px]
                      tracking-[0.12em]
                      text-ink-faint
                    "
                  >
                    SECURE CONTACT
                  </span>

                  <div className="flex items-center gap-2">
                    <span
                      aria-hidden="true"
                      className="h-1 w-1 rounded-full bg-brass"
                    />

                    <span
                      className="
                        font-mono
                        text-[9px]
                        tracking-[0.12em]
                        text-ink-faint
                      "
                    >
                      SAUDI ARABIA
                    </span>
                  </div>
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
        {/* Decorative axis */}
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            left-1/2
            top-0
            h-full
            w-px
            -translate-x-1/2
            bg-gradient-to-b
            from-base-line
            via-brass/20
            to-transparent
          "
        />

        <Container className="relative">
          <motion.div
            initial={
              reducedMotion
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 20 }
            }
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{
              once: true,
              amount: 0.4,
            }}
            transition={{
              duration: reducedMotion ? 0 : 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              mx-auto
              max-w-3xl
              text-center
            "
          >
            <div className="mb-7 flex items-center justify-center gap-3">
              <span
                aria-hidden="true"
                className="h-px w-10 bg-brass/50"
              />

              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 rounded-full bg-brass"
              />

              <span
                aria-hidden="true"
                className="h-px w-10 bg-brass/50"
              />
            </div>

            <h2
              className="
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
              كل منظومة تبدأ بفهم الاحتياج.
            </h2>

            <p
              className="
                mx-auto
                mt-6
                max-w-2xl
                text-base
                leading-8
                text-ink-muted
                sm:text-lg
              "
            >
              عندما نفهم كيف تعمل منشأتك، نستطيع أن نبني التقنية
              حولها، لا أن نطلب منها التكيف مع نظام جديد.
            </p>
          </motion.div>
        </Container>
      </section>
    </main>
  );
}
