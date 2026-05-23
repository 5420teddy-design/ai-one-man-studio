import type { MetadataRoute } from "next";
import { articles } from "@/data/articles";
import { categories } from "@/data/categories";
import { siteConfig } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = ["/", "/articles", "/about", "/contact", ...categories.map((category) => category.path)];
  const now = new Date();

  return [
    ...staticPaths.map((path) => ({
      url: new URL(path, siteConfig.url).toString(),
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: path === "/" ? 1 : 0.8
    })),
    ...articles.map((article) => ({
      url: new URL(`/articles/${article.slug}`, siteConfig.url).toString(),
      lastModified: new Date(article.publishDate),
      changeFrequency: "monthly" as const,
      priority: 0.7
    }))
  ];
}
