import { Link } from "react-router-dom";
import { siteNav } from "@/data/content";
import { services } from "@/data/services";
import { sectors } from "@/data/sectors";

export function Footer() {
  return (
    <footer className="border-t border-base-line mt-32">
      <div className="container-page section-px py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <div className="flex flex-col gap-4 lg:col-span-1">
          <span className="font-display text-lg text-ink">
            وصول <span className="text-brass">AI</span>
          </span>
          <p className="text-ink-muted text-sm leading-relaxed max-w-xs">
            شركة تقنية سعودية تبني حلول ذكاء اصطناعي وأتمتة أعمال مخصصة للشركات.
          </p>
        </div>

        <FooterCol title="الموقع" links={siteNav.map((n) => ({ label: n.label, to: n.to }))} />

        <FooterCol
          title="الخدمات"
          links={services.slice(0, 6).map((s) => ({ label: s.title, to: `/الحلول#${s.slug}` }))}
        />

        <FooterCol
          title="القطاعات"
          links={sectors.slice(0, 6).map((s) => ({ label: s.title, to: `/القطاعات#${s.slug}` }))}
        />
      </div>

      <div className="border-t border-base-line">
        <div className="container-page section-px py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-ink-faint">
          <span>© {new Date().getFullYear()} وصول AI. جميع الحقوق محفوظة.</span>
          <div className="flex items-center gap-6">
            <Link to="/سياسة-الخصوصية" className="hover:text-ink-muted">
              سياسة الخصوصية
            </Link>
            <Link to="/الشروط-والأحكام" className="hover:text-ink-muted">
              الشروط والأحكام
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { label: string; to: string }[] }) {
  return (
    <div className="flex flex-col gap-4">
      <span className="text-sm text-ink">{title}</span>
      <ul className="flex flex-col gap-2.5">
        {links.map((l) => (
          <li key={l.label}>
            <Link to={l.to} className="text-sm text-ink-muted hover:text-brass transition-colors">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
