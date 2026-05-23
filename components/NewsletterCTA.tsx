import Link from "next/link";
import { Mail, MessageCircle } from "lucide-react";
import { siteConfig } from "@/lib/seo";

export function NewsletterCTA() {
  return (
    <section className="gradient-border rounded-[2rem] p-px">
      <div className="rounded-[1.9rem] bg-cyber-panel p-7 md:p-9">
        <p className="font-display text-xs font-bold uppercase tracking-[0.22em] text-cyber-cyan">AI Consulting CTA</p>
        <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-cyber-title md:text-3xl">
          想用 AI 做網站、自動化或 LINE 客服？
        </h2>
        <p className="mt-3 leading-7 text-cyber-muted">加入 LINE 免費諮詢，我幫你拆解第一個可落地流程。</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href={siteConfig.lineUrl} className="inline-flex items-center gap-2 rounded-full bg-cyber-cyan px-5 py-3 text-sm font-bold text-cyber-bg shadow-neon">
            <MessageCircle className="h-4 w-4" />
            LINE 諮詢
          </Link>
          <Link href="/contact" className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm font-bold text-cyber-title">
            <Mail className="h-4 w-4" />
            Email CTA
          </Link>
        </div>
      </div>
    </section>
  );
}
