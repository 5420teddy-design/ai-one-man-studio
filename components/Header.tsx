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
    <header className="sticky top-0 z-50 border-b border-slate-900/10 bg-paper/88 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
        <Link href="/" className="flex items-center gap-3 font-bold text-ink">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-ink text-paper shadow-soft">
            <Sparkles className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="text-base sm:text-lg">AI 一人公司研究所</span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium text-muted lg:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-ink">
              {item.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/contact"
          className="hidden rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white shadow-soft transition hover:bg-slate-800 sm:inline-flex"
        >
          LINE 諮詢
        </Link>
        <Link href="/contact" className="rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white sm:hidden">
          諮詢
        </Link>
      </div>
      <nav className="mx-auto flex max-w-7xl gap-4 overflow-x-auto px-5 pb-3 text-sm font-medium text-muted lg:hidden">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href} className="shrink-0 transition hover:text-ink">
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
