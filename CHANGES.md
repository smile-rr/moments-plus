# Decap CMS 使用指南

## ✅ 已修复！

Decap CMS 现在可以正常使用了！

## 快速开始

### 本地开发（测试模式）
1. 启动开发服务器：`npm run dev`
2. 访问：`http://localhost:4321/admin/`
3. 直接使用，无需登录！

当前配置使用 `test-repo` backend：
- 无需 GitHub 认证
- 数据存储在浏览器 localStorage
- 适合本地测试和演示

### 生产环境（GitHub 模式）
编辑 `public/admin/config.yml`，将 backend 改为：
```yaml
backend:
  name: github
  repo: yourusername/moments-plus-website
  branch: main
```

## 功能说明

### 可以管理的内容
- **博客 (English)** - 英文博客文章
- **博客 (中文)** - 中文博客文章
- **主页** - Hero、Features、Screenshots
- **支持页面** - FAQ 和联系方式
- **隐私政策** - 隐私政策内容
- **使用条款** - 使用条款内容

### 创建新博客
1. 访问 `/admin/`
2. 点击左侧 "博客 (English)" 或 "博客 (中文)"
3. 点击 "New 博客" 按钮
4. 填写标题、描述、内容
5. 点击 "Publish" 发布

## 配置文件

配置文件位置：`public/admin/config.yml`

### 切换到 GitHub Backend
```yaml
backend:
  name: github
  repo: your-username/your-repo
  branch: main
```

### 使用本地后端（推荐开发时使用）
```yaml
backend:
  name: git-gateway
local_backend: true
```
然后运行：`npx decap-server`

## 其他改进

### Header
- Blog + Support 链接
- "Get the App" 按钮（深灰黑色）
- 语言切换：EN / 中文

### Footer
- 简化为 2 栏布局
- App Store 作为普通链接

### 翻译
- footer.tagline: "Your moments, beautifully organized"
- nav.download: "Get the App"
