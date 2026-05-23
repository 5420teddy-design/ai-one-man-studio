import { Mail, MessageCircle } from "lucide-react";
import { CTASection } from "@/components/CTASection";
import { createMetadata, siteConfig } from "@/lib/seo";

export const metadata = createMetadata({
  title: "聯絡我們",
  description: "想用 AI 做網站、LINE 客服、自動化或內容網站，歡迎透過 LINE 諮詢。",
  path: "/contact"
});

export default function ContactPage() {
  return (
    <main>
      <section className="mx-auto max-w-4xl px-5 py-14 md:py-20">
        <p className="text-sm font-bold text-clay">聯絡我們</p>
        <h1 className="mt-3 text-4xl font-bold tracking-normal text-ink md:text-5xl">想把 AI 放進你的生意裡，先聊第一步</h1>
        <p className="mt-5 text-lg leading-8 text-muted">
          如果你正在規劃 AI 網站、LINE 客服、自動化流程、SEO 內容網站或接案作品集，可以先用 LINE 說明你的情境。
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <a href={siteConfig.lineUrl} className="rounded-[1.5rem] bg-paper p-6 shadow-soft transition hover:-translate-y-1">
            <MessageCircle className="h-8 w-8 text-clay" aria-hidden="true" />
            <h2 className="mt-4 text-xl font-bold text-ink">LINE 諮詢</h2>
            <p className="mt-2 leading-7 text-muted">適合快速描述需求、確認可行性與拆解第一個落地流程。</p>
          </a>
          <a href="mailto:hello@example.com" className="rounded-[1.5rem] bg-paper p-6 shadow-soft transition hover:-translate-y-1">
            <Mail className="h-8 w-8 text-clay" aria-hidden="true" />
            <h2 className="mt-4 text-xl font-bold text-ink">Email 合作</h2>
            <p className="mt-2 leading-7 text-muted">適合課程、顧問、企業內訓、內容合作與專案邀約。</p>
          </a>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-5 pb-20">
        <CTASection />
      </section>
    </main>
  );
}
