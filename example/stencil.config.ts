import { Config } from '@stencil/core';

// https://stenciljs.com/docs/config

const minify = true;
export const config: Config = {
  devServer: {
    openBrowser: false,
    // basePath: '/'
  },
  globalStyle: 'src/global/app.css',
  globalScript: 'src/global/app.ts',
  taskQueue: 'async',
  tsconfig: 'tsconfig.json',
  minifyJs: minify,
  minifyCss: false,
  outputTargets: [
    {
      type: 'www',
      // comment the following line to disable service workers in production
      serviceWorker: null,
      baseUrl: 'https://randy-r.github.io/stenimator',
      prerenderConfig: './prerender.config.ts',
    },
  ],
};
