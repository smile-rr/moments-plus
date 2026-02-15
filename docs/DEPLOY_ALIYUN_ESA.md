# Aliyun OSS + ESA 配置（大陆镜像 .cn）

大陆镜像使用 **阿里云 OSS** 存储静态文件，通过 **ESA（边缘安全加速）** 提供加速与安全防护。

## 前提

- 域名 `moments-plus.cn` 已备案；加速区域含中国内地时需完成备案且账号实名认证。

## 1. OSS 存储桶

- 在 OSS 控制台新建存储桶（如 `moments-plus-prod-cn`），地域选 `cn-hangzhou` 等。
- 访问控制：可选**私有**（推荐，由 ESA 回源带签名）或公共读。
- 若选私有，需在 ESA 中启用「同账号私有 OSS 回源」并完成授权。
- 在 GitHub 仓库 Secrets 中配置（供 CI 上传 dist）：
  - `ALIYUN_ACCESS_KEY_ID`、`ALIYUN_ACCESS_KEY_SECRET`
  - `ALIYUN_OSS_BUCKET`、`ALIYUN_OSS_REGION`

## 2. ESA 添加站点

- 登录 [边缘安全加速 ESA 控制台](https://esa.console.aliyun.com/) → 站点管理 → **新增站点**。
- 根域名：`moments-plus.cn`。
- 加速区域：中国内地（或全球，含大陆时仍需备案）。
- 接入方式：**CNAME**（保留现有 DNS）或 **NS**（解析托管到 ESA）。

## 3. 域名所有权验证

- 在 ESA 站点概览页复制 TXT 记录（Hostname: `_esaauth`，Record Value 为验证码）。
- 在阿里云云解析中为 `moments-plus.cn` 添加 TXT：主机记录 `_esaauth`，记录值粘贴验证码。
- 回到 ESA 控制台点击 **验证**。

## 4. ESA 添加加速域名并绑定 OSS

- ESA 站点下：**DNS → 记录** → **添加记录**。
- 记录类型：CNAME；主机记录：`www`；**代理状态**：开启。
- 记录值/源站：选择 **OSS**；访问类型与 OSS 桶权限一致（私有/公网）；选择对应 OSS 桶。
- 保存后复制 ESA 提供的 **CNAME 记录值**。

## 5. DNS 解析

- 在阿里云云解析为 `moments-plus.cn` 添加 CNAME：主机记录 `www`，记录值为步骤 4 的 ESA CNAME。

## 6. ESA 证书与缓存

- **HTTPS**：在 ESA 中为该站点/域名申请或上传边缘证书，开启 HTTPS。
- **缓存**：`_astro/*`、`_assets/*`、`*.js`、`*.css` 等长缓存；`index.html`、`/` 较短缓存。
- **安全**：按需开启 WAF、CC 防护等。

## 7. CI 与刷新

- GitHub Actions 将 `dist/` 上传到 OSS（见 `.github/workflows/deploy.yml`）。
- 发布后需立刻生效时，在 ESA 控制台使用「刷新预热」对 `https://www.moments-plus.cn/` 等做 URL 刷新。
