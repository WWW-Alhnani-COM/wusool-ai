# وصول AI | WUSOOL AI — الموقع الرسمي

React + TypeScript + Vite + Tailwind CSS + Framer Motion. لا يوجد Next.js.

## التشغيل محليًا

يحتاج هذا المشروع اتصالاً بالإنترنت لتحميل الحزم أول مرة فقط:

```bash
npm install
cp .env.example .env.local   # ثم عبّئ رقم واتساب ورابط استقبال النماذج
npm run dev
```

يفتح المشروع على `http://localhost:5173`.

للبناء النهائي:

```bash
npm run build
npm run preview
```

## إضافة صور الـ Scroll Sequence الحقيقية

الصور الحالية في `src/assets/sequence/` هي Placeholders (رسوم SVG مجردة).
التعليمات الكاملة لاستبدالها موجودة في `src/assets/sequence/README.md` —
باختصار: استبدل الملفات بنفس الأسماء (`frame-01` ... `frame-08`) وحدّث
الامتداد في `src/data/process.ts` إذا لزم، بدون أي تعديل على الكود.

## هيكل المشروع

```
src/
  components/
    layout/     Header, Footer, Layout
    hero/       Hero, ScrollSequence (القلب البرمجي لتجربة السكرول)
    sections/   كل أقسام الصفحة الرئيسية
    ui/         مكوّنات قابلة لإعادة الاستخدام (Button, SectionHeading...)
    forms/      نماذج التواصل والاستشارة + التحقق من الصحة
  data/         كل نصوص وبيانات الموقع (منفصلة عن العرض)
  pages/        صفحات الراوتر
  hooks/        useScrollProgress, useReducedMotion, useIsLowPowerDevice
  lib/          مساعدات (واتساب)
```

## ملاحظات مهمة

- **لا يوجد رقم واتساب أو رابط استقبال نماذج مضاف افتراضيًا** — الموقع
  يعرض حالة واضحة بدلاً من رقم/رابط وهمي حتى تضيفهما في `.env.local`.
- الصفحات القانونية (`سياسة الخصوصية`, `الشروط والأحكام`) هياكل فارغة
  بانتظار محتوى معتمد من الشركة.
- لم يُبنَ أي نظام SaaS / تسجيل دخول / لوحة عميل — الموقع تعريفي وتوليد
  عملاء محتملين فقط، كما هو محدد في المتطلبات.
