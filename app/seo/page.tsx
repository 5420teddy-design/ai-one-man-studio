import { CategoryPage } from "@/components/CategoryPage";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "AI SEO",
  description: "AI SEO、Topic Cluster、內容網站、sitemap 與 SEO 內容工廠流程。",
  path: "/seo"
});

export default function SeoPage() {
  return (
    <CategoryPage
      category="AI SEO"
      eyebrow="AI SEO"
      title="用 AI 建立能長期累積流量的內容網站"
      description="從關鍵字研究、主題群集、文章生產到內部連結，建立能為一人公司帶來詢問的 SEO 系統。"
    />
  );
}
