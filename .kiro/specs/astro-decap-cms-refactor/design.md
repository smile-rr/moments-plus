# 设计文档

## 概述

本设计文档描述了将 Moments+ 网站从纯 HTML/CSS 架构重构为基于 Astro 和 Decap CMS 的现代化静态站点的技术方案。该重构将引入内容管理能力，同时保持多语言支持和 GitHub Pages 部署方式。

### 设计目标

1. **内容管理能力**: 通过 Decap CMS 提供可视化内容编辑界面
2. **多语言支持**: 维持英文、中文、日文三种语言的支持
3. **开发体验**: 使用 Astro 提供现代化的组件开发体验
4. **性能优化**: 生成高度优化的静态网站
5. **部署简化**: 通过 GitHub Actions 实现自动化部署

### 技术栈

- **框架**: Astro 4.x
- **CMS**: Decap CMS (原 Netlify CMS)
- **语言**: TypeScript
- **样式**: Scoped CSS / CSS Modules
- **部署**: GitHub Pages
- **CI/CD**: GitHub Actions

## 架构

### 整体架构

系统采用 JAMstack 架构，由以下层次组成：

```
┌─────────────────────────────────────────┐
│         用户界面层 (Browser)             │
│  - 静态 HTML/CSS/JS                      │
│  - 响应式设计                            │
│  - 多语言切换                            │
└─────────────────────────────────────────┘
                    ↑
                    │ HTTP
                    ↓
┌─────────────────────────────────────────┐
│      静态资源服务 (GitHub Pages)         │
│  - 托管构建产物                          │
│  - CDN 分发                              │
└─────────────────────────────────────────┘
                    ↑
                    │ Deploy
                    ↓
┌─────────────────────────────────────────┐
│       构建层 (GitHub Actions)            │
│  - Astro 构建                            │
│  - 资源优化                              │
│  - 自动部署                              │
└─────────────────────────────────────────┘
                    ↑
                    │ Git Push
                    ↓
┌─────────────────────────────────────────┐
│        内容层 (Git Repository)           │
│  - Markdown/JSON 内容文件                │
│  - 媒体资源                              │
│  - 配置文件                              │
└─────────────────────────────────────────┘
                    ↑
                    │ CMS Edit
                    ↓
┌─────────────────────────────────────────┐
│      内容管理 (Decap CMS)                │
│  - /admin 管理界面                       │
│  - Git Gateway 认证                      │
│  - 可视化编辑器                          │
└─────────────────────────────────────────┘
```

### 目录结构

```
moments-plus-website/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions 部署配置
├── public/
│   ├── admin/
│   │   ├── index.html          # Decap CMS 入口
│   │   └── config.yml          # CMS 配置文件
│   ├── images/                 # 静态图片资源
│   │   ├── icon.png
│   │   └── screenshots/
│   ├── robots.txt
│   └── favicon.ico
├── src/
│   ├── components/             # Astro 组件
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   ├── LanguageSwitcher.astro
│   │   ├── Hero.astro
│   │   ├── Features.astro
│   │   └── Screenshots.astro
│   ├── layouts/                # 页面布局
│   │   ├── BaseLayout.astro
│   │   └── LegalLayout.astro
│   ├── pages/                  # 页面路由
│   │   ├── index.astro         # 重定向到默认语言
│   │   ├── 404.astro
│   │   ├── [lang]/
│   │   │   ├── index.astro     # 主页
│   │   │   ├── support.astro   # 支持页面
│   │   │   ├── privacy.astro   # 隐私政策
│   │   │   └── terms.astro     # 使用条款
│   │   └── admin.astro         # CMS 管理页面
│   ├── content/                # 内容集合
│   │   ├── config.ts           # 内容集合配置
│   │   ├── home/
│   │   │   ├── en.md
│   │   │   ├── zh.md
│   │   │   └── ja.md
│   │   ├── support/
│   │   │   ├── en.md
│   │   │   ├── zh.md
│   │   │   └── ja.md
│   │   ├── privacy/
│   │   │   ├── en.md
│   │   │   ├── zh.md
│   │   │   └── ja.md
│   │   └── terms/
│   │       ├── en.md
│   │       ├── zh.md
│   │       └── ja.md
│   ├── i18n/                   # 国际化配置
│   │   ├── index.ts
│   │   ├── locales/
│   │   │   ├── en.json
│   │   │   ├── zh.json
│   │   │   └── ja.json
│   │   └── utils.ts
│   ├── styles/                 # 全局样式
│   │   ├── global.css
│   │   └── variables.css
│   └── utils/                  # 工具函数
│       ├── content.ts
│       └── seo.ts
├── astro.config.mjs            # Astro 配置
├── tsconfig.json               # TypeScript 配置
├── package.json
└── README.md
```

### 数据流

1. **内容编辑流程**:
   ```
   编辑者 → Decap CMS (/admin) → Git Gateway → GitHub Repo → Git Commit
   ```

2. **构建部署流程**:
   ```
   Git Push → GitHub Actions → Astro Build → 优化资源 → Deploy to GitHub Pages
   ```

3. **用户访问流程**:
   ```
   用户 → GitHub Pages → 静态 HTML → 浏览器渲染 → 显示内容
   ```

## 组件和接口

### 核心组件

#### 1. BaseLayout 组件

基础布局组件，为所有页面提供统一的结构。

```typescript
// src/layouts/BaseLayout.astro
interface Props {
  title: string;
  description: string;
  lang: 'en' | 'zh' | 'ja';
  currentPath: string;
}
```

**职责**:
- 提供 HTML 文档结构
- 包含 SEO meta 标签
- 引入全局样式
- 包含 Header 和 Footer 组件
- 处理语言切换逻辑

#### 2. Header 组件

网站头部导航组件。

```typescript
// src/components/Header.astro
interface Props {
  lang: 'en' | 'zh' | 'ja';
  currentPath: string;
}
```

**职责**:
- 显示网站 logo
- 提供导航菜单
- 集成语言切换器
- 响应式菜单（移动端）

#### 3. LanguageSwitcher 组件

语言切换器组件。

```typescript
// src/components/LanguageSwitcher.astro
interface Props {
  currentLang: 'en' | 'zh' | 'ja';
  currentPath: string;
}
```

**职责**:
- 显示当前语言
- 提供语言选择下拉菜单
- 生成对应语言的 URL
- 保持当前页面路径

#### 4. Hero 组件

主页 Hero Section 组件。

```typescript
// src/components/Hero.astro
interface Props {
  title: string;
  subtitle: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  appIcon: string;
}
```

**职责**:
- 显示应用标题和描述
- 显示应用图标
- 提供 CTA 按钮
- 响应式布局

#### 5. Features 组件

功能特性展示组件。

```typescript
// src/components/Features.astro
interface Feature {
  title: string;
  description: string;
  icon?: string;
}

interface Props {
  features: Feature[];
}
```

**职责**:
- 以网格布局展示功能列表
- 支持图标显示
- 响应式布局

#### 6. Screenshots 组件

应用截图展示组件。

```typescript
// src/components/Screenshots.astro
interface Screenshot {
  src: string;
  alt: string;
  caption?: string;
}

interface Props {
  screenshots: Screenshot[];
}
```

**职责**:
- 以轮播或网格展示截图
- 支持图片懒加载
- 响应式图片
- 可选的图片说明

### i18n 系统

#### 国际化工具函数

```typescript
// src/i18n/index.ts

export const SUPPORTED_LOCALES = ['en', 'zh', 'ja'] as const;
export type Locale = typeof SUPPORTED_LOCALES[number];

export const DEFAULT_LOCALE: Locale = 'en';

// 获取翻译文本
export function t(locale: Locale, key: string): string;

// 获取本地化路径
export function getLocalizedPath(locale: Locale, path: string): string;

// 从 URL 提取语言
export function getLocaleFromUrl(url: URL): Locale;

// 检测浏览器语言
export function detectBrowserLocale(): Locale;

// 获取所有语言的路径（用于 hreflang）
export function getAllLocalePaths(path: string): Record<Locale, string>;
```

### 内容管理接口

#### Content Collection Schema

```typescript
// src/content/config.ts
import { defineCollection, z } from 'astro:content';

// 主页内容 Schema
const homeCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    subtitle: z.string(),
    description: z.string(),
    hero: z.object({
      title: z.string(),
      subtitle: z.string(),
      ctaText: z.string(),
      ctaLink: z.string(),
    }),
    features: z.array(z.object({
      title: z.string(),
      description: z.string(),
      icon: z.string().optional(),
    })),
    screenshots: z.array(z.object({
      src: z.string(),
      alt: z.string(),
      caption: z.string().optional(),
    })),
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

// 法律页面 Schema
const legalCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    lastUpdated: z.date(),
  }),
});

export const collections = {
  home: homeCollection,
  support: supportCollection,
  privacy: legalCollection,
  terms: legalCollection,
};
```

### Decap CMS 配置

```yaml
# public/admin/config.yml
backend:
  name: github
  repo: username/moments-plus-website
  branch: main
  base_url: https://api.netlify.com
  auth_endpoint: auth

media_folder: "public/images"
public_folder: "/images"

i18n:
  structure: multiple_files
  locales: [en, zh, ja]
  default_locale: en

collections:
  - name: "home"
    label: "主页"
    folder: "src/content/home"
    create: false
    i18n: true
    fields:
      - {label: "标题", name: "title", widget: "string", i18n: true}
      - {label: "副标题", name: "subtitle", widget: "string", i18n: true}
      - {label: "描述", name: "description", widget: "text", i18n: true}
      - label: "Hero Section"
        name: "hero"
        widget: "object"
        i18n: true
        fields:
          - {label: "标题", name: "title", widget: "string", i18n: true}
          - {label: "副标题", name: "subtitle", widget: "string", i18n: true}
          - {label: "按钮文本", name: "ctaText", widget: "string", i18n: true}
          - {label: "按钮链接", name: "ctaLink", widget: "string", i18n: true}
      - label: "功能特性"
        name: "features"
        widget: "list"
        i18n: true
        fields:
          - {label: "标题", name: "title", widget: "string", i18n: true}
          - {label: "描述", name: "description", widget: "text", i18n: true}
          - {label: "图标", name: "icon", widget: "string", required: false, i18n: duplicate}
      - label: "截图"
        name: "screenshots"
        widget: "list"
        i18n: true
        fields:
          - {label: "图片", name: "src", widget: "image", i18n: duplicate}
          - {label: "替代文本", name: "alt", widget: "string", i18n: true}
          - {label: "说明", name: "caption", widget: "string", required: false, i18n: true}

  - name: "support"
    label: "支持页面"
    folder: "src/content/support"
    create: false
    i18n: true
    fields:
      - {label: "标题", name: "title", widget: "string", i18n: true}
      - {label: "描述", name: "description", widget: "text", i18n: true}
      - {label: "联系邮箱", name: "email", widget: "string", i18n: duplicate}
      - label: "常见问题"
        name: "faq"
        widget: "list"
        required: false
        i18n: true
        fields:
          - {label: "问题", name: "question", widget: "string", i18n: true}
          - {label: "答案", name: "answer", widget: "text", i18n: true}

  - name: "privacy"
    label: "隐私政策"
    folder: "src/content/privacy"
    create: false
    i18n: true
    fields:
      - {label: "标题", name: "title", widget: "string", i18n: true}
      - {label: "最后更新", name: "lastUpdated", widget: "datetime", i18n: duplicate}
      - {label: "内容", name: "body", widget: "markdown", i18n: true}

  - name: "terms"
    label: "使用条款"
    folder: "src/content/terms"
    create: false
    i18n: true
    fields:
      - {label: "标题", name: "title", widget: "string", i18n: true}
      - {label: "最后更新", name: "lastUpdated", widget: "datetime", i18n: duplicate}
      - {label: "内容", name: "body", widget: "markdown", i18n: true}
```

## 数据模型

### 页面内容模型

#### 主页内容 (Home)

```typescript
interface HomeContent {
  title: string;              // 页面标题
  subtitle: string;           // 页面副标题
  description: string;        // 页面描述（用于 SEO）
  hero: {
    title: string;            // Hero 标题
    subtitle: string;         // Hero 副标题
    ctaText: string;          // CTA 按钮文本
    ctaLink: string;          // CTA 按钮链接
  };
  features: Array<{
    title: string;            // 功能标题
    description: string;      // 功能描述
    icon?: string;            // 可选图标
  }>;
  screenshots: Array<{
    src: string;              // 图片路径
    alt: string;              // 替代文本
    caption?: string;         // 可选说明
  }>;
}
```

#### 支持页面内容 (Support)

```typescript
interface SupportContent {
  title: string;              // 页面标题
  description: string;        // 页面描述
  email: string;              // 联系邮箱
  faq?: Array<{
    question: string;         // 问题
    answer: string;           // 答案
  }>;
}
```

#### 法律页面内容 (Legal)

```typescript
interface LegalContent {
  title: string;              // 页面标题
  lastUpdated: Date;          // 最后更新日期
  body: string;               // Markdown 内容
}
```

### 国际化数据模型

#### UI 翻译

```typescript
// src/i18n/locales/en.json
interface UITranslations {
  nav: {
    home: string;
    support: string;
    privacy: string;
    terms: string;
  };
  footer: {
    copyright: string;
    links: {
      privacy: string;
      terms: string;
    };
  };
  common: {
    readMore: string;
    backToHome: string;
    notFound: string;
  };
  language: {
    en: string;
    zh: string;
    ja: string;
  };
}
```

### 路由模型

```typescript
// 路由结构
interface Route {
  path: string;               // URL 路径
  locale: Locale;             // 语言
  page: string;               // 页面类型
}

// 示例路由
const routes: Route[] = [
  { path: '/en/', locale: 'en', page: 'home' },
  { path: '/zh/', locale: 'zh', page: 'home' },
  { path: '/ja/', locale: 'ja', page: 'home' },
  { path: '/en/support', locale: 'en', page: 'support' },
  { path: '/zh/support', locale: 'zh', page: 'support' },
  { path: '/ja/support', locale: 'ja', page: 'support' },
  // ... 其他路由
];
```

### SEO 数据模型

```typescript
interface SEOData {
  title: string;              // 页面标题
  description: string;        // 页面描述
  canonical: string;          // 规范 URL
  alternates: Array<{
    hreflang: string;         // 语言代码
    href: string;             // 对应 URL
  }>;
  openGraph: {
    title: string;
    description: string;
    image?: string;
    type: string;
  };
}
```

## 正确性属性

*属性是一个特征或行为，应该在系统的所有有效执行中保持为真——本质上是关于系统应该做什么的形式化陈述。属性作为人类可读规范和机器可验证正确性保证之间的桥梁。*


### 属性 1: 语言检测一致性

*对于任意* 支持的浏览器语言设置（en, zh, ja），当访问根路径时，系统应该重定向到对应语言的主页路径。

**验证: 需求 3.2**

### 属性 2: 语言切换路径保持

*对于任意* 页面和任意两种不同的语言，当从语言 A 切换到语言 B 时，应该导航到相同页面类型的语言 B 版本（例如从 /en/support 切换到 /zh/support）。

**验证: 需求 3.4**

### 属性 3: SEO Meta 标签完整性

*对于任意* 生成的页面，HTML 文档的 head 部分应该包含 title 和 description meta 标签。

**验证: 需求 8.1**

### 属性 4: Hreflang 标签完整性

*对于任意* 多语言页面，HTML 文档的 head 部分应该包含所有支持语言的 hreflang 链接标签（en, zh, ja）。

**验证: 需求 8.3**

### 属性 5: 图片可访问性

*对于任意* 包含图片的页面，所有 img 标签都应该包含 alt 属性。

**验证: 需求 8.6**

## 错误处理

### 构建时错误

1. **内容验证错误**
   - 场景: 内容文件不符合 Schema 定义
   - 处理: 构建失败，显示详细的验证错误信息
   - 示例: 缺少必需字段、字段类型不匹配

2. **配置错误**
   - 场景: Astro 或 CMS 配置文件格式错误
   - 处理: 构建失败，显示配置错误位置
   - 示例: YAML 语法错误、无效的配置选项

3. **资源缺失**
   - 场景: 引用的图片或文件不存在
   - 处理: 构建警告或失败，列出缺失的资源
   - 示例: 内容中引用的图片路径无效

### 运行时错误

1. **404 页面未找到**
   - 场景: 用户访问不存在的页面
   - 处理: 显示本地化的 404 错误页面
   - 内容: 友好的错误消息、返回主页链接、语言切换器

2. **语言回退**
   - 场景: 请求的语言版本不存在
   - 处理: 回退到默认语言（英文）
   - 示例: 访问 /fr/（法语）时重定向到 /en/

3. **CMS 认证失败**
   - 场景: 用户无法通过 Git Gateway 认证
   - 处理: 显示认证错误消息，提供重试选项
   - 日志: 记录认证失败原因

### 错误恢复策略

1. **内容回退**
   - 如果特定语言的内容缺失，显示默认语言内容
   - 在页面上显示语言不可用的提示

2. **图片回退**
   - 如果图片加载失败，显示占位符
   - 使用 alt 文本提供内容描述

3. **构建重试**
   - GitHub Actions 配置自动重试机制
   - 失败时发送通知给维护者

## 测试策略

### 单元测试

单元测试用于验证特定功能和边缘情况：

**i18n 工具函数测试**:
- 测试 `getLocaleFromUrl()` 正确提取语言代码
- 测试 `getLocalizedPath()` 生成正确的本地化路径
- 测试 `detectBrowserLocale()` 处理各种浏览器语言设置
- 测试语言回退逻辑

**内容工具函数测试**:
- 测试内容查询函数返回正确的内容
- 测试内容过滤和排序逻辑
- 测试边缘情况（空内容、缺失字段）

**SEO 工具函数测试**:
- 测试 meta 标签生成
- 测试 hreflang 标签生成
- 测试 canonical URL 生成

### 属性测试

属性测试用于验证通用属性在所有输入下都成立：

**测试配置**:
- 使用 fast-check (JavaScript/TypeScript 的属性测试库)
- 每个属性测试运行最少 100 次迭代
- 每个测试标记对应的设计文档属性

**属性测试用例**:

1. **属性 1: 语言检测一致性**
   ```typescript
   // Feature: astro-decap-cms-refactor, Property 1: 语言检测一致性
   test('语言检测应该一致地重定向到对应语言版本', () => {
     fc.assert(
       fc.property(
         fc.constantFrom('en', 'zh', 'ja'),
         (locale) => {
           const result = detectAndRedirect('/', locale);
           expect(result).toBe(`/${locale}/`);
         }
       ),
       { numRuns: 100 }
     );
   });
   ```

2. **属性 2: 语言切换路径保持**
   ```typescript
   // Feature: astro-decap-cms-refactor, Property 2: 语言切换路径保持
   test('语言切换应该保持相同的页面路径', () => {
     fc.assert(
       fc.property(
         fc.constantFrom('', 'support', 'privacy', 'terms'),
         fc.constantFrom('en', 'zh', 'ja'),
         fc.constantFrom('en', 'zh', 'ja'),
         (page, fromLang, toLang) => {
           const fromPath = `/${fromLang}/${page}`;
           const toPath = switchLanguage(fromPath, toLang);
           expect(toPath).toBe(`/${toLang}/${page}`);
         }
       ),
       { numRuns: 100 }
     );
   });
   ```

3. **属性 3: SEO Meta 标签完整性**
   ```typescript
   // Feature: astro-decap-cms-refactor, Property 3: SEO Meta 标签完整性
   test('所有页面应该包含必需的 meta 标签', () => {
     fc.assert(
       fc.property(
         fc.constantFrom('en', 'zh', 'ja'),
         fc.constantFrom('home', 'support', 'privacy', 'terms'),
         (locale, page) => {
           const html = renderPage(locale, page);
           expect(html).toContain('<title>');
           expect(html).toContain('<meta name="description"');
         }
       ),
       { numRuns: 100 }
     );
   });
   ```

4. **属性 4: Hreflang 标签完整性**
   ```typescript
   // Feature: astro-decap-cms-refactor, Property 4: Hreflang 标签完整性
   test('多语言页面应该包含所有语言的 hreflang 标签', () => {
     fc.assert(
       fc.property(
         fc.constantFrom('en', 'zh', 'ja'),
         fc.constantFrom('home', 'support', 'privacy', 'terms'),
         (locale, page) => {
           const html = renderPage(locale, page);
           expect(html).toContain('hreflang="en"');
           expect(html).toContain('hreflang="zh"');
           expect(html).toContain('hreflang="ja"');
         }
       ),
       { numRuns: 100 }
     );
   });
   ```

5. **属性 5: 图片可访问性**
   ```typescript
   // Feature: astro-decap-cms-refactor, Property 5: 图片可访问性
   test('所有图片应该包含 alt 属性', () => {
     fc.assert(
       fc.property(
         fc.constantFrom('en', 'zh', 'ja'),
         fc.constantFrom('home', 'support'),
         (locale, page) => {
           const html = renderPage(locale, page);
           const imgTags = html.match(/<img[^>]*>/g) || [];
           imgTags.forEach(tag => {
             expect(tag).toContain('alt=');
           });
         }
       ),
       { numRuns: 100 }
     );
   });
   ```

### 集成测试

集成测试验证组件之间的交互：

**页面渲染测试**:
- 测试完整页面渲染流程
- 验证组件正确组合
- 检查数据正确传递给组件

**路由测试**:
- 测试所有路由正确生成
- 验证动态路由参数处理
- 测试 404 页面显示

**内容加载测试**:
- 测试从内容集合加载数据
- 验证多语言内容正确加载
- 测试内容过滤和查询

### 端到端测试

端到端测试验证完整的用户流程：

**用户导航流程**:
- 访问主页
- 切换语言
- 浏览不同页面
- 验证内容正确显示

**CMS 工作流程**:
- 登录 CMS
- 编辑内容
- 保存更改
- 验证更改反映在网站上

### 构建测试

验证构建过程和输出：

**构建输出验证**:
- 检查所有必需文件生成
- 验证文件结构符合 GitHub Pages 要求
- 检查资源优化（文件大小、压缩）

**配置验证**:
- 验证 Astro 配置正确
- 验证 CMS 配置格式正确
- 检查 TypeScript 配置

### 性能测试

验证网站性能指标：

**加载性能**:
- 测量首次内容绘制时间
- 测量完全加载时间
- 验证资源大小在合理范围内

**构建性能**:
- 测量构建时间
- 监控构建资源使用

### 可访问性测试

验证网站可访问性：

**自动化测试**:
- 使用 axe-core 进行可访问性扫描
- 检查 ARIA 标签使用
- 验证键盘导航

**手动测试**:
- 屏幕阅读器测试
- 键盘导航测试
- 颜色对比度检查

## 部署和运维

### GitHub Actions 工作流

```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

### Astro 配置

```javascript
// astro.config.mjs
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://username.github.io',
  base: '/moments-plus-website',
  output: 'static',
  build: {
    assets: '_assets',
  },
  vite: {
    build: {
      cssCodeSplit: true,
      rollupOptions: {
        output: {
          manualChunks: undefined,
        },
      },
    },
  },
});
```

### 环境配置

**开发环境**:
- 本地开发服务器: `npm run dev`
- 热重载启用
- 详细错误信息
- Source maps 启用

**生产环境**:
- 静态构建: `npm run build`
- 资源优化和压缩
- Source maps 禁用
- 环境变量配置

### 监控和日志

**构建监控**:
- GitHub Actions 构建状态
- 构建时间跟踪
- 构建失败通知

**网站监控**:
- 使用 GitHub Pages 内置分析
- 可选: 集成 Google Analytics
- 监控页面加载时间

**错误跟踪**:
- 构建错误日志
- 部署错误日志
- CMS 操作日志

## 迁移计划

### 阶段 1: 项目初始化

1. 创建新的 Git 分支用于重构
2. 初始化 Astro 项目
3. 配置 TypeScript
4. 设置基本目录结构

### 阶段 2: 内容提取和转换

1. 从现有 HTML 文件提取内容
2. 将内容转换为 Markdown 格式
3. 为每种语言创建内容文件
4. 迁移图片资源到 public/images/

### 阶段 3: 组件开发

1. 创建基础布局组件
2. 开发页面组件（Header, Footer, Hero, Features, Screenshots）
3. 实现语言切换器
4. 开发 404 页面

### 阶段 4: 页面实现

1. 实现主页
2. 实现支持页面
3. 实现隐私政策页面
4. 实现使用条款页面

### 阶段 5: i18n 集成

1. 配置 i18n 系统
2. 创建翻译文件
3. 实现语言检测和切换逻辑
4. 测试多语言功能

### 阶段 6: CMS 集成

1. 安装和配置 Decap CMS
2. 定义内容集合
3. 配置 Git Gateway 认证
4. 创建 CMS 管理界面
5. 测试内容编辑流程

### 阶段 7: SEO 和优化

1. 实现 SEO meta 标签
2. 生成 sitemap.xml
3. 配置 robots.txt
4. 优化图片加载
5. 实现代码分割

### 阶段 8: 部署配置

1. 配置 GitHub Actions 工作流
2. 设置 GitHub Pages
3. 配置 Astro base URL
4. 测试自动部署

### 阶段 9: 测试和验证

1. 运行单元测试
2. 运行属性测试
3. 执行集成测试
4. 进行端到端测试
5. 性能测试
6. 可访问性测试

### 阶段 10: 上线

1. 合并重构分支到主分支
2. 触发生产部署
3. 验证网站功能
4. 监控错误和性能
5. 更新文档

## 维护和扩展

### 日常维护

**内容更新**:
- 通过 CMS 界面编辑内容
- 定期审查和更新法律页面
- 添加新的应用截图

**依赖更新**:
- 定期更新 npm 依赖
- 关注 Astro 和 Decap CMS 更新
- 测试更新后的兼容性

**性能监控**:
- 定期检查页面加载时间
- 监控构建时间
- 优化大型资源

### 扩展功能

**可能的扩展**:
- 添加博客功能
- 集成用户反馈表单
- 添加应用更新日志
- 实现搜索功能
- 添加更多语言支持

**技术改进**:
- 实现渐进式 Web 应用 (PWA)
- 添加离线支持
- 集成分析工具
- 实现 A/B 测试

## 风险和缓解

### 技术风险

1. **Decap CMS 兼容性**
   - 风险: CMS 可能与某些 Git 提供商不兼容
   - 缓解: 提前测试 Git Gateway 配置，准备备用方案

2. **构建性能**
   - 风险: 大量内容可能导致构建时间过长
   - 缓解: 实现增量构建，优化构建配置

3. **GitHub Pages 限制**
   - 风险: 文件大小或数量限制
   - 缓解: 优化资源，考虑 CDN 方案

### 内容风险

1. **内容迁移错误**
   - 风险: 内容迁移过程中可能丢失或损坏数据
   - 缓解: 详细的迁移脚本，人工审查，保留原始文件备份

2. **多语言一致性**
   - 风险: 不同语言版本内容可能不同步
   - 缓解: CMS 工作流程，定期审查，翻译检查清单

### 运维风险

1. **部署失败**
   - 风险: 自动部署可能失败
   - 缓解: 完善的错误处理，通知机制，手动部署备用方案

2. **CMS 访问问题**
   - 风险: 认证服务可能不可用
   - 缓解: 多种认证方式，直接 Git 编辑备用方案

## 成功标准

项目成功的标准：

1. **功能完整性**
   - 所有原有页面和功能正常工作
   - CMS 可以编辑所有内容
   - 多语言切换正常

2. **性能指标**
   - 页面加载时间 < 3 秒
   - 构建时间 < 5 分钟
   - Lighthouse 分数 > 90

3. **代码质量**
   - 所有测试通过
   - 代码覆盖率 > 80%
   - 无严重的 linting 错误

4. **用户体验**
   - 响应式设计在所有设备上正常
   - 可访问性符合 WCAG 2.1 AA 标准
   - SEO 优化完整

5. **运维效率**
   - 自动部署成功率 > 95%
   - 内容编辑无需技术知识
   - 文档完整清晰
