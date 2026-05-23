import { NextResponse } from "next/server";
import { callOpenAiJson, type ImagePromptResult } from "@/lib/content-factory";

export const runtime = "nodejs";

function fallbackPrompts(title: string): ImagePromptResult {
  return {
    coverPrompt: `一張溫暖現代的部落格封面圖，主題是「${title}」，台灣一人公司工作室場景，筆電、手寫筆記、LINE 訊息、自動化流程卡片，米白背景、深藍文字感、自然光、專業但有人味。`,
    midjourneyPrompt: `Taiwan solo entrepreneur workspace, warm modern editorial blog cover, laptop, notebook, AI workflow cards, LINE customer service concept, beige and deep navy palette, natural light, sophisticated, human-centered, topic: ${title} --ar 16:9 --v 6`,
    ideogramPrompt: `Create a warm modern blog cover for "${title}". Include subtle readable Traditional Chinese title space, Taiwan small business and AI automation vibe, beige background, deep navy accents, clean editorial layout.`
  };
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as { title?: string; category?: string };
  const title = body.title || "AI SEO 自動內容工廠";

  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json({ prompts: fallbackPrompts(title), source: "fallback" });
  }

  const result = await callOpenAiJson<ImagePromptResult>([
    {
      role: "system",
      content:
        "你是 AI 視覺總監。只回傳 JSON object：{\"coverPrompt\":\"\",\"midjourneyPrompt\":\"\",\"ideogramPrompt\":\"\"}。風格：科技感、溫暖、台灣創業、自媒體、不要冷冰冰 SaaS。"
    },
    {
      role: "user",
      content: `請根據文章標題「${title}」、分類「${body.category || "AI SEO"}」生成部落格封面圖 prompt、Midjourney Prompt、Ideogram Prompt。`
    }
  ]);

  return NextResponse.json({ prompts: result, source: "openai" });
}
