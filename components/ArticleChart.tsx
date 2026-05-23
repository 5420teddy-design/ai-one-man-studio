import type { Article } from "@/data/articles";
import { BarChartCard } from "@/components/charts/BarChartCard";
import { MatrixChartCard } from "@/components/charts/MatrixChartCard";
import { RadarChartCard } from "@/components/charts/RadarChartCard";

type ArticleChartProps = {
  article: Article;
};

export function ArticleChart({ article }: ArticleChartProps) {
  if (article.chartType === "radar") {
    return <RadarChartCard data={article.chartData} />;
  }

  if (article.chartType === "matrix") {
    return <MatrixChartCard data={article.chartData} />;
  }

  return <BarChartCard data={article.chartData} />;
}
