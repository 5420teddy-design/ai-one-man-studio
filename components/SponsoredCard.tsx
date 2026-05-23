import Link from "next/link";
import { Sparkles } from "lucide-react";

export function SponsoredCard() {
  return (
    <Link
      href="/contact"
      className="group gradient-border grid gap-5 overflow-hidden rounded-3xl p-px transition hover:-translate-y-1 md:grid-cols-[320px_1fr]"
    >
      <div className="relative min-h-[210px] overflow-hidden rounded-[1.45rem] bg-cyber-panel p-6 md:rounded-r-none">
        <div className="absolute inset-0 tech-grid opacity-40" />
        <div className="absolute -left-16 top-8 h-40 w-40 rounded-full bg-cyber-cyan/25 blur-3xl" />
        <div className="absolute bottom-4 right-4 flex h-16 w-16 items-center justify-center rounded-3xl bg-white/5 text-cyber-cyan ring-1 ring-cyber-cyan/30">
          <Sparkles className="h-8 w-8" aria-hidden="true" />
        </div>
        <div className="relative">
          <span className="rounded-full bg-cyber-purple/15 px-3 py-1 text-xs font-bold text-cyber-purple">贊助內容</span>
          <p className="mt-8 font-display text-3xl font-black tracking-tight text-cyber-title">AI 顧問服務</p>
        </div>
      </div>
      <div className="flex flex-col justify-center rounded-[1.45rem] bg-cyber-panel/95 p-6 md:rounded-l-none">
        <div className="flex flex-wrap items-center gap-3 text-xs text-cyber-muted">
          <span className="rounded-full bg-cyber-cyan/10 px-3 py-1 font-bold text-cyber-cyan">贊助內容</span>
          <span>AI 接案 / 自動化 / LINE 客服</span>
        </div>
        <h2 className="mt-4 font-display text-2xl font-bold leading-tight tracking-tight text-cyber-title group-hover:text-cyber-cyan">
          免費 AI 接案顧問：幫你拆出第一個可收費服務
        </h2>
        <p className="mt-3 line-clamp-2 leading-7 text-cyber-muted">
          如果你有工具、網站、LINE Bot 或自動化想法，我會用一人公司的角度幫你整理成可報價、可交付、可維護的方案。
        </p>
        <div className="mt-5 text-sm font-bold text-cyber-cyan">預約 LINE 諮詢 →</div>
      </div>
    </Link>
  );
}
