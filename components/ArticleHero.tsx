import Image from "next/image";
import type { Article } from "@/data/articles";
import { formatDate } from "@/lib/utils";

export function ArticleHero({ article }: { article: Article }) {
  return (
    <section className="relative overflow-hidden border-b border-white/10">
      <div className="absolute inset-0 tech-grid opacity-40" />
      <div className="absolute left-20 top-12 h-72 w-72 rounded-full bg-cyber-blue/20 blur-3xl" />
      <div className="absolute bottom-0 right-20 h-80 w-80 rounded-full bg-cyber-purple/20 blur-3xl" />
      <div className="relative mx-auto max-w-6xl px-5 py-14 md:py-20">
        <span className="rounded-full border border-cyber-cyan/30 bg-cyber-cyan/10 px-4 py-2 text-sm font-bold text-cyber-cyan">
          {article.category}
        </span>
        <h1 className="mt-6 max-w-5xl font-display text-4xl font-bold leading-tight tracking-tight text-cyber-title md:text-6xl">
          {article.title}
        </h1>
        <div className="mt-5 flex flex-wrap gap-4 text-sm text-cyber-muted">
          <span>{formatDate(article.publishDate)}</span>
          <span>{article.readingTime} 分鐘閱讀</span>
          <span>作者：{article.author}</span>
          <span>{article.shares} shares</span>
        </div>
        <div className="gradient-border neon-glow mt-10 overflow-hidden rounded-[2rem] p-px">
          <div className="relative aspect-[16/8] overflow-hidden rounded-[1.9rem] bg-cyber-panel">
            <Image src={article.coverImage || "/images/ai-cover-default.svg"} alt={article.title} fill priority className="object-cover" sizes="100vw" />
          </div>
        </div>
      </div>
    </section>
  );
}
