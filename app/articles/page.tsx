import { ArticleListWithSidebar } from "@/components/ArticleListWithSidebar";
import { categories } from "@/data/categories";
import { tools } from "@/data/tools";
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
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 tech-grid opacity-40" />
        <div className="absolute left-20 top-10 h-64 w-64 rounded-full bg-cyber-blue/20 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-5 py-14 md:py-20">
          <p className="font-display text-xs font-bold uppercase tracking-[0.22em] text-cyber-cyan">Articles</p>
          <h1 className="mt-4 max-w-4xl font-display text-4xl font-bold tracking-tight text-cyber-title md:text-6xl">
            AI 一人公司科技文章庫
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-cyber-muted">
            用科技媒體的方式整理 AI 工具、自動化、接案、SEO 內容工廠與商業化路線。
          </p>
        </div>
      </section>
      <ArticleListWithSidebar articles={articles} categories={categories} tools={tools} />
    </main>
  );
}
