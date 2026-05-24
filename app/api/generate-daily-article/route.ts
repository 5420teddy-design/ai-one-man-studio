import { NextResponse } from "next/server";
import { fallbackTrendingTopics, generateDailyArticle, type TrendingTopic } from "@/lib/daily-content-factory";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as { topic?: TrendingTopic };
  const topic = body.topic || fallbackTrendingTopics(1)[0];
  const article = await generateDailyArticle(topic);

  return NextResponse.json({ article, generatedAt: new Date().toISOString() });
}
