import { CheckCircle2, CircleDashed, FileText, GitBranch, KeyRound, LineChart, Rocket, Search } from "lucide-react";
import { getGeneratedArticles } from "@/lib/content-factory";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "內容工廠 Dashboard",
  description: "查看 AI SEO 自動內容工廠的文章、關鍵詞、SEO、GitHub 與 Zeabur 發布狀態。",
  path: "/dashboard"
});

const statusItems = [
  {
    label: "OpenAI API",
    ready: Boolean(process.env.OPENAI_API_KEY),
    icon: KeyRound
  },
  {
    label: "內容工廠金鑰",
    ready: Boolean(process.env.CONTENT_FACTORY_API_KEY),
    icon: KeyRound
  },
  {
    label: "Sitemap",
    ready: true,
    icon: Search
  },
  {
    label: "GitHub Push",
    ready: Boolean(process.env.GIT_AUTHOR_EMAIL),
    icon: GitBranch
  },
  {
    label: "Zeabur 部署",
    ready: true,
    icon: Rocket
  },
  {
    label: "SEO 追蹤",
    ready: Boolean(process.env.GOOGLE_SEARCH_CONSOLE_SITE_URL),
    icon: LineChart
  }
];

export default async function DashboardPage() {
  const generatedArticles = await getGeneratedArticles();

  return (
    <main>
      <section className="mx-auto max-w-7xl px-5 py-14 md:py-20">
        <p className="text-sm font-bold text-clay">Content Factory</p>
        <h1 className="mt-3 max-w-3xl text-4xl font-bold tracking-normal text-ink md:text-5xl">
          AI SEO 自動內容工廠 Dashboard
        </h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-muted">
          這裡用來檢查已生成文章、SEO 內容資產、GitHub 發布與 Zeabur 部署狀態。第一階段先以本地檔案與環境變數狀態呈現，後續可串 Google Search Console API。
        </p>
      </section>

      <section className="mx-auto grid max-w-7xl gap-5 px-5 pb-12 md:grid-cols-3">
        {statusItems.map((item) => {
          const Icon = item.icon;

          return (
            <div key={item.label} className="rounded-[1.5rem] border border-slate-900/10 bg-paper p-6 shadow-soft">
              <div className="flex items-center justify-between">
                <Icon className="h-6 w-6 text-clay" aria-hidden="true" />
                {item.ready ? <CheckCircle2 className="h-5 w-5 text-emerald-600" /> : <CircleDashed className="h-5 w-5 text-muted" />}
              </div>
              <p className="mt-5 text-lg font-bold text-ink">{item.label}</p>
              <p className="mt-2 text-sm text-muted">{item.ready ? "已設定或可用" : "待設定"}</p>
            </div>
          );
        })}
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-20">
        <div className="rounded-[1.5rem] border border-slate-900/10 bg-paper p-6 shadow-soft">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-bold text-clay">Generated Articles</p>
              <h2 className="mt-2 text-3xl font-bold text-ink">已生成文章</h2>
            </div>
            <p className="text-sm text-muted">{generatedArticles.length} 篇自動產生文章</p>
          </div>

          <div className="mt-6 grid gap-4">
            {generatedArticles.length === 0 ? (
              <div className="rounded-2xl bg-white p-6 text-muted">
                尚未透過 `/api/publish-article` 發布文章。n8n workflow 啟用後，文章會出現在這裡。
              </div>
            ) : (
              generatedArticles.map((article) => (
                <a key={article.slug} href={`/articles/${article.slug}`} className="flex gap-4 rounded-2xl bg-white p-5 shadow-sm transition hover:-translate-y-0.5">
                  <FileText className="mt-1 h-5 w-5 shrink-0 text-clay" aria-hidden="true" />
                  <div>
                    <p className="font-bold text-ink">{article.title}</p>
                    <p className="mt-1 text-sm text-muted">
                      {article.category} · {article.targetKeyword} · {article.publishDate}
                    </p>
                  </div>
                </a>
              ))
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
