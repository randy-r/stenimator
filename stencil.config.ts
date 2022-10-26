import { Config } from '@stencil/core';

const minify = true;
export const config: Config = {
  namespace: 'stenimator',
  minifyJs: minify,
  minifyCss: minify,
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements',
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
    },
  ],
};
