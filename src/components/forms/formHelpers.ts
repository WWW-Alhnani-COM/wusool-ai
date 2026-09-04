/**
 * Minimal, dependency-free validation + sanitization helpers shared by the
 * contact and consultation forms.
 */

export function sanitizeInput(value: string): string {
  // Strip control characters and collapse excessive whitespace; do NOT
  // strip characters that are valid in Arabic names/text.
  return value.replace(/[\u0000-\u001F\u007F]/g, "").trim();
}

export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

// Saudi/Gulf-friendly loose phone check: digits, spaces, +, - only, 8–15 digits.
export function isValidPhone(value: string): boolean {
  const digits = value.replace(/[^\d]/g, "");
  return digits.length >= 8 && digits.length <= 15 && /^[\d+\-\s]+$/.test(value);
}

// Simple honeypot field name — bots that autofill every field will fill
// this hidden one too; humans never see or touch it.
export const HONEYPOT_FIELD = "company_website";
