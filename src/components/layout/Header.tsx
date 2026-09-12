import {
  useEffect,
  useState,
} from "react";

import {
  NavLink,
  useLocation,
} from "react-router-dom";

import { siteNav } from "@/data/content";
import { Button } from "@/components/ui/Button";

export function Header() {
  const [open, setOpen] =
    useState(false);

  const [scrolled, setScrolled] =
    useState(false);

  const location =
    useLocation();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(
        window.scrollY > 24,
      );
    };

    onScroll();

    window.addEventListener(
      "scroll",
      onScroll,
      {
        passive: true,
      },
    );

    return () =>
      window.removeEventListener(
        "scroll",
        onScroll,
      );
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const closeMenu = () =>
    setOpen(false);

  return (
    <header
      className="
        fixed
        inset-x-0
        top-0
        z-[100]
        pointer-events-none
      "
    >
      <div
        className="
          container-page
          section-px
          pointer-events-auto
          pt-3
          sm:pt-5
          transition-all
          duration-500
        "
      >
        <div
          className={`
            relative
            flex
            items-center
            justify-between
            rounded-[20px]
            border
            px-4
            sm:px-6
            transition-all
            duration-500

            ${
              scrolled
                ? `
                  border-white/10
                  bg-black/75
                  shadow-[0_18px_60px_rgba(0,0,0,0.35)]
                  backdrop-blur-2xl
                `
                : `
                  border-white/10
                  bg-black/45
                  shadow-[0_10px_40px_rgba(0,0,0,0.25)]
                  backdrop-blur-xl
                `
            }
          `}
          style={{
            minHeight:
              "4.25rem",
          }}
        >
          {/* ==================================================
              BRAND
              ================================================== */}

         <NavLink
  to="/"
  onClick={closeMenu}
  className="
    flex
    shrink-0
    items-center
    gap-2.5
    text-ink
    transition-opacity
    duration-300
    hover:opacity-80
  "
  aria-label="جِذع AI"
>
  <img
    src="/favicon.svg"
    alt="جِذع AI"
    aria-hidden="true"
    className="
      h-8
      w-8
      shrink-0
      rounded-lg
      object-contain
      sm:h-9
      sm:w-9
    "
  />

  <span className="font-display text-xl font-bold tracking-tight sm:text-2xl">
    جِذع
  </span>

 <span
  className="
    -ml-1.5
    font-english
    text-sm
    font-semibold
    tracking-[0.08em]
    text-[#C89B5C]
    sm:text-base
  "
  dir="ltr"
>
    AI
  </span>
</NavLink>
          {/* ==================================================
              DESKTOP NAV
              ================================================== */}

          <nav
            className="
              hidden
              lg:flex
              items-center
              gap-7
              xl:gap-9
            "
            aria-label="التنقل الرئيسي"
          >
            {siteNav.map(
              (item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={
                    item.to === "/"
                  }
                  className={({ isActive }) =>
                    `
                      relative
                      py-2
                      text-sm
                      font-medium
                      transition-colors
                      duration-300
                      ${
                        isActive
                          ? "text-brass"
                          : "text-ink/65 hover:text-ink"
                      }
                    `
                  }
                >
                  {item.label}

                  <span
                    className="
                      absolute
                      inset-x-0
                      -bottom-0.5
                      mx-auto
                      h-px
                      w-0
                      bg-brass
                      transition-all
                      duration-300
                      group-hover:w-full
                    "
                  />
                </NavLink>
              ),
            )}
          </nav>

          {/* ==================================================
              DESKTOP CTA
              ================================================== */}

          <div
            className="
              hidden
              lg:block
            "
          >
            <Button
              to="/طلب-استشارة"
              className="
                !rounded-xl
                !px-5
                !py-2.5
                shadow-[0_8px_25px_rgba(200,155,92,0.12)]
              "
            >
              ابدأ الآن
            </Button>
          </div>

          {/* ==================================================
              MOBILE BUTTON
              ================================================== */}

          <button
            type="button"
            className="
              lg:hidden
              rounded-xl
              border
              border-white/10
              bg-white/[0.04]
              p-2.5
              text-ink
              transition
              hover:bg-white/[0.07]
            "
            aria-label={
              open
                ? "إغلاق القائمة"
                : "فتح القائمة"
            }
            aria-expanded={open}
            onClick={() =>
              setOpen(
                (value) =>
                  !value,
              )
            }
          >
            <span className="sr-only">
              {open
                ? "إغلاق القائمة"
                : "فتح القائمة"}
            </span>

            <div
              className="
                flex
                w-5
                flex-col
                gap-1.5
              "
            >
              <span
                className={`
                  h-px
                  w-full
                  bg-current
                  transition-transform
                  duration-300
                  ${
                    open
                      ? "translate-y-2 rotate-45"
                      : ""
                  }
                `}
              />

              <span
                className={`
                  h-px
                  w-full
                  bg-current
                  transition-opacity
                  duration-300
                  ${
                    open
                      ? "opacity-0"
                      : ""
                  }
                `}
              />

              <span
                className={`
                  h-px
                  w-full
                  bg-current
                  transition-transform
                  duration-300
                  ${
                    open
                      ? "-translate-y-2 -rotate-45"
                      : ""
                  }
                `}
              />
            </div>
          </button>
        </div>

        {/* ====================================================
            MOBILE MENU
            ==================================================== */}

        <div
          className={`
            overflow-hidden
            transition-all
            duration-500
            ${
              open
                ? "mt-2 max-h-[520px] opacity-100"
                : "pointer-events-none max-h-0 opacity-0"
            }
          `}
        >
          <nav
            className="
              rounded-[20px]
              border
              border-white/10
              bg-black/90
              p-3
              shadow-[0_18px_60px_rgba(0,0,0,0.45)]
              backdrop-blur-2xl
            "
            aria-label="القائمة"
          >
            {siteNav.map(
              (item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={
                    item.to === "/"
                  }
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    `
                      block
                      rounded-xl
                      px-4
                      py-3.5
                      text-sm
                      font-medium
                      transition-colors
                      duration-300
                      ${
                        isActive
                          ? "bg-white/[0.06] text-brass"
                          : "text-ink/75 hover:bg-white/[0.04] hover:text-ink"
                      }
                    `
                  }
                >
                  {item.label}
                </NavLink>
              ),
            )}

            <div
              className="
                mt-2
                border-t
                border-white/10
                pt-3
              "
            >
              <Button
                to="/طلب-استشارة"
                className="
                  w-full
                  !rounded-xl
                "
                onClick={closeMenu}
              >
                ابدأ الآن
              </Button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
