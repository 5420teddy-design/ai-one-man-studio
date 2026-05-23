import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/lib/seo";

export function FloatingCTA() {
  return (
    <Link
      href={siteConfig.lineUrl}
      className="fixed bottom-5 left-5 z-50 inline-flex items-center gap-3 rounded-full border border-cyber-cyan/30 bg-cyber-panel/80 px-5 py-3 text-sm font-bold text-cyber-title shadow-neon backdrop-blur-xl transition hover:-translate-y-1 hover:border-cyber-cyan hover:text-cyber-cyan"
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-cyber-cyan text-cyber-bg">
        <MessageCircle className="h-5 w-5" aria-hidden="true" />
      </span>
      免費 AI 接案顧問
    </Link>
  );
}
