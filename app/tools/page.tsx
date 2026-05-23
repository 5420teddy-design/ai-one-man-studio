import { CTASection } from "@/components/CTASection";
import { ToolRankingTable } from "@/components/ToolRankingTable";
import { tools } from "@/data/tools";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "AI 工具排行榜",
  description: "比較 ChatGPT、Claude、Gemini、n8n、Cursor、Zeabur 等 20 個一人公司常用 AI 工具。",
  path: "/tools"
});

export default function ToolsPage() {
  return (
    <main>
      <section className="mx-auto max-w-7xl px-5 py-14 md:py-20">
        <p className="text-sm font-bold text-clay">AI 工具排行</p>
        <h1 className="mt-3 max-w-3xl text-4xl font-bold tracking-normal text-ink md:text-5xl">
          用分數、用途與難度挑工具
        </h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-muted">
          不是每個工具都要訂閱。先看你的工作場景，再選擇能幫你省時間、提高交付品質或帶來收入的工具。
        </p>
      </section>
      <section className="mx-auto max-w-7xl px-5 pb-16">
        <ToolRankingTable tools={tools} />
      </section>
      <section className="mx-auto max-w-7xl px-5 pb-20">
        <CTASection />
      </section>
    </main>
  );
}
