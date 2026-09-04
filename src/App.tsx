import { Routes, Route } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { HomePage } from "@/pages/HomePage";
import { SolutionsPage } from "@/pages/SolutionsPage";
import { SectorsPage } from "@/pages/SectorsPage";
import { HowWeWorkPage } from "@/pages/HowWeWorkPage";
import { AboutPage } from "@/pages/AboutPage";
import { ContactPage } from "@/pages/ContactPage";
import { ConsultationPage } from "@/pages/ConsultationPage";
import { LegalPage } from "@/pages/LegalPage";
import { NotFoundPage } from "@/pages/NotFoundPage";

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/الحلول" element={<SolutionsPage />} />
        <Route path="/القطاعات" element={<SectorsPage />} />
        <Route path="/كيف-نعمل" element={<HowWeWorkPage />} />
        <Route path="/عن-وصول" element={<AboutPage />} />
        <Route path="/تواصل" element={<ContactPage />} />
        <Route path="/طلب-استشارة" element={<ConsultationPage />} />
        <Route path="/سياسة-الخصوصية" element={<LegalPage title="سياسة الخصوصية" />} />
        <Route path="/الشروط-والأحكام" element={<LegalPage title="الشروط والأحكام" />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Layout>
  );
}
