import type { ProcessStep, SequenceFrame } from "@/types";

// ============================================================
// PROCESS STEPS
// ============================================================

export const processSteps: ProcessStep[] = [
  {
    order: "01",
    title: "تواصل",
    description: "نتعرف على احتياجك.",
  },
  {
    order: "02",
    title: "نفهم",
    description: "نحلل العمليات والمشاكل الحالية.",
  },
  {
    order: "03",
    title: "نصمم",
    description: "نحدد الحل المناسب.",
  },
  {
    order: "04",
    title: "نبني",
    description: "نطور النظام ونربطه بالأنظمة المطلوبة.",
  },
  {
    order: "05",
    title: "نطلق",
    description: "نختبر النظام ونشغله فعليًا.",
  },
  {
    order: "06",
    title: "نتابع",
    description: "نراقب الأداء ونطور الحل عند الحاجة.",
  },
];

// ============================================================
// 50-FRAME HERO SEQUENCE
// ============================================================
//
// الصور:
//
// src/assets/sequence/
// ├── ezgif-frame-001.jpg
// ├── ezgif-frame-002.jpg
// ├── ...
// └── ezgif-frame-050.jpg
//
// import.meta.glob يجعل Vite يتعامل مع الصور كـ assets
// حقيقية أثناء التطوير والـ production build.
// ============================================================

const frameAssets = import.meta.glob(
  "/src/assets/sequence/ezgif-frame-*.jpg",
  {
    eager: true,
    query: "?url",
    import: "default",
  },
) as Record<string, string>;

// ============================================================
// BUILD 50 FRAMES
// ============================================================

export const sequenceFrames: SequenceFrame[] = Array.from(
  { length: 50 },
  (_, index) => {
    const number = String(index + 1).padStart(3, "0");

    const filePath = `/src/assets/sequence/ezgif-frame-${number}.jpg`;

    const imageUrl = frameAssets[filePath];

    if (!imageUrl) {
      throw new Error(
        `[Wusool AI] Sequence frame not found: ezgif-frame-${number}.jpg`,
      );
    }

    return {
      id: `frame-${number}`,
      src: imageUrl,
      alt: `مشهد ${index + 1} من رحلة الوصول`,
      caption:
        index === 49
          ? "الوصول"
          : `المشهد ${index + 1}`,
    };
  },
);
