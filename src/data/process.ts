import type { ProcessStep, SequenceFrame } from "@/types";

// Verbatim from brief section 13.
export const processSteps: ProcessStep[] = [
  { order: "01", title: "تواصل", description: "نتعرف على احتياجك." },
  { order: "02", title: "نفهم", description: "نحلل العمليات والمشاكل الحالية." },
  { order: "03", title: "نصمم", description: "نحدد الحل المناسب." },
  { order: "04", title: "نبني", description: "نطور النظام ونربطه بالأنظمة المطلوبة." },
  { order: "05", title: "نطلق", description: "نختبر النظام ونشغله فعليًا." },
  { order: "06", title: "نتابع", description: "نراقب الأداء ونطور الحل عند الحاجة." },
];

// Section 10 — the 8-frame story the scroll sequence tells.
// `src` points at placeholders; drop real files into
// src/assets/sequence/ using the SAME filenames to replace them —
// no component changes needed. See src/assets/sequence/README.md.
export const sequenceFrames: SequenceFrame[] = [
  {
    id: "frame-01",
    src: "/src/assets/sequence/frame-01.svg",
    alt: "عميل يبدأ التواصل مع الشركة",
    caption: "عميل يبدأ التواصل",
  },
  {
    id: "frame-02",
    src: "/src/assets/sequence/frame-02.svg",
    alt: "الطلب يدخل للنظام",
    caption: "الطلب يدخل للنظام",
  },
  {
    id: "frame-03",
    src: "/src/assets/sequence/frame-03.svg",
    alt: "النظام يفهم رسالة العميل",
    caption: "النظام يفهم الرسالة",
  },
  {
    id: "frame-04",
    src: "/src/assets/sequence/frame-04.svg",
    alt: "يتم تحليل المعلومات",
    caption: "تحليل المعلومات",
  },
  {
    id: "frame-05",
    src: "/src/assets/sequence/frame-05.svg",
    alt: "يتم اتخاذ الإجراء المناسب",
    caption: "اتخاذ الإجراء",
  },
  {
    id: "frame-06",
    src: "/src/assets/sequence/frame-06.svg",
    alt: "يتم تحديث النظام",
    caption: "تحديث النظام",
  },
  {
    id: "frame-07",
    src: "/src/assets/sequence/frame-07.svg",
    alt: "تتم متابعة العميل تلقائيًا",
    caption: "متابعة تلقائية",
  },
  {
    id: "frame-08",
    src: "/src/assets/sequence/frame-08.svg",
    alt: "العميل يصل للنتيجة",
    caption: "الوصول للنتيجة",
  },
];
