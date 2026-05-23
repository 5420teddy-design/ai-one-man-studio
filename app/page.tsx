import Link from "next/link";
import { ArrowRight, CheckCircle2, MessageCircle } from "lucide-react";
import { ArticleCard } from "@/components/ArticleCard";
import { CategoryCard } from "@/components/CategoryCard";
import { CTASection } from "@/components/CTASection";
import { ToolRankingTable } from "@/components/ToolRankingTable";
import { articles } from "@/data/articles";
import { categories } from "@/data/categories";
import { tools } from "@/data/tools";
import { createMetadata, siteConfig } from "@/lib/seo";
import { sortByScore } from "@/lib/utils";

export const metadata = createMetadata();

const processSteps = [
  "找出每天最耗時間的工作",
  "用 AI 工具做第一版內容或回覆",
  "把固定流程接到表單、LINE 或資料庫",
  "用內容網站累積搜尋流量",
  "把服務包裝成接案、顧問或月費方案"
];

export default function HomePage() {
  const featuredArticles = articles.slice(0, 6);
  const topTools = sortByScore(tools).slice(0, 8);

  return (
    <main>
      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-16 md:grid-cols-[1.1fr_0.9fr] md:items-center md:py-24">
        <div>
          <p className="inline-flex rounded-full bg-white px-4 py-2 text-sm font-semibold text-clay shadow-sm">
            給創作者、接案者與中小企業老闆
          </p>
          <h1 className="mt-6 text-5xl font-bold leading-tight tracking-normal text-ink md:text-7xl">
            AI 一人公司研究所
          </h1>
          <p className="mt-6 max-w-2xl text-xl leading-9 text-muted">
            用 AI 工具、自動化與內容網站，打造一個人也能接案、變現、服務客戶的工作系統。
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/articles"
              className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 font-bold text-white shadow-soft transition hover:bg-slate-800"
            >
              開始閱讀
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </Link>
            <Link
              href={siteConfig.lineUrl}
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-bold text-ink shadow-soft transition hover:bg-wheat"
            >
              <MessageCircle className="h-5 w-5" aria-hidden="true" />
              LINE 諮詢
            </Link>
          </div>
        </div>
        <div className="rounded-[2rem] border border-slate-900/10 bg-paper p-6 shadow-soft">
          <p className="text-sm font-bold text-clay">一人公司工作系統</p>
          <div className="mt-5 grid gap-4">
            {processSteps.map((step, index) => (
              <div key={step} className="flex items-start gap-4 rounded-2xl bg-white p-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-cream font-bold text-ink">
                  {index + 1}
                </span>
                <div>
                  <p className="font-bold text-ink">{step}</p>
                  <p className="mt-1 text-sm leading-6 text-muted">
                    先做小流程，看到效果後再擴成可重複交付的服務。
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-12">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-bold text-clay">八大分類</p>
            <h2 className="mt-2 text-3xl font-bold text-ink md:text-4xl">從工具到變現的完整地圖</h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-muted">
            不是追逐每個新工具，而是把 AI 放進接案、行銷、客服、內容與營運。
          </p>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <CategoryCard key={category.name} category={category} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-12">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-bold text-clay">熱門文章</p>
            <h2 className="mt-2 text-3xl font-bold text-ink md:text-4xl">先從最容易落地的題目開始</h2>
          </div>
          <Link href="/articles" className="hidden font-bold text-clay hover:text-ink md:inline-flex">
            查看全部
          </Link>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredArticles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-12">
        <ToolRankingTable tools={topTools} />
      </section>

      <section className="mx-auto max-w-7xl px-5 py-12">
        <div className="rounded-[2rem] bg-paper p-6 shadow-soft md:p-10">
          <p className="text-sm font-bold text-clay">一人公司變現流程圖</p>
          <h2 className="mt-2 text-3xl font-bold text-ink">把技能變成可收費系統</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-5">
            {processSteps.map((step) => (
              <div key={step} className="rounded-2xl bg-white p-5">
                <CheckCircle2 className="h-6 w-6 text-clay" aria-hidden="true" />
                <p className="mt-4 text-sm font-bold leading-6 text-ink">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-20 pt-8">
        <CTASection />
      </section>
    </main>
  );
}
