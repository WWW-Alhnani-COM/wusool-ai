
import { Link } from "react-router-dom";

import { siteNav } from "@/data/content";
import { services } from "@/data/services";

export function Footer() {
  const footerServices = services.slice(0, 6);

  return (
    <footer
      dir="rtl"
      className="
        relative
        mt-24
        overflow-hidden
        border-t
        border-base-line
        bg-base
        sm:mt-32
      "
    >
      {/* Ambient atmosphere */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          bottom-0
          left-1/2
          h-[420px]
          w-[420px]
          -translate-x-1/2
          translate-y-1/2
          rounded-full
          bg-brass/[0.025]
          blur-[120px]
        "
      />

      <div className="relative">
        {/* Main footer */}
        <div
          className="
            mx-auto
            w-full
            max-w-7xl
            px-5
            py-16
            sm:px-8
            sm:py-20
            lg:px-10
            lg:py-24
          "
        >
          <div
            className="
              grid
              grid-cols-1
              gap-14
              lg:grid-cols-[1.5fr_1fr_1fr]
              lg:gap-16
          "
          >
            {/* Brand */}
            <div className="max-w-md">
              <Link
                to="/"
                className="
                  inline-flex
                  items-baseline
                  font-display
                  text-2xl
                  font-semibold
                  tracking-tight
                  text-ink
                  transition-colors
                  duration-300
                  hover:text-brass
                "
              >
                جِذع
                <span className="mr-1 text-brass">AI</span>
              </Link>

              <p
                className="
                  mt-6
                  max-w-md
                  text-sm
                  leading-8
                  text-ink-muted
                  sm:text-base
                  sm:leading-8
                "
              >
                نبني حلول أتمتة وذكاء اصطناعي لقطاع الضيافة والسياحة،
                تربط التواصل والأنظمة والبيانات والعمليات في منظومة واحدة.
              </p>

              {/* Brand line */}
              <div className="mt-8 flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="h-px w-10 bg-brass"
                />

                <span
                  className="
                    font-mono
                    text-[10px]
                    tracking-[0.18em]
                    text-ink-faint
                  "
                >
                  JITHR AI
                </span>
              </div>
            </div>

            {/* Navigation */}
            <FooterColumn title="الموقع">
              {siteNav.map((item) => (
                <FooterLink
                  key={item.label}
                  to={item.to}
                >
                  {item.label}
                </FooterLink>
              ))}
            </FooterColumn>

            {/* Services */}
            <FooterColumn title="الحلول">
              {footerServices.map((service) => (
                <FooterLink
                  key={service.slug}
                  to={`/الحلول#${service.slug}`}
                >
                  {service.title}
                </FooterLink>
              ))}
            </FooterColumn>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-base-line">
          <div
            className="
              mx-auto
              flex
              w-full
              max-w-7xl
              flex-col
              gap-5
              px-5
              py-6
              sm:px-8
              lg:flex-row
              lg:items-center
              lg:justify-between
              lg:px-10
            "
          >
            {/* Copyright */}
            <p
              className="
                text-center
                text-xs
                text-ink-faint
                lg:text-right
              "
            >
              © {new Date().getFullYear()} جِذع AI. جميع الحقوق محفوظة.
            </p>

            {/* Legal */}
            <div
              className="
                flex
                items-center
                justify-center
                gap-6
              "
            >
              <Link
                to="/سياسة-الخصوصية"
                className="
                  text-xs
                  text-ink-faint
                  transition-colors
                  duration-300
                  hover:text-brass
                "
              >
                سياسة الخصوصية
              </Link>

              <span
                aria-hidden="true"
                className="h-3 w-px bg-base-line"
              />

              <Link
                to="/الشروط-والأحكام"
                className="
                  text-xs
                  text-ink-faint
                  transition-colors
                  duration-300
                  hover:text-brass
                "
              >
                الشروط والأحكام
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2
        className="
          mb-6
          text-sm
          font-semibold
          text-ink
        "
      >
        {title}
      </h2>

      <ul className="flex flex-col gap-3">
        {children}
      </ul>
    </div>
  );
}

function FooterLink({
  to,
  children,
}: {
  to: string;
  children: React.ReactNode;
}) {
  return (
    <li>
      <Link
        to={to}
        className="
          group
          inline-flex
          items-center
          gap-2
          text-sm
          text-ink-muted
          transition-colors
          duration-300
          hover:text-ink
        "
      >
        <span
          aria-hidden="true"
          className="
            h-px
            w-0
            bg-brass
            transition-all
            duration-300
            group-hover:w-4
          "
        />

        <span>{children}</span>
      </Link>
    </li>
  );
}


