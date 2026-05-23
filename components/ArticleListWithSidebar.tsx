import Image from "next/image";
import Link from "next/link";
import type { Article } from "@/data/articles";
import type { Category } from "@/data/categories";
import type { Tool } from "@/data/tools";
import { NewsletterCTA } from "@/components/NewsletterCTA";
import { formatDate, sortByScore } from "@/lib/utils";

export function ArticleListWithSidebar({
  articles,
  categories,
  tools
}: {
  articles: Article[];
  categories: Category[];
  tools: Tool[];
}) {
  const hotArticles = [...articles].sort((a, b) => (b.shares || 0) - (a.shares || 0)).slice(0, 5);
  const topTools = sortByScore(tools).slice(0, 5);

  return (
    <section className="mx-auto grid max-w-7xl gap-8 px-5 pb-20 lg:grid-cols-[1fr_360px]">
      <div className="grid gap-6">
        {articles.map((article) => (
          <Link key={article.slug} href={`/articles/${article.slug}`} className="group glass-card grid gap-5 overflow-hidden rounded-3xl p-4 transition hover:-translate-y-1 md:grid-cols-[320px_1fr]">
            <div className="image-zoom relative aspect-[16/10] overflow-hidden rounded-2xl md:aspect-[16/10]">
              <Image src={article.coverImage} alt={article.title} fill className="object-cover" sizes="(min-width: 768px) 320px, 100vw" />
            </div>
            <div className="flex flex-col justify-center p-1 md:p-3">
              <div className="flex flex-wrap items-center gap-3 text-xs text-cyber-muted">
                <span className="rounded-full bg-cyber-blue/10 px-3 py-1 font-bold text-cyber-cyan">{article.category}</span>
                <span>{formatDate(article.publishDate)}</span>
              </div>
              <h2 className="mt-4 font-display text-2xl font-bold leading-tight tracking-tight text-cyber-title group-hover:text-cyber-cyan">
                {article.title}
              </h2>
              <p className="mt-3 line-clamp-2 leading-7 text-cyber-muted">{article.description}</p>
              <div className="mt-5 flex flex-wrap gap-4 text-sm text-cyber-muted">
                <span>作者：{article.author}</span>
                <span>{article.readingTime} 分鐘閱讀</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
        <div className="glass-card rounded-3xl p-6">
          <h2 className="font-display text-xl font-bold text-cyber-title">今日熱門</h2>
          <div className="mt-5 grid gap-4">
            {hotArticles.map((article, index) => (
              <Link key={article.slug} href={`/articles/${article.slug}`} className="grid grid-cols-[36px_1fr] gap-3">
                <span className="font-display text-lg font-black text-cyber-cyan">{String(index + 1).padStart(2, "0")}</span>
                <span className="text-sm font-semibold leading-6 text-cyber-text hover:text-cyber-cyan">{article.title}</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="glass-card rounded-3xl p-6">
          <h2 className="font-display text-xl font-bold text-cyber-title">AI 工具排行</h2>
          <div className="mt-5 grid gap-3">
            {topTools.map((tool) => (
              <div key={tool.name} className="flex items-center justify-between rounded-2xl bg-white/[0.04] px-4 py-3 text-sm">
                <span className="font-bold text-cyber-text">{tool.name}</span>
                <span className="text-cyber-cyan">{tool.score}</span>
              </div>
            ))}
          </div>
        </div>

        <NewsletterCTA />

        <div className="glass-card rounded-3xl p-6">
          <h2 className="font-display text-xl font-bold text-cyber-title">最新分類</h2>
          <div className="mt-5 flex flex-wrap gap-2">
            {categories.map((category) => (
              <Link key={category.name} href={category.path} className="rounded-full border border-white/10 px-3 py-2 text-sm text-cyber-muted hover:border-cyber-cyan hover:text-cyber-cyan">
                {category.name}
              </Link>
            ))}
          </div>
        </div>
      </aside>
    </section>
  );
}
