/**
 * Reads the WhatsApp number from env at build time. Deliberately returns
 * `null` (never a fabricated number) when unset, so callers can render a
 * clear "coming soon" state instead of a dead/fake link.
 *
 * Set VITE_WHATSAPP_NUMBER in .env.local, in international format
 * without symbols, e.g. 9665XXXXXXXX.
 */
export function getWhatsAppLink(message?: string): string | null {
  const number = import.meta.env.VITE_WHATSAPP_NUMBER as string | undefined;
  if (!number) return null;
  const text = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${number}${text}`;
}
