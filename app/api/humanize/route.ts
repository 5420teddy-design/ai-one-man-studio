import { NextResponse } from "next/server";
import { callOpenAiJson } from "@/lib/content-factory";

export const runtime = "nodejs";

type HumanizeResponse = {
  content: string;
  notes: string[];
};

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as { content?: string; title?: string };

  if (!body.content) {
    return NextResponse.json({ error: "content is required." }, { status: 400 });
  }

  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json({
      content: body.content,
      notes: ["OPENAI_API_KEY is not configured. Returned original content."]
    });
  }

  const result = await callOpenAiJson<HumanizeResponse>([
    {
      role: "system",
      content:
        "你是台灣創業顧問與自媒體經營者。只回傳 JSON object：{\"content\":\"\",\"notes\":[]}。任務是去 AI 味，增加故事感、情境、主觀判斷、缺點、比較與台灣讀者會懂的說法。"
    },
    {
      role: "user",
      content: `文章標題：${body.title || "未命名"}\n\n請重寫以下內容，保持 SEO 結構，但讓語氣像真人顧問：\n\n${body.content}`
    }
  ]);

  return NextResponse.json(result);
}
