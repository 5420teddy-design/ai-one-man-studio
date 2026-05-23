import type { MetadataRoute } from "next";
import { categories } from "@/data/categories";
import { getAllArticles } from "@/lib/all-articles";
import { siteConfig } from "@/lib/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPaths = ["/", "/articles", "/dashboard", "/about", "/contact", ...categories.map((category) => category.path)];
  const now = new Date();
  const articles = await getAllArticles();

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
