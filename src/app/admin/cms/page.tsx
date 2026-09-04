import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CMSClient } from "@/components/admin/CMSClient";

export const metadata = {
  title: "CMS — VYBE Admin",
  description: "Edit site content",
};

export default function CMSPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main id="main-content">
        <CMSClient />
      </main>
      <Footer />
    </div>
  );
}
