// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  site: 'https://yourusername.github.io',
  output: 'static',
  integrations: [sitemap(), tailwind()],
  build: {
    assets: '_assets',
  },
  vite: {
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
