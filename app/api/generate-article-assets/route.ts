import { NextResponse } from "next/server";
import { fallbackTrendingTopics, generateArticleAssets, type TrendingTopic } from "@/lib/daily-content-factory";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as {
    topic?: TrendingTopic;
    keyword?: string;
    category?: TrendingTopic["category"];
    suggestedTitle?: string;
    articleAngle?: string;
  };

  const fallback = fallbackTrendingTopics(1)[0];
  const topic = body.topic || {
    ...fallback,
    keyword: body.keyword || fallback.keyword,
    category: body.category || fallback.category,
    suggestedTitle: body.suggestedTitle || body.keyword || fallback.suggestedTitle,
    articleAngle: body.articleAngle || fallback.articleAngle
  };
  const assets = await generateArticleAssets(topic);

  return NextResponse.json({ assets, generatedAt: new Date().toISOString() });
}
