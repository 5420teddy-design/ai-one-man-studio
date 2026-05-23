import { CategoryPage } from "@/components/CategoryPage";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "AI 圖像生成",
  description: "Midjourney、Ideogram 與 AI 商品圖、廣告圖、社群圖片的商業製作流程。",
  path: "/image"
});

export default function ImagePage() {
  return (
    <CategoryPage
      category="AI圖像生成"
      eyebrow="AI Image"
      title="用 AI 快速製作能賣東西的圖片"
      description="從商品主圖、情境圖、廣告素材到品牌視覺，建立可以重複交付的 AI 圖像流程。"
    />
  );
}
