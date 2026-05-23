export type Tool = {
  name: string;
  category: string;
  description: string;
  bestFor: string;
  pricing: string;
  difficulty: number;
  businessValue: number;
  officialUrl: string;
  affiliateUrl: string;
  score: number;
};

export const tools: Tool[] = [
  {
    name: "ChatGPT",
    category: "文字與助理",
    description: "適合企劃、客服、內容、程式與日常工作協作的通用 AI 助理。",
    bestFor: "一人公司日常工作台",
    pricing: "免費 / 付費",
    difficulty: 2,
    businessValue: 95,
    officialUrl: "https://chatgpt.com",
    affiliateUrl: "https://chatgpt.com",
    score: 96
  },
  {
    name: "Claude",
    category: "文字與助理",
    description: "擅長長文理解、策略整理與語氣自然的內容產出。",
    bestFor: "顧問簡報與長文內容",
    pricing: "免費 / 付費",
    difficulty: 2,
    businessValue: 93,
    officialUrl: "https://claude.ai",
    affiliateUrl: "https://claude.ai",
    score: 94
  },
  {
    name: "Gemini",
    category: "文字與助理",
    description: "與 Google 生態系整合佳，適合文件、搜尋與多模態任務。",
    bestFor: "Google Workspace 團隊",
    pricing: "免費 / 付費",
    difficulty: 2,
    businessValue: 89,
    officialUrl: "https://gemini.google.com",
    affiliateUrl: "https://gemini.google.com",
    score: 90
  },
  {
    name: "Perplexity",
    category: "研究搜尋",
    description: "可快速整理來源與摘要，適合市場研究和內容前期蒐集。",
    bestFor: "SEO 選題與競品研究",
    pricing: "免費 / 付費",
    difficulty: 1,
    businessValue: 88,
    officialUrl: "https://www.perplexity.ai",
    affiliateUrl: "https://www.perplexity.ai",
    score: 91
  },
  {
    name: "Midjourney",
    category: "圖像生成",
    description: "高質感圖像生成工具，適合品牌視覺、廣告與情境圖。",
    bestFor: "高質感商業圖片",
    pricing: "付費",
    difficulty: 3,
    businessValue: 87,
    officialUrl: "https://www.midjourney.com",
    affiliateUrl: "https://www.midjourney.com",
    score: 90
  },
  {
    name: "Ideogram",
    category: "圖像生成",
    description: "文字排版能力佳，適合商品圖、海報與社群素材。",
    bestFor: "商品圖與帶字設計",
    pricing: "免費 / 付費",
    difficulty: 2,
    businessValue: 84,
    officialUrl: "https://ideogram.ai",
    affiliateUrl: "https://ideogram.ai",
    score: 86
  },
  {
    name: "Runway",
    category: "影片生成",
    description: "AI 影片生成與剪輯平台，適合短影音與廣告素材。",
    bestFor: "品牌短影音素材",
    pricing: "免費 / 付費",
    difficulty: 3,
    businessValue: 86,
    officialUrl: "https://runwayml.com",
    affiliateUrl: "https://runwayml.com",
    score: 88
  },
  {
    name: "Pika",
    category: "影片生成",
    description: "容易上手的 AI 影片生成工具，適合社群短片快速測試。",
    bestFor: "短影音概念驗證",
    pricing: "免費 / 付費",
    difficulty: 2,
    businessValue: 81,
    officialUrl: "https://pika.art",
    affiliateUrl: "https://pika.art",
    score: 83
  },
  {
    name: "ElevenLabs",
    category: "語音生成",
    description: "高品質 AI 配音工具，適合課程、影片旁白與多語內容。",
    bestFor: "AI 配音與旁白",
    pricing: "免費 / 付費",
    difficulty: 2,
    businessValue: 85,
    officialUrl: "https://elevenlabs.io",
    affiliateUrl: "https://elevenlabs.io",
    score: 87
  },
  {
    name: "Canva",
    category: "設計工具",
    description: "結合模板與 AI 功能，適合小團隊快速完成行銷素材。",
    bestFor: "社群圖文與簡報",
    pricing: "免費 / 付費",
    difficulty: 1,
    businessValue: 88,
    officialUrl: "https://www.canva.com",
    affiliateUrl: "https://www.canva.com",
    score: 89
  },
  {
    name: "Notion AI",
    category: "知識管理",
    description: "整合筆記、任務與文件，適合建立一人公司的知識庫。",
    bestFor: "專案與知識整理",
    pricing: "付費加購",
    difficulty: 2,
    businessValue: 82,
    officialUrl: "https://www.notion.so/product/ai",
    affiliateUrl: "https://www.notion.so/product/ai",
    score: 84
  },
  {
    name: "Gamma",
    category: "簡報網站",
    description: "用 AI 產生簡報與簡易網頁，適合提案與教學材料。",
    bestFor: "快速提案簡報",
    pricing: "免費 / 付費",
    difficulty: 1,
    businessValue: 80,
    officialUrl: "https://gamma.app",
    affiliateUrl: "https://gamma.app",
    score: 82
  },
  {
    name: "Zapier",
    category: "自動化",
    description: "連接常見 SaaS 工具，自動化表單、通知與資料同步。",
    bestFor: "無程式 SaaS 串接",
    pricing: "免費 / 付費",
    difficulty: 2,
    businessValue: 85,
    officialUrl: "https://zapier.com",
    affiliateUrl: "https://zapier.com",
    score: 86
  },
  {
    name: "Make",
    category: "自動化",
    description: "視覺化自動化平台，適合建立較複雜的工作流。",
    bestFor: "中階自動化流程",
    pricing: "免費 / 付費",
    difficulty: 3,
    businessValue: 86,
    officialUrl: "https://www.make.com",
    affiliateUrl: "https://www.make.com",
    score: 87
  },
  {
    name: "n8n",
    category: "自動化",
    description: "可自架的自動化工具，適合接案與企業內部流程整合。",
    bestFor: "LINE Bot 與 API 自動化",
    pricing: "開源 / 雲端付費",
    difficulty: 4,
    businessValue: 92,
    officialUrl: "https://n8n.io",
    affiliateUrl: "https://n8n.io",
    score: 93
  },
  {
    name: "Cursor",
    category: "程式開發",
    description: "AI 程式編輯器，適合快速開發網站、內部工具與原型。",
    bestFor: "AI 輔助開發",
    pricing: "免費 / 付費",
    difficulty: 3,
    businessValue: 90,
    officialUrl: "https://www.cursor.com",
    affiliateUrl: "https://www.cursor.com",
    score: 91
  },
  {
    name: "Codex",
    category: "程式開發",
    description: "適合協作式開發、修 bug、建立專案與自動化程式任務。",
    bestFor: "從需求到可跑專案",
    pricing: "依平台方案",
    difficulty: 3,
    businessValue: 92,
    officialUrl: "https://openai.com/codex",
    affiliateUrl: "https://openai.com/codex",
    score: 92
  },
  {
    name: "Lovable",
    category: "網站開發",
    description: "用對話快速建立產品原型與網頁，適合驗證商業想法。",
    bestFor: "MVP 與 Landing Page",
    pricing: "免費 / 付費",
    difficulty: 2,
    businessValue: 86,
    officialUrl: "https://lovable.dev",
    affiliateUrl: "https://lovable.dev",
    score: 87
  },
  {
    name: "Framer",
    category: "網站開發",
    description: "設計感強的網站建置工具，適合品牌頁與作品集。",
    bestFor: "品牌網站與作品集",
    pricing: "免費 / 付費",
    difficulty: 2,
    businessValue: 82,
    officialUrl: "https://www.framer.com",
    affiliateUrl: "https://www.framer.com",
    score: 84
  },
  {
    name: "Zeabur",
    category: "部署平台",
    description: "適合部署 Next.js、n8n、Bot 與資料庫的一站式雲端平台。",
    bestFor: "接案交付與快速上線",
    pricing: "免費額度 / 付費",
    difficulty: 2,
    businessValue: 88,
    officialUrl: "https://zeabur.com",
    affiliateUrl: "https://zeabur.com",
    score: 89
  }
];
