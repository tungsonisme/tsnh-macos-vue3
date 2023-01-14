import { defineConfig, UserConfigExport } from 'vite';
import vue from '@vitejs/plugin-vue';
import federation from '@originjs/vite-plugin-federation';
import initializeRemoteRepos from './build/initializeRemoteRepos';
import defineRemoteComponents from './build/defineRemoteComponents';
import injectAppInfos from './build/injectAppInfos';

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
          additionalData: `
            @import 'src/styles/color.scss';
            @import 'src/styles/layout.scss';
            @import 'src/styles/zIndex.scss';
          `,
        },
      },
    },
  };

  if (mode !== 'preview') {
    const { remotes, viteRegisteredApps } = await initializeRemoteRepos({
      mode,
      port: PORT,
      previewMode,
      localMode,
    });

    viteConfig.plugins.push(defineRemoteComponents(viteRegisteredApps));

    viteConfig.plugins.push(
      federation({
        name: 'host-app',
        remotes,
        shared: ['vue', 'tsnh-macos-kernel', 'pinia'],
      })
    );
  }

  injectAppInfos();

  return viteConfig;
});
