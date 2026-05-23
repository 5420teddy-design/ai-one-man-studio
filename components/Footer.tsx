import Link from "next/link";
import { categories } from "@/data/categories";

export function Footer() {
  return (
    <footer className="border-t border-slate-900/10 bg-ink text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <p className="text-lg font-bold">AI 一人公司研究所</p>
          <p className="mt-4 max-w-md text-sm leading-7 text-white/72">
            陪創作者、接案者與中小企業老闆，把 AI 工具、自動化與內容網站整理成能交付、能變現的工作系統。
          </p>
        </div>
        <div>
          <p className="font-semibold">主題分類</p>
          <div className="mt-4 grid gap-2 text-sm text-white/72">
            {categories.slice(0, 4).map((category) => (
              <Link key={category.name} href={category.path} className="hover:text-white">
                {category.name}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <p className="font-semibold">網站資訊</p>
          <div className="mt-4 grid gap-2 text-sm text-white/72">
            <Link href="/articles" className="hover:text-white">
              文章列表
            </Link>
            <Link href="/tools" className="hover:text-white">
              工具排行
            </Link>
            <Link href="/about" className="hover:text-white">
              關於我們
            </Link>
            <Link href="/contact" className="hover:text-white">
              聯絡我們
            </Link>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 px-5 py-5 text-center text-xs text-white/56">
        © 2026 AI 一人公司研究所. All rights reserved.
      </div>
    </footer>
  );
}
