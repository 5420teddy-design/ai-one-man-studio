import Link from "next/link";
import {
  ArrowRight,
  Bot,
  BrainCircuit,
  CheckCircle2,
  FileText,
  MessageCircle,
  Network,
  Workflow,
  Zap
} from "lucide-react";
import { LatestArticleGrid } from "@/components/LatestArticleGrid";
import { NewsletterCTA } from "@/components/NewsletterCTA";
import { SponsorBanner } from "@/components/SponsorBanner";
import { tools } from "@/data/tools";
import { getAllArticles } from "@/lib/all-articles";
import { fallbackTrendingTopics } from "@/lib/daily-content-factory";
import { createMetadata, siteConfig } from "@/lib/seo";

export const metadata = createMetadata({
  title: "AI 數位轉型平台",
  description: "AI 一人公司研究所協助中小企業與創作者建立 AI 客服、自動化、內容生成、商業流程與 AI Agent 系統。"
});

const platformModules = [
  {
    title: "AI客服",
    description: "LINE OA、網站客服、常見問題回覆與名單收集，讓客戶詢問先被系統接住。",
    icon: MessageCircle
  },
  {
    title: "AI自動化",
    description: "表單、報價、通知、CRM、Google Sheet 與 n8n 工作流串接。",
    icon: Workflow
  },
  {
    title: "AI內容生成",
    description: "SEO 文章、社群貼文、EDM、影片腳本與每日內容工廠。",
    icon: FileText
  },
  {
    title: "AI商業流程",
    description: "把接案、客服、銷售、交付、維護整理成可複製的 SOP。",
    icon: Network
  },
  {
    title: "AI Agent",
    description: "把搜尋、分析、撰寫、通知與發布交給可監控的 AI 任務代理。",
    icon: BrainCircuit
  }
];

const demoCards = [
  {
    label: "DEMO 01",
    title: "LINE AI 客服",
    metric: "24/7",
    copy: "自動判斷詢問類型，回覆服務內容、收集名單，再推送給真人接手。",
    items: ["需求分類", "FAQ 回覆", "名單導流"]
  },
  {
    label: "DEMO 02",
    title: "n8n 自動化流程",
    metric: "8 steps",
    copy: "從表單送出到報價、通知、資料庫更新，讓重複行政工作自動完成。",
    items: ["表單觸發", "AI 摘要", "Email / LINE 通知"]
  },
  {
    label: "DEMO 03",
    title: "SEO 內容工廠",
    metric: "5/day",
    copy: "每天抓熱門 AI 話題，產出文章、圖表、封面 prompt、sitemap 與社群推播。",
    items: ["趨勢搜尋", "文章生成", "自動發布"]
  }
];

const transformationStats = [
  { label: "客服回覆速度", value: "即時" },
  { label: "內容產能", value: "5 篇/日" },
  { label: "流程模組", value: "12+" },
  { label: "可接案服務", value: "4 類" }
];

export default async function HomePage() {
  const articles = await getAllArticles();
  const latestArticles = articles.slice(0, 4);
  const trendingTopics = fallbackTrendingTopics(5);

  return (
    <main>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 tech-grid opacity-50" />
        <div className="absolute left-10 top-16 h-80 w-80 rounded-full bg-cyber-blue/20 blur-3xl" />
        <div className="absolute right-0 top-32 h-96 w-96 rounded-full bg-cyber-purple/20 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-5 py-16 md:grid-cols-[1.05fr_0.95fr] md:items-center md:py-24">
          <div>
            <p className="inline-flex rounded-full border border-cyber-cyan/30 bg-cyber-cyan/10 px-4 py-2 font-display text-xs font-bold uppercase tracking-[0.24em] text-cyber-cyan">
              AI DIGITAL TRANSFORMATION PLATFORM
            </p>
            <h1 className="mt-6 max-w-4xl font-display text-5xl font-bold leading-tight tracking-tight text-cyber-title md:text-7xl">
              AI 數位轉型平台
            </h1>
            <p className="mt-6 max-w-2xl text-xl leading-9 text-cyber-muted">
              幫中小企業、創作者與接案者建立 AI 客服、自動化流程、內容生成、商業 SOP 與 AI Agent，讓 AI 不只是工具，而是能運轉的工作系統。
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {platformModules.map((item) => (
                <div key={item.title} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
                  <CheckCircle2 className="h-5 w-5 text-cyber-cyan" aria-hidden="true" />
                  <span className="font-bold text-cyber-title">{item.title}</span>
                </div>
              ))}
            </div>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link href="#demo" className="inline-flex items-center gap-2 rounded-full bg-cyber-cyan px-6 py-3 font-bold text-cyber-bg shadow-neon transition hover:-translate-y-0.5 hover:bg-white">
                查看 DEMO
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </Link>
              <Link href={siteConfig.lineUrl} className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 font-bold text-cyber-title backdrop-blur transition hover:-translate-y-0.5 hover:border-cyber-blue/60">
                <MessageCircle className="h-5 w-5" aria-hidden="true" />
                LINE 諮詢
              </Link>
            </div>
          </div>

          <div className="gradient-border neon-glow rounded-[2rem] p-px">
            <div className="glass-card relative overflow-hidden rounded-[1.9rem] p-6">
              <div className="absolute inset-0 tech-grid opacity-30" />
              <div className="relative">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-display text-xs font-bold uppercase tracking-[0.22em] text-cyber-blue">Platform Console</p>
                    <h2 className="mt-2 font-display text-2xl font-bold text-cyber-title">AI 轉型儀表板</h2>
                  </div>
                  <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-bold text-emerald-300">LIVE</span>
                </div>
                <div className="mt-7 grid gap-4 sm:grid-cols-2">
                  {transformationStats.map((stat) => (
                    <div key={stat.label} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                      <p className="font-display text-4xl font-black tracking-tight text-cyber-title">{stat.value}</p>
                      <p className="mt-2 text-sm text-cyber-muted">{stat.label}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-6 rounded-2xl border border-cyber-cyan/20 bg-cyber-cyan/10 p-5">
                  <div className="flex items-center gap-3">
                    <Zap className="h-5 w-5 text-cyber-cyan" />
                    <p className="font-bold text-cyber-title">今日自動任務</p>
                  </div>
                  <div className="mt-4 grid gap-3 text-sm text-cyber-muted">
                    <p>05:30 抓取熱門 AI 話題</p>
                    <p>05:50 發布 SEO 文章並寄出連結</p>
                    <p>06:10 推送 Facebook / Threads / LINE</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-12">
        <div className="grid gap-5 md:grid-cols-5">
          {platformModules.map((module) => {
            const Icon = module.icon;

            return (
              <div key={module.title} className="gradient-border rounded-3xl p-px transition hover:-translate-y-1">
                <div className="h-full rounded-[1.45rem] bg-cyber-panel/95 p-6">
                  <Icon className="h-7 w-7 text-cyber-cyan" />
                  <h2 className="mt-5 font-display text-xl font-bold text-cyber-title">{module.title}</h2>
                  <p className="mt-3 text-sm leading-7 text-cyber-muted">{module.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section id="demo" className="mx-auto max-w-7xl px-5 py-14">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-display text-xs font-bold uppercase tracking-[0.22em] text-cyber-purple">DEMO SHOWCASE</p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-cyber-title md:text-5xl">
              可展示的 AI 轉型成果
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-cyber-muted">
            不是只寫文章，而是把客服、自動化、內容與商業流程做成可 Demo、可報價、可交付的系統模組。
          </p>
        </div>
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {demoCards.map((demo) => (
            <div key={demo.title} className="glass-card overflow-hidden rounded-[2rem] p-6 transition hover:-translate-y-1">
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-cyber-purple/15 px-3 py-1 text-xs font-bold text-cyber-purple">{demo.label}</span>
                <span className="font-display text-4xl font-black text-cyber-cyan">{demo.metric}</span>
              </div>
              <h3 className="mt-5 font-display text-2xl font-bold text-cyber-title">{demo.title}</h3>
              <p className="mt-3 min-h-20 text-sm leading-7 text-cyber-muted">{demo.copy}</p>
              <div className="mt-6 rounded-3xl border border-white/10 bg-white/[0.04] p-4">
                {demo.items.map((item, index) => (
                  <div key={item} className="flex items-center gap-3 border-b border-white/10 py-3 last:border-b-0">
                    <span className="font-display text-sm font-black text-cyber-cyan">{String(index + 1).padStart(2, "0")}</span>
                    <span className="text-sm font-semibold text-cyber-text">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <SponsorBanner tools={tools.slice(0, 3)} />

      <section className="mx-auto max-w-7xl px-5 py-14">
        <div className="glass-card rounded-[2rem] p-6 md:p-8">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="font-display text-xs font-bold uppercase tracking-[0.22em] text-cyber-cyan">Trending Topics</p>
              <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-cyber-title">今日 AI 轉型選題</h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-cyber-muted">
              從最新 AI 話題中挑出能變成客服、自動化、內容與商業流程的題目。
            </p>
          </div>
          <div className="mt-7 grid gap-4 md:grid-cols-5">
            {trendingTopics.map((topic, index) => (
              <div key={topic.keyword} className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
                <p className="font-display text-3xl font-black text-cyber-cyan">{String(index + 1).padStart(2, "0")}</p>
                <h3 className="mt-4 font-display text-lg font-bold leading-snug text-cyber-title">{topic.keyword}</h3>
                <p className="mt-3 text-sm leading-6 text-cyber-muted">{topic.articleAngle}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <LatestArticleGrid articles={latestArticles} />

      <section className="mx-auto max-w-7xl px-5 pb-20 pt-6">
        <NewsletterCTA />
      </section>
    </main>
  );
}
