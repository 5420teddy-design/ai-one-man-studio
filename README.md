# AI 一人公司研究所

一個以 Next.js 14、TypeScript、Tailwind CSS、Recharts 建立的 AI SEO 內容網站，可部署到 Zeabur。

## 本地啟動方式

```bash
npm install
npm run dev
```

開啟 `http://localhost:3000`。

正式建置：

```bash
npm run build
npm run start
```

## GitHub 推送方式

```bash
git init
git add .
git commit -m "Create AI SEO content site"
git branch -M main
git remote add origin https://github.com/你的帳號/ai-solo-company-lab.git
git push -u origin main
```

## Zeabur 部署設定

- Build Command: `npm install && npm run build`
- Start Command: `npm run start`
- Port: `3000`

部署流程：

1. 將專案推送到 GitHub。
2. 在 Zeabur 新增 Project，選擇 GitHub Repository。
3. 設定 Build Command、Start Command 與 Port。
4. 部署完成後，到 Zeabur 綁定網域與環境變數。

## 內容維護

- 文章資料：`data/articles.ts`
- 自動生成文章：`data/articles/*.json` 與 `data/articles/*.mdx`
- 工具資料：`data/tools.ts`
- 分類資料：`data/categories.ts`
- SEO 共用設定：`lib/seo.ts`

## AI SEO 自動內容工廠

### 環境變數

先複製 `.env.example`，並在 Zeabur 設定相同環境變數：

```bash
cp .env.example .env.local
```

必要設定：

- `NEXT_PUBLIC_SITE_URL`：正式網站網址
- `OPENAI_API_KEY`：OpenAI API Key
- `OPENAI_MODEL`：預設 `gpt-4o-mini`
- `CONTENT_FACTORY_API_KEY`：n8n 呼叫發布 API 的保護金鑰

Claude API 已預留：

- `ANTHROPIC_API_KEY`
- `CLAUDE_MODEL`

### API Routes

- `POST /api/keywords`
  - 輸入：`{ "topic": "AI自動化", "limit": 50 }`
  - 輸出：50 個長尾 SEO 關鍵詞、搜尋意圖、難度、商業價值、分類
- `POST /api/generate-article`
  - 輸入：`{ "keyword": "LINE AI 客服怎麼做", "category": "AI自動化" }`
  - 輸出：SEO 文章 JSON，包含 title、slug、meta、H1、H2、FAQ、schema、CTA、content
- `POST /api/humanize`
  - 輸入：`{ "title": "...", "content": "..." }`
  - 輸出：去 AI 味後的內容
- `POST /api/generate-chart`
  - 輸入：`{ "keyword": "...", "chartType": "matrix" }`
  - 輸出：Recharts 可用的 chartData JSON
- `POST /api/generate-image`
  - 輸入：`{ "title": "..." }`
  - 輸出：封面圖、Midjourney、Ideogram prompt
- `POST /api/publish-article`
  - Header：`x-content-factory-key: CONTENT_FACTORY_API_KEY`
  - 功能：寫入 `data/articles/*.json`、`data/articles/*.mdx`，並執行 git add、commit、push

### n8n Workflow

workflow 檔案：

```text
workflows/n8n-ai-seo-content-factory.json
workflows/n8n-ai-daily-content-factory.json
```

流程預設每天早上 9 點執行：

1. 產生 5 個關鍵詞
2. 生成 SEO 文章
3. 生成圖片 Prompt
4. 生成圖表資料
5. 發布文章並 Git Push
6. 由 GitHub 觸發 Zeabur 自動部署
7. Facebook、Threads、LINE OA 節點已預留，預設停用，填入 webhook 後可啟用

### Dashboard

內容工廠狀態頁：

```text
/dashboard
```

可查看已生成文章、API 設定狀態、sitemap、GitHub Push 與 Zeabur 部署狀態。

## Daily AI SEO Content Factory

新增每日全自動內容工廠 API：

- `GET /api/trending-topics`
  - 取得今日 5 個 AI 熱門主題。
  - 有 `PERPLEXITY_API_KEY` 與 `TAVILY_API_KEY` 時會先搜尋趨勢資料，再用 OpenAI 做總編輯評分。
  - 未設定搜尋 API 時會回傳 fallback 主題，方便本地測試與 build。
- `POST /api/generate-daily-article`
  - 輸入：`{ "topic": { ...trendingTopic } }`
  - 輸出：2500-4000 字 SEO 文章 JSON，含 metadata、FAQ、schema、tags、CTA、chartData。
- `POST /api/generate-article-assets`
  - 輸出：封面圖 prompt、段落插圖 prompt、工具比較圖、流程圖、雷達圖、商業矩陣圖與 infographic data。
- `POST /api/publish-daily-articles`
  - Header：`x-content-factory-key: CONTENT_FACTORY_API_KEY`
  - 功能：每天批次產生最多 5 篇文章，寫入 `data/articles/*.json` 與 `data/articles/*.mdx`，再 git add、commit、push。
  - 發布成功後會寄送文章連結到 `DAILY_ARTICLE_EMAIL_TO`，預設 `1851662858@qq.com`。

每日 n8n workflow：

```text
workflows/n8n-ai-daily-content-factory.json
```

排程：

- 05:30 搜尋熱門 AI 話題
- 05:40 生成 5 篇 SEO 文章與素材
- 05:50 發布文章、GitHub Push、觸發 Zeabur
- 05:50 發布成功後寄送文章連結到信箱
- 06:10 發 Facebook、Threads、LINE OA

Zeabur 環境變數需至少設定：

- `NEXT_PUBLIC_SITE_URL`
- `OPENAI_API_KEY`
- `CONTENT_FACTORY_API_KEY`
- `PERPLEXITY_API_KEY`
- `TAVILY_API_KEY`
- `LINE_OA_PUSH_ENDPOINT`
- `LINE_OA_CHANNEL_ACCESS_TOKEN`
- `FACEBOOK_WEBHOOK_URL`
- `THREADS_WEBHOOK_URL`
- `RESEND_API_KEY`
- `EMAIL_FROM`
- `DAILY_ARTICLE_EMAIL_TO`

### 每日文章 Email 通知

每日文章發布 API 會在文章寫入與 GitHub Push 後，自動寄出文章連結。

預設收件人：

```text
1851662858@qq.com
```

寄信使用 Resend API，不需要額外 npm 套件。Zeabur 需設定：

```text
RESEND_API_KEY=re_xxx
EMAIL_FROM=AI 一人公司研究所 <你的已驗證寄件網域>
DAILY_ARTICLE_EMAIL_TO=1851662858@qq.com
```

若未設定 `RESEND_API_KEY`，文章發布流程仍會成功，API 回傳的 `email.skipped` 會是 `true`。
