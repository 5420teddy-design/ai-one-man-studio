import Link from "next/link";
import { Sparkles } from "lucide-react";

const navItems = [
  { href: "/articles", label: "文章" },
  { href: "/tools", label: "工具排行" },
  { href: "/automation", label: "AI 自動化" },
  { href: "/freelance", label: "AI 接案" },
  { href: "/seo", label: "AI SEO" },
  { href: "/about", label: "關於" }
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-cyber-bg/78 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
        <Link href="/" className="flex items-center gap-3 font-display font-bold text-cyber-title">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-cyber-cyan/10 text-cyber-cyan ring-1 ring-cyber-cyan/30">
            <Sparkles className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="text-base tracking-tight sm:text-lg">AI 一人公司研究所</span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-semibold text-cyber-muted lg:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-cyber-cyan">
              {item.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/contact"
          className="hidden rounded-full bg-cyber-cyan px-5 py-2.5 text-sm font-bold text-cyber-bg shadow-neon transition hover:bg-white sm:inline-flex"
        >
          LINE 諮詢
        </Link>
        <Link href="/contact" className="rounded-full bg-cyber-cyan px-4 py-2 text-sm font-bold text-cyber-bg sm:hidden">
          諮詢
        </Link>
      </div>
      <nav className="mx-auto flex max-w-7xl gap-4 overflow-x-auto px-5 pb-3 text-sm font-semibold text-cyber-muted lg:hidden">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href} className="shrink-0 transition hover:text-cyber-cyan">
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
