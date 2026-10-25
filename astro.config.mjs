// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Fully static output → deploy `dist/` to Cloudflare Pages.
export default defineConfig({
  site: 'https://ruchisharma.com',
  output: 'static',
  trailingSlash: 'always',
  build: { format: 'directory', inlineStylesheets: 'auto' },
  integrations: [sitemap()],
  image: { layout: 'constrained' },
  prefetch: { prefetchAll: false },
});
