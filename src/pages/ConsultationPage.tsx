import { ContactForm } from "@/components/forms/ContactForm";
import { Container } from "@/components/ui/Container";
import { WhatsAppCTA } from "@/components/ui/WhatsAppCTA";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { motion } from "framer-motion";

export default function ConsultationPage() {
  const reducedMotion = useReducedMotion();

  return (
    <main className="relative overflow-hidden bg-base text-ink">
      {/* Ambient background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute right-[-12rem] top-[10rem] h-[30rem] w-[30rem] rounded-full bg-brass/[0.06] blur-[120px]" />
        <div className="absolute left-[-14rem] top-[42rem] h-[34rem] w-[34rem] rounded-full bg-brass/[0.035] blur-[140px]" />

        <div
          className="
            absolute
            inset-0
            opacity-[0.035]
            [background-image:linear-gradient(to_right,rgba(255,255,255,0.3)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.3)_1px,transparent_1px)]
            [background-size:64px_64px]
          "
        />
      </div>

      {/* Hero */}
      <section className="relative border-b border-base-line">
        <Container className="relative py-24 sm:py-32 lg:py-40">
          <div className="max-w-4xl" dir="rtl">
            <motion.div
              initial={reducedMotion ? false : { opacity: 0, y: 18 }}
              animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <div className="mb-8 flex items-center justify-end gap-3">
                <span className="h-px w-12 bg-brass/70" />
                <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-brass">
                  CONSULTATION
                </span>
              </div>

              <h1
                className="
                  font-display
                  text-4xl
                  leading-[1.15]
                  text-ink
                  sm:text-6xl
                  lg:text-7xl
                "
              >
                لنبدأ من احتياج منشأتك.
              </h1>

              <p
                className="
                  mt-8
                  max-w-3xl
                  text-base
                  leading-8
                  text-ink-muted
                  sm:text-lg
                "
              >
                شاركنا التحدي الذي تواجهه، وسنفهم عمليات منشأتك ونحدد أين يمكن
                للذكاء والأتمتة أن يصنعا فرقًا حقيقيًا.
              </p>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Consultation system */}
      <section className="relative py-20 sm:py-28 lg:py-32">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            {/* Information / process */}
            <motion.aside
              initial={reducedMotion ? false : { opacity: 0, x: -20 }}
              whileInView={
                reducedMotion
                  ? undefined
                  : {
                      opacity: 1,
                      x: 0,
                    }
              }
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="order-2 lg:order-1"
              dir="rtl"
            >
              <div className="border border-base-line bg-base-elevated/30">
                <div className="flex items-center justify-between border-b border-base-line px-6 py-5">
                  <span className="font-mono text-[9px] uppercase tracking-[0.24em] text-ink-faint">
                    JITHR AI
                  </span>

                  <span className="font-mono text-[9px] uppercase tracking-[0.24em] text-brass">
                    CONSULTATION
                  </span>
                </div>

                <div className="px-6 py-2">
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
              </div>

              <div className="mt-8">
                <WhatsAppCTA />
              </div>
            </motion.aside>

            {/* Form */}
            <motion.div
              initial={reducedMotion ? false : { opacity: 0, x: 20 }}
              whileInView={
                reducedMotion
                  ? undefined
                  : {
                      opacity: 1,
                      x: 0,
                    }
              }
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.7,
                delay: reducedMotion ? 0 : 0.08,
                ease: "easeOut",
              }}
              className="order-1 lg:order-2"
            >
              <div className="relative border border-base-line bg-base-elevated/50">
                {/* Top accent */}
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-px bg-gradient-to-l from-transparent via-brass/70 to-transparent"
                />

                <div
                  className="px-6 py-7 sm:px-8 sm:py-9"
                  dir="rtl"
                >
                  <div className="mb-8">
                    <div className="mb-3 flex items-center justify-end gap-3">
                      <span className="h-px w-8 bg-brass/50" />
                      <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-brass">
                        PROJECT BRIEF
                      </span>
                    </div>

                    <h2 className="font-display text-2xl text-ink sm:text-3xl">
                      أخبرنا عن احتياجك
                    </h2>

                    <p className="mt-3 max-w-xl text-sm leading-7 text-ink-muted">
                      كلما فهمنا احتياجك بشكل أوضح، استطعنا تحديد الحل والمسار
                      المناسب لمنشأتك.
                    </p>
                  </div>

                  <ContactForm />
                </div>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Closing statement */}
      <section className="relative border-t border-base-line py-24 sm:py-32">
        <Container>
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, y: 16 }}
            whileInView={
              reducedMotion
                ? undefined
                : {
                    opacity: 1,
                    y: 0,
                  }
            }
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative mx-auto max-w-4xl text-center"
            dir="rtl"
          >
            <span
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                left-1/2
                top-1/2
                -translate-x-1/2
                -translate-y-1/2
                font-mono
                text-[7rem]
                font-semibold
                leading-none
                text-brass/[0.035]
                sm:text-[11rem]
              "
            >
              01
            </span>

            <div className="relative">
              <span className="font-mono text-[9px] uppercase tracking-[0.28em] text-brass">
                JITHR AI
              </span>

              <h2 className="mt-5 font-display text-3xl leading-[1.2] text-ink sm:text-5xl">
                من الاحتياج تبدأ المنظومة.
              </h2>
            </div>
          </motion.div>
        </Container>
      </section>
    </main>
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
      className={`
        group
        flex
        items-center
        gap-4
        py-5
        ${last ? "" : "border-b border-base-line"}
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
          transition-colors
          duration-300
          group-hover:border-brass/60
          group-hover:text-brass
        "
      >
        {number}
      </span>

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
