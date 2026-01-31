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
    const [postLang, postSlugWithExt] = p.id.split('/');
    const postSlug = postSlugWithExt.replace(/\.md$/, '');
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
  };

  return date.toLocaleDateString(localeMap[lang], options);
}

export const BLOG_CATEGORIES = {
  updates: { en: 'Updates', zh: '产品动态' },
  travel: { en: 'Travel', zh: '旅行日记' },
  daily: { en: 'Daily', zh: '日常点滴' },
  guides: { en: 'Guides', zh: '使用指南' },
  engineering: { en: 'Engineering', zh: '技术幕后' },
} as const;

export type BlogCategory = keyof typeof BLOG_CATEGORIES;

export function getCategoryLabel(category: string, lang: Locale): string {
  const cat = BLOG_CATEGORIES[category as BlogCategory];
  return cat ? cat[lang] : category;
}
