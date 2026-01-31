import { defineCollection, z } from 'astro:content';

// 主页内容 Schema
const homeCollection = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    title: z.string(),
    subtitle: z.string(),
    description: z.string(),
    hero: z.object({
      title: z.string(),
      subtitle: z.string(),
      ctaText: z.string(),
      ctaLink: z.string(),
    }),
    featuresSection: z.object({
      title: z.string().optional(),
      subtitle: z.string().optional(),
    }).optional(),
    features: z.array(z.object({
      title: z.string(),
      description: z.string(),
      icon: z.string().optional(),
    })),
    screenshots: z.array(z.object({
      src: image(),
      alt: z.string(),
      caption: z.string().optional(),
    })),
    specialOffer: z.object({
      title: z.string(),
      description: z.string().optional(),
      badgeText: z.string().optional(),
      ctaText: z.string(),
      ctaLink: z.string(),
      expiryDate: z.string(),
    }).optional(),
  }),
});

// 博客文章 Schema
const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.date(),
    author: z.string().optional(),
    category: z.enum(['product', 'usecase', 'tips', 'update']).optional(),
    image: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

// 支持页面 Schema
const supportCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    email: z.string().email(),
    faq: z.array(z.object({
      question: z.string(),
      answer: z.string(),
    })).optional(),
  }),
});

// 法律页面 Schema (隐私政策和使用条款)
const legalCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    lastUpdated: z.date(),
  }),
});

export const collections = {
  home: homeCollection,
  blog: blogCollection,
  support: supportCollection,
  privacy: legalCollection,
  terms: legalCollection,
};
