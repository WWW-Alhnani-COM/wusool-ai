import type { ProcessStep, SequenceFrame } from "@/types";

// Verbatim from brief section 13.
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

/**
 * 50-frame Hero scroll sequence
 *
 * The Hero uses these 50 JPG frames as one continuous
 * cinematic scroll-driven sequence.
 *
 * Assets:
 * /src/assets/sequence/ezgif-frame-001.jpg
 * /src/assets/sequence/ezgif-frame-002.jpg
 * /src/assets/sequence/ezgif-frame-003.jpg
 * ...
 * /src/assets/sequence/ezgif-frame-050.jpg
 */
export const sequenceFrames: SequenceFrame[] = [
  {
    id: "frame-001",
    src: "/src/assets/sequence/ezgif-frame-001.jpg",
    alt: "مشهد 1 من رحلة الوصول",
    caption: "المشهد 1",
  },
  {
    id: "frame-002",
    src: "/src/assets/sequence/ezgif-frame-002.jpg",
    alt: "مشهد 2 من رحلة الوصول",
    caption: "المشهد 2",
  },
  {
    id: "frame-003",
    src: "/src/assets/sequence/ezgif-frame-003.jpg",
    alt: "مشهد 3 من رحلة الوصول",
    caption: "المشهد 3",
  },
  {
    id: "frame-004",
    src: "/src/assets/sequence/ezgif-frame-004.jpg",
    alt: "مشهد 4 من رحلة الوصول",
    caption: "المشهد 4",
  },
  {
    id: "frame-005",
    src: "/src/assets/sequence/ezgif-frame-005.jpg",
    alt: "مشهد 5 من رحلة الوصول",
    caption: "المشهد 5",
  },
  {
    id: "frame-006",
    src: "/src/assets/sequence/ezgif-frame-006.jpg",
    alt: "مشهد 6 من رحلة الوصول",
    caption: "المشهد 6",
  },
  {
    id: "frame-007",
    src: "/src/assets/sequence/ezgif-frame-007.jpg",
    alt: "مشهد 7 من رحلة الوصول",
    caption: "المشهد 7",
  },
  {
    id: "frame-008",
    src: "/src/assets/sequence/ezgif-frame-008.jpg",
    alt: "مشهد 8 من رحلة الوصول",
    caption: "المشهد 8",
  },
  {
    id: "frame-009",
    src: "/src/assets/sequence/ezgif-frame-009.jpg",
    alt: "مشهد 9 من رحلة الوصول",
    caption: "المشهد 9",
  },
  {
    id: "frame-010",
    src: "/src/assets/sequence/ezgif-frame-010.jpg",
    alt: "مشهد 10 من رحلة الوصول",
    caption: "المشهد 10",
  },
  {
    id: "frame-011",
    src: "/src/assets/sequence/ezgif-frame-011.jpg",
    alt: "مشهد 11 من رحلة الوصول",
    caption: "المشهد 11",
  },
  {
    id: "frame-012",
    src: "/src/assets/sequence/ezgif-frame-012.jpg",
    alt: "مشهد 12 من رحلة الوصول",
    caption: "المشهد 12",
  },
  {
    id: "frame-013",
    src: "/src/assets/sequence/ezgif-frame-013.jpg",
    alt: "مشهد 13 من رحلة الوصول",
    caption: "المشهد 13",
  },
  {
    id: "frame-014",
    src: "/src/assets/sequence/ezgif-frame-014.jpg",
    alt: "مشهد 14 من رحلة الوصول",
    caption: "المشهد 14",
  },
  {
    id: "frame-015",
    src: "/src/assets/sequence/ezgif-frame-015.jpg",
    alt: "مشهد 15 من رحلة الوصول",
    caption: "المشهد 15",
  },
  {
    id: "frame-016",
    src: "/src/assets/sequence/ezgif-frame-016.jpg",
    alt: "مشهد 16 من رحلة الوصول",
    caption: "المشهد 16",
  },
  {
    id: "frame-017",
    src: "/src/assets/sequence/ezgif-frame-017.jpg",
    alt: "مشهد 17 من رحلة الوصول",
    caption: "المشهد 17",
  },
  {
    id: "frame-018",
    src: "/src/assets/sequence/ezgif-frame-018.jpg",
    alt: "مشهد 18 من رحلة الوصول",
    caption: "المشهد 18",
  },
  {
    id: "frame-019",
    src: "/src/assets/sequence/ezgif-frame-019.jpg",
    alt: "مشهد 19 من رحلة الوصول",
    caption: "المشهد 19",
  },
  {
    id: "frame-020",
    src: "/src/assets/sequence/ezgif-frame-020.jpg",
    alt: "مشهد 20 من رحلة الوصول",
    caption: "المشهد 20",
  },
  {
    id: "frame-021",
    src: "/src/assets/sequence/ezgif-frame-021.jpg",
    alt: "مشهد 21 من رحلة الوصول",
    caption: "المشهد 21",
  },
  {
    id: "frame-022",
    src: "/src/assets/sequence/ezgif-frame-022.jpg",
    alt: "مشهد 22 من رحلة الوصول",
    caption: "المشهد 22",
  },
  {
    id: "frame-023",
    src: "/src/assets/sequence/ezgif-frame-023.jpg",
    alt: "مشهد 23 من رحلة الوصول",
    caption: "المشهد 23",
  },
  {
    id: "frame-024",
    src: "/src/assets/sequence/ezgif-frame-024.jpg",
    alt: "مشهد 24 من رحلة الوصول",
    caption: "المشهد 24",
  },
  {
    id: "frame-025",
    src: "/src/assets/sequence/ezgif-frame-025.jpg",
    alt: "مشهد 25 من رحلة الوصول",
    caption: "المشهد 25",
  },
  {
    id: "frame-026",
    src: "/src/assets/sequence/ezgif-frame-026.jpg",
    alt: "مشهد 26 من رحلة الوصول",
    caption: "المشهد 26",
  },
  {
    id: "frame-027",
    src: "/src/assets/sequence/ezgif-frame-027.jpg",
    alt: "مشهد 27 من رحلة الوصول",
    caption: "المشهد 27",
  },
  {
    id: "frame-028",
    src: "/src/assets/sequence/ezgif-frame-028.jpg",
    alt: "مشهد 28 من رحلة الوصول",
    caption: "المشهد 28",
  },
  {
    id: "frame-029",
    src: "/src/assets/sequence/ezgif-frame-029.jpg",
    alt: "مشهد 29 من رحلة الوصول",
    caption: "المشهد 29",
  },
  {
    id: "frame-030",
    src: "/src/assets/sequence/ezgif-frame-030.jpg",
    alt: "مشهد 30 من رحلة الوصول",
    caption: "المشهد 30",
  },
  {
    id: "frame-031",
    src: "/src/assets/sequence/ezgif-frame-031.jpg",
    alt: "مشهد 31 من رحلة الوصول",
    caption: "المشهد 31",
  },
  {
    id: "frame-032",
    src: "/src/assets/sequence/ezgif-frame-032.jpg",
    alt: "مشهد 32 من رحلة الوصول",
    caption: "المشهد 32",
  },
  {
    id: "frame-033",
    src: "/src/assets/sequence/ezgif-frame-033.jpg",
    alt: "مشهد 33 من رحلة الوصول",
    caption: "المشهد 33",
  },
  {
    id: "frame-034",
    src: "/src/assets/sequence/ezgif-frame-034.jpg",
    alt: "مشهد 34 من رحلة الوصول",
    caption: "المشهد 34",
  },
  {
    id: "frame-035",
    src: "/src/assets/sequence/ezgif-frame-035.jpg",
    alt: "مشهد 35 من رحلة الوصول",
    caption: "المشهد 35",
  },
  {
    id: "frame-036",
    src: "/src/assets/sequence/ezgif-frame-036.jpg",
    alt: "مشهد 36 من رحلة الوصول",
    caption: "المشهد 36",
  },
  {
    id: "frame-037",
    src: "/src/assets/sequence/ezgif-frame-037.jpg",
    alt: "مشهد 37 من رحلة الوصول",
    caption: "المشهد 37",
  },
  {
    id: "frame-038",
    src: "/src/assets/sequence/ezgif-frame-038.jpg",
    alt: "مشهد 38 من رحلة الوصول",
    caption: "المشهد 38",
  },
  {
    id: "frame-039",
    src: "/src/assets/sequence/ezgif-frame-039.jpg",
    alt: "مشهد 39 من رحلة الوصول",
    caption: "المشهد 39",
  },
  {
    id: "frame-040",
    src: "/src/assets/sequence/ezgif-frame-040.jpg",
    alt: "مشهد 40 من رحلة الوصول",
    caption: "المشهد 40",
  },
  {
    id: "frame-041",
    src: "/src/assets/sequence/ezgif-frame-041.jpg",
    alt: "مشهد 41 من رحلة الوصول",
    caption: "المشهد 41",
  },
  {
    id: "frame-042",
    src: "/src/assets/sequence/ezgif-frame-042.jpg",
    alt: "مشهد 42 من رحلة الوصول",
    caption: "المشهد 42",
  },
  {
    id: "frame-043",
    src: "/src/assets/sequence/ezgif-frame-043.jpg",
    alt: "مشهد 43 من رحلة الوصول",
    caption: "المشهد 43",
  },
  {
    id: "frame-044",
    src: "/src/assets/sequence/ezgif-frame-044.jpg",
    alt: "مشهد 44 من رحلة الوصول",
    caption: "المشهد 44",
  },
  {
    id: "frame-045",
    src: "/src/assets/sequence/ezgif-frame-045.jpg",
    alt: "مشهد 45 من رحلة الوصول",
    caption: "المشهد 45",
  },
  {
    id: "frame-046",
    src: "/src/assets/sequence/ezgif-frame-046.jpg",
    alt: "مشهد 46 من رحلة الوصول",
    caption: "المشهد 46",
  },
  {
    id: "frame-047",
    src: "/src/assets/sequence/ezgif-frame-047.jpg",
    alt: "مشهد 47 من رحلة الوصول",
    caption: "المشهد 47",
  },
  {
    id: "frame-048",
    src: "/src/assets/sequence/ezgif-frame-048.jpg",
    alt: "مشهد 48 من رحلة الوصول",
    caption: "المشهد 48",
  },
  {
    id: "frame-049",
    src: "/src/assets/sequence/ezgif-frame-049.jpg",
    alt: "مشهد 49 من رحلة الوصول",
    caption: "المشهد 49",
  },
  {
    id: "frame-050",
    src: "/src/assets/sequence/ezgif-frame-050.jpg",
    alt: "المشهد النهائي من رحلة الوصول",
    caption: "الوصول",
  },
];
