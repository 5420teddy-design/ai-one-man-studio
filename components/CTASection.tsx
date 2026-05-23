import Link from "next/link";
import { Mail, MessageCircle } from "lucide-react";
import { siteConfig } from "@/lib/seo";

type CTASectionProps = {
  title?: string;
  description?: string;
};

export function CTASection({
  title = "想用 AI 做網站、自動化或 LINE 客服？加入 LINE 免費諮詢。",
  description = "先用你的現況拆出最小可行流程，再決定要做網站、客服 Bot、內容 SEO 或自動化。"
}: CTASectionProps) {
  return (
    <section className="gradient-border rounded-[2rem] p-px">
      <div className="rounded-[1.9rem] bg-cyber-panel px-6 py-10 text-white md:px-10">
      <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <p className="font-display text-2xl font-bold leading-tight text-cyber-title md:text-3xl">{title}</p>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-cyber-muted">{description}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            href={siteConfig.lineUrl}
            className="inline-flex w-fit items-center gap-2 rounded-full bg-cyber-cyan px-6 py-3 text-sm font-bold text-cyber-bg shadow-neon transition hover:bg-white"
          >
            <MessageCircle className="h-5 w-5" aria-hidden="true" />
            加入 LINE 諮詢
          </Link>
          <Link
            href="/contact"
            className="inline-flex w-fit items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-bold text-white transition hover:bg-white hover:text-cyber-bg"
          >
            <Mail className="h-5 w-5" aria-hidden="true" />
            聯絡表單
          </Link>
        </div>
      </div>
      </div>
    </section>
  );
}
