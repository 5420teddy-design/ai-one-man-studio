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
- 工具資料：`data/tools.ts`
- 分類資料：`data/categories.ts`
- SEO 共用設定：`lib/seo.ts`
