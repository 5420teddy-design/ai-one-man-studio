import Link from "next/link";
import type { Article } from "@/data/articles";

export function HotRanking({ articles }: { articles: Article[] }) {
  return (
    <section className="mx-auto max-w-7xl px-5 py-14">
      <div className="glass-card rounded-[2rem] p-6 md:p-8">
        <p className="font-display text-xs font-bold uppercase tracking-[0.22em] text-cyber-cyan">Trending Today</p>
        <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-cyber-title">今日熱門</h2>
        <div className="mt-7 divide-y divide-white/10">
          {articles.slice(0, 5).map((article, index) => (
            <Link key={article.slug} href={`/articles/${article.slug}`} className="grid gap-4 py-5 transition hover:bg-white/[0.03] md:grid-cols-[84px_1fr_auto] md:items-center">
              <span className="font-display text-4xl font-black tracking-tight text-transparent [-webkit-text-stroke:1px_rgba(56,189,248,0.85)]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <p className="text-xs font-bold text-cyber-purple">{article.category}</p>
                <h3 className="mt-2 font-display text-xl font-bold text-cyber-title">{article.title}</h3>
              </div>
              <div className="text-sm text-cyber-muted md:text-right">
                <p>{article.shares} shares</p>
                <p>{article.readingTime} 分鐘</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
