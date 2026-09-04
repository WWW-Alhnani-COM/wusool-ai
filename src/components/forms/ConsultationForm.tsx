import { useState, type FormEvent, type ChangeEvent, type ReactNode } from "react";
import { sanitizeInput, isValidEmail, isValidPhone, HONEYPOT_FIELD } from "./formHelpers";

interface FormState {
  name: string;
  company: string;
  phone: string;
  email: string;
  activityType: string;
  serviceNeeded: string;
  description: string;
  [HONEYPOT_FIELD]?: string;
}

const initialState: FormState = {
  name: "",
  company: "",
  phone: "",
  email: "",
  activityType: "",
  serviceNeeded: "",
  description: "",
};

type Status = "idle" | "submitting" | "success" | "error";

export function ConsultationForm() {
  const [values, setValues] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<Status>("idle");

  const update =
    (field: keyof FormState) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValues((v) => ({ ...v, [field]: e.target.value }));
    };

  const validate = (): boolean => {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!sanitizeInput(values.name)) next.name = "الاسم مطلوب.";
    if (!sanitizeInput(values.company)) next.company = "اسم الشركة مطلوب.";
    if (!isValidPhone(values.phone)) next.phone = "رقم تواصل غير صحيح.";
    if (!isValidEmail(values.email)) next.email = "بريد إلكتروني غير صحيح.";
    if (!sanitizeInput(values.activityType)) next.activityType = "نوع النشاط مطلوب.";
    if (!sanitizeInput(values.description)) next.description = "صف احتياجك باختصار.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (values[HONEYPOT_FIELD]) {
      setStatus("success");
      return;
    }
    if (!validate()) return;

    setStatus("submitting");
    try {
      const endpoint = import.meta.env.VITE_CONTACT_FORM_ENDPOINT as string | undefined;
      if (!endpoint) {
        console.warn("VITE_CONTACT_FORM_ENDPOINT is not set.");
        setStatus("error");
        return;
      }
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          Object.fromEntries(
            Object.entries(values)
              .filter(([k]) => k !== HONEYPOT_FIELD)
              .map(([k, v]) => [k, sanitizeInput(String(v ?? ""))])
          )
        ),
      });
      if (!res.ok) throw new Error("submit_failed");
      setStatus("success");
      setValues(initialState);
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-brass/40 bg-brass/5 p-8 text-right" role="status">
        <p className="text-ink text-lg">استلمنا طلبك.</p>
        <p className="text-ink-muted mt-2">سنراجع احتياجك ونتواصل معك لتحديد الخطوة التالية.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5 text-right" dir="rtl">
      <input
        type="text"
        name={HONEYPOT_FIELD}
        value={values[HONEYPOT_FIELD] ?? ""}
        onChange={update(HONEYPOT_FIELD)}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute -left-[9999px] w-px h-px opacity-0"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="الاسم" error={errors.name}>
          <input value={values.name} onChange={update("name")} className={inputCls(!!errors.name)} autoComplete="name" />
        </Field>
        <Field label="الشركة" error={errors.company}>
          <input value={values.company} onChange={update("company")} className={inputCls(!!errors.company)} />
        </Field>
        <Field label="رقم التواصل" error={errors.phone}>
          <input
            type="tel"
            value={values.phone}
            onChange={update("phone")}
            className={inputCls(!!errors.phone)}
            autoComplete="tel"
          />
        </Field>
        <Field label="البريد الإلكتروني" error={errors.email}>
          <input
            type="email"
            value={values.email}
            onChange={update("email")}
            className={inputCls(!!errors.email)}
            autoComplete="email"
          />
        </Field>
        <Field label="نوع النشاط" error={errors.activityType}>
          <input value={values.activityType} onChange={update("activityType")} className={inputCls(!!errors.activityType)} />
        </Field>
        <Field label="الخدمة المطلوبة" error={errors.serviceNeeded}>
          <input value={values.serviceNeeded} onChange={update("serviceNeeded")} className={inputCls(false)} />
        </Field>
      </div>

      <Field label="وصف احتياجك" error={errors.description}>
        <textarea value={values.description} onChange={update("description")} rows={5} className={inputCls(!!errors.description)} />
      </Field>

      {status === "error" && (
        <p className="text-sm text-red-400" role="alert">
          تعذر إرسال الطلب الآن. حاول مرة أخرى أو تواصل معنا مباشرة عبر واتساب.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-2 inline-flex items-center justify-center rounded-full bg-brass text-base px-6 py-3 text-sm font-medium hover:bg-brass-bright transition-colors disabled:opacity-60"
      >
        {status === "submitting" ? "جارٍ الإرسال..." : "إرسال الطلب"}
      </button>
    </form>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: ReactNode }) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-sm text-ink-muted">{label}</span>
      {children}
      {error && (
        <span className="text-xs text-red-400" role="alert">
          {error}
        </span>
      )}
    </label>
  );
}

function inputCls(hasError: boolean) {
  return `w-full rounded-lg bg-base-raised border px-4 py-3 text-ink placeholder:text-ink-faint focus:outline-none focus-visible:ring-2 focus-visible:ring-brass ${
    hasError ? "border-red-400/60" : "border-base-line"
  }`;
}
