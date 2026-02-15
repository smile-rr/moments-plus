# Cloudflare Worker: Geo redirect for .com

Runs in front of `moments-plus.com`. Redirects China mainland (CN) to `https://www.moments-plus.cn`; all other traffic is proxied to your Cloudflare Pages deployment.

## Setup

1. In `wrangler.toml`, set `PAGES_ORIGIN` to your Pages URL (e.g. `https://moments-plus.pages.dev`).
2. Deploy: `npx wrangler deploy` (from this directory). Use the same account as your Pages project.
3. In Cloudflare Dashboard: **Workers & Pages** → your worker **moments-plus-geo** → **Settings** → **Triggers** → **Add route**:
   - `*moments-plus.com/*`
   - `*www.moments-plus.com/*`
4. Ensure your .com domain DNS is proxied (orange cloud) so traffic hits Cloudflare and the Worker.

## Optional

- To keep search engine bots on .com (no redirect), add a check for common bot User-Agents and skip the CN redirect for them.
