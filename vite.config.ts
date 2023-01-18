import { defineConfig, UserConfigExport } from 'vite';
import vue from '@vitejs/plugin-vue';
import federation from '@originjs/vite-plugin-federation';
import initializeRemoteRepos from './build/initializeRemoteRepos';
import {
  defineReactRemoteComponents,
  defineVueRemoteComponents,
} from './build/defineRemoteComponents';
import injectAppInfos from './build/injectAppInfos';
import injectAssets from './build/injectAssets';
import injectStyles from './build/injectStyles';

const PORT = 3000;

// https://vitejs.dev/config/
export default defineConfig(async ({ mode }) => {
  const previewMode = process.env.PREVIEW === 'true' && mode === 'production';
  const localMode = process.env.LOCAL === 'true' && mode === 'development';

  const viteConfig: UserConfigExport = {
    server: {
      port: PORT,
      proxy: {
        '/node_modules/.vite/tsnh-macos-kernel.js': {
          target: `http://localhost:${PORT}`,
          changeOrigin: true,
          rewrite: () => `/node_modules/tsnh-macos-kernel/dist/macos-kernel.js`,
        },
      },
    },
    preview: {
      port: PORT,
    },
    plugins: [vue()],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: await injectStyles(),
        },
      },
    },
    build: {
      rollupOptions: {
        plugins: [
          {
            name: 'closeBundle',
            closeBundle() {
              injectAssets(mode);
            },
          },
        ],
      },
    },
  };

  if (mode !== 'preview') {
    const { remotes, viteVueApps, viteReactApps } = await initializeRemoteRepos(
      {
        mode,
        port: PORT,
        previewMode,
        localMode,
      }
    );

    viteConfig.plugins.push(defineVueRemoteComponents(viteVueApps));

    viteConfig.plugins.push(defineReactRemoteComponents(viteReactApps));

    viteConfig.plugins.push(
      federation({
        name: 'host-app',
        remotes,
        shared: ['vue', 'tsnh-macos-kernel', 'pinia'],
      })
    );
  }

  injectAppInfos();
  injectAssets(mode);

  return viteConfig;
});
