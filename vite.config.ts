import { defineConfig, UserConfigExport } from 'vite';
import vue from '@vitejs/plugin-vue';
import federation from '@originjs/vite-plugin-federation';
import initializeRemotes from './configs/remotes.config';

const PORT = 3000;

// https://vitejs.dev/config/
export default defineConfig(async ({ mode }) => {
  const viteConfig: UserConfigExport = {
    server: {
      port: PORT,
    },
    preview: {
      port: PORT,
    },
    plugins: [vue()],
  };

  if (mode !== 'preview') {
    const remotes = await initializeRemotes({
      mode,
      port: PORT,
      previewMode: process.env.PREVIEW === 'true' && mode === 'production',
    });

    viteConfig.plugins.push(
      federation({
        name: 'host-app',
        remotes,
        shared: ['vue'],
      })
    );
  }

  return viteConfig;
});
