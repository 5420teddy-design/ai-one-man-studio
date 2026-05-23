import { NextResponse } from "next/server";
import { callOpenAiJson, createArticleFromAiPayload, safeCategory, type GeneratedArticle } from "@/lib/content-factory";

export const runtime = "nodejs";

function fallbackArticle(keyword: string, category: string) {
  return createArticleFromAiPayload({
    keyword,
    category,
    title: `${keyword}完整指南：一人公司怎麼落地`,
    h1: `${keyword}完整指南`,
    metaDescription: `用台灣一人公司角度拆解 ${keyword} 的工具、流程、優缺點與變現方式。`,
    searchIntent: "讀者想知道如何開始、需要哪些工具、成本多高，以及是否能變成接案或顧問服務。",
    outline: ["真實使用情境", "工具與流程設計", "優點與限制", "商業變現做法", "LINE 導流與下一步"],
    content: `## 先從一個真實情境開始\n\n很多人搜尋「${keyword}」時，其實不是想看一堆工具名單，而是想知道自己明天能不能真的用上。對一人公司來說，最重要的是先找到一個會重複發生、又能明顯省時間的場景。\n\n## 實作流程\n\n第一步是把目前流程寫下來，第二步才是選工具。你可以先用 AI 產出草稿，再加入自己的判斷、案例與限制，最後把流程整理成客戶看得懂的交付品。\n\n## 優點與缺點\n\n優點是速度快、成本低、能快速測試市場反應。缺點是如果沒有人工檢查，很容易產出空泛內容，或做出看似自動化但無法維護的流程。\n\n## 商業角度\n\n${keyword} 可以包裝成顧問診斷、流程建置、內容網站、LINE 客服或每月維護方案。真正能收費的不是工具本身，而是你幫客戶省下的時間與降低的錯誤率。`,
    monetizationAngle: "可包裝成 AI 顧問診斷、網站建置、自動化流程或 LINE 客服導入服務。"
  });
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as { keyword?: string; category?: string };
  const keyword = body.keyword || "AI SEO 自動內容工廠";
  const category = safeCategory(body.category);

  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json({
      article: fallbackArticle(keyword, category),
      source: "fallback",
      warning: "OPENAI_API_KEY is not configured."
    });
  }

  const payload = await callOpenAiJson<Partial<GeneratedArticle>>([
    {
      role: "system",
      content:
        "你是台灣 AI SEO 顧問、自媒體經營者與一人公司產品經理。只回傳 JSON object。文章要繁體中文、自然、有主觀觀點、有人味、有情境、有優缺點、有商業角度。不要使用空泛 AI 官腔。"
    },
    {
      role: "user",
      content: `請為關鍵詞「${keyword}」、分類「${category}」生成 SEO 文章 JSON。欄位必須包含 title, slug, metaDescription, h1, description, targetKeyword, searchIntent, outline(string[]), chartType(bar/radar/matrix), chartData, monetizationAngle, readingTime, faq([{question,answer}]), cta, content。content 請用 Markdown，長度 2000-3000 字，包含 H2、實務情境、優缺點比較、商業化建議、LINE 導流 CTA。slug 請用英文小寫與 dash。`
    }
  ]);

  return NextResponse.json({ article: createArticleFromAiPayload({ ...payload, keyword, category }), source: "openai" });
}
