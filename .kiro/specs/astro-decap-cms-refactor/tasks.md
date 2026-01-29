# 实施计划: Astro + Decap CMS 重构

## 概述

本实施计划将 Moments+ 网站从纯 HTML/CSS 架构重构为基于 Astro 和 Decap CMS 的现代化静态站点。任务按照逐步构建的方式组织，每个任务都建立在前面任务的基础上。

## 任务

- [x] 1. 项目初始化和基础配置
  - 创建新的 Git 分支 `refactor/astro-decap-cms`
  - 初始化 Astro 4.x 项目
  - 配置 TypeScript
  - 设置基本目录结构（src/components, src/layouts, src/pages, src/content, src/i18n, src/styles, src/utils）
  - 配置 package.json 脚本（dev, build, preview）
  - 创建 .gitignore 文件
  - _需求: 1.1, 1.3, 11.1, 11.5, 11.6_

- [ ]* 1.1 编写项目配置验证测试
  - 验证 package.json 包含必需的依赖和脚本
  - 验证目录结构正确创建
  - _需求: 1.1, 11.5_

- [x] 2. 内容提取和迁移
  - [x] 2.1 从现有 HTML 文件提取内容
    - 提取主页内容（hero, features, screenshots）
    - 提取支持页面内容
    - 提取隐私政策和使用条款内容
    - 为每种语言（en, zh, ja）分别提取
    - _需求: 12.1, 12.2_

  - [x] 2.2 创建内容文件
    - 在 src/content/ 下创建内容集合目录（home, support, privacy, terms）
    - 将提取的内容转换为 Markdown 格式
    - 为每种语言创建对应的内容文件（en.md, zh.md, ja.md）
    - 添加 frontmatter 元数据
    - _需求: 12.2, 12.3_

  - [x] 2.3 迁移图片资源
    - 将现有图片复制到 public/images/ 目录
    - 保持应用图标和截图的文件名和结构
    - 更新内容文件中的图片路径
    - _需求: 10.6_

- [ ]* 2.4 验证内容迁移完整性
  - 检查所有语言的内容文件是否存在
  - 验证图片资源正确迁移
  - _需求: 12.3, 12.5_

- [x] 3. 内容集合配置
  - [x] 3.1 定义内容 Schema
    - 创建 src/content/config.ts
    - 定义主页内容 Schema（title, subtitle, hero, features, screenshots）
    - 定义支持页面 Schema（title, description, email, faq）
    - 定义法律页面 Schema（title, lastUpdated, body）
    - 使用 Zod 进行类型验证
    - _需求: 5.1, 5.2, 5.3_

  - [x] 3.2 创建内容工具函数
    - 在 src/utils/content.ts 中创建内容查询函数
    - 实现 getContentByLocale() 函数
    - 实现内容过滤和排序逻辑
    - _需求: 5.1, 5.2, 5.3_

- [ ]* 3.3 编写内容 Schema 验证测试
  - 验证 Schema 定义正确
  - 测试内容文件符合 Schema
  - _需求: 5.1, 5.2, 5.3_

- [ ]* 3.4 编写内容工具函数单元测试
  - 测试 getContentByLocale() 返回正确内容
  - 测试边缘情况（空内容、缺失字段）
  - _需求: 5.1, 5.2, 5.3_

- [x] 4. 国际化系统实现
  - [x] 4.1 创建 i18n 配置和工具函数
    - 创建 src/i18n/index.ts
    - 定义支持的语言常量（SUPPORTED_LOCALES, DEFAULT_LOCALE）
    - 实现 getLocaleFromUrl() 函数
    - 实现 getLocalizedPath() 函数
    - 实现 detectBrowserLocale() 函数
    - 实现 getAllLocalePaths() 函数
    - _需求: 3.1, 3.2, 3.3, 3.4_

  - [x] 4.2 创建 UI 翻译文件
    - 创建 src/i18n/locales/ 目录
    - 创建 en.json, zh.json, ja.json 翻译文件
    - 定义导航、页脚、通用文本的翻译
    - 实现 t() 翻译函数
    - _需求: 3.6_

- [ ]* 4.3 编写 i18n 工具函数单元测试
  - 测试 getLocaleFromUrl() 正确提取语言代码
  - 测试 getLocalizedPath() 生成正确路径
  - 测试 detectBrowserLocale() 处理各种浏览器语言设置
  - 测试语言回退逻辑
  - _需求: 3.1, 3.2, 3.3, 3.4_

- [ ]* 4.4 编写语言检测一致性属性测试
  - **属性 1: 语言检测一致性**
  - **验证: 需求 3.2**
  - 对于任意支持的浏览器语言设置，验证重定向到对应语言主页
  - _需求: 3.2_

- [ ]* 4.5 编写语言切换路径保持属性测试
  - **属性 2: 语言切换路径保持**
  - **验证: 需求 3.4**
  - 对于任意页面和语言组合，验证切换后保持相同页面类型
  - _需求: 3.4_

- [x] 5. 基础布局和组件开发
  - [x] 5.1 创建 BaseLayout 组件
    - 创建 src/layouts/BaseLayout.astro
    - 实现 HTML 文档结构
    - 添加 SEO meta 标签
    - 引入全局样式
    - 集成 Header 和 Footer 组件
    - _需求: 4.1, 8.1, 8.2_

  - [x] 5.2 创建 Header 组件
    - 创建 src/components/Header.astro
    - 实现网站 logo 显示
    - 实现导航菜单
    - 集成语言切换器
    - 实现响应式菜单（移动端）
    - _需求: 4.7, 7.1, 7.2, 7.3_

  - [x] 5.3 创建 Footer 组件
    - 创建 src/components/Footer.astro
    - 显示版权信息
    - 添加法律页面链接
    - _需求: 4.7_

  - [x] 5.4 创建 LanguageSwitcher 组件
    - 创建 src/components/LanguageSwitcher.astro
    - 显示当前语言
    - 实现语言选择下拉菜单
    - 生成对应语言的 URL
    - _需求: 3.4, 3.5_

- [ ]* 5.5 编写布局和组件渲染测试
  - 测试 BaseLayout 正确渲染
  - 测试 Header 包含导航元素
  - 测试 LanguageSwitcher 生成正确的语言链接
  - _需求: 4.1, 4.7, 3.5_

- [x] 6. 样式系统实现
  - [x] 6.1 创建全局样式
    - 创建 src/styles/variables.css（定义颜色、字体、间距变量）
    - 创建 src/styles/global.css（全局样式、重置样式）
    - 在 BaseLayout 中引入全局样式
    - _需求: 13.1, 13.4_

  - [x] 6.2 为组件添加 Scoped Styles
    - 为 Header 组件添加样式
    - 为 Footer 组件添加样式
    - 为 LanguageSwitcher 组件添加样式
    - 确保样式响应式
    - _需求: 13.1, 13.3, 7.1, 7.2, 7.3_

- [ ]* 6.3 验证样式系统配置
  - 检查全局样式变量定义
  - 验证组件使用 Scoped Styles
  - _需求: 13.1, 13.4_

- [x] 7. 主页实现
  - [x] 7.1 创建 Hero 组件
    - 创建 src/components/Hero.astro
    - 显示应用标题、副标题、描述
    - 显示应用图标
    - 添加 CTA 按钮
    - 实现响应式布局
    - _需求: 4.1_

  - [x] 7.2 创建 Features 组件
    - 创建 src/components/Features.astro
    - 以网格布局展示功能列表
    - 支持可选图标显示
    - 实现响应式布局
    - _需求: 4.1_

  - [x] 7.3 创建 Screenshots 组件
    - 创建 src/components/Screenshots.astro
    - 以网格或轮播展示截图
    - 实现图片懒加载
    - 使用响应式图片
    - 添加可选的图片说明
    - _需求: 4.1, 15.3_

  - [x] 7.4 创建主页路由
    - 创建 src/pages/[lang]/index.astro
    - 从内容集合加载主页内容
    - 组合 Hero, Features, Screenshots 组件
    - 使用 BaseLayout 布局
    - _需求: 4.1_

  - [x] 7.5 创建根路径重定向
    - 创建 src/pages/index.astro
    - 实现语言检测逻辑
    - 重定向到对应语言的主页
    - _需求: 3.2_

- [ ]* 7.6 编写主页组件测试
  - 测试 Hero 组件正确渲染
  - 测试 Features 组件显示功能列表
  - 测试 Screenshots 组件显示截图
  - _需求: 4.1_

- [x] 8. 其他页面实现
  - [x] 8.1 创建支持页面
    - 创建 src/pages/[lang]/support.astro
    - 从内容集合加载支持页面内容
    - 显示联系邮箱
    - 显示 FAQ（如果有）
    - _需求: 4.2_

  - [x] 8.2 创建 LegalLayout 组件
    - 创建 src/layouts/LegalLayout.astro
    - 继承 BaseLayout
    - 添加法律页面特定样式
    - 显示最后更新日期
    - _需求: 4.3, 4.4_

  - [x] 8.3 创建隐私政策页面
    - 创建 src/pages/[lang]/privacy.astro
    - 从内容集合加载隐私政策内容
    - 使用 LegalLayout 布局
    - 渲染 Markdown 内容
    - _需求: 4.3_

  - [x] 8.4 创建使用条款页面
    - 创建 src/pages/[lang]/terms.astro
    - 从内容集合加载使用条款内容
    - 使用 LegalLayout 布局
    - 渲染 Markdown 内容
    - _需求: 4.4_

  - [x] 8.5 创建 404 错误页面
    - 创建 src/pages/404.astro
    - 为每种语言提供本地化错误消息
    - 添加返回主页链接
    - 保持网站整体设计风格
    - _需求: 14.1, 14.2, 14.3_

- [ ]* 8.6 编写页面渲染测试
  - 测试支持页面正确渲染
  - 测试法律页面正确渲染
  - 测试 404 页面包含返回链接
  - _需求: 4.2, 4.3, 4.4, 14.1, 14.2, 14.3_

- [x] 9. SEO 优化实现
  - [x] 9.1 创建 SEO 工具函数
    - 创建 src/utils/seo.ts
    - 实现 generateSEOData() 函数
    - 生成 meta 标签数据
    - 生成 hreflang 标签数据
    - 生成 Open Graph 数据
    - _需求: 8.1, 8.3_

  - [x] 9.2 在 BaseLayout 中集成 SEO
    - 使用 SEO 工具函数生成标签
    - 添加 canonical URL
    - 添加 hreflang 标签
    - 添加 Open Graph 标签
    - _需求: 8.1, 8.3_

  - [x] 9.3 确保图片可访问性
    - 为所有 img 标签添加 alt 属性
    - 在组件中强制要求 alt 属性
    - _需求: 8.6_

  - [x] 9.4 生成 sitemap 和 robots.txt
    - 配置 Astro 生成 sitemap.xml
    - 创建 public/robots.txt
    - _需求: 8.4, 8.5_

- [ ]* 9.5 编写 SEO Meta 标签完整性属性测试
  - **属性 3: SEO Meta 标签完整性**
  - **验证: 需求 8.1**
  - 对于任意页面，验证包含 title 和 description meta 标签
  - _需求: 8.1_

- [ ]* 9.6 编写 Hreflang 标签完整性属性测试
  - **属性 4: Hreflang 标签完整性**
  - **验证: 需求 8.3**
  - 对于任意多语言页面，验证包含所有语言的 hreflang 标签
  - _需求: 8.3_

- [ ]* 9.7 编写图片可访问性属性测试
  - **属性 5: 图片可访问性**
  - **验证: 需求 8.6**
  - 对于任意包含图片的页面，验证所有 img 标签包含 alt 属性
  - _需求: 8.6_

- [ ]* 9.8 编写 SEO 工具函数单元测试
  - 测试 generateSEOData() 生成正确的数据
  - 测试 meta 标签生成
  - 测试 hreflang 标签生成
  - _需求: 8.1, 8.3_

- [ ] 10. Checkpoint - 验证核心功能
  - 运行所有测试确保通过
  - 本地构建并预览网站
  - 验证所有页面正确显示
  - 验证多语言切换正常
  - 验证响应式设计
  - 如有问题请询问用户

- [x] 11. Decap CMS 集成
  - [x] 11.1 安装 Decap CMS
    - 添加 decap-cms-app 依赖
    - 创建 public/admin/ 目录
    - 创建 public/admin/index.html（CMS 入口页面）
    - _需求: 2.1_

  - [x] 11.2 配置 CMS 后端和基本设置
    - 创建 public/admin/config.yml
    - 配置 GitHub 后端
    - 配置媒体文件路径（media_folder, public_folder）
    - 配置 i18n 结构（structure: multiple_files, locales: [en, zh, ja]）
    - _需求: 2.3, 6.1, 6.2, 6.4, 3.7_

  - [x] 11.3 定义主页 Collection
    - 在 config.yml 中定义 home collection
    - 配置字段（title, subtitle, hero, features, screenshots）
    - 为每个字段配置 i18n 设置
    - 配置字段验证规则
    - _需求: 2.5, 2.6, 5.1, 5.5, 6.3_

  - [x] 11.4 定义支持页面 Collection
    - 在 config.yml 中定义 support collection
    - 配置字段（title, description, email, faq）
    - 为每个字段配置 i18n 设置
    - _需求: 2.5, 2.6, 5.2, 5.5, 6.3_

  - [x] 11.5 定义法律页面 Collections
    - 在 config.yml 中定义 privacy 和 terms collections
    - 配置字段（title, lastUpdated, body）
    - 为每个字段配置 i18n 设置
    - _需求: 2.5, 2.6, 5.3, 5.5, 6.3_

  - [x] 11.6 配置 CMS 预览模板（可选）
    - 为每个 collection 配置预览模板
    - _需求: 6.5_

- [ ]* 11.7 验证 CMS 配置
  - 检查 config.yml 文件存在且格式正确
  - 验证所有 collections 定义完整
  - 验证 i18n 配置正确
  - _需求: 2.1, 2.5, 2.6, 6.1, 6.2, 6.3, 6.4_

- [ ] 12. 性能优化
  - [ ] 12.1 配置图片优化
    - 安装 @astrojs/image 或使用 Astro 内置图片优化
    - 在组件中使用优化的 Image 组件
    - 配置图片懒加载
    - 生成响应式图片
    - _需求: 10.5, 15.3_

  - [ ] 12.2 配置资源优化
    - 在 astro.config.mjs 中配置构建优化
    - 启用 CSS 代码分割
    - 配置资源压缩
    - _需求: 1.4, 13.5, 15.4_

  - [ ] 12.3 实现延迟加载
    - 为非关键资源添加 loading="lazy"
    - 优化字体加载
    - _需求: 15.2_

- [ ]* 12.4 验证性能优化
  - 检查构建产物文件大小
  - 验证图片被优化
  - 验证 CSS 和 JS 被压缩
  - _需求: 1.4, 10.5, 13.5, 15.3, 15.4_

- [x] 13. GitHub Actions 部署配置
  - [x] 13.1 创建部署工作流
    - 创建 .github/workflows/deploy.yml
    - 配置触发条件（push to main）
    - 配置 Node.js 环境
    - 添加依赖安装步骤
    - 添加构建步骤
    - 添加部署到 GitHub Pages 步骤
    - _需求: 9.1, 9.2, 9.3_

  - [x] 13.2 配置 Astro 用于 GitHub Pages
    - 在 astro.config.mjs 中配置 site 和 base
    - 确保路径正确用于 GitHub Pages
    - _需求: 9.4_

  - [x] 13.3 配置 GitHub Pages 设置
    - 在 GitHub 仓库设置中启用 GitHub Pages
    - 配置部署源为 GitHub Actions
    - _需求: 9.3_

- [ ]* 13.4 验证部署配置
  - 检查工作流文件存在且配置正确
  - 验证 Astro 配置包含正确的 base URL
  - _需求: 9.1, 9.2, 9.3, 9.4_

- [x] 14. 文档和最终验证
  - [x] 14.1 创建项目文档
    - 创建 README.md
    - 记录项目结构
    - 记录开发命令
    - 记录部署流程
    - 记录 CMS 使用说明
    - _需求: 11.4_

  - [x] 14.2 创建内容编辑指南
    - 记录如何访问 CMS
    - 记录如何编辑不同类型的内容
    - 记录如何上传图片
    - _需求: 2.2, 10.1_

- [ ]* 14.3 运行完整测试套件
  - 运行所有单元测试
  - 运行所有属性测试
  - 验证测试覆盖率
  - _需求: 所有_

- [ ] 15. Checkpoint - 最终验证
  - 本地构建并测试完整网站
  - 验证所有页面和功能
  - 验证 CMS 可以编辑内容
  - 验证多语言功能
  - 验证响应式设计
  - 验证 SEO 标签
  - 如有问题请询问用户

- [ ] 16. 部署和上线
  - [ ] 16.1 合并到主分支
    - 审查所有更改
    - 合并 refactor/astro-decap-cms 分支到 main
    - _需求: 9.2_

  - [ ] 16.2 触发生产部署
    - 推送到 main 分支触发 GitHub Actions
    - 监控构建和部署过程
    - _需求: 9.2, 9.3_

  - [ ] 16.3 验证生产环境
    - 访问部署的网站
    - 验证所有页面正常工作
    - 验证 CMS 可以访问
    - 测试内容编辑和提交
    - _需求: 9.5_

## 注意事项

- 标记为 `*` 的任务是可选的测试任务，可以跳过以加快 MVP 开发
- 每个任务都引用了相关的需求编号以便追溯
- Checkpoint 任务用于确保增量验证
- 属性测试使用 fast-check 库，每个测试运行最少 100 次迭代
- 所有测试任务都标记了对应的设计文档属性编号
