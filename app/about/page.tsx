import { CTASection } from "@/components/CTASection";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "關於我們",
  description: "AI 一人公司研究所協助創作者、接案者與中小企業，用 AI 建立工作系統與變現路線。",
  path: "/about"
});

export default function AboutPage() {
  return (
    <main>
      <section className="mx-auto max-w-4xl px-5 py-14 md:py-20">
        <p className="text-sm font-bold text-clay">關於我們</p>
        <h1 className="mt-3 text-4xl font-bold tracking-normal text-ink md:text-5xl">研究 AI，也研究怎麼把它變成生活裡的收入系統</h1>
        <div className="mt-8 space-y-5 text-lg leading-9 text-muted">
          <p>
            AI 一人公司研究所關注的不是炫技，而是創作者、接案者、小店家與中小企業老闆每天真的會遇到的問題：回覆客戶、整理資料、做網站、寫內容、做圖、做影片、追蹤名單與交付服務。
          </p>
          <p>
            我們把工具評測、流程設計、SEO 內容與商業化方法整理成可操作的文章，希望幫你少走一點彎路，用更低成本做出第一個能成交的系統。
          </p>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-5 pb-20">
        <CTASection />
      </section>
    </main>
  );
}
