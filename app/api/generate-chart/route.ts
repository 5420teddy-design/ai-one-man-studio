import { NextResponse } from "next/server";
import { buildDefaultChartData, callOpenAiJson, type ChartResult } from "@/lib/content-factory";
import type { ChartType } from "@/data/articles";

export const runtime = "nodejs";

function safeChartType(input?: string): ChartType {
  return input === "bar" || input === "radar" || input === "matrix" ? input : "matrix";
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as {
    keyword?: string;
    category?: string;
    chartType?: ChartType;
  };
  const keyword = body.keyword || "AI SEO";
  const chartType = safeChartType(body.chartType);

  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json({
      chartType,
      chartData: buildDefaultChartData(),
      insight: "這份圖表以學習難度、變現速度、建置成本與長期價值評估優先順序。",
      source: "fallback"
    });
  }

  const result = await callOpenAiJson<ChartResult>([
    {
      role: "system",
      content:
        "你是商業分析師。只回傳 JSON object：{\"chartType\":\"bar|radar|matrix\",\"chartData\":[],\"insight\":\"\"}。bar 用 name/score，radar 用 name/value，matrix 用 name/difficulty/speed/cost/longTerm，數字 1-100。"
    },
    {
      role: "user",
      content: `請針對「${keyword}」生成 ${chartType} 圖表資料，可用於 AI SEO 文章中的工具比較、功能雷達、商業價值矩陣或價格比較。`
    }
  ]);

  return NextResponse.json({ ...result, chartType: safeChartType(result.chartType), source: "openai" });
}
