import { CategoryPage } from "@/components/CategoryPage";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "AI 自動化",
  description: "用 n8n、LINE Bot、OpenAI API 與 Zeabur 建立一人公司的自動化流程。",
  path: "/automation"
});

export default function AutomationPage() {
  return (
    <CategoryPage
      category="AI自動化"
      eyebrow="AI Automation"
      title="把重複工作交給 AI 與自動化流程"
      description="從 LINE 客服、表單、報價、會議紀錄到報表，整理一人公司最容易落地的自動化做法。"
    />
  );
}
