import Image from "next/image";
import Link from "next/link";
import type { Article } from "@/data/articles";
import { formatDate } from "@/lib/utils";

export function LatestArticleGrid({ articles }: { articles: Article[] }) {
  return (
    <section className="mx-auto max-w-7xl px-5 py-14">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="font-display text-xs font-bold uppercase tracking-[0.22em] text-cyber-cyan">Latest Stories</p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-cyber-title md:text-4xl">最新文章</h2>
        </div>
        <Link href="/articles" className="hidden text-sm font-bold text-cyber-cyan hover:text-white md:inline-flex">
          查看全部
        </Link>
      </div>
      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {articles.map((article) => (
          <Link key={article.slug} href={`/articles/${article.slug}`} className="group glass-card overflow-hidden rounded-3xl transition hover:-translate-y-1">
            <div className="image-zoom relative aspect-[16/10]">
              <Image src={article.coverImage} alt={article.title} fill className="object-cover" sizes="(min-width: 1024px) 25vw, 50vw" />
            </div>
            <div className="p-5">
              <div className="flex items-center gap-2 text-xs text-cyber-muted">
                <span className="rounded-full bg-cyber-blue/10 px-2.5 py-1 font-bold text-cyber-cyan">{article.category}</span>
                <span>{formatDate(article.publishDate)}</span>
              </div>
              <h3 className="mt-4 line-clamp-2 font-display text-xl font-bold leading-snug text-cyber-title group-hover:text-cyber-cyan">
                {article.title}
              </h3>
              <p className="mt-3 line-clamp-3 text-sm leading-7 text-cyber-muted">{article.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
