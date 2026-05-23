import { ArticleCard } from "@/components/ArticleCard";
import { CTASection } from "@/components/CTASection";
import { categories } from "@/data/categories";
import { getAllArticles } from "@/lib/all-articles";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "文章列表",
  description: "整理 AI 工具、自動化、接案、圖像、影片、SEO、教學與商業變現的完整文章庫。",
  path: "/articles"
});

export default async function ArticlesPage() {
  const articles = await getAllArticles();

  return (
    <main>
      <section className="mx-auto max-w-7xl px-5 py-14 md:py-20">
        <p className="text-sm font-bold text-clay">文章列表</p>
        <h1 className="mt-3 max-w-3xl text-4xl font-bold tracking-normal text-ink md:text-5xl">
          AI 一人公司 SEO 文章庫
        </h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-muted">
          從工具比較、LINE Bot、自動化接案、AI SEO 到商業變現，整理成可搜尋、可行動的內容資料庫。
        </p>
        <div className="mt-8 flex flex-wrap gap-2">
          {categories.map((category) => (
            <a
              key={category.name}
              href={`#${category.slug}`}
              className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-muted shadow-sm hover:text-ink"
            >
              {category.name}
            </a>
          ))}
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-5 pb-16">
        {categories.map((category) => {
          const categoryArticles = articles.filter((article) => article.category === category.name);

          return (
            <div key={category.name} id={category.slug} className="scroll-mt-24 py-8">
              <div className="mb-6 flex items-end justify-between gap-4">
                <div>
                  <p className="text-sm font-bold text-clay">{categoryArticles.length} 篇文章</p>
                  <h2 className="mt-2 text-3xl font-bold text-ink">{category.name}</h2>
                </div>
              </div>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {categoryArticles.map((article) => (
                  <ArticleCard key={article.slug} article={article} />
                ))}
              </div>
            </div>
          );
        })}
      </section>
      <section className="mx-auto max-w-7xl px-5 pb-20">
        <CTASection />
      </section>
    </main>
  );
}
