# 部署验证与回滚

## 验证（端到端）

在 `release_v3.0` 上跑通 `.github/workflows/deploy.yml` 后：

1. **Cloudflare Pages（.com）**
   - 非大陆 IP 访问 `https://www.moments-plus.com`：应看到英文站；根路径应跳转到 `/en/`。
   - 确认 Pages 部署来自 GitHub Actions（未启用 Cloudflare Git 自动构建）。

2. **阿里云 .cn（OSS + ESA）**
   - 访问 `https://www.moments-plus.cn`：应看到中文站；根路径应跳转到 `/zh/`。
   - 确认内容与最近一次 build 一致。

3. **Cloudflare Worker（.com 分流）**
   - 大陆 IP 访问 `https://www.moments-plus.com`：应 302 到 `https://www.moments-plus.cn`（保留 path/query）。
   - 非大陆 IP：由 Worker 转发到 Pages 或直接由 Pages 响应，URL 仍为 .com。

4. **语言与 Footer**
   - 在 .com 上点击「中文」应跳到 .cn 对应路径；在 .cn 上点击「EN」应跳到 .com 对应路径。

## 回滚

- **Cloudflare Pages**：在 Cloudflare Dashboard → Pages → 项目 → Deployments，选择上一版本 → **Rollback to this deployment**。
- **阿里云 OSS**：用上一版 `dist` 重新执行 `ossutil cp -r dist/ oss://$ALIYUN_OSS_BUCKET/ --update`；必要时在 ESA 控制台做 URL 刷新。
- **Cloudflare Worker**：在 Dashboard 中回退 Worker 版本，或暂时移除/修改路由使 .com 直接由 Pages 响应。
