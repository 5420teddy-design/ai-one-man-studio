import { CategoryPage } from "@/components/CategoryPage";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "AI 商業變現",
  description: "一人 AI 公司、AI 工具網站、聯盟行銷、顧問服務與 SaaS 路線圖。",
  path: "/business"
});

export default function BusinessPage() {
  return (
    <CategoryPage
      category="AI商業變現"
      eyebrow="AI Business"
      title="把 AI 能力包裝成可以收費的產品與服務"
      description="從接案、顧問、內容網站、模板、課程到 SaaS，拆解一人公司可執行的收入模型。"
    />
  );
}
