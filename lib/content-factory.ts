import { execFile } from "node:child_process";
import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";
import type { Article, ChartDatum, ChartType } from "@/data/articles";
import type { CategoryName } from "@/data/categories";

const execFileAsync = promisify(execFile);

export type SeoKeyword = {
  keyword: string;
  intent: string;
  difficulty: number;
  businessValue: number;
  category: CategoryName;
};

export type GeneratedArticle = Article & {
  h1: string;
  metaDescription: string;
  content: string;
  cta: string;
  schema: Record<string, unknown>[];
  imagePrompts?: ImagePromptResult;
  source: "generated";
};

export type ImagePromptResult = {
  coverPrompt: string;
  midjourneyPrompt: string;
  ideogramPrompt: string;
};

export type ChartResult = {
  chartType: ChartType;
  chartData: ChartDatum[];
  insight: string;
};

const workspaceRoot = process.cwd();
const generatedArticleDir = path.join(workspaceRoot, "data", "articles");

export function hasOpenAiKey() {
  return Boolean(process.env.OPENAI_API_KEY);
}

export function getAutomationSecretError(request: Request) {
  const configuredSecret = process.env.CONTENT_FACTORY_API_KEY;

  if (!configuredSecret) {
    return "CONTENT_FACTORY_API_KEY is not configured.";
  }

  const headerSecret = request.headers.get("x-content-factory-key");
  const bearer = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "");

  if (headerSecret !== configuredSecret && bearer !== configuredSecret) {
    return "Unauthorized content factory request.";
  }

  return null;
}

export function slugify(input: string) {
  const slug = input
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 72);

  return slug || `ai-seo-${Date.now()}`;
}

export function safeCategory(category?: string): CategoryName {
  const allowed: CategoryName[] = [
    "AI工具推薦",
    "AI自動化",
    "AI接案",
    "AI圖像生成",
    "AI影片生成",
    "AI SEO",
    "AI教學",
    "AI商業變現"
  ];

  return allowed.includes(category as CategoryName) ? (category as CategoryName) : "AI SEO";
}

export function extractJson<T>(text: string): T {
  try {
    return JSON.parse(text) as T;
  } catch {
    const match = text.match(/\{[\s\S]*\}|\[[\s\S]*\]/);

    if (!match) {
      throw new Error("AI response did not contain valid JSON.");
    }

    return JSON.parse(match[0]) as T;
  }
}

export async function callOpenAiJson<T>(messages: Array<{ role: "system" | "user"; content: string }>) {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY is not configured.");
  }

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL || "gpt-4o-mini",
      temperature: 0.72,
      response_format: { type: "json_object" },
      messages
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`OpenAI request failed: ${response.status} ${errorText}`);
  }

  const payload = (await response.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };
  const content = payload.choices?.[0]?.message?.content;

  if (!content) {
    throw new Error("OpenAI response did not include content.");
  }

  return extractJson<T>(content);
}

export function buildKeywordFallback(topic: string, limit = 50): SeoKeyword[] {
  const intents = ["工具比較", "教學指南", "商業導入", "接案報價", "流程規劃"];
  const categories: CategoryName[] = ["AI工具推薦", "AI自動化", "AI接案", "AI SEO", "AI商業變現"];

  return Array.from({ length: limit }, (_, index) => ({
    keyword: `${topic} ${["新手", "教學", "工具推薦", "流程", "變現"][index % 5]} ${index + 1}`,
    intent: intents[index % intents.length],
    difficulty: 28 + ((index * 7) % 52),
    businessValue: 55 + ((index * 9) % 40),
    category: categories[index % categories.length]
  }));
}

export function buildArticleSchemas(article: Pick<Article, "title" | "description" | "slug" | "publishDate" | "category" | "faq">) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ai-solo-company-lab.zeabur.app";
  const articleUrl = new URL(`/articles/${article.slug}`, siteUrl).toString();

  return [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: article.title,
      description: article.description,
      datePublished: article.publishDate,
      dateModified: article.publishDate,
      author: {
        "@type": "Organization",
        name: "AI 一人公司研究所"
      },
      publisher: {
        "@type": "Organization",
        name: "AI 一人公司研究所"
      },
      mainEntityOfPage: articleUrl
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "首頁",
          item: siteUrl
        },
        {
          "@type": "ListItem",
          position: 2,
          name: article.category,
          item: `${siteUrl}/articles`
        },
        {
          "@type": "ListItem",
          position: 3,
          name: article.title,
          item: articleUrl
        }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: article.faq.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer
        }
      }))
    }
  ];
}

export function createArticleFromAiPayload(payload: Omit<Partial<GeneratedArticle>, "category"> & { keyword?: string; category?: string }) {
  const title = payload.title || payload.keyword || "AI SEO 自動生成文章";
  const slug = slugify(payload.slug || title);
  const category = safeCategory(payload.category);
  const faq = payload.faq?.length
    ? payload.faq
    : [
        {
          question: `${title}適合誰？`,
          answer: "適合想用 AI 提高效率、建立內容資產，或把服務包裝成接案與顧問方案的人。"
        }
      ];

  const article: GeneratedArticle = {
    id: Date.now(),
    title,
    slug,
    category,
    targetKeyword: payload.targetKeyword || payload.keyword || title,
    searchIntent: payload.searchIntent || "讀者想了解做法、工具選擇、優缺點與商業應用。",
    description: payload.description || payload.metaDescription || `用台灣一人公司角度拆解 ${title} 的實作與變現方法。`,
    outline: payload.outline?.length ? payload.outline : ["問題情境", "工具與流程", "優缺點分析", "商業應用", "下一步行動"],
    chartType: payload.chartType || "matrix",
    chartData: payload.chartData?.length ? payload.chartData : buildDefaultChartData(),
    monetizationAngle: payload.monetizationAngle || "可延伸為接案服務、顧問診斷、模板販售或 LINE 名單導流。",
    publishDate: payload.publishDate || new Date().toISOString().slice(0, 10),
    readingTime: payload.readingTime || 10,
    coverImage: payload.coverImage || "/images/ai-cover-default.svg",
    author: payload.author || "AI 一人公司研究所",
    shares: payload.shares || 120,
    featured: payload.featured ?? false,
    hotRank: payload.hotRank,
    tags: payload.tags?.length ? payload.tags : [category, payload.keyword || title, "AI 一人公司"],
    faq,
    h1: payload.h1 || title,
    metaDescription: payload.metaDescription || payload.description || `完整解析 ${title} 的 SEO、工具、流程與商業角度。`,
    content: payload.content || "",
    cta: payload.cta || "想用 AI 做網站、自動化或 LINE 客服？加入 LINE 免費諮詢。",
    schema: payload.schema?.length ? payload.schema : buildArticleSchemas({ title, description: payload.description || title, slug, publishDate: new Date().toISOString().slice(0, 10), category, faq }),
    imagePrompts: payload.imagePrompts,
    source: "generated"
  };

  return article;
}

export function buildDefaultChartData(): ChartDatum[] {
  return [
    { name: "學習難度", difficulty: 52, speed: 70, cost: 34, longTerm: 88 },
    { name: "變現速度", difficulty: 45, speed: 82, cost: 38, longTerm: 76 },
    { name: "建置成本", difficulty: 62, speed: 58, cost: 48, longTerm: 84 },
    { name: "長期價值", difficulty: 68, speed: 64, cost: 42, longTerm: 94 }
  ];
}

export function articleToMdx(article: GeneratedArticle) {
  const frontmatter = [
    "---",
    `title: "${article.title.replace(/"/g, '\\"')}"`,
    `slug: "${article.slug}"`,
    `category: "${article.category}"`,
    `targetKeyword: "${article.targetKeyword}"`,
    `description: "${article.description.replace(/"/g, '\\"')}"`,
    `publishDate: "${article.publishDate}"`,
    "---"
  ].join("\n");

  return `${frontmatter}\n\n${article.content}\n\n## 免費諮詢\n\n${article.cta}\n`;
}

export async function saveGeneratedArticle(article: GeneratedArticle) {
  await mkdir(generatedArticleDir, { recursive: true });

  const jsonPath = path.join(generatedArticleDir, `${article.slug}.json`);
  const mdxPath = path.join(generatedArticleDir, `${article.slug}.mdx`);

  await writeFile(jsonPath, `${JSON.stringify(article, null, 2)}\n`, "utf8");
  await writeFile(mdxPath, articleToMdx(article), "utf8");

  return { jsonPath, mdxPath };
}

export async function getGeneratedArticles(): Promise<GeneratedArticle[]> {
  try {
    const files = await readdir(generatedArticleDir);
    const jsonFiles = files.filter((file) => file.endsWith(".json"));
    const parsed = await Promise.all(
      jsonFiles.map(async (file) => {
        const content = await readFile(path.join(generatedArticleDir, file), "utf8");
        return JSON.parse(content) as GeneratedArticle;
      })
    );

    return parsed.sort((a, b) => b.publishDate.localeCompare(a.publishDate));
  } catch {
    return [];
  }
}

export async function runGitPublish(message: string) {
  const env = {
    ...process.env,
    GIT_AUTHOR_NAME: process.env.GIT_AUTHOR_NAME || "AI Content Factory",
    GIT_AUTHOR_EMAIL: process.env.GIT_AUTHOR_EMAIL || "content-factory@example.com",
    GIT_COMMITTER_NAME: process.env.GIT_COMMITTER_NAME || "AI Content Factory",
    GIT_COMMITTER_EMAIL: process.env.GIT_COMMITTER_EMAIL || "content-factory@example.com"
  };

  const commands = [
    { command: "git", args: ["add", "data/articles", "public/images"] },
    { command: "git", args: ["commit", "-m", message] },
    { command: "git", args: ["push"] }
  ];

  const results = [];

  for (const item of commands) {
    try {
      const result = await execFileAsync(item.command, item.args, { cwd: workspaceRoot, env });
      results.push({ command: `${item.command} ${item.args.join(" ")}`, stdout: result.stdout, stderr: result.stderr });
    } catch (error) {
      const err = error as { stdout?: string; stderr?: string; message?: string };
      results.push({
        command: `${item.command} ${item.args.join(" ")}`,
        stdout: err.stdout || "",
        stderr: err.stderr || err.message || "Command failed"
      });
      break;
    }
  }

  return results;
}
