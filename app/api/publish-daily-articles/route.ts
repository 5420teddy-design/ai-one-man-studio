import { NextResponse } from "next/server";
import { generateDailyArticle, getTrendingTopics, type TrendingTopic } from "@/lib/daily-content-factory";
import { sendDailyArticleEmail } from "@/lib/email-notifier";
import { getAutomationSecretError, runGitPublish, saveGeneratedArticle, type GeneratedArticle } from "@/lib/content-factory";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const authError = getAutomationSecretError(request);

  if (authError) {
    return NextResponse.json({ error: authError }, { status: authError.includes("Unauthorized") ? 401 : 500 });
  }

  const body = (await request.json().catch(() => ({}))) as {
    topics?: TrendingTopic[];
    articles?: GeneratedArticle[];
    limit?: number;
    commit?: boolean;
  };
  const limit = Math.min(Math.max(body.limit || 5, 1), 5);
  const topics = body.topics?.length ? body.topics.slice(0, limit) : await getTrendingTopics(limit);
  const articles = body.articles?.length ? body.articles.slice(0, limit) : await Promise.all(topics.map((topic) => generateDailyArticle(topic)));
  const saved = await Promise.all(articles.map((article) => saveGeneratedArticle(article)));
  const git = body.commit === false ? [] : await runGitPublish(`Publish ${articles.length} daily AI articles`);
  const email = await sendDailyArticleEmail(articles);

  return NextResponse.json({
    count: articles.length,
    articles: articles.map((article) => ({
      title: article.title,
      slug: article.slug,
      category: article.category,
      url: `/articles/${article.slug}`
    })),
    saved,
    git,
    email,
    sitemap: "Sitemap is generated dynamically from data/articles on the next build.",
    deployedBy: "GitHub push triggers Zeabur deployment when repository auto-deploy is enabled."
  });
}
