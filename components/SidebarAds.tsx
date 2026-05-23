import Link from "next/link";
import type { Category } from "@/data/categories";
import type { Tool } from "@/data/tools";
import { NewsletterCTA } from "@/components/NewsletterCTA";
import { sortByScore } from "@/lib/utils";

export function SidebarAds({ tools, categories }: { tools: Tool[]; categories?: Category[] }) {
  const topTools = sortByScore(tools).slice(0, 5);

  return (
    <>
      <div className="glass-card rounded-3xl p-6">
        <h2 className="font-display text-xl font-bold text-cyber-title">AI 工具排行</h2>
        <div className="mt-5 grid gap-3">
          {topTools.map((tool, index) => (
            <a
              key={tool.name}
              href={tool.affiliateUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between rounded-2xl bg-white/[0.04] px-4 py-3 text-sm transition hover:bg-cyber-cyan/10"
            >
              <span className="font-bold text-cyber-text">
                {index + 1}. {tool.name}
              </span>
              <span className="text-cyber-cyan">{tool.score}</span>
            </a>
          ))}
        </div>
      </div>

      <NewsletterCTA />

      <div className="gradient-border rounded-3xl p-px">
        <div className="rounded-[1.45rem] bg-cyber-panel/95 p-6">
          <p className="font-display text-xs font-bold uppercase tracking-[0.22em] text-cyber-purple">AdSense Slot</p>
          <h2 className="mt-3 font-display text-xl font-bold text-cyber-title">原生廣告預留區</h2>
          <div className="mt-5 flex min-h-44 items-center justify-center rounded-2xl border border-dashed border-cyber-cyan/25 bg-white/[0.03] text-center text-sm leading-7 text-cyber-muted">
            Google AdSense / 工具聯盟 / 課程合作
          </div>
        </div>
      </div>

      {categories ? (
        <div className="glass-card rounded-3xl p-6">
          <h2 className="font-display text-xl font-bold text-cyber-title">最新分類</h2>
          <div className="mt-5 flex flex-wrap gap-2">
            {categories.map((category) => (
              <Link
                key={category.name}
                href={category.path}
                className="rounded-full border border-white/10 px-3 py-2 text-sm text-cyber-muted hover:border-cyber-cyan hover:text-cyber-cyan"
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </>
  );
}
