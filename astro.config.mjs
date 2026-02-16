// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  site:
    process.env.PUBLIC_DEFAULT_LOCALE === 'zh'
      ? 'https://www.moments-plus.cn'
      : 'https://moments-plus.com',
  output: 'static',
  integrations: [sitemap(), tailwind()],
  build: {
    assets: '_assets',
  },
  vite: {
    define: {
      'import.meta.env.BUILD_ID': JSON.stringify(
        process.env.COMMIT_REF ||
        process.env.CI_COMMIT_SHA ||
        process.env.GITHUB_SHA ||
        `build-${Date.now()}`
      ),
    },
    server: {
      fs: {
        strict: false,
      },
    },
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
