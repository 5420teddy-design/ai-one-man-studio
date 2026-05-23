import Link from "next/link";
import { CalendarDays, Clock3 } from "lucide-react";
import type { Article } from "@/data/articles";
import { categoryLabelToPath, formatDate } from "@/lib/utils";

type ArticleCardProps = {
  article: Article;
};

export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <article className="flex h-full flex-col rounded-[1.5rem] border border-slate-900/10 bg-paper p-6 shadow-soft">
      <Link
        href={categoryLabelToPath(article.category)}
        className="w-fit rounded-full bg-cream px-3 py-1 text-xs font-semibold text-ink"
      >
        {article.category}
      </Link>
      <h3 className="mt-4 text-xl font-bold leading-snug text-ink">
        <Link href={`/articles/${article.slug}`} className="hover:text-clay">
          {article.title}
        </Link>
      </h3>
      <p className="mt-3 flex-1 text-sm leading-7 text-muted">{article.description}</p>
      <div className="mt-5 flex flex-wrap gap-4 text-xs text-muted">
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
