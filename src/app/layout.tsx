import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { I18nProvider } from "../components/I18nProvider";
import { DynamicMetadata } from "../components/DynamicMetadata";
import DynamicFavicon from "../components/DynamicFavicon";
import parseYaml from "../plugins/yaml";
import type { LocaleData } from "../types/locale";
import { getStaticAvailableLocales, getStaticLocaleTranslations } from "../lib/staticLocales";

// 导入默认语言的 metadata 作为静态 fallback
import zhCNContent from "../locales/zh-CN.yml";
const zhCN = parseYaml(zhCNContent) as LocaleData;

// Load static locale data at build time
const staticAvailableLocales = getStaticAvailableLocales();
const staticLocaleTranslations = getStaticLocaleTranslations();

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: zhCN.metadata.title, // 默认标题，会被动态更新
  description: zhCN.metadata.description, // 默认描述，会被动态更新
  // icons 将由 DynamicFavicon 组件动态管理
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh">
      <body className={`${inter.variable} font-sans antialiased`}>
        <I18nProvider 
          staticAvailableLocales={staticAvailableLocales}
          staticLocaleTranslations={staticLocaleTranslations}
        >
          <DynamicMetadata />
          <DynamicFavicon />
          {children}
        </I18nProvider>
      </body>
    </html>
  );
}
