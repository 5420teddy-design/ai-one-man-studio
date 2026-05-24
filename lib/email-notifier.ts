import type { GeneratedArticle } from "@/lib/content-factory";

type EmailArticle = Pick<GeneratedArticle, "title" | "slug" | "category" | "description">;

export type EmailNotifyResult = {
  skipped: boolean;
  provider: "resend";
  to: string;
  id?: string;
  error?: string;
};

function articleUrl(slug: string) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ai-solo-company-lab.zeabur.app";
  return new URL(`/articles/${slug}`, siteUrl).toString();
}

function renderArticleList(articles: EmailArticle[]) {
  return articles
    .map(
      (article, index) => `
        <tr>
          <td style="padding:18px 0;border-bottom:1px solid #1f2a44;">
            <div style="font-size:12px;color:#22d3ee;font-weight:700;letter-spacing:.08em;">${String(index + 1).padStart(2, "0")} · ${article.category}</div>
            <a href="${articleUrl(article.slug)}" style="display:block;margin-top:8px;color:#f8fafc;font-size:20px;font-weight:800;text-decoration:none;line-height:1.45;">${article.title}</a>
            <p style="margin:10px 0 0;color:#94a3b8;font-size:14px;line-height:1.7;">${article.description}</p>
            <a href="${articleUrl(article.slug)}" style="display:inline-block;margin-top:12px;color:#38bdf8;font-size:14px;font-weight:700;text-decoration:none;">閱讀文章 →</a>
          </td>
        </tr>`
    )
    .join("");
}

export async function sendDailyArticleEmail(articles: EmailArticle[]): Promise<EmailNotifyResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.DAILY_ARTICLE_EMAIL_TO || "1851662858@qq.com";
  const from = process.env.EMAIL_FROM || "AI 一人公司研究所 <onboarding@resend.dev>";

  if (!apiKey) {
    return {
      skipped: true,
      provider: "resend",
      to,
      error: "RESEND_API_KEY is not configured."
    };
  }

  const today = new Intl.DateTimeFormat("zh-TW", {
    timeZone: "Asia/Taipei",
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).format(new Date());

  const html = `
    <div style="margin:0;background:#070b14;padding:32px;font-family:Arial,'Noto Sans TC','Microsoft JhengHei',sans-serif;color:#e5e7eb;">
      <div style="max-width:720px;margin:0 auto;border:1px solid #1f2a44;border-radius:28px;background:#0b1120;padding:32px;box-shadow:0 24px 80px rgba(0,0,0,.35);">
        <div style="color:#22d3ee;font-size:12px;font-weight:800;letter-spacing:.18em;">AI ONE-PERSON COMPANY LAB</div>
        <h1 style="margin:14px 0 0;color:#f8fafc;font-size:30px;line-height:1.3;">今日 AI SEO 文章已發布</h1>
        <p style="margin:14px 0 24px;color:#94a3b8;font-size:15px;line-height:1.8;">
          ${today} 已自動發布 ${articles.length} 篇 AI 文章，以下是文章連結。
        </p>
        <table style="width:100%;border-collapse:collapse;">
          ${renderArticleList(articles)}
        </table>
        <div style="margin-top:28px;padding:18px;border-radius:20px;background:linear-gradient(135deg,rgba(56,189,248,.14),rgba(168,85,247,.14));border:1px solid rgba(56,189,248,.22);">
          <p style="margin:0;color:#e5e7eb;font-size:14px;line-height:1.8;">想用 AI 做網站、自動化、LINE 客服？加入 LINE 免費諮詢。</p>
        </div>
      </div>
    </div>`;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from,
      to,
      subject: `今日 AI SEO 文章已發布：${articles.length} 篇`,
      html
    })
  });

  const payload = (await response.json().catch(() => ({}))) as { id?: string; message?: string; error?: string };

  if (!response.ok) {
    return {
      skipped: false,
      provider: "resend",
      to,
      error: payload.message || payload.error || `Resend request failed: ${response.status}`
    };
  }

  return {
    skipped: false,
    provider: "resend",
    to,
    id: payload.id
  };
}
