import { CategoryPage } from "@/components/CategoryPage";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "AI 教學",
  description: "AI 新手學習、家長教學、AI 數學、簡報、筆記與企業內訓大綱。",
  path: "/education"
});

export default function EducationPage() {
  return (
    <CategoryPage
      category="AI教學"
      eyebrow="AI Education"
      title="讓 AI 變成學習、教學與內訓的日常工具"
      description="整理新手、家長、學生與中小企業團隊都能使用的 AI 學習路線與教學方法。"
    />
  );
}
