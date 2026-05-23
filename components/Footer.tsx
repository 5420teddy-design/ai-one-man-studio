import Link from "next/link";
import { Mail, MessageCircle } from "lucide-react";
import { categories } from "@/data/categories";
import { siteConfig } from "@/lib/seo";

const services = ["AI 網站建置", "LINE 客服", "n8n 自動化", "SEO 內容工廠"];

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-cyber-bg">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-[1.2fr_1fr_1fr_1fr]">
        <div>
          <p className="font-display text-xl font-bold text-cyber-title">AI 一人公司研究所</p>
          <p className="mt-4 max-w-md text-sm leading-7 text-cyber-muted">
            用科技媒體的研究深度，陪創作者、接案者與中小企業，把 AI 變成可交付、可變現、可複製的工作系統。
          </p>
        </div>
        <div>
          <p className="font-display font-bold text-cyber-title">文章分類</p>
          <div className="mt-4 grid gap-2 text-sm text-cyber-muted">
            {categories.slice(0, 5).map((category) => (
              <Link key={category.name} href={category.path} className="hover:text-cyber-cyan">
                {category.name}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <p className="font-display font-bold text-cyber-title">服務項目</p>
          <div className="mt-4 grid gap-2 text-sm text-cyber-muted">
            {services.map((service) => (
              <span key={service}>{service}</span>
            ))}
          </div>
        </div>
        <div>
          <p className="font-display font-bold text-cyber-title">聯絡方式</p>
          <div className="mt-4 grid gap-3 text-sm text-cyber-muted">
            <Link href={siteConfig.lineUrl} className="inline-flex items-center gap-2 hover:text-cyber-cyan">
              <MessageCircle className="h-4 w-4" />
              LINE 諮詢
            </Link>
            <Link href="/contact" className="inline-flex items-center gap-2 hover:text-cyber-cyan">
              <Mail className="h-4 w-4" />
              Email / 表單
            </Link>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 px-5 py-5 text-center text-xs text-cyber-muted">
        © 2026 AI 一人公司研究所. AI media, automation and solo business systems.
      </div>
    </footer>
  );
}
