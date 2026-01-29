import enTranslations from './locales/en.json';
import zhTranslations from './locales/zh.json';

export const SUPPORTED_LOCALES = ['en', 'zh'] as const;
export type Locale = typeof SUPPORTED_LOCALES[number];

export const DEFAULT_LOCALE: Locale = 'en';

const translations = {
  en: enTranslations,
  zh: zhTranslations,
};

/**
 * 获取翻译文本
 */
export function t(locale: Locale, key: string): string {
  const keys = key.split('.');
  let value: any = translations[locale];

  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k];
    } else {
      return key; // 如果找不到翻译，返回 key 本身
    }
  }

  return typeof value === 'string' ? value : key;
}

/**
 * 获取本地化路径
 */
export function getLocalizedPath(locale: Locale, path: string = ''): string {
  // 移除开头的斜杠
  const cleanPath = path.replace(/^\//, '');
  // 移除语言前缀（如果存在）
  const pathWithoutLocale = cleanPath.replace(/^(en|zh)\//, '');

  // 英文使用根路径，其他语言使用语言前缀
  if (locale === DEFAULT_LOCALE) {
    return `/${pathWithoutLocale}`.replace(/\/$/, '') || '/';
  }

  // 构建新路径
  return `/${locale}/${pathWithoutLocale}`.replace(/\/$/, '') || `/${locale}`;
}

/**
 * 从 URL 提取语言
 */
export function getLocaleFromUrl(url: URL): Locale {
  const segments = url.pathname.split('/').filter(Boolean);
  const firstSegment = segments[0];

  // 检查第一个路径段是否是支持的语言（排除默认语言）
  if (firstSegment && SUPPORTED_LOCALES.includes(firstSegment as Locale) && firstSegment !== DEFAULT_LOCALE) {
    return firstSegment as Locale;
  }

  // 如果没有语言前缀，返回默认语言
  return DEFAULT_LOCALE;
}

/**
 * 检测浏览器语言
 */
export function detectBrowserLocale(): Locale {
  if (typeof window === 'undefined') {
    return DEFAULT_LOCALE;
  }

  const browserLang = navigator.language.toLowerCase();

  // 检查完全匹配
  if (SUPPORTED_LOCALES.includes(browserLang as Locale)) {
    return browserLang as Locale;
  }

  // 检查语言代码（忽略地区）
  const langCode = browserLang.split('-')[0];
  if (SUPPORTED_LOCALES.includes(langCode as Locale)) {
    return langCode as Locale;
  }

  // 特殊处理中文
  if (browserLang.startsWith('zh')) {
    return 'zh';
  }

  return DEFAULT_LOCALE;
}

/**
 * 获取所有语言的路径（用于 hreflang）
 */
export function getAllLocalePaths(path: string): Record<Locale, string> {
  const result = {} as Record<Locale, string>;

  for (const locale of SUPPORTED_LOCALES) {
    result[locale] = getLocalizedPath(locale, path);
  }

  return result;
}

/**
 * 获取语言的本地化名称
 */
export function getLocaleName(locale: Locale): string {
  const names: Record<Locale, string> = {
    en: 'EN',
    zh: '中文',
  };
  return names[locale];
}
