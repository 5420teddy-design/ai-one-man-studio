import { NextResponse } from "next/server";
import { buildKeywordFallback, callOpenAiJson, safeCategory, type SeoKeyword } from "@/lib/content-factory";

export const runtime = "nodejs";

type KeywordResponse = {
  keywords: SeoKeyword[];
};

function normalizeKeywords(items: SeoKeyword[]) {
  return items.map((item) => ({
    keyword: String(item.keyword),
    intent: String(item.intent),
    difficulty: Math.max(1, Math.min(100, Number(item.difficulty) || 50)),
    businessValue: Math.max(1, Math.min(100, Number(item.businessValue) || 70)),
    category: safeCategory(item.category)
  }));
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as { topic?: string; limit?: number };
  const topic = body.topic || "AI SEO";
  const limit = Math.min(Math.max(body.limit || 50, 1), 50);

  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json({
      keywords: buildKeywordFallback(topic, limit),
      source: "fallback",
      warning: "OPENAI_API_KEY is not configured."
    });
  }

  const result = await callOpenAiJson<KeywordResponse>([
    {
      role: "system",
      content:
        "你是台灣 AI SEO 顧問。只回傳 JSON object，格式為 {\"keywords\":[{\"keyword\":\"\",\"intent\":\"\",\"difficulty\":0,\"businessValue\":0,\"category\":\"\"}]}。category 只能是：AI工具推薦、AI自動化、AI接案、AI圖像生成、AI影片生成、AI SEO、AI教學、AI商業變現。difficulty 與 businessValue 為 1-100。"
    },
    {
      role: "user",
      content: `請針對主題「${topic}」產生 ${limit} 個繁體中文長尾 SEO 關鍵詞。要偏向台灣創作者、接案者、中小企業老闆會搜尋的語氣，包含搜尋意圖、商業價值、SEO 難度、適合分類。`
    }
  ]);

  return NextResponse.json({ keywords: normalizeKeywords(result.keywords).slice(0, limit), source: "openai" });
}
