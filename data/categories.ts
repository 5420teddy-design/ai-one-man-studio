import {
  BookOpen,
  Bot,
  BriefcaseBusiness,
  ChartNoAxesCombined,
  GraduationCap,
  ImageIcon,
  Sparkles,
  Video
} from "lucide-react";

export type CategoryName =
  | "AI工具推薦"
  | "AI自動化"
  | "AI接案"
  | "AI圖像生成"
  | "AI影片生成"
  | "AI SEO"
  | "AI教學"
  | "AI商業變現";

export type Category = {
  name: CategoryName;
  slug: string;
  path: string;
  description: string;
  color: string;
  icon: typeof Sparkles;
};

export const categories: Category[] = [
  {
    name: "AI工具推薦",
    slug: "tools",
    path: "/tools",
    description: "整理適合創作者、接案者與小公司使用的 AI 工具組合。",
    color: "bg-wheat",
    icon: Sparkles
  },
  {
    name: "AI自動化",
    slug: "automation",
    path: "/automation",
    description: "用 n8n、LINE Bot 與 API，把重複工作交給流程處理。",
    color: "bg-tea",
    icon: Bot
  },
  {
    name: "AI接案",
    slug: "freelance",
    path: "/freelance",
    description: "從作品集、報價、提案到交付，建立可複製的接案 SOP。",
    color: "bg-orange-100",
    icon: BriefcaseBusiness
  },
  {
    name: "AI圖像生成",
    slug: "image",
    path: "/image",
    description: "用 AI 快速產出商品圖、廣告素材與品牌視覺。",
    color: "bg-rose-100",
    icon: ImageIcon
  },
  {
    name: "AI影片生成",
    slug: "video",
    path: "/video",
    description: "短影音、配音、腳本與不露臉頻道的內容流程。",
    color: "bg-sky-100",
    icon: Video
  },
  {
    name: "AI SEO",
    slug: "seo",
    path: "/seo",
    description: "規劃主題群集、內容網站與可長期累積流量的 SEO 系統。",
    color: "bg-indigo-100",
    icon: ChartNoAxesCombined
  },
  {
    name: "AI教學",
    slug: "education",
    path: "/education",
    description: "給新手、家長與團隊的 AI 學習工具與教學方法。",
    color: "bg-emerald-100",
    icon: GraduationCap
  },
  {
    name: "AI商業變現",
    slug: "business",
    path: "/business",
    description: "把工具、內容、顧問與 SaaS 包裝成可收費的服務。",
    color: "bg-stone-200",
    icon: BookOpen
  }
];

export const categoryNames = categories.map((category) => category.name);
