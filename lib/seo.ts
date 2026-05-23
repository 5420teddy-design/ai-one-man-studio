import type { Metadata } from "next";

const siteName = "AI 一人公司研究所";
const defaultDescription =
  "用 AI 工具、自動化與內容網站，打造一個人也能接案、變現、服務客戶的工作系統。";

export const siteConfig = {
  name: siteName,
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://ai-solo-company-lab.zeabur.app",
  description: defaultDescription,
  lineUrl: "https://line.me/R/ti/p/@your-line-id"
};

type SeoOptions = {
  title?: string;
  description?: string;
  path?: string;
};

export function createMetadata({ title, description = defaultDescription, path = "/" }: SeoOptions = {}): Metadata {
  const pageTitle = title ? `${title} | ${siteName}` : siteName;
  const url = new URL(path, siteConfig.url).toString();

  return {
    metadataBase: new URL(siteConfig.url),
    title: pageTitle,
    description,
    openGraph: {
      title: pageTitle,
      description,
      url,
      siteName,
      locale: "zh_TW",
      type: "website"
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description
    },
    alternates: {
      canonical: url
    }
  };
}
