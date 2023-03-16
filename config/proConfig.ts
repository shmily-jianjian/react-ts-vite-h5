// vite生产环境的配置

import legacy from '@vitejs/plugin-legacy';
import { UserConfig } from 'vite';

const proConfig: UserConfig = {
  plugins: [
    legacy({
      targets: ['ie >= 11'],
      additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
    }),
  ],
};
export default proConfig;
