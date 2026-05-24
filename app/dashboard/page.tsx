import { CheckCircle2, CircleDashed, FileText, GitBranch, KeyRound, LineChart, Rocket, Search, TrendingUp } from "lucide-react";
import { getGeneratedArticles } from "@/lib/content-factory";
import { fallbackTrendingTopics } from "@/lib/daily-content-factory";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "內容工廠 Dashboard",
  description: "查看 AI SEO 自動內容工廠的文章、關鍵詞、SEO、GitHub 與 Zeabur 發布狀態。",
  path: "/dashboard"
});

const statusItems = [
  { label: "OpenAI API", ready: Boolean(process.env.OPENAI_API_KEY), icon: KeyRound },
  { label: "Perplexity API", ready: Boolean(process.env.PERPLEXITY_API_KEY), icon: Search },
  { label: "Tavily API", ready: Boolean(process.env.TAVILY_API_KEY), icon: Search },
  { label: "內容工廠金鑰", ready: Boolean(process.env.CONTENT_FACTORY_API_KEY), icon: KeyRound },
  { label: "Sitemap", ready: true, icon: Search },
  { label: "GitHub Push", ready: Boolean(process.env.GIT_AUTHOR_EMAIL), icon: GitBranch },
  { label: "Zeabur 部署", ready: true, icon: Rocket },
  { label: "Google 收錄追蹤", ready: Boolean(process.env.GOOGLE_SEARCH_CONSOLE_SITE_URL), icon: LineChart }
];

export default async function DashboardPage() {
  const generatedArticles = await getGeneratedArticles();
  const topics = fallbackTrendingTopics(5);
  const today = new Date().toISOString().slice(0, 10);
  const todayArticles = generatedArticles.filter((article) => article.publishDate === today);
  const publishRate = generatedArticles.length > 0 ? Math.round((Math.min(todayArticles.length, 5) / 5) * 100) : 0;

  return (
    <main>
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 tech-grid opacity-40" />
        <div className="absolute left-20 top-10 h-64 w-64 rounded-full bg-cyber-blue/20 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-5 py-14 md:py-20">
          <p className="font-display text-xs font-bold uppercase tracking-[0.22em] text-cyber-cyan">Content Factory Dashboard</p>
          <h1 className="mt-4 max-w-4xl font-display text-4xl font-bold tracking-tight text-cyber-title md:text-6xl">
            AI SEO 自動內容工廠
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-cyber-muted">
            檢查今日生成文章、熱門關鍵詞、Sitemap、GitHub Push、Zeabur 部署與社群推播狀態。
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-5 px-5 py-12 md:grid-cols-4">
        {[
          { label: "今日生成文章", value: todayArticles.length, icon: FileText },
          { label: "Google 收錄數", value: process.env.GOOGLE_INDEXED_COUNT || "待串接", icon: Search },
          { label: "發文成功率", value: `${publishRate}%`, icon: TrendingUp },
          { label: "熱門關鍵詞", value: topics.length, icon: LineChart }
        ].map((item) => {
          const Icon = item.icon;

          return (
            <div key={item.label} className="glass-card rounded-3xl p-6">
              <Icon className="h-6 w-6 text-cyber-cyan" />
              <p className="mt-5 font-display text-4xl font-black text-cyber-title">{item.value}</p>
              <p className="mt-2 text-sm text-cyber-muted">{item.label}</p>
            </div>
          );
        })}
      </section>

      <section className="mx-auto grid max-w-7xl gap-5 px-5 pb-12 md:grid-cols-4">
        {statusItems.map((item) => {
          const Icon = item.icon;

          return (
            <div key={item.label} className="glass-card rounded-3xl p-6">
              <div className="flex items-center justify-between">
                <Icon className="h-6 w-6 text-cyber-cyan" aria-hidden="true" />
                {item.ready ? <CheckCircle2 className="h-5 w-5 text-emerald-400" /> : <CircleDashed className="h-5 w-5 text-cyber-muted" />}
              </div>
              <p className="mt-5 font-display text-lg font-bold text-cyber-title">{item.label}</p>
              <p className="mt-2 text-sm text-cyber-muted">{item.ready ? "已設定或可用" : "待設定"}</p>
            </div>
          );
        })}
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-5 pb-20 lg:grid-cols-[1fr_0.9fr]">
        <div className="glass-card rounded-[2rem] p-6">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="font-display text-xs font-bold uppercase tracking-[0.22em] text-cyber-cyan">Generated Articles</p>
              <h2 className="mt-3 font-display text-3xl font-bold text-cyber-title">已生成文章</h2>
            </div>
            <p className="text-sm text-cyber-muted">{generatedArticles.length} 篇自動產生文章</p>
          </div>

          <div className="mt-6 grid gap-4">
            {generatedArticles.length === 0 ? (
              <div className="rounded-2xl bg-white/[0.04] p-6 text-cyber-muted">
                尚未透過 `/api/publish-daily-articles` 發布文章。n8n workflow 啟用後，文章會出現在這裡。
              </div>
            ) : (
              generatedArticles.slice(0, 8).map((article) => (
                <a key={article.slug} href={`/articles/${article.slug}`} className="flex gap-4 rounded-2xl bg-white/[0.04] p-5 transition hover:-translate-y-0.5 hover:bg-white/[0.07]">
                  <FileText className="mt-1 h-5 w-5 shrink-0 text-cyber-cyan" aria-hidden="true" />
                  <div>
                    <p className="font-bold text-cyber-title">{article.title}</p>
                    <p className="mt-1 text-sm text-cyber-muted">
                      {article.category} · {article.targetKeyword} · {article.publishDate}
                    </p>
                  </div>
                </a>
              ))
            )}
          </div>
        </div>

        <div className="glass-card rounded-[2rem] p-6">
          <p className="font-display text-xs font-bold uppercase tracking-[0.22em] text-cyber-purple">Trending Keywords</p>
          <h2 className="mt-3 font-display text-3xl font-bold text-cyber-title">今日熱門關鍵詞</h2>
          <div className="mt-6 grid gap-4">
            {topics.map((topic, index) => (
              <div key={topic.keyword} className="rounded-2xl bg-white/[0.04] p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-bold text-cyber-cyan">{topic.category}</p>
                    <h3 className="mt-2 font-display text-lg font-bold text-cyber-title">{topic.keyword}</h3>
                  </div>
                  <span className="font-display text-2xl font-black text-cyber-cyan">{String(index + 1).padStart(2, "0")}</span>
                </div>
                <p className="mt-3 text-sm leading-7 text-cyber-muted">{topic.articleAngle}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
