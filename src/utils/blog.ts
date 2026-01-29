import { getCollection } from 'astro:content';
import type { Locale } from '../i18n';

export async function getBlogPosts(lang: Locale) {
  const allPosts = await getCollection('blog');
  
  // Filter by language and exclude drafts
  const posts = allPosts
    .filter(post => {
      const postLang = post.id.split('/')[0];
      return postLang === lang && !post.data.draft;
    })
    .sort((a, b) => b.data.publishDate.getTime() - a.data.publishDate.getTime());
  
  return posts;
}

export async function getBlogPost(lang: Locale, slug: string) {
  const allPosts = await getCollection('blog');
  const post = allPosts.find(p => {
    const [postLang, postSlug] = p.id.split('/');
    return postLang === lang && postSlug === slug;
  });
  
  return post;
}

export function formatDate(date: Date, lang: Locale): string {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  
  const localeMap: Record<Locale, string> = {
    en: 'en-US',
    zh: 'zh-CN',
    ja: 'ja-JP'
  };
  
  return date.toLocaleDateString(localeMap[lang], options);
}
