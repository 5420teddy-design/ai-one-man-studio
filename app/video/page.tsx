import { CategoryPage } from "@/components/CategoryPage";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "AI 影片生成",
  description: "AI 短影音、不露臉 YouTube、AI 配音、字幕翻譯與影片變現流程。",
  path: "/video"
});

export default function VideoPage() {
  return (
    <CategoryPage
      category="AI影片生成"
      eyebrow="AI Video"
      title="把腳本、配音與素材變成短影音流程"
      description="整理適合個人品牌、小商家與內容創作者使用的 AI 影片工具與變現模式。"
    />
  );
}
