import { notFound } from "next/navigation";
import { ArticleChart } from "@/components/ArticleChart";
import { CTASection } from "@/components/CTASection";
import { JsonLd } from "@/lib/article-schema";
import { getAllArticles, getAnyArticleBySlug, isGeneratedArticle } from "@/lib/all-articles";
import { createMetadata } from "@/lib/seo";
import { categoryLabelToPath, formatDate } from "@/lib/utils";

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
        return (
          <h2 key={block} className="pt-4 text-2xl font-bold text-ink">
            {block.replace(/^## /, "")}
          </h2>
        );
      }

      if (block.startsWith("### ")) {
        return (
          <h3 key={block} className="pt-2 text-xl font-bold text-ink">
            {block.replace(/^### /, "")}
          </h3>
        );
      }

      return (
        <p key={block} className="leading-8 text-muted">
          {block}
        </p>
      );
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
      <article className="mx-auto max-w-4xl px-5 py-14 md:py-20">
        <a href={categoryLabelToPath(article.category)} className="rounded-full bg-white px-4 py-2 text-sm font-bold text-clay shadow-sm">
          {article.category}
        </a>
        <h1 className="mt-6 text-4xl font-bold leading-tight tracking-normal text-ink md:text-6xl">{article.title}</h1>
        <div className="mt-5 flex flex-wrap gap-3 text-sm text-muted">
          <span>目標關鍵詞：{article.targetKeyword}</span>
          <span>閱讀時間：{article.readingTime} 分鐘</span>
          <span>發布日期：{formatDate(article.publishDate)}</span>
        </div>
        <p className="mt-8 rounded-[1.5rem] border border-slate-900/10 bg-paper p-6 text-lg leading-9 text-muted shadow-soft">
          {article.description}
        </p>

        <section className="mt-10">
          <h2 className="text-2xl font-bold text-ink">搜尋意圖</h2>
          <p className="mt-3 leading-8 text-muted">{article.searchIntent}</p>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-bold text-ink">文章大綱</h2>
          <ol className="mt-5 grid gap-3">
            {article.outline.map((item, index) => (
              <li key={item} className="rounded-2xl bg-white p-4 leading-7 text-muted shadow-sm">
                <span className="mr-3 font-bold text-clay">{index + 1}.</span>
                {item}
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-bold text-ink">重點內容</h2>
          <div className="mt-5 space-y-5">
            {isGeneratedArticle(article)
              ? renderGeneratedContent(article.content)
              : article.outline.slice(0, 4).map((item) => (
                  <p key={item} className="leading-8 text-muted">
                    {item}。建議先從目前最頻繁、最耗時、最容易量化的工作開始，例如回覆詢問、整理資料、產出內容或製作報表。當流程能穩定重複，就能把它變成服務、模板或內部 SOP。
                  </p>
                ))}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-bold text-ink">數據圖表</h2>
          <p className="mt-3 leading-8 text-muted">
            以下用簡化分數觀察這個主題的落地難度、變現速度與長期價值，適合做為優先順序判斷。
          </p>
          <div className="mt-5">
            <ArticleChart article={article} />
          </div>
        </section>

        <section className="mt-10 rounded-[1.5rem] bg-cream p-6">
          <h2 className="text-2xl font-bold text-ink">變現角度</h2>
          <p className="mt-3 leading-8 text-muted">{article.monetizationAngle}</p>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-bold text-ink">FAQ</h2>
          <div className="mt-5 grid gap-4">
            {article.faq.map((item) => (
              <div key={item.question} className="rounded-[1.25rem] bg-white p-5 shadow-sm">
                <h3 className="font-bold text-ink">{item.question}</h3>
                <p className="mt-2 leading-7 text-muted">{item.answer}</p>
              </div>
            ))}
          </div>
        </section>
      </article>
      <section className="mx-auto max-w-7xl px-5 pb-20">
        <CTASection />
      </section>
    </main>
  );
}
