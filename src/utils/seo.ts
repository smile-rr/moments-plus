import type { Locale } from '../i18n';
import { getAllLocalePaths } from '../i18n';

export interface SEOData {
  title: string;
  description: string;
  keywords: string;
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
  schema?: string;
}

const DEFAULT_KEYWORDS =
  // English
  "Moments, Moments+, Moment, photos, AI, memories, map, location, album, gallery, travel journal, photo organizer, private photo app, secure, offline, " +
  // Chinese
  "时刻, 时刻+, 照片, 记忆, 相册, 地图相册, 智能相册, 旅行日记, 隐私保护, 本地运行, AI相册, " +
  // Japanese
  "モーメント, モーメント+, 写真, アルバム, 地図, 旅行, 思い出, フォト, AI, プライバシー, オフライン";

/**
 * 生成 SEO 数据
 */
export function generateSEOData(
  title: string,
  description: string,
  locale: Locale,
  currentPath: string,
  siteUrl: string = 'https://moments-plus.com',
  image?: string,
  keywords: string = DEFAULT_KEYWORDS
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
    keywords,
    canonical,
    alternates,
    openGraph: {
      title,
      description,
      image: image || `${siteUrl}/images/icon/AppIconImage.png`,
      type: 'website',
    },
    schema: generateSchema(title, description, siteUrl, image),
  };
}

function generateSchema(title: string, description: string, siteUrl: string, image?: string) {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Moments+",
    "operatingSystem": "iOS",
    "applicationCategory": "PhotoVideoApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": description,
    "image": image || `${siteUrl}/images/icon/AppIconImage.png`,
    "author": {
      "@type": "Organization",
      "name": "Moments+ Team",
      "url": siteUrl
    }
  });
}
