import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import federation from '@originjs/vite-plugin-federation';
import initializeRemotes from './configs/remotes.config';

const PORT = 3000;

// https://vitejs.dev/config/
export default defineConfig(async () => {
  const remotes = await initializeRemotes(PORT);

  return {
    server: {
      port: PORT,
    },
    plugins: [
      vue(),
      federation({
        name: 'host-app',
        remotes,
        shared: ['vue'],
      }),
    ],
  };
});
