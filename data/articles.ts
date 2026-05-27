import type { CategoryName } from "./categories";

export type ChartType = "bar" | "radar" | "matrix";

export type ChartDatum = {
  name: string;
  score?: number;
  value?: number;
  difficulty?: number;
  speed?: number;
  cost?: number;
  longTerm?: number;
};

export type Article = {
  id: number;
  title: string;
  slug: string;
  category: CategoryName;
  targetKeyword: string;
  searchIntent: string;
  description: string;
  outline: string[];
  chartType: ChartType;
  chartData: ChartDatum[];
  monetizationAngle: string;
  publishDate: string;
  readingTime: number;
  coverImage: string;
  author: string;
  shares: number;
  featured: boolean;
  hotRank?: number;
  tags: string[];
  faq: {
    question: string;
    answer: string;
  }[];
};

type Topic = {
  title: string;
  slug: string;
  keyword: string;
  intent: string;
};

const topicGroups: Record<CategoryName, Topic[]> = {
  AI工具推薦: [
    ["2026 最適合新手的 AI 工具排行榜", "best-ai-tools-for-beginners-2026", "AI工具推薦 新手 2026", "比較不同 AI 工具並選出入門組合"],
    ["ChatGPT、Claude、Gemini 哪個適合商用", "chatgpt-claude-gemini-business", "ChatGPT Claude Gemini 商用比較", "比較主流模型在商業情境的差異"],
    ["一人公司必備的 10 個 AI 工具", "solo-company-ai-toolkit", "一人公司 AI 工具", "建立一人公司的工作工具清單"],
    ["最適合接案者的 AI 工具組合", "ai-tools-for-freelancers", "接案 AI 工具", "找出提案、製作與交付可用工具"],
    ["免費 AI 工具有哪些值得用", "free-ai-tools-worth-using", "免費 AI 工具推薦", "尋找低成本可上手工具"],
    ["AI 寫作工具怎麼選：部落格、EDM、社群一次看", "ai-writing-tools-content-marketing", "AI 寫作工具", "依內容場景挑選寫作工具"],
    ["AI 簡報工具推薦：提案與課程製作流程", "ai-presentation-tools", "AI 簡報工具 推薦", "比較簡報工具與實務流程"],
    ["AI 筆記與知識庫工具比較", "ai-note-knowledge-base-tools", "AI 筆記工具 比較", "建立可搜尋的個人知識系統"],
    ["AI 程式工具排行榜：Cursor、Codex、Lovable 怎麼分工", "ai-coding-tools-ranking", "AI 程式工具 排行榜", "比較 AI 開發工具的定位"],
    ["小公司導入 AI 工具前要先問的 7 個問題", "questions-before-adopting-ai-tools", "小公司 導入 AI 工具", "降低導入失敗與浪費訂閱費"],
    ["AI 客服工具推薦：從表單到 LINE 回覆", "ai-customer-service-tools", "AI 客服工具 推薦", "評估客服自動化工具"],
    ["AI 圖文工作流工具箱：從靈感到發布", "ai-content-workflow-toolbox", "AI 圖文 工作流", "建立每日內容產出流程"],
    ["AI 工具訂閱費怎麼控管", "manage-ai-tool-subscriptions", "AI 工具 訂閱費", "控制工具成本與使用效率"],
    ["台灣中小企業最容易落地的 AI 工具", "taiwan-sme-ai-tools", "中小企業 AI 工具", "挑選低門檻且能立即省時間的工具"],
    ["AI 工具試用 SOP：避免買了不用", "ai-tool-trial-sop", "AI 工具 試用 SOP", "建立評估與採購流程"]
  ].map(toTopic),
  AI自動化: [
    ["n8n 是什麼？一人公司如何用它省時間", "what-is-n8n-for-solo-company", "n8n 是什麼", "了解 n8n 與一人公司應用"],
    ["LINE AI 客服怎麼做", "line-ai-customer-service", "LINE AI 客服", "建立 LINE 自動回覆與客服流程"],
    ["OpenAI API 串接 LINE Bot 教學", "openai-api-line-bot-guide", "OpenAI API LINE Bot", "學會 API 串接架構"],
    ["Zeabur 部署 n8n 完整流程", "deploy-n8n-on-zeabur", "Zeabur 部署 n8n", "部署自動化工具到雲端"],
    ["自動回覆客戶訊息的 AI 工作流", "ai-auto-reply-customer-workflow", "AI 自動回覆 客戶訊息", "設計客服回覆流程"],
    ["表單送出後自動建立客戶資料庫", "form-to-crm-automation", "表單 CRM 自動化", "把名單收集串到資料庫"],
    ["用 AI 自動整理會議紀錄與待辦", "ai-meeting-notes-automation", "AI 會議紀錄 自動化", "整理會議與追蹤任務"],
    ["Google Sheet 搭配 AI 的報表自動化", "google-sheet-ai-report-automation", "Google Sheet AI 自動化", "建立定期報表流程"],
    ["電商訂單通知如何自動化", "ecommerce-order-notification-automation", "電商 訂單通知 自動化", "串接訂單與通知"],
    ["AI 自動寄送報價單流程", "ai-quotation-email-automation", "AI 報價單 自動化", "把詢問轉成報價流程"],
    ["客服知識庫如何接到 LINE Bot", "knowledge-base-line-bot", "客服知識庫 LINE Bot", "建立可查資料的客服機器人"],
    ["一人公司每週自動化例行檢查表", "weekly-automation-checklist", "一人公司 自動化 檢查表", "建立維護自動化流程"],
    ["Zapier、Make、n8n 差異比較", "zapier-make-n8n-comparison", "Zapier Make n8n 比較", "選擇合適自動化平台"],
    ["AI 自動化接案需求怎麼訪談", "ai-automation-discovery-questions", "AI 自動化 接案 訪談", "釐清客戶流程與需求"],
    ["自動化流程失敗時如何通知與補救", "automation-error-handling", "自動化 錯誤通知", "設計錯誤處理與監控"]
  ].map(toTopic),
  AI接案: [
    ["程式小白如何用 Codex 開始接案", "beginner-codex-freelance", "Codex 接案 程式小白", "了解用 AI 輔助開發接案的起點"],
    ["AI 網站建置接案怎麼報價", "ai-website-freelance-pricing", "AI 網站接案 報價", "建立網站接案報價邏輯"],
    ["LINE Bot 接案行情分析", "line-bot-freelance-pricing", "LINE Bot 接案 行情", "了解 LINE Bot 市場價格"],
    ["一人公司接案流程 SOP", "solo-freelance-sop", "一人公司 接案 SOP", "建立穩定接案流程"],
    ["如何用 AI 做出作品集", "build-portfolio-with-ai", "AI 作品集", "快速完成可展示作品"],
    ["AI 自動化接案服務如何包裝", "package-ai-automation-service", "AI 自動化 接案 服務", "設計可銷售服務方案"],
    ["第一次接 AI 案子要準備什麼", "first-ai-freelance-project", "第一次 AI 接案", "降低新手接案風險"],
    ["接案提案書如何用 AI 快速完成", "ai-freelance-proposal", "AI 接案 提案書", "提升提案速度與品質"],
    ["AI 顧問時薪與專案價怎麼定", "ai-consulting-pricing", "AI 顧問 報價", "建立顧問收費模型"],
    ["客戶只說想導入 AI 時怎麼拆需求", "ai-client-discovery", "AI 導入 需求訪談", "把模糊需求轉成規格"],
    ["AI 網站交付前檢查清單", "ai-website-delivery-checklist", "AI 網站 交付 檢查", "提升交付品質"],
    ["如何把內部工具做成接案作品", "internal-tools-as-portfolio", "內部工具 作品集", "把實作轉為銷售素材"],
    ["接案合約中 AI 產出權利怎麼寫", "ai-freelance-contract-rights", "AI 接案 合約 權利", "理解合約與交付權責"],
    ["AI 接案如何避免無限修改", "avoid-unlimited-revisions-ai-freelance", "AI 接案 無限修改", "設計修改範圍與驗收"],
    ["從單次接案變成長期維護收入", "freelance-to-retainer", "接案 長期維護 收入", "設計月費維護服務"]
  ].map(toTopic),
  AI圖像生成: [
    ["Midjourney 商業圖片 Prompt 教學", "midjourney-commercial-prompt-guide", "Midjourney 商業圖片 Prompt", "學會商業圖片提示詞"],
    ["Ideogram 做商品圖好用嗎", "ideogram-product-image-review", "Ideogram 商品圖", "評估商品圖製作工具"],
    ["AI 生成廣告圖片流程", "ai-ad-image-workflow", "AI 生成 廣告圖片", "建立廣告素材流程"],
    ["商品主圖如何用 AI 快速製作", "ai-product-main-image", "AI 商品主圖", "快速製作商品主圖"],
    ["AI 圖像工具比較", "ai-image-tools-comparison", "AI 圖像工具 比較", "選擇合適圖像工具"],
    ["品牌視覺如何用 AI 建立一致風格", "ai-brand-visual-style", "AI 品牌視覺", "建立一致的品牌素材"],
    ["AI 生成社群貼文圖片 SOP", "ai-social-image-sop", "AI 社群圖片 SOP", "建立社群配圖流程"],
    ["電商情境圖 Prompt 範例", "ecommerce-lifestyle-image-prompts", "電商 情境圖 Prompt", "產出情境銷售圖片"],
    ["AI 圖像商用授權要注意什麼", "ai-image-commercial-license", "AI 圖像 商用授權", "理解商用授權風險"],
    ["用 AI 做廣告 A/B 測試素材", "ai-ad-ab-testing-creatives", "AI 廣告 AB 測試 素材", "提升素材測試速度"]
  ].map(toTopic),
  AI影片生成: [
    ["AI 短影音製作流程", "ai-short-video-workflow", "AI 短影音 製作流程", "建立短影音生產流程"],
    ["不露臉 YouTube 頻道怎麼做", "faceless-youtube-ai-channel", "不露臉 YouTube AI", "建立不露臉頻道流程"],
    ["AI 配音工具比較", "ai-voice-tools-comparison", "AI 配音工具 比較", "選擇影片旁白工具"],
    ["用腳本生成影片的工具推薦", "script-to-video-tools", "腳本生成影片 工具", "從文字快速生成影片"],
    ["AI 影片變現模式", "ai-video-monetization", "AI 影片 變現", "理解影片內容商業模式"],
    ["Runway 和 Pika 適合哪些影片任務", "runway-vs-pika-video-tasks", "Runway Pika 比較", "比較影片生成工具用途"],
    ["AI 影片腳本如何寫得像真人", "human-ai-video-script", "AI 影片腳本", "提升腳本自然度"],
    ["短影音批次製作 SOP", "batch-short-video-sop", "短影音 批次製作", "提高短影音產能"],
    ["AI 字幕與翻譯工具推薦", "ai-subtitle-translation-tools", "AI 字幕 翻譯工具", "製作多語影片內容"],
    ["中小企業如何用 AI 拍產品介紹影片", "sme-ai-product-video", "中小企業 AI 產品影片", "低成本做產品介紹"]
  ].map(toTopic),
  "AI SEO": [
    ["AI SEO 是什麼", "what-is-ai-seo", "AI SEO 是什麼", "理解 AI SEO 定義與應用"],
    ["如何用 AI 建立 100 篇 SEO 文章", "build-100-seo-articles-with-ai", "AI 建立 100 篇 SEO 文章", "規劃大量內容生產"],
    ["Topic Cluster 主題群集怎麼做", "topic-cluster-guide", "Topic Cluster 主題群集", "建立 SEO 主題架構"],
    ["AI 文章如何避免看起來像機器寫的", "make-ai-articles-human", "AI 文章 像真人", "提升 AI 內容自然度"],
    ["SEO 內容工廠流程", "seo-content-factory-workflow", "SEO 內容工廠", "建立內容生產系統"],
    ["AI 關鍵字研究流程", "ai-keyword-research-workflow", "AI 關鍵字研究", "找出可排名題目"],
    ["內容網站首頁 SEO 架構怎麼規劃", "content-site-homepage-seo", "內容網站 首頁 SEO", "規劃首頁與分類權重"],
    ["文章列表頁如何提升索引效率", "article-list-indexing-seo", "文章列表頁 SEO", "改善搜尋引擎索引"],
    ["AI 內容如何做內部連結", "ai-content-internal-linking", "AI 內容 內部連結", "建立內容網狀結構"],
    ["SEO 文章標題怎麼用 AI 產生", "ai-seo-title-generation", "AI SEO 標題", "提升標題點擊率"],
    ["AI SEO 與傳統 SEO 差在哪", "ai-seo-vs-traditional-seo", "AI SEO 傳統 SEO 差異", "比較新舊 SEO 流程"],
    ["小品牌如何用 SEO 取得第一批客戶", "small-brand-seo-first-customers", "小品牌 SEO 客戶", "從搜尋流量拿到詢問"],
    ["AI 內容網站如何規劃 sitemap", "ai-content-site-sitemap", "AI 內容網站 sitemap", "規劃 sitemap 與收錄"],
    ["SEO 與 LINE 名單收集怎麼串", "seo-line-lead-generation", "SEO LINE 名單收集", "把流量轉成名單"],
    ["AI 文章品質檢查清單", "ai-article-quality-checklist", "AI 文章 品質 檢查", "建立發布前檢查流程"]
  ].map(toTopic),
  AI教學: [
    ["新手如何開始學 AI", "how-beginners-learn-ai", "新手 學 AI", "規劃 AI 入門路線"],
    ["家長如何用 AI 幫小孩學習", "parents-use-ai-for-kids-learning", "家長 AI 小孩學習", "把 AI 用在家庭學習"],
    ["AI 數學工具推薦", "ai-math-tools", "AI 數學工具 推薦", "選擇數學學習工具"],
    ["AI 簡報工具教學", "ai-presentation-tool-tutorial", "AI 簡報工具 教學", "學會用 AI 做簡報"],
    ["AI 筆記工具比較", "ai-note-tools-comparison", "AI 筆記工具 比較", "比較筆記與知識管理工具"],
    ["上班族學 AI 的 30 天計畫", "30-day-ai-learning-plan", "上班族 學 AI", "建立可執行學習計畫"],
    ["如何教團隊寫出好 Prompt", "teach-team-prompt-writing", "Prompt 教學 團隊", "培訓團隊使用 AI"],
    ["AI 教學課程如何設計", "design-ai-training-course", "AI 教學課程 設計", "規劃可收費課程"],
    ["學生如何用 AI 做報告不抄襲", "students-use-ai-without-plagiarism", "學生 AI 報告 不抄襲", "建立正確學習方法"],
    ["中小企業 AI 內訓大綱範例", "sme-ai-training-outline", "中小企業 AI 內訓", "設計企業內訓內容"]
  ].map(toTopic),
  AI商業變現: [
    ["一人 AI 公司怎麼開始", "start-one-person-ai-company", "一人 AI 公司", "從零規劃 AI 商業模式"],
    ["AI 工具網站如何變現", "monetize-ai-tool-site", "AI 工具網站 變現", "建立內容網站收入來源"],
    ["AI 聯盟行銷怎麼做", "ai-affiliate-marketing", "AI 聯盟行銷", "透過工具推薦變現"],
    ["AI 顧問服務如何包裝", "package-ai-consulting-service", "AI 顧問服務 包裝", "設計顧問服務方案"],
    ["從接案到 SaaS 的路線圖", "freelance-to-saas-roadmap", "接案 到 SaaS", "規劃產品化路線"],
    ["AI 內容網站收入來源比較", "ai-content-site-revenue-streams", "AI 內容網站 收入", "比較廣告、聯盟與服務"],
    ["如何把 AI 自動化流程賣給店家", "sell-ai-automation-to-local-business", "AI 自動化 店家", "設計在地商家服務"],
    ["小公司 AI 導入顧問方案範例", "sme-ai-consulting-package", "小公司 AI 顧問方案", "包裝顧問與導入服務"],
    ["AI 課程、模板、顧問哪個先做", "ai-course-template-consulting-priority", "AI 課程 模板 顧問", "決定產品化順序"],
    ["一人公司月收入模型怎麼設計", "solo-company-monthly-revenue-model", "一人公司 月收入 模型", "設計多元收入組合"]
  ].map(toTopic)
};

function toTopic([title, slug, keyword, intent]: string[]): Topic {
  return { title, slug, keyword, intent };
}

const chartTypes: ChartType[] = ["bar", "radar", "matrix"];

function buildChartData(chartType: ChartType, index: number): ChartDatum[] {
  if (chartType === "radar") {
    return [
      { name: "內容產出", value: 72 + (index % 18) },
      { name: "自動化", value: 60 + (index % 28) },
      { name: "商業應用", value: 68 + (index % 22) },
      { name: "學習門檻", value: 52 + (index % 30) },
      { name: "長期價值", value: 75 + (index % 20) }
    ];
  }

  if (chartType === "matrix") {
    return [
      { name: "快速接案", difficulty: 35 + (index % 20), speed: 82, cost: 30, longTerm: 68 },
      { name: "內容網站", difficulty: 52, speed: 58 + (index % 18), cost: 35, longTerm: 92 },
      { name: "自動化服務", difficulty: 68, speed: 70, cost: 45 + (index % 15), longTerm: 88 },
      { name: "顧問方案", difficulty: 60, speed: 66, cost: 28, longTerm: 84 }
    ];
  }

  return [
    { name: "上手速度", score: 78 + (index % 14) },
    { name: "省時效果", score: 72 + (index % 22) },
    { name: "變現潛力", score: 70 + (index % 24) },
    { name: "維護成本", score: 62 + (index % 20) }
  ];
}

function buildOutline(topic: Topic, category: CategoryName): string[] {
  return [
    `${topic.title}適合解決什麼問題`,
    `先確認目標讀者、預算與目前工作流程`,
    `三個可以馬上落地的${category}做法`,
    "常見工具、流程與人力分工建議",
    "用小專案驗證，再擴大成可收費服務",
    "發布前檢查清單與下一步行動"
  ];
}

function buildFaq(topic: Topic): Article["faq"] {
  return [
    {
      question: `${topic.title}適合新手嗎？`,
      answer: "適合，但建議先從單一場景開始，例如寫文章、回覆客戶或製作一個作品集，不要一開始就導入太多工具。"
    },
    {
      question: "需要會寫程式才能開始嗎？",
      answer: "不一定。內容、設計、簡報與自動化都有低程式門檻工具；若要串接 API 或客製 LINE Bot，再逐步學習基礎開發會更穩。"
    },
    {
      question: "這類主題可以怎麼變現？",
      answer: "常見方式包含接案服務、顧問診斷、模板販售、課程教學、聯盟行銷與後續維護月費。"
    }
  ];
}

function buildDescription(topic: Topic, category: CategoryName): string {
  return `這篇文章用一人公司與台灣中小企業的角度，拆解「${topic.title}」的實務做法，幫你把${category}變成可執行、可交付、可變現的工作流程。`;
}

function buildMonetizationAngle(category: CategoryName, topic: Topic): string {
  const map: Record<CategoryName, string> = {
    AI工具推薦: `可延伸為工具導購、聯盟行銷、顧問選型與團隊導入清單，適合用「${topic.keyword}」吸引正在比較工具的讀者。`,
    AI自動化: "可包裝成流程診斷、n8n 建置、LINE Bot 串接與每月維護服務，讓客戶用可衡量的省時成果付費。",
    AI接案: "可轉成接案 SOP、報價模板、作品集範本與顧問陪跑服務，協助新手降低第一次成交門檻。",
    AI圖像生成: "可提供商品圖、廣告素材、品牌視覺與社群素材月包服務，適合服務電商與在地店家。",
    AI影片生成: "可包裝短影音批次製作、腳本、配音、字幕與頻道代營運，協助客戶低成本測試內容。",
    "AI SEO": "可發展成 SEO 內容工廠、主題群集規劃、內容網站建置與長期顧問服務。",
    AI教學: "可轉成內訓課程、家教型陪跑、線上課程與教材模板，適合企業與個人學習市場。",
    AI商業變現: "可作為商業模式診斷、服務包裝、產品化路線與收入模型規劃的顧問入口。"
  };

  return map[category];
}

function buildArticles(): Article[] {
  let id = 1;

  return Object.entries(topicGroups).flatMap(([category, topics]) =>
    topics.map((topic, topicIndex) => {
      const articleIndex = id++;
      const chartType = chartTypes[(articleIndex + topicIndex) % chartTypes.length];

      return {
        id: articleIndex,
        title: topic.title,
        slug: topic.slug,
        category: category as CategoryName,
        targetKeyword: topic.keyword,
        searchIntent: topic.intent,
        description: buildDescription(topic, category as CategoryName),
        outline: buildOutline(topic, category as CategoryName),
        chartType,
        chartData: buildChartData(chartType, articleIndex),
        monetizationAngle: buildMonetizationAngle(category as CategoryName, topic),
        publishDate: `2026-${String(Math.floor((articleIndex - 1) / 28) + 1).padStart(2, "0")}-${String(((articleIndex - 1) % 28) + 1).padStart(2, "0")}`,
        readingTime: 5 + (articleIndex % 7),
        coverImage: "/images/ai-cover-default.svg",
        author: "AI 一人公司研究所",
        shares: 120 + ((articleIndex * 37) % 980),
        featured: articleIndex <= 6 || articleIndex % 17 === 0,
        hotRank: articleIndex <= 5 ? articleIndex : undefined,
        tags: [category, topic.keyword, "AI 一人公司"].filter(Boolean) as string[],
        faq: buildFaq(topic)
      };
    })
  );
}

const dailyStaticArticles: Article[] = [
  {
    id: 2026052701,
    title: "ChatGPT Agent 工作流怎麼做？一人公司每日自動化實戰",
    slug: "chatgpt-agent-workflow-solo-company-2026-05-27",
    category: "AI自動化",
    targetKeyword: "ChatGPT Agent 工作流",
    searchIntent: "讀者想知道如何把 ChatGPT Agent 用在一人公司日常工作，包含任務拆解、工具串接、成本控管與可收費服務包裝。",
    description: "用一人公司角度拆解 ChatGPT Agent 工作流，從每日例行任務、資料整理、內容產出到客戶回覆，整理可落地的自動化流程。",
    outline: [
      "先挑每天重複發生的工作",
      "把 Agent 工作流拆成輸入、判斷、輸出與回報",
      "用檢查清單降低自動化失誤",
      "適合一人公司的三種服務包裝",
      "每天更新與回報的營運節奏"
    ],
    chartType: "matrix",
    chartData: [
      { name: "內容產出", difficulty: 42, speed: 86, cost: 34, longTerm: 88 },
      { name: "客戶回覆", difficulty: 58, speed: 78, cost: 40, longTerm: 84 },
      { name: "資料整理", difficulty: 46, speed: 82, cost: 30, longTerm: 80 },
      { name: "專案監控", difficulty: 64, speed: 70, cost: 38, longTerm: 92 }
    ],
    monetizationAngle: "這類工作流可以包裝成每月維護服務，例如內容網站每日更新、LINE 客服摘要、客戶名單整理與自動寄信報告，適合一人公司用固定月費累積穩定收入。",
    publishDate: "2026-05-27",
    readingTime: 8,
    coverImage: "/images/ai-cover-default.svg",
    author: "AI 一人公司研究所",
    shares: 168,
    featured: true,
    tags: ["ChatGPT Agent 工作流", "AI自動化", "一人公司", "每日內容工廠"],
    faq: [
      {
        question: "ChatGPT Agent 工作流一定要寫程式嗎？",
        answer: "不一定。可以先用表單、試算表、n8n 或現成自動化工具串接，等流程穩定後再用程式客製。"
      },
      {
        question: "一人公司最適合先自動化哪一件事？",
        answer: "優先挑每天都會重複、結果容易檢查、失敗風險可控的工作，例如文章檢查、客戶訊息分類或每日報告。"
      },
      {
        question: "自動化內容發布需要人工審稿嗎？",
        answer: "建議保留檢查步驟，至少確認標題、日期、連結、SEO 欄位與寄信報告都正確，再讓流程逐步提高自動化程度。"
      }
    ]
  }
];

export const articles: Article[] = [...dailyStaticArticles, ...buildArticles()];

export function getArticleBySlug(slug: string) {
  return articles.find((article) => article.slug === slug);
}

export function getArticlesByCategory(category: CategoryName) {
  return articles.filter((article) => article.category === category);
}
