import { FeaturedGrid } from "@/components/FeaturedGrid";
import { HeroTech } from "@/components/HeroTech";
import { HotRanking } from "@/components/HotRanking";
import { LatestArticleGrid } from "@/components/LatestArticleGrid";
import { NewsletterCTA } from "@/components/NewsletterCTA";
import { SponsorBanner } from "@/components/SponsorBanner";
import { TechCategoryCard } from "@/components/TechCategoryCard";
import { categories } from "@/data/categories";
import { tools } from "@/data/tools";
import { getAllArticles } from "@/lib/all-articles";
import { fallbackTrendingTopics } from "@/lib/daily-content-factory";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata();

export default async function HomePage() {
  const articles = await getAllArticles();
  const latestArticles = articles.slice(0, 8);
  const featuredArticles = articles.filter((article) => article.featured).slice(0, 5);
  const hotArticles = [...articles].sort((a, b) => (a.hotRank || 999) - (b.hotRank || 999)).slice(0, 5);
  const trendingTopics = fallbackTrendingTopics(5);

  return (
    <main>
      <HeroTech />
      <SponsorBanner tools={tools.slice(0, 3)} />
      <LatestArticleGrid articles={latestArticles.slice(0, 4)} />
      <FeaturedGrid articles={featuredArticles.length >= 5 ? featuredArticles : latestArticles.slice(0, 5)} />
      <section className="mx-auto max-w-7xl px-5 py-14">
        <div className="glass-card rounded-[2rem] p-6 md:p-8">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="font-display text-xs font-bold uppercase tracking-[0.22em] text-cyber-purple">Trending Topics</p>
              <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-cyber-title">今日 AI 熱門選題</h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-cyber-muted">
              首頁預留給每日 05:30 趨勢搜尋系統更新，依搜尋熱度、社群討論與商業價值排序。
            </p>
          </div>
          <div className="mt-7 grid gap-4 md:grid-cols-5">
            {trendingTopics.map((topic, index) => (
              <div key={topic.keyword} className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
                <p className="font-display text-3xl font-black text-cyber-cyan">{String(index + 1).padStart(2, "0")}</p>
                <h3 className="mt-4 font-display text-lg font-bold leading-snug text-cyber-title">{topic.keyword}</h3>
                <p className="mt-3 text-sm leading-6 text-cyber-muted">{topic.articleAngle}</p>
                <div className="mt-4 flex items-center justify-between text-xs text-cyber-muted">
                  <span>{topic.category}</span>
                  <span>{topic.trendScore}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <HotRanking articles={hotArticles} />

      <section className="mx-auto max-w-7xl px-5 py-14">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-display text-xs font-bold uppercase tracking-[0.22em] text-cyber-cyan">Topics</p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-cyber-title md:text-4xl">
              AI 一人公司的八大作戰分類
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-cyber-muted">
            從工具評測、自動化、接案、圖像、影片到 SEO 內容工廠，建立可持續變現的 AI 顧問品牌。
          </p>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <TechCategoryCard
              key={category.name}
              category={category}
              count={articles.filter((article) => article.category === category.name).length}
            />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-20 pt-6">
        <NewsletterCTA />
      </section>
    </main>
  );
}
