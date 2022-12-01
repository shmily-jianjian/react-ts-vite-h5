import { defineConfig, loadEnv, mergeConfig, UserConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import postcssPxToViewport from 'postcss-px-to-viewport-8-plugin';
import { adaptationConfig } from './config/adaptation';
import Unocss from 'unocss/vite';
import devConfig from './config/devConfig';
import proConfig from './config/proConfig';

// https://vitejs.dev/config/

export default defineConfig(({ mode, command }) => {
  const env = loadEnv(mode, process.cwd());
  console.log(env);

  let config: UserConfig;

  if (command === 'serve') {
    config = devConfig;
  } else {
    config = proConfig;
  }

  const commonConfig: UserConfig = {
    plugins: [react(), Unocss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    css: {
      postcss: {
        plugins: [postcssPxToViewport({ ...adaptationConfig })],
      },
    },
    server: {
      host: '0.0.0.0',
      port: Number(env.VITE_APP_PORT),
      proxy: {
        '/api': {
          target: 'https://i.maoyan.com/api/mmdb/movie',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
    // vite3默认使用esbuild
    esbuild: {
      tsconfigRaw: {
        compilerOptions: {
          importsNotUsedAsValues: 'remove',
        },
      },
      drop: ['console', 'console'],
    },
    build: {
      rollupOptions: {
        output: {
          chunkFileNames: 'static/js/[name]-[hash].js',
          entryFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
          // TODO 待优化
          // manualChunks: {
          // },
        },
      },
    },
  };

  return mergeConfig(commonConfig, config);
});
