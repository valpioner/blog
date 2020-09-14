import { ScullyConfig, RouteTypes } from '@scullyio/scully';
import { OptimizeCSSPlugin } from 'scully-plugin-optimize-css';
import { MinifyHtml } from 'scully-plugin-minify-html';
// import { DisableAngular } from 'scully-plugin-disable-angular';

export const config: ScullyConfig = {
  projectRoot: './src',
  projectName: 'blog',
  // pluginDir: './scully/plugins/',
  outDir: './dist/static',
  defaultPostRenderers: [MinifyHtml, OptimizeCSSPlugin /*, DisableAngular*/],
  routes: {
    '/blog/:slug': {
      type: RouteTypes.contentFolder,
      slug: {
        folder: './blog',
      },
    },
  },
};
