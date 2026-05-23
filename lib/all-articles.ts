import { articles as staticArticles, getArticleBySlug as getStaticArticleBySlug } from "@/data/articles";
import type { Article } from "@/data/articles";
import { getGeneratedArticles, type GeneratedArticle } from "@/lib/content-factory";

export type AnyArticle = Article | GeneratedArticle;

export async function getAllArticles(): Promise<AnyArticle[]> {
  const generated = await getGeneratedArticles();
  return [...generated, ...staticArticles];
}

export async function getAnyArticleBySlug(slug: string): Promise<AnyArticle | undefined> {
  const staticArticle = getStaticArticleBySlug(slug);

  if (staticArticle) {
    return staticArticle;
  }

  const generated = await getGeneratedArticles();
  return generated.find((article) => article.slug === slug);
}

export function isGeneratedArticle(article: AnyArticle): article is GeneratedArticle {
  return "source" in article && article.source === "generated";
}
