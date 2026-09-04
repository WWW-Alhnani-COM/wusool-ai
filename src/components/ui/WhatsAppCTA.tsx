import { getWhatsAppLink } from "@/lib/whatsapp";

export function WhatsAppCTA() {
  const link = getWhatsAppLink("مرحبًا، أبغى أستفسر عن حلول وصول AI.");

  if (!link) {
    return (
      <div className="rounded-xl border border-base-line p-5 text-sm text-ink-faint">
        رقم واتساب الشركة غير مضاف بعد. أضفه في متغير البيئة
        <code className="mx-1 text-ink-muted">VITE_WHATSAPP_NUMBER</code>
        ليظهر زر التواصل هنا.
      </div>
    );
  }

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-3 rounded-xl border border-base-line hover:border-brass/60 transition-colors p-5 text-ink group w-fit"
    >
      <span className="h-2 w-2 rounded-full bg-brass group-hover:bg-brass-bright transition-colors" />
      <span>تواصل معنا عبر واتساب</span>
    </a>
  );
}
