import { ArticleCard } from "@/components/ArticleCard";
import { CTASection } from "@/components/CTASection";
import { getArticlesByCategory } from "@/data/articles";
import type { CategoryName } from "@/data/categories";

type CategoryPageProps = {
  category: CategoryName;
  eyebrow: string;
  title: string;
  description: string;
};

export function CategoryPage({ category, eyebrow, title, description }: CategoryPageProps) {
  const articles = getArticlesByCategory(category);

  return (
    <main>
      <section className="mx-auto max-w-7xl px-5 py-14 md:py-20">
        <p className="text-sm font-bold text-clay">{eyebrow}</p>
        <h1 className="mt-3 max-w-3xl text-4xl font-bold tracking-normal text-ink md:text-5xl">{title}</h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-muted">{description}</p>
      </section>
      <section className="mx-auto max-w-7xl px-5 pb-16">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-5 pb-20">
        <CTASection />
      </section>
    </main>
  );
}
