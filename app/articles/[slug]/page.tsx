import { notFound } from "next/navigation";
import { ArticleChart } from "@/components/ArticleChart";
import { ArticleHero } from "@/components/ArticleHero";
import { NewsletterCTA } from "@/components/NewsletterCTA";
import { ProseContent } from "@/components/ProseContent";
import { JsonLd } from "@/lib/article-schema";
import { getAllArticles, getAnyArticleBySlug, isGeneratedArticle } from "@/lib/all-articles";
import { createMetadata } from "@/lib/seo";

type ArticlePageProps = {
  params: {
    slug: string;
  };
};

export async function generateStaticParams() {
  const allArticles = await getAllArticles();

  return allArticles.map((article) => ({
    slug: article.slug
  }));
}

export async function generateMetadata({ params }: ArticlePageProps) {
  const article = await getAnyArticleBySlug(params.slug);

  if (!article) {
    return createMetadata({ title: "文章不存在", path: `/articles/${params.slug}` });
  }

  return createMetadata({
    title: article.title,
    description: article.description,
    path: `/articles/${article.slug}`
  });
}

function renderGeneratedContent(content: string) {
  return content
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean)
    .map((block) => {
      if (block.startsWith("## ")) {
        return <h2 key={block}>{block.replace(/^## /, "")}</h2>;
      }

      if (block.startsWith("### ")) {
        return <h3 key={block}>{block.replace(/^### /, "")}</h3>;
      }

      if (block.startsWith("> ")) {
        return <blockquote key={block}>{block.replace(/^> /, "")}</blockquote>;
      }

      return <p key={block}>{block}</p>;
    });
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const article = await getAnyArticleBySlug(params.slug);

  if (!article) {
    notFound();
  }

  return (
    <main>
      <JsonLd article={article} />
      <ArticleHero article={article} />

      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-14 lg:grid-cols-[1fr_320px]">
        <div>
          <ProseContent>
            <p className="rounded-3xl border border-cyber-cyan/20 bg-cyber-cyan/10 p-6 text-cyber-text">
              {article.description}
            </p>

            <h2>搜尋意圖</h2>
            <p>{article.searchIntent}</p>

            <h2>文章大綱</h2>
            <div className="grid gap-3">
              {article.outline.map((item, index) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                  <span className="mr-3 font-display font-black text-cyber-cyan">{String(index + 1).padStart(2, "0")}</span>
                  {item}
                </div>
              ))}
            </div>

            <blockquote>
              一人公司導入 AI 的重點不是把所有事情自動化，而是先找出最容易被重複、最能被衡量、最接近成交的工作節點。
            </blockquote>

            <h2>重點內容</h2>
            {isGeneratedArticle(article)
              ? renderGeneratedContent(article.content)
              : article.outline.slice(0, 4).map((item) => (
                  <p key={item}>
                    {item}。建議先從目前最頻繁、最耗時、最容易量化的工作開始，例如回覆詢問、整理資料、產出內容或製作報表。當流程能穩定重複，就能把它變成服務、模板或內部 SOP。
                  </p>
                ))}

            <h2>數據圖表</h2>
            <p>以下用簡化分數觀察這個主題的落地難度、變現速度與長期價值，適合做為優先順序判斷。</p>
          </ProseContent>

          <div className="mx-auto mt-6 max-w-[760px]">
            <ArticleChart article={article} />
          </div>

          <ProseContent>
            <h2>變現角度</h2>
            <p className="rounded-3xl border border-cyber-purple/20 bg-cyber-purple/10 p-6 text-cyber-text">
              {article.monetizationAngle}
            </p>

            <h2>FAQ</h2>
            <div className="grid gap-4">
              {article.faq.map((item) => (
                <div key={item.question} className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
                  <h3>{item.question}</h3>
                  <p>{item.answer}</p>
                </div>
              ))}
            </div>
          </ProseContent>
        </div>

        <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
          <NewsletterCTA />
          <div className="glass-card rounded-3xl p-6">
            <p className="font-display text-sm font-bold uppercase tracking-[0.18em] text-cyber-cyan">Tags</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <span key={tag} className="rounded-full border border-white/10 px-3 py-2 text-sm text-cyber-muted">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </aside>
      </section>
    </main>
  );
}
