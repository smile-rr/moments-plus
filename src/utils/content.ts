import { getCollection, type CollectionEntry } from 'astro:content';

export type Locale = 'en' | 'zh' | 'ja';

/**
 * 根据语言获取主页内容
 */
export async function getHomeContent(locale: Locale): Promise<CollectionEntry<'home'> | undefined> {
  const allHome = await getCollection('home');
  return allHome.find(entry => entry.id === `${locale}.md`);
}

/**
 * 根据语言获取支持页面内容
 */
export async function getSupportContent(locale: Locale): Promise<CollectionEntry<'support'> | undefined> {
  const allSupport = await getCollection('support');
  return allSupport.find(entry => entry.id === `${locale}.md`);
}

/**
 * 根据语言获取隐私政策内容
 */
export async function getPrivacyContent(locale: Locale): Promise<CollectionEntry<'privacy'> | undefined> {
  const allPrivacy = await getCollection('privacy');
  return allPrivacy.find(entry => entry.id === `${locale}.md`);
}

/**
 * 根据语言获取使用条款内容
 */
export async function getTermsContent(locale: Locale): Promise<CollectionEntry<'terms'> | undefined> {
  const allTerms = await getCollection('terms');
  return allTerms.find(entry => entry.id === `${locale}.md`);
}

/**
 * 通用函数：根据集合名称和语言获取内容
 */
export async function getContentByLocale<T extends 'home' | 'support' | 'privacy' | 'terms'>(
  collection: T,
  locale: Locale
): Promise<CollectionEntry<T> | undefined> {
  const allEntries = await getCollection(collection);
  return allEntries.find(entry => entry.id === `${locale}.md`) as CollectionEntry<T> | undefined;
}
