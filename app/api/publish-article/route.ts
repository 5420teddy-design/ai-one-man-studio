import { NextResponse } from "next/server";
import {
  createArticleFromAiPayload,
  getAutomationSecretError,
  runGitPublish,
  saveGeneratedArticle,
  type GeneratedArticle
} from "@/lib/content-factory";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const authError = getAutomationSecretError(request);

  if (authError) {
    return NextResponse.json({ error: authError }, { status: authError.includes("Unauthorized") ? 401 : 500 });
  }

  const body = (await request.json().catch(() => ({}))) as {
    article?: Partial<GeneratedArticle>;
    keyword?: string;
    category?: string;
    imagePrompts?: GeneratedArticle["imagePrompts"];
    chart?: {
      chartType?: GeneratedArticle["chartType"];
      chartData?: GeneratedArticle["chartData"];
    };
    commit?: boolean;
  };

  const article = createArticleFromAiPayload({
    ...(body.article || {}),
    chartType: body.chart?.chartType || body.article?.chartType,
    chartData: body.chart?.chartData || body.article?.chartData,
    keyword: body.keyword,
    category: body.article?.category || body.category,
    imagePrompts: body.imagePrompts || body.article?.imagePrompts
  });

  const paths = await saveGeneratedArticle(article);
  const git = body.commit === false ? [] : await runGitPublish(`Publish article: ${article.title}`);

  return NextResponse.json({
    article,
    paths,
    git,
    nextSteps: [
      "After GitHub push succeeds, Zeabur should redeploy from the repository webhook.",
      "Check Google Search Console for sitemap discovery and indexing status."
    ]
  });
}
