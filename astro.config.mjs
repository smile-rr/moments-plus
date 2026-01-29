// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://yourusername.github.io',
  // 在开发环境中不使用 base，在生产环境中使用
  // 如果你的 GitHub Pages 部署在根路径，可以完全移除 base
  // base: '/moments-plus-website',
  output: 'static',
  integrations: [sitemap()],
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
