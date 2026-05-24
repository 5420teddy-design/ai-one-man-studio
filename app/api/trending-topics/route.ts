import { NextResponse } from "next/server";
import { getTrendingTopics } from "@/lib/daily-content-factory";

export const runtime = "nodejs";
export const revalidate = 1800;

export async function GET() {
  const topics = await getTrendingTopics(5);
  return NextResponse.json({ topics, generatedAt: new Date().toISOString() });
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as { limit?: number };
  const topics = await getTrendingTopics(Math.min(Math.max(body.limit || 5, 1), 10));

  return NextResponse.json({ topics, generatedAt: new Date().toISOString() });
}
