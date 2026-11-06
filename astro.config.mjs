import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// The only place the production domain lives. Swap to the real domain once it
// is bought (spec section 2). Until then the site runs on its workers.dev address.
const SITE_URL = 'https://firstnamelastname.com';

export default defineConfig({
  site: SITE_URL,
  output: 'static',
  trailingSlash: 'never',
  build: {
    format: 'file',
    inlineStylesheets: 'always',
  },
  integrations: [sitemap()],
});
