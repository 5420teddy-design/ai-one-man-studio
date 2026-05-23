import type { Article } from "@/data/articles";
import { buildArticleSchemas } from "@/lib/content-factory";

export function JsonLd({ article }: { article: Article }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(buildArticleSchemas(article)).replace(/</g, "\\u003c")
      }}
    />
  );
}
