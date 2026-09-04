import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { siteNav } from "@/data/content";
import { Button } from "@/components/ui/Button";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on route change via a simple click-away on links.
  const closeMenu = () => setOpen(false);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-base/90 backdrop-blur border-b border-base-line" : "bg-transparent"
      }`}
    >
      <div className="container-page section-px flex items-center justify-between h-16 sm:h-20">
        <NavLink to="/" className="font-display text-lg sm:text-xl text-ink" onClick={closeMenu}>
          وصول <span className="text-brass">AI</span>
        </NavLink>

        <nav className="hidden lg:flex items-center gap-8">
          {siteNav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) =>
                `text-sm transition-colors ${isActive ? "text-brass" : "text-ink-muted hover:text-ink"}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Button to="/طلب-استشارة" className="!py-2.5 !px-5">
            ابدأ الآن
          </Button>
        </div>

        <button
          type="button"
          className="lg:hidden text-ink p-2 -m-2"
          aria-label={open ? "إغلاق القائمة" : "فتح القائمة"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">{open ? "إغلاق القائمة" : "فتح القائمة"}</span>
          <div className="w-6 flex flex-col gap-1.5">
            <span
              className={`h-px bg-current transition-transform duration-300 ${open ? "translate-y-2 rotate-45" : ""}`}
            />
            <span className={`h-px bg-current transition-opacity duration-300 ${open ? "opacity-0" : ""}`} />
            <span
              className={`h-px bg-current transition-transform duration-300 ${open ? "-translate-y-2 -rotate-45" : ""}`}
            />
          </div>
        </button>
      </div>

      {open && (
        <nav className="lg:hidden border-t border-base-line bg-base">
          <div className="container-page section-px py-6 flex flex-col gap-1">
            {siteNav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                onClick={closeMenu}
                className={({ isActive }) =>
                  `py-3 text-base border-b border-base-line last:border-0 ${
                    isActive ? "text-brass" : "text-ink"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <Button to="/طلب-استشارة" className="mt-4 w-full" onClick={closeMenu}>
              ابدأ الآن
            </Button>
          </div>
        </nav>
      )}
    </header>
  );
}
