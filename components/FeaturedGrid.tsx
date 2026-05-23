import Image from "next/image";
import Link from "next/link";
import type { Article } from "@/data/articles";
import { formatDate } from "@/lib/utils";

export function FeaturedGrid({ articles }: { articles: Article[] }) {
  const [mainArticle, ...sideArticles] = articles;

  if (!mainArticle) {
    return null;
  }

  return (
    <section className="mx-auto max-w-7xl px-5 py-14">
      <p className="font-display text-xs font-bold uppercase tracking-[0.22em] text-cyber-purple">Editor Picks</p>
      <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-cyber-title md:text-4xl">編輯精選</h2>
      <div className="mt-8 grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
        <Link href={`/articles/${mainArticle.slug}`} className="group gradient-border overflow-hidden rounded-[2rem] p-1">
          <div className="glass-card h-full overflow-hidden rounded-[1.8rem]">
            <div className="image-zoom relative aspect-[16/9]">
              <Image src={mainArticle.coverImage} alt={mainArticle.title} fill className="object-cover" sizes="(min-width: 1024px) 60vw, 100vw" />
            </div>
            <div className="p-7">
              <div className="flex flex-wrap items-center gap-3 text-xs text-cyber-muted">
                <span className="rounded-full bg-cyber-purple/15 px-3 py-1 font-bold text-cyber-purple">{mainArticle.category}</span>
                <span>{formatDate(mainArticle.publishDate)}</span>
              </div>
              <h3 className="mt-4 font-display text-3xl font-bold leading-tight tracking-tight text-cyber-title group-hover:text-cyber-cyan">
                {mainArticle.title}
              </h3>
              <p className="mt-4 max-w-2xl leading-8 text-cyber-muted">{mainArticle.description}</p>
            </div>
          </div>
        </Link>
        <div className="grid gap-4">
          {sideArticles.slice(0, 4).map((article) => (
            <Link key={article.slug} href={`/articles/${article.slug}`} className="glass-card group grid grid-cols-[110px_1fr] gap-4 rounded-2xl p-3 transition hover:-translate-y-0.5">
              <div className="image-zoom relative aspect-square overflow-hidden rounded-xl">
                <Image src={article.coverImage} alt={article.title} fill className="object-cover" sizes="110px" />
              </div>
              <div>
                <p className="text-xs font-bold text-cyber-cyan">{article.category}</p>
                <h3 className="mt-2 line-clamp-2 font-display font-bold leading-snug text-cyber-title group-hover:text-cyber-cyan">
                  {article.title}
                </h3>
                <p className="mt-2 text-xs text-cyber-muted">{article.readingTime} 分鐘閱讀</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
