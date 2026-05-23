import { CategoryPage } from "@/components/CategoryPage";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "AI 接案",
  description: "AI 網站、LINE Bot、自動化與顧問服務的接案流程、報價與交付 SOP。",
  path: "/freelance"
});

export default function FreelancePage() {
  return (
    <CategoryPage
      category="AI接案"
      eyebrow="AI Freelance"
      title="用 AI 做出作品、接到案子、穩定交付"
      description="整理新手到進階接案者需要的提案、報價、訪談、合約、驗收與長期維護方法。"
    />
  );
}
