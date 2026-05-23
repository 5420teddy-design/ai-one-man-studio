import Link from "next/link";
import { ArrowRight, Bot, FileText, Layers3, MessageCircle, Workflow } from "lucide-react";
import { siteConfig } from "@/lib/seo";

const metrics = [
  { label: "今日生成文章", value: "5", icon: FileText },
  { label: "已收錄頁面", value: "112", icon: Layers3 },
  { label: "自動化工作流", value: "8", icon: Workflow },
  { label: "接案服務模組", value: "4", icon: Bot }
];

export function HeroTech() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 tech-grid opacity-50" />
      <div className="absolute left-1/2 top-20 h-72 w-72 -translate-x-1/2 rounded-full bg-cyber-cyan/20 blur-3xl" />
      <div className="relative mx-auto grid max-w-7xl gap-10 px-5 py-16 md:grid-cols-[1.05fr_0.95fr] md:items-center md:py-24">
        <div>
          <p className="inline-flex rounded-full border border-cyber-cyan/30 bg-cyber-cyan/10 px-4 py-2 font-display text-xs font-bold uppercase tracking-[0.24em] text-cyber-cyan">
            AI ONE-PERSON COMPANY LAB
          </p>
          <h1 className="mt-6 max-w-4xl font-display text-5xl font-bold leading-tight tracking-tight text-cyber-title md:text-7xl">
            用 AI 打造一個人也能運轉的公司
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-9 text-cyber-muted md:text-xl">
            從工具、網站、自動化、LINE 客服到 SEO 內容工廠，幫你把 AI 變成可接案、可變現、可複製的工作系統。
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <Link
              href="/articles"
              className="inline-flex items-center gap-2 rounded-full bg-cyber-cyan px-6 py-3 font-bold text-cyber-bg shadow-neon transition hover:-translate-y-0.5 hover:bg-white"
            >
              開始看文章
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </Link>
            <Link
              href={siteConfig.lineUrl}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 font-bold text-cyber-title backdrop-blur transition hover:-translate-y-0.5 hover:border-cyber-blue/60"
            >
              <MessageCircle className="h-5 w-5" aria-hidden="true" />
              LINE 諮詢
            </Link>
          </div>
        </div>

        <div className="gradient-border neon-glow relative rounded-[2rem] p-1">
          <div className="glass-card relative overflow-hidden rounded-[1.8rem] p-6">
            <div className="absolute inset-0 tech-grid opacity-35" />
            <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-cyber-purple/25 blur-3xl" />
            <div className="relative">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-display text-xs font-bold uppercase tracking-[0.22em] text-cyber-blue">Live Dashboard</p>
                  <h2 className="mt-2 text-2xl font-bold text-cyber-title">內容工廠今日狀態</h2>
                </div>
                <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-bold text-emerald-300">ONLINE</span>
              </div>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {metrics.map((metric) => {
                  const Icon = metric.icon;

                  return (
                    <div key={metric.label} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                      <Icon className="h-5 w-5 text-cyber-cyan" aria-hidden="true" />
                      <p className="mt-5 font-display text-4xl font-bold tracking-tight text-cyber-title">{metric.value}</p>
                      <p className="mt-2 text-sm text-cyber-muted">{metric.label}</p>
                    </div>
                  );
                })}
              </div>
              <div className="mt-6 rounded-2xl border border-cyber-blue/20 bg-cyber-blue/10 p-4 text-sm leading-7 text-cyber-muted">
                SEO 文章、圖表、封面 Prompt、LINE 導流與 GitHub 發布流程已模組化。
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
