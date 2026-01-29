# Decap CMS 使用指南

## 访问 CMS

1. **本地开发**
   ```bash
   npm run dev
   ```
   访问: http://localhost:4321/admin

2. **生产环境**
   部署后访问: https://your-domain.com/admin

## 登录方式

### GitHub OAuth (推荐用于生产环境)

1. 在 GitHub 创建 OAuth App:
   - Settings → Developer settings → OAuth Apps → New OAuth App
   - Homepage URL: `https://your-domain.com`
   - Authorization callback URL: `https://api.netlify.com/auth/done`

2. 配置 Netlify Identity (如果使用 Netlify)
   - 在 Netlify 站点设置中启用 Identity
   - 配置 GitHub 作为外部提供商

### 本地开发 (Git Gateway)

本地开发时，CMS 会使用 Git Gateway 模式，直接编辑本地文件。

## 内容管理

### 1. 首页内容 (Home)

编辑路径: `src/content/home/{lang}.md`

可编辑内容:
- 页面标题和描述
- Hero 区域文案
- Features 列表
- Screenshots 列表

### 2. 博客文章 (Blog)

创建路径: `src/content/blog/{lang}/{slug}.md`

支持字段:
- 标题 (title)
- 描述 (description)
- 发布日期 (publishDate)
- 作者 (author)
- 分类 (category): product, usecase, tips, update
- 正文内容 (Markdown)

### 3. 支持页面 (Support)

编辑路径: `src/content/support/{lang}.md`

可编辑内容:
- 页面标题
- 联系邮箱
- FAQ 列表

### 4. 法律页面

- 隐私政策: `src/content/privacy/{lang}.md`
- 使用条款: `src/content/terms/{lang}.md`

## 工作流程

1. **登录 CMS**
   访问 `/admin` 并使用 GitHub 账号登录

2. **选择内容类型**
   从左侧菜单选择要编辑的内容类型

3. **编辑内容**
   - 点击现有条目进行编辑
   - 或点击 "New {Content Type}" 创建新内容

4. **保存和发布**
   - 点击 "Save" 保存草稿
   - 点击 "Publish" 发布更改
   - 更改会自动提交到 Git 仓库

5. **预览**
   编辑时可以切换到 "Preview" 模式查看效果

## 多语言支持

系统支持三种语言:
- 英语 (en) - 默认语言
- 中文 (zh)
- 日语 (ja)

每种内容类型都有对应的语言版本，在 CMS 中分别管理。

## 注意事项

1. **图片上传**
   - 图片会保存到 `public/images/` 目录
   - 建议使用 WebP 格式以获得更好的性能
   - 图片大小建议不超过 1MB

2. **Markdown 支持**
   - 支持标准 Markdown 语法
   - 支持代码高亮
   - 支持表格和列表

3. **自动部署**
   - 每次发布都会触发 GitHub Actions
   - 自动构建并部署到 GitHub Pages
   - 通常需要 2-3 分钟完成部署

## 故障排除

### 无法登录
- 检查 GitHub OAuth 配置
- 确认已启用 Netlify Identity (如果使用)
- 清除浏览器缓存后重试

### 内容未更新
- 检查 Git 仓库是否有新提交
- 查看 GitHub Actions 构建状态
- 等待部署完成 (2-3 分钟)

### 图片无法显示
- 确认图片路径正确
- 检查图片是否已提交到仓库
- 验证图片格式是否支持

## 技术支持

如有问题，请查看:
- [Decap CMS 文档](https://decapcms.org/docs/)
- [Astro 文档](https://docs.astro.build/)
- 项目 GitHub Issues
