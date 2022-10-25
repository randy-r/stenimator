import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'stenimator',
  minifyJs: false,
  minifyCss: false,
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
