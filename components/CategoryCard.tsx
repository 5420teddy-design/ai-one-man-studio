import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Category } from "@/data/categories";
import { cn } from "@/lib/utils";

type CategoryCardProps = {
  category: Category;
};

export function CategoryCard({ category }: CategoryCardProps) {
  const Icon = category.icon;

  return (
    <Link
      href={category.path}
      className="group rounded-[1.5rem] border border-slate-900/10 bg-paper p-6 shadow-soft transition hover:-translate-y-1 hover:border-slate-900/20"
    >
      <span className={cn("flex h-12 w-12 items-center justify-center rounded-2xl text-ink", category.color)}>
        <Icon className="h-6 w-6" aria-hidden="true" />
      </span>
      <h3 className="mt-5 text-xl font-bold text-ink">{category.name}</h3>
      <p className="mt-3 min-h-16 text-sm leading-7 text-muted">{category.description}</p>
      <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-ink">
        查看主題
        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" />
      </span>
    </Link>
  );
}
