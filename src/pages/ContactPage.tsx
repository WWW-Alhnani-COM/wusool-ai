'use client';

import { motion } from 'framer-motion';

import { ContactForm } from '@/components/forms/ContactForm';
import { Container } from '@/components/ui/Container';
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

const whatsappLink =
  'https://wa.me/966552173887?text=%D9%85%D8%B1%D8%AD%D8%A8%D9%8B%D8%A7%D8%8C%20%D8%A3%D8%A8%D8%BA%D9%89%20%D8%A3%D8%B3%D8%AA%D9%81%D8%B3%D8%B1%20%D8%B9%D9%86%20%D8%AD%D9%84%D9%88%D9%84%20%D8%AC%D8%B0%D8%B9%20AI.';

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

        {/* Secondary glow */}
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            right-[12%]
            top-[18%]
            h-32
            w-32
            rounded-full
            bg-brass/[0.025]
            blur-[80px]
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

        {/* Background vertical accent */}
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
                        transition-all
                        duration-300
                        hover:border-brass/50
                        hover:bg-brass/[0.025]
                        hover:text-ink
                      "
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>

              {/* ===================================================
                  WHATSAPP DIRECT CONTACT
              =================================================== */}
              <div className="mt-10 border-t border-base-line pt-8">
                <div className="mb-5">
                  <div
                    className="
                      flex
                      items-center
                      gap-3
                      font-mono
                      text-[9px]
                      font-medium
                      tracking-[0.18em]
                      text-brass
                    "
                  >
                    <span
                      aria-hidden="true"
                      className="h-px w-6 bg-brass/60"
                    />

                    <span>DIRECT CONTACT</span>
                  </div>

                  <p
                    className="
                      mt-3
                      text-sm
                      leading-7
                      text-ink-muted
                    "
                  >
                    تفضّل التواصل مباشرة؟
                  </p>
                </div>

                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="تواصل معنا عبر واتساب"
                  className="
                    group
                    relative
                    block
                    w-full
                    overflow-hidden
                    border
                    border-base-line
                    bg-white/[0.015]
                    transition-all
                    duration-500
                    hover:border-brass/50
                    hover:bg-white/[0.03]
                  "
                >
                  {/* Ambient glow */}
                  <span
                    aria-hidden="true"
                    className="
                      pointer-events-none
                      absolute
                      -right-16
                      -top-16
                      h-40
                      w-40
                      rounded-full
                      bg-brass/[0.055]
                      opacity-0
                      blur-3xl
                      transition-opacity
                      duration-500
                      group-hover:opacity-100
                    "
                  />

                  {/* Top animated line */}
                  <span
                    aria-hidden="true"
                    className="
                      absolute
                      right-0
                      top-0
                      h-px
                      w-0
                      bg-brass
                      transition-all
                      duration-700
                      group-hover:w-full
                    "
                  />

                  <div
                    className="
                      relative
                      flex
                      items-center
                      gap-4
                      p-5
                      sm:gap-5
                      sm:p-6
                    "
                  >
                    {/* WhatsApp icon */}
                    <span
                      className="
                        relative
                        flex
                        h-12
                        w-12
                        shrink-0
                        items-center
                        justify-center
                        border
                        border-base-line
                        bg-base-raised
                        text-brass
                        transition-all
                        duration-500
                        group-hover:border-brass/50
                        group-hover:bg-brass/[0.07]
                      "
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        className="
                          h-6
                          w-6
                          transition-transform
                          duration-500
                          group-hover:scale-110
                        "
                        aria-hidden="true"
                      >
                        <path
                          d="M20.52 3.48A11.87 11.87 0 0 0 12.08 0C5.52 0 .18 5.34.18 11.9c0 2.1.55 4.15 1.59 5.96L.08 24l6.28-1.65a11.9 11.9 0 0 0 5.72 1.46h.01c6.56 0 11.9-5.34 11.9-11.9 0-3.18-1.24-6.17-3.47-8.43Z"
                          fill="currentColor"
                          opacity="0.16"
                        />

                        <path
                          d="M7.1 5.7c.24-.54.5-.55.91-.56h.31c.29 0 .61.1.74.46l.94 2.28c.08.2.08.4-.02.58l-.6 1.02c-.12.2-.13.36-.03.53.37.64.98 1.42 1.71 2.04.89.75 1.65.98 2 .1.09.24.08.38-.09l.78-.91c.16-.19.35-.22.58-.12l2.15 1.02c.27.13.44.19.5.31.07.13.07.71-.17 1.36-.23.65-1.34 1.24-1.85 1.31-.47.07-1.04.1-1.68-.1-.39-.12-.89-.29-1.52-.57-2.67-1.14-4.41-3.82-4.55-4-.14-.19-1.08-1.44-1.08-2.74 0-1.3.68-1.95.92-2.31Z"
                          fill="currentColor"
                        />
                      </svg>

                      {/* Online indicator */}
                      <span
                        aria-hidden="true"
                        className="
                          absolute
                          -right-1
                          -top-1
                          h-2.5
                          w-2.5
                          rounded-full
                          bg-brass
                          ring-2
                          ring-base
                        "
                      />
                    </span>

                    {/* Text */}
                    <span className="min-w-0 flex-1">
                      <span
                        className="
                          block
                          font-mono
                          text-[9px]
                          font-medium
                          tracking-[0.17em]
                          text-brass
                        "
                      >
                        WHATSAPP
                      </span>

                      <span
                        className="
                          mt-1.5
                          block
                          font-display
                          text-base
                          font-semibold
                          text-ink
                          transition-colors
                          duration-300
                          group-hover:text-brass
                          sm:text-lg
                        "
                      >
                        تواصل معنا عبر واتساب
                      </span>

                      <span
                        className="
                          mt-1
                          block
                          text-xs
                          leading-6
                          text-ink-faint
                        "
                      >
                        تحدث معنا مباشرة حول منشأتك واحتياجك.
                      </span>
                    </span>

                    {/* Arrow */}
                    <span
                      aria-hidden="true"
                      className="
                        flex
                        h-9
                        w-9
                        shrink-0
                        items-center
                        justify-center
                        border
                        border-base-line
                        text-ink-faint
                        transition-all
                        duration-500
                        group-hover:-translate-x-1
                        group-hover:border-brass/40
                        group-hover:text-brass
                      "
                      dir="ltr"
                    >
                      <svg
                        viewBox="0 0 20 20"
                        fill="none"
                        className="h-4 w-4"
                      >
                        <path
                          d="M4 10h11M11 6l4 4-4 4"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </div>

                  {/* Bottom metadata */}
                  <div
                    className="
                      relative
                      flex
                      items-center
                      justify-between
                      border-t
                      border-base-line
                      px-5
                      py-3
                      sm:px-6
                    "
                  >
                    <span
                      className="
                        font-mono
                        text-[8px]
                        tracking-[0.12em]
                        text-ink-faint
                        sm:text-[9px]
                      "
                    >
                      JITHR AI / DIRECT
                    </span>

                    <span
                      className="
                        flex
                        items-center
                        gap-2
                        font-mono
                        text-[8px]
                        tracking-[0.12em]
                        text-ink-faint
                        sm:text-[9px]
                      "
                    >
                      <span
                        aria-hidden="true"
                        className="
                          h-1.5
                          w-1.5
                          rounded-full
                          bg-brass
                        "
                      />

                      ONLINE
                    </span>
                  </div>
                </a>
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

        {/* Decorative horizontal line */}
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            left-1/2
            top-0
            h-px
            w-24
            -translate-x-1/2
            bg-brass/30
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
