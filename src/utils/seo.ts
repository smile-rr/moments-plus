import type { Locale } from '../i18n';
import { getAllLocalePaths } from '../i18n';

export interface SEOData {
  title: string;
  description: string;
  canonical: string;
  alternates: Array<{
    hreflang: string;
    href: string;
  }>;
  openGraph: {
    title: string;
    description: string;
    image?: string;
    type: string;
  };
}

/**
 * 生成 SEO 数据
 */
export function generateSEOData(
  title: string,
  description: string,
  locale: Locale,
  currentPath: string,
  siteUrl: string = 'https://yourusername.github.io',
  image?: string
): SEOData {
  const canonical = `${siteUrl}${currentPath}`;
  
  // 生成所有语言的 hreflang 标签
  const localePaths = getAllLocalePaths(currentPath);
  const alternates = Object.entries(localePaths).map(([lang, path]) => ({
    hreflang: lang,
    href: `${siteUrl}${path}`,
  }));
  
  // 添加 x-default
  alternates.push({
    hreflang: 'x-default',
    href: `${siteUrl}/en`,
  });
  
  return {
    title,
    description,
    canonical,
    alternates,
    openGraph: {
      title,
      description,
      image: image || `${siteUrl}/images/icon/AppIconImage.png`,
      type: 'website',
    },
  };
}
