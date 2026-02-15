/**
 * Geo redirect for moments-plus.com:
 * - China mainland (cf.country === 'CN') → 302 to https://www.moments-plus.cn
 * - Else → pass through to Pages (fetch from PAGES_ORIGIN)
 *
 * Deploy: from repo root, `cd cloudflare-worker && npx wrangler deploy`
 * Configure: set PAGES_ORIGIN in wrangler.toml to your Pages URL (e.g. https://xxx.pages.dev)
 * Route: in Cloudflare Dashboard, add route *moments-plus.com/* and *www.moments-plus.com/* to this Worker.
 */
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const country = request.cf?.country;

    if (country === 'CN') {
      const target = `https://www.moments-plus.cn${url.pathname}${url.search}`;
      return Response.redirect(target, 302);
    }

    const origin = env.PAGES_ORIGIN || '';
    if (!origin) {
      return new Response('PAGES_ORIGIN not configured', { status: 500 });
    }
    const originUrl = `${origin}${url.pathname}${url.search}`;
    const res = await fetch(originUrl, {
      method: request.method,
      headers: request.headers,
    });
    const headers = new Headers(res.headers);
    return new Response(res.body, {
      status: res.status,
      statusText: res.statusText,
      headers,
    });
  },
};
