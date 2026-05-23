import type { Tool } from "@/data/tools";
import { ToolAffiliateCard } from "@/components/ToolAffiliateCard";

export function SponsorBanner({ tools }: { tools: Tool[] }) {
  return (
    <section className="mx-auto max-w-7xl px-5 py-10 md:py-14">
      <div className="glass-card relative overflow-hidden rounded-[2rem] p-6 md:p-8">
        <div className="absolute -right-20 -top-24 h-64 w-64 rounded-full bg-cyber-purple/20 blur-3xl" />
        <div className="absolute -bottom-28 left-20 h-64 w-64 rounded-full bg-cyber-cyan/16 blur-3xl" />
        <div className="relative flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-display text-xs font-bold uppercase tracking-[0.22em] text-cyber-cyan">Sponsored Picks</p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-cyber-title">本週 AI 工具推薦</h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-cyber-muted">
            精選適合一人公司、接案者與內容團隊導入的 AI 工具，從內容產出到自動化交付都能接上。
          </p>
        </div>
        <div className="relative mt-7 grid gap-5 md:grid-cols-3">
          {tools.slice(0, 3).map((tool) => (
            <ToolAffiliateCard key={tool.name} tool={tool} />
          ))}
        </div>
      </div>
    </section>
  );
}
