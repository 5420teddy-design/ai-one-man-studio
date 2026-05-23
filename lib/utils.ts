import type { CategoryName } from "@/data/categories";

export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function formatDate(date: string) {
  return new Intl.DateTimeFormat("zh-TW", {
    year: "numeric",
    month: "long",
    day: "numeric"
  }).format(new Date(date));
}

export function categoryLabelToPath(category: CategoryName) {
  const map: Record<CategoryName, string> = {
    AI工具推薦: "/tools",
    AI自動化: "/automation",
    AI接案: "/freelance",
    AI圖像生成: "/image",
    AI影片生成: "/video",
    "AI SEO": "/seo",
    AI教學: "/education",
    AI商業變現: "/business"
  };

  return map[category];
}

export function sortByScore<T extends { score: number }>(items: T[]) {
  return [...items].sort((a, b) => b.score - a.score);
}
