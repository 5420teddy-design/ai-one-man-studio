import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/lib/seo";

type CTASectionProps = {
  title?: string;
  description?: string;
};

export function CTASection({
  title = "想用 AI 做網站、LINE 客服或自動化流程？加入 LINE 諮詢，我幫你拆解第一步。",
  description = "先用你的現況拆出最小可行流程，再決定要做網站、客服 Bot、內容 SEO 或自動化。"
}: CTASectionProps) {
  return (
    <section className="rounded-[2rem] bg-ink px-6 py-10 text-white shadow-soft md:px-10">
      <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <p className="text-2xl font-bold leading-tight md:text-3xl">{title}</p>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-white/72">{description}</p>
        </div>
        <Link
          href={siteConfig.lineUrl}
          className="inline-flex w-fit items-center gap-2 rounded-full bg-wheat px-6 py-3 text-sm font-bold text-ink transition hover:bg-white"
        >
          <MessageCircle className="h-5 w-5" aria-hidden="true" />
          加入 LINE 諮詢
        </Link>
      </div>
    </section>
  );
}
