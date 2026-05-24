import type { ChartDatum, ChartType } from "@/data/articles";
import type { CategoryName } from "@/data/categories";
import {
  buildArticleSchemas,
  buildDefaultChartData,
  callOpenAiJson,
  createArticleFromAiPayload,
  extractJson,
  safeCategory,
  type GeneratedArticle
} from "@/lib/content-factory";

export type TrendingTopic = {
  keyword: string;
  category: CategoryName;
  trendScore: number;
  businessValue: number;
  seoDifficulty: number;
  socialBuzz: number;
  keywordVolume: number;
  articleAngle: string;
  suggestedTitle: string;
  sources: string[];
};

export type ArticleAssets = {
  coverPrompt: string;
  inlineImagePrompts: string[];
  chartData: {
    toolComparison: ChartDatum[];
    flowSteps: Array<{ name: string; description: string }>;
    radar: ChartDatum[];
    businessMatrix: ChartDatum[];
  };
  infographicData: {
    title: string;
    sections: Array<{ label: string; value: string; insight: string }>;
  };
};

const searchQueries = [
  "Google Trends AI tools ChatGPT Claude Gemini today",
  "site:reddit.com/r/artificial AI tools automation today",
  "site:news.ycombinator.com AI startup tools automation",
  "site:producthunt.com AI tools SaaS automation",
  "X Twitter AI tools ChatGPT Claude Gemini trending",
  "YouTube AI tools automation news today",
  "latest AI tools for business automation",
  "AI SaaS automation ChatGPT Claude Gemini Midjourney Runway"
];

export function fallbackTrendingTopics(limit = 5): TrendingTopic[] {
  const topics: TrendingTopic[] = [
    {
      keyword: "ChatGPT Agent 工作流",
      category: "AI自動化",
      trendScore: 94,
      businessValue: 92,
      seoDifficulty: 58,
      socialBuzz: 88,
      keywordVolume: 8200,
      articleAngle: "從個人助理走向可交付的自動化服務，分析一人公司如何包裝 Agent 工作流。",
      suggestedTitle: "ChatGPT Agent 工作流怎麼做？一人公司可落地的自動化服務拆解",
      sources: ["fallback", "AI automation"]
    },
    {
      keyword: "Claude 商用內容工作流",
      category: "AI工具推薦",
      trendScore: 90,
      businessValue: 89,
      seoDifficulty: 54,
      socialBuzz: 76,
      keywordVolume: 6400,
      articleAngle: "比較 Claude 在長文、企劃、顧問文件與內容網站的商業用途。",
      suggestedTitle: "Claude 適合商用嗎？內容、顧問與接案工作流完整分析",
      sources: ["fallback", "AI tools"]
    },
    {
      keyword: "AI 影片生成接案",
      category: "AI影片生成",
      trendScore: 87,
      businessValue: 91,
      seoDifficulty: 62,
      socialBuzz: 82,
      keywordVolume: 5300,
      articleAngle: "從短影音、配音、腳本與素材批次化切入，分析接案報價與交付方式。",
      suggestedTitle: "AI 影片生成接案怎麼做？從短影音到月費代營運的服務包裝",
      sources: ["fallback", "AI video"]
    },
    {
      keyword: "n8n LINE Bot 自動化",
      category: "AI自動化",
      trendScore: 86,
      businessValue: 95,
      seoDifficulty: 51,
      socialBuzz: 70,
      keywordVolume: 4700,
      articleAngle: "把 n8n、OpenAI API 與 LINE OA 串成中小企業客服與名單收集流程。",
      suggestedTitle: "n8n 串 LINE Bot 怎麼做？AI 客服與名單收集自動化實戰",
      sources: ["fallback", "LINE automation"]
    },
    {
      keyword: "AI SEO 內容工廠",
      category: "AI SEO",
      trendScore: 92,
      businessValue: 93,
      seoDifficulty: 66,
      socialBuzz: 79,
      keywordVolume: 7600,
      articleAngle: "分析如何用搜尋、AI 寫作、圖表與自動發布建立每日內容資產。",
      suggestedTitle: "AI SEO 內容工廠怎麼做？每天自動產文與導流的完整架構",
      sources: ["fallback", "SEO automation"]
    }
  ];

  return topics.slice(0, limit);
}

async function callTavily(query: string) {
  if (!process.env.TAVILY_API_KEY) {
    return [];
  }

  const response = await fetch("https://api.tavily.com/search", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      api_key: process.env.TAVILY_API_KEY,
      query,
      search_depth: "advanced",
      max_results: 5,
      include_answer: true
    })
  });

  if (!response.ok) {
    return [];
  }

  const payload = (await response.json()) as { answer?: string; results?: Array<{ title?: string; content?: string; url?: string }> };
  return [payload.answer, ...(payload.results || []).map((item) => `${item.title}\n${item.content}\n${item.url}`)].filter(Boolean);
}

async function callPerplexitySummary(query: string) {
  if (!process.env.PERPLEXITY_API_KEY) {
    return "";
  }

  const response = await fetch("https://api.perplexity.ai/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.PERPLEXITY_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: process.env.PERPLEXITY_MODEL || "sonar",
      messages: [
        {
          role: "system",
          content: "Summarize current AI trend signals with sources. Keep it concise."
        },
        {
          role: "user",
          content: query
        }
      ]
    })
  });

  if (!response.ok) {
    return "";
  }

  const payload = (await response.json()) as { choices?: Array<{ message?: { content?: string } }> };
  return payload.choices?.[0]?.message?.content || "";
}

export async function getTrendingTopics(limit = 5): Promise<TrendingTopic[]> {
  const evidence: string[] = [];

  for (const query of searchQueries) {
    const [perplexity, tavily] = await Promise.all([callPerplexitySummary(query), callTavily(query)]);
    evidence.push(`QUERY: ${query}\n${perplexity}\n${tavily.join("\n---\n")}`);
  }

  if (!process.env.OPENAI_API_KEY || evidence.every((item) => item.trim().length < 20)) {
    return fallbackTrendingTopics(limit);
  }

  const result = await callOpenAiJson<{ topics: TrendingTopic[] }>([
    {
      role: "system",
      content:
        "你是 AI SEO 總編輯與趨勢分析師。只回傳 JSON object：{\"topics\":[]}。每個 topic 必須包含 keyword, category, trendScore, businessValue, seoDifficulty, socialBuzz, keywordVolume, articleAngle, suggestedTitle, sources。category 必須是八大分類之一。分數 1-100。"
    },
    {
      role: "user",
      content: `根據以下搜尋資料，挑出最值得今天寫的 ${limit} 個 AI SEO 主題。請偏向台灣創作者、接案者、中小企業、AI 工具與自動化商業化。\n\n${evidence.join("\n\n====\n\n")}`
    }
  ]);

  return result.topics
    .map((topic) => ({
      ...topic,
      category: safeCategory(topic.category),
      trendScore: clampScore(topic.trendScore),
      businessValue: clampScore(topic.businessValue),
      seoDifficulty: clampScore(topic.seoDifficulty),
      socialBuzz: clampScore(topic.socialBuzz),
      keywordVolume: Number(topic.keywordVolume) || 1000,
      sources: topic.sources?.length ? topic.sources : ["perplexity", "tavily"]
    }))
    .sort((a, b) => b.trendScore + b.businessValue - (a.trendScore + a.businessValue))
    .slice(0, limit);
}

export async function generateArticleAssets(topic: Pick<TrendingTopic, "keyword" | "category" | "suggestedTitle" | "articleAngle">): Promise<ArticleAssets> {
  if (!process.env.OPENAI_API_KEY) {
    return fallbackArticleAssets(topic);
  }

  return callOpenAiJson<ArticleAssets>([
    {
      role: "system",
      content:
        "你是 AI 科技媒體美術編輯與資料視覺化顧問。只回傳 JSON object，欄位 coverPrompt, inlineImagePrompts, chartData, infographicData。封面比例 1200x630，風格深藍黑、neon glow、glassmorphism、cyber grid、台灣 AI 創業。"
    },
    {
      role: "user",
      content: `請為文章「${topic.suggestedTitle}」生成封面 prompt、3 個段落插圖 prompt、工具比較圖、流程圖、雷達圖、商業矩陣圖與 infographic data。主題：${topic.keyword}，分類：${topic.category}，角度：${topic.articleAngle}`
    }
  ]);
}

export async function generateDailyArticle(topic: TrendingTopic): Promise<GeneratedArticle> {
  const assets = await generateArticleAssets(topic);

  if (!process.env.OPENAI_API_KEY) {
    return createArticleFromAiPayload({
      keyword: topic.keyword,
      category: topic.category,
      title: topic.suggestedTitle,
      h1: topic.suggestedTitle,
      metaDescription: `${topic.keyword} 的最新趨勢、工具比較、使用情境與一人公司商業化分析。`,
      description: `從科技媒體與 AI 顧問角度，拆解 ${topic.keyword} 的趨勢、工具、案例與變現路線。`,
      searchIntent: "讀者想掌握最新 AI 趨勢、工具差異、實作方式與商業價值。",
      outline: ["今日趨勢背景", "工具與技術比較", "台灣使用情境", "優缺點與風險", "一人公司變現路線"],
      content: fallbackLongContent(topic),
      chartType: "matrix",
      chartData: assets.chartData.businessMatrix,
      monetizationAngle: "可延伸為 AI 顧問、內容網站、LINE 客服、自動化流程與接案服務包裝。",
      tags: [topic.keyword, topic.category, "AI 趨勢", "AI 一人公司"],
      imagePrompts: {
        coverPrompt: assets.coverPrompt,
        midjourneyPrompt: assets.coverPrompt,
        ideogramPrompt: assets.coverPrompt
      }
    });
  }

  const payload = await callOpenAiJson<Partial<GeneratedArticle>>([
    {
      role: "system",
      content:
        "你是台灣 AI 科技媒體總編輯與 AI 顧問。只回傳 JSON object。文章繁體中文、2500-4000字、台灣口語、像科技媒體+顧問、有觀點、有案例、有優缺點、有商業分析、有使用情境、有工具比較、有真實感，不要 AI 味。"
    },
    {
      role: "user",
      content: `請根據今日趨勢主題生成完整 SEO 文章。主題 JSON：${JSON.stringify(topic)}。素材 JSON：${JSON.stringify(assets)}。欄位必須包含 title, slug, metaDescription, h1, description, targetKeyword, searchIntent, outline, chartType, chartData, monetizationAngle, readingTime, faq, cta, tags, content。content 使用 Markdown H2/H3，加入中段 LINE CTA、延伸閱讀、AI 工具推薦段落。`
    }
  ]);

  return createArticleFromAiPayload({
    ...payload,
    keyword: topic.keyword,
    category: topic.category,
    title: payload.title || topic.suggestedTitle,
    chartData: payload.chartData || assets.chartData.businessMatrix,
    imagePrompts: {
      coverPrompt: assets.coverPrompt,
      midjourneyPrompt: assets.coverPrompt,
      ideogramPrompt: assets.coverPrompt
    },
    schema: payload.schema || buildArticleSchemas({
      title: payload.title || topic.suggestedTitle,
      description: payload.description || topic.articleAngle,
      slug: payload.slug || topic.keyword,
      publishDate: new Date().toISOString().slice(0, 10),
      category: topic.category,
      faq: payload.faq || []
    })
  });
}

function fallbackArticleAssets(topic: Pick<TrendingTopic, "keyword" | "suggestedTitle">): ArticleAssets {
  return {
    coverPrompt: `1200x630 tech media cover for ${topic.suggestedTitle}, dark navy background, AI glowing network lines, futuristic UI, Taiwan AI startup vibe, glassmorphism, neon cyan and purple glow, cyber grid`,
    inlineImagePrompts: [
      `${topic.keyword} workflow dashboard, dark tech media style, neon cyan lines`,
      `${topic.keyword} tool comparison table, glassmorphism UI, cyberpunk navy background`,
      `${topic.keyword} business strategy canvas, Taiwan solo founder workspace, neon glow`
    ],
    chartData: {
      toolComparison: [
        { name: "ChatGPT", score: 94 },
        { name: "Claude", score: 91 },
        { name: "Gemini", score: 86 },
        { name: "Perplexity", score: 88 }
      ],
      flowSteps: [
        { name: "搜尋", description: "抓取今日熱門 AI 訊號" },
        { name: "分析", description: "評估 SEO 與商業價值" },
        { name: "生成", description: "產出文章、圖表與封面 prompt" },
        { name: "發布", description: "GitHub push 後由 Zeabur 部署" }
      ],
      radar: [
        { name: "搜尋熱度", value: 88 },
        { name: "商業價值", value: 92 },
        { name: "內容深度", value: 84 },
        { name: "接案潛力", value: 90 }
      ],
      businessMatrix: buildDefaultChartData()
    },
    infographicData: {
      title: `${topic.keyword} 商業化路線`,
      sections: [
        { label: "工具", value: "AI Stack", insight: "先用成熟工具降低交付成本" },
        { label: "流程", value: "Automation", insight: "把可重複工作流程化" },
        { label: "變現", value: "Service", insight: "包裝成接案、顧問或月費服務" }
      ]
    }
  };
}

function fallbackLongContent(topic: TrendingTopic) {
  return `## 今日趨勢背景\n\n${topic.keyword} 之所以值得今天寫，不只是因為社群討論升溫，而是它剛好卡在一人公司最在意的三件事：能不能省時間、能不能拿來交付、能不能變成收入。從 ${topic.articleAngle} 這個角度切入，讀者會更容易理解它和自己的工作有什麼關係。\n\n## 工具與技術比較\n\n如果只是追工具，很容易陷入訂閱越來越多、流程卻沒有變快的狀態。比較合理的做法，是先把 ChatGPT、Claude、Gemini、Perplexity、n8n、Zeabur 這類工具放進同一條工作流：搜尋負責找訊號，模型負責整理與生成，自動化工具負責串接，部署平台負責把成果上線。\n\n## 台灣使用情境\n\n對台灣接案者與中小企業來說，${topic.keyword} 最適合從小流程開始，例如客服回覆、內容選題、報價前資料整理、LINE 名單導流，或把既有服務整理成標準方案。這些場景不需要一開始就做成大型 SaaS，但需要有清楚的 SOP。\n\n## 優點與風險\n\n優點是速度快、成本低、可測試性高；風險是內容容易同質化，流程也可能因為缺少人工檢查而失控。因此每一篇 AI 文章或每一條自動化流程，都應該保留人的判斷：哪些觀點值得說、哪些限制要提醒、哪些情境不適合使用。\n\n## 商業化路線\n\n一人公司可以把 ${topic.keyword} 包裝成三種產品：第一是顧問診斷，幫客戶找出最該自動化的流程；第二是建置服務，直接交付網站、LINE Bot 或內容工廠；第三是維護月費，持續追蹤成效、更新內容與修正流程。\n\n## LINE CTA\n\n想用 AI 做網站、自動化、LINE 客服？加入 LINE 免費諮詢。`;
}

function clampScore(value: number) {
  return Math.max(1, Math.min(100, Number(value) || 50));
}
