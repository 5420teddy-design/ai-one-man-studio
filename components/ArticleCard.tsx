import Link from "next/link";
import { CalendarDays, Clock3 } from "lucide-react";
import type { Article } from "@/data/articles";
import { categoryLabelToPath, formatDate } from "@/lib/utils";

type ArticleCardProps = {
  article: Article;
};

export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <article className="glass-card flex h-full flex-col rounded-[1.5rem] p-6 transition hover:-translate-y-1">
      <Link
        href={categoryLabelToPath(article.category)}
        className="w-fit rounded-full bg-cyber-blue/10 px-3 py-1 text-xs font-semibold text-cyber-cyan"
      >
        {article.category}
      </Link>
      <h3 className="mt-4 font-display text-xl font-bold leading-snug text-cyber-title">
        <Link href={`/articles/${article.slug}`} className="hover:text-cyber-cyan">
          {article.title}
        </Link>
      </h3>
      <p className="mt-3 flex-1 text-sm leading-7 text-cyber-muted">{article.description}</p>
      <div className="mt-5 flex flex-wrap gap-4 text-xs text-cyber-muted">
        <span className="inline-flex items-center gap-1.5">
          <CalendarDays className="h-4 w-4" aria-hidden="true" />
          {formatDate(article.publishDate)}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Clock3 className="h-4 w-4" aria-hidden="true" />
          {article.readingTime} 分鐘
        </span>
      </div>
    </article>
  );
}
