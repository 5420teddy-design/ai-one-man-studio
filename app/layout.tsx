import type { Metadata } from "next";
import { Inter, Noto_Sans_TC } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { createMetadata } from "@/lib/seo";
import "./globals.css";

export const metadata: Metadata = createMetadata();

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

const notoSansTc = Noto_Sans_TC({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-noto-sans-tc",
  display: "swap"
});

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-Hant-TW" className={`${inter.variable} ${notoSansTc.variable}`}>
      <body className="font-sans">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
