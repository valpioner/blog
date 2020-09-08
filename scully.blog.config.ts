import { ScullyConfig, setPluginConfig } from '@scullyio/scully';
import { OptimizeCSSPlugin } from 'scully-plugin-optimize-css';
import { MinifyHtml } from 'scully-plugin-minify-html';
import { getSitemapPlugin } from '@gammastream/scully-plugin-sitemap';
import { DisableAngular } from 'scully-plugin-disable-angular';

const SitemapPlugin = getSitemapPlugin();
setPluginConfig(SitemapPlugin, {
  urlPrefix: 'https://gamma.stream',
  sitemapFilename: 'sitemap.xml',
  changeFreq: 'monthly',
  priority: [
    '1.0',
    '0.9',
    '0.8',
    '0.7',
    '0.6',
    '0.5',
    '0.4',
    '0.3',
    '0.2',
    '0.1',
    '0.0',
  ],
  ignoredRoutes: ['/404'],
  routes: {
    '/products/:productId': {
      changeFreq: 'daily',
      priority: '0.9',
      sitemapFilename: 'sitemap-products.xml',
    },
  },
});

export const config: ScullyConfig = {
  projectRoot: './src',
  projectName: 'blog',
  // pluginDir: './scully/plugins/',
  outDir: './dist/static',
  defaultPostRenderers: [MinifyHtml, OptimizeCSSPlugin, DisableAngular],
  routes: {
    '/blog/:slug': {
      type: 'contentFolder',
      slug: {
        folder: './blog',
      },
    },
  },
};
