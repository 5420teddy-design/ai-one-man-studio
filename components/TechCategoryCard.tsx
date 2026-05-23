import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Category } from "@/data/categories";

const shortLabels: Record<string, string> = {
  AI工具推薦: "AI 工具",
  AI自動化: "AI 自動化",
  AI接案: "AI 接案",
  AI圖像生成: "AI 圖像",
  AI影片生成: "AI 影片",
  "AI SEO": "AI SEO",
  AI教學: "AI 教學",
  AI商業變現: "AI 商業化"
};

export function TechCategoryCard({ category, count }: { category: Category; count: number }) {
  const Icon = category.icon;

  return (
    <Link href={category.path} className="gradient-border group rounded-3xl p-px transition hover:-translate-y-1">
      <div className="h-full rounded-[1.45rem] bg-cyber-panel/95 p-6">
        <div className="flex items-start justify-between gap-4">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 text-cyber-cyan">
            <Icon className="h-6 w-6" aria-hidden="true" />
          </span>
          <ArrowUpRight className="h-5 w-5 text-cyber-muted transition group-hover:text-cyber-cyan" aria-hidden="true" />
        </div>
        <h3 className="mt-6 font-display text-xl font-bold text-cyber-title">{shortLabels[category.name] || category.name}</h3>
        <p className="mt-3 min-h-16 text-sm leading-7 text-cyber-muted">{category.description}</p>
        <p className="mt-5 text-sm font-bold text-cyber-cyan">{count} 篇文章</p>
      </div>
    </Link>
  );
}
