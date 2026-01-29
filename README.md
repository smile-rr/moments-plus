# Moments+ Website

Moments+ iOS 应用的官方支持网站，使用 Astro 和 Decap CMS 构建。

## 技术栈

- **框架**: Astro 5.x
- **CMS**: Decap CMS 3.x
- **语言**: TypeScript
- **样式**: Scoped CSS
- **部署**: GitHub Pages
- **CI/CD**: GitHub Actions

## 功能特性

- ✅ 多语言支持（英文、中文、日文）
- ✅ 响应式设计
- ✅ SEO 优化（meta 标签、sitemap、hreflang）
- ✅ 内容管理系统（Decap CMS）
- ✅ 自动部署到 GitHub Pages
- ✅ 图片懒加载
- ✅ 可访问性优化

## 开发

### 前置要求

- Node.js 20+
- npm 或 yarn

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:4321

### 构建生产版本

```bash
npm run build
```

### 预览生产构建

```bash
npm run preview
```

## 项目结构

```
moments-plus-website/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions 部署配置
├── public/
│   ├── admin/                  # Decap CMS 管理界面
│   │   ├── index.html
│   │   └── config.yml
│   ├── images/                 # 静态图片资源
│   └── robots.txt
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
│   │   ├── 404.astro           # 404 错误页面
│   │   └── [lang]/             # 多语言页面
│   │       ├── index.astro     # 主页
│   │       ├── support.astro   # 支持页面
│   │       ├── privacy.astro   # 隐私政策
│   │       └── terms.astro     # 使用条款
│   ├── content/                # 内容集合（Markdown）
│   │   ├── config.ts           # 内容集合配置
│   │   ├── home/               # 主页内容
│   │   ├── support/            # 支持页面内容
│   │   ├── privacy/            # 隐私政策内容
│   │   └── terms/              # 使用条款内容
│   ├── i18n/                   # 国际化配置
│   │   ├── index.ts            # i18n 工具函数
│   │   └── locales/            # 翻译文件
│   │       ├── en.json
│   │       ├── zh.json
│   │       └── ja.json
│   ├── styles/                 # 全局样式
│   │   ├── variables.css       # CSS 变量
│   │   └── global.css          # 全局样式
│   └── utils/                  # 工具函数
│       ├── content.ts          # 内容查询函数
│       └── seo.ts              # SEO 工具函数
├── backup/                     # 原始 HTML 文件备份
├── astro.config.mjs            # Astro 配置
├── tsconfig.json               # TypeScript 配置
└── package.json

```

## 多语言支持

网站支持三种语言：
- **英文 (en)**: `/en/`
- **简体中文 (zh)**: `/zh/`
- **日文 (ja)**: `/ja/`

每种语言都有独立的内容文件，可以通过 CMS 或直接编辑 Markdown 文件来管理。

## 内容管理

### 访问 CMS

1. 启动开发服务器：`npm run dev`
2. 访问：http://localhost:4321/admin
3. 使用 GitHub 账号登录

### 编辑内容

CMS 提供了可视化界面来编辑以下内容：
- **主页**: Hero section、功能特性、截图
- **支持页面**: 联系信息、FAQ
- **隐私政策**: 法律文本
- **使用条款**: 法律文本

### 直接编辑

你也可以直接编辑 `src/content/` 目录下的 Markdown 文件：
- `home/*.md` - 主页内容
- `support/*.md` - 支持页面内容
- `privacy/*.md` - 隐私政策
- `terms/*.md` - 使用条款

## 部署

### 自动部署

项目配置了 GitHub Actions，当代码推送到 `main` 分支时会自动：
1. 安装依赖
2. 构建网站
3. 部署到 GitHub Pages

### 手动部署

```bash
npm run build
# 将 dist/ 目录的内容部署到你的服务器
```

### GitHub Pages 配置

1. 在 GitHub 仓库设置中启用 GitHub Pages
2. 选择 "GitHub Actions" 作为部署源
3. 更新 `astro.config.mjs` 中的 `site` 和 `base` 配置：
   ```js
   export default defineConfig({
     site: 'https://yourusername.github.io',
     base: '/moments-plus-website',
     // ...
   });
   ```
4. 更新 `public/admin/config.yml` 中的仓库信息：
   ```yaml
   backend:
     name: github
     repo: yourusername/moments-plus-website
     branch: main
   ```

## 开发指南

### 添加新页面

1. 在 `src/pages/[lang]/` 目录下创建新的 `.astro` 文件
2. 在 `src/content/` 下创建对应的内容文件
3. 更新导航链接（如需要）

### 添加新语言

1. 在 `src/i18n/index.ts` 中添加新语言到 `SUPPORTED_LOCALES`
2. 创建新的翻译文件 `src/i18n/locales/{lang}.json`
3. 为每个内容集合创建对应语言的 Markdown 文件
4. 更新 CMS 配置（如需要）

### 修改样式

- 全局样式：编辑 `src/styles/global.css`
- CSS 变量：编辑 `src/styles/variables.css`
- 组件样式：在组件文件中的 `<style>` 标签内编辑

## 故障排除

### 构建失败

```bash
# 清除缓存并重新安装依赖
rm -rf node_modules package-lock.json
npm install
npm run build
```

### CMS 无法访问

1. 确保 GitHub OAuth 应用已正确配置
2. 检查 `public/admin/config.yml` 中的仓库信息是否正确
3. 确保你有仓库的写入权限

### 图片不显示

1. 确保图片路径以 `/images/` 开头
2. 检查图片文件是否在 `public/images/` 目录中
3. 构建后检查 `dist/images/` 目录

## License

© 2026 Moments+. All rights reserved.

