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
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata();

export default async function HomePage() {
  const articles = await getAllArticles();
  const latestArticles = articles.slice(0, 8);
  const featuredArticles = articles.filter((article) => article.featured).slice(0, 5);
  const hotArticles = [...articles].sort((a, b) => (a.hotRank || 999) - (b.hotRank || 999)).slice(0, 5);

  return (
    <main>
      <HeroTech />
      <SponsorBanner tools={tools.slice(0, 3)} />
      <LatestArticleGrid articles={latestArticles.slice(0, 4)} />
      <FeaturedGrid articles={featuredArticles.length >= 5 ? featuredArticles : latestArticles.slice(0, 5)} />
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
