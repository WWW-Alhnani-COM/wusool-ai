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
                  border-ink/10
                  bg-white/90
                  shadow-[0_18px_60px_rgba(23,23,23,0.08)]
                  backdrop-blur-2xl
                `
                : `
                  border-ink/10
                  bg-white/70
                  shadow-[0_10px_40px_rgba(23,23,23,0.04)]
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
              shrink-0
              text-ink
              transition-opacity
              duration-300
              hover:opacity-80
            "
            aria-label="جِذع AI"
          >
            <span
              className="
                font-display
                text-xl
                font-bold
                tracking-tight
                sm:text-2xl
              "
            >
              جِذع
            </span>

            <span
              className="
                ml-1
                font-english
                text-sm
                font-semibold
                tracking-[0.08em]
                text-brass
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
              border-ink/10
              bg-ink/[0.03]
              p-2.5
              text-ink
              transition
              hover:bg-ink/[0.06]
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
              border-ink/10
              bg-white/95
              p-3
              shadow-[0_18px_60px_rgba(23,23,23,0.10)]
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
                          ? "bg-ink/[0.04] text-brass"
                          : "text-ink/75 hover:bg-ink/[0.03] hover:text-ink"
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
                border-ink/10
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
