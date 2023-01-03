import { createApp } from 'vue';
import { macOsKernelPinia, useAppStore } from 'tsnh-macos-kernel';
import './style.css';
import App from './App.vue';
import { loadRemotes } from './helpers/remotes';

const app = createApp(App);

// Setup Macos Kernel
app.use(macOsKernelPinia);
const { installApps } = useAppStore();
installApps(JSON.parse(import.meta.env.VITE_APPS));

// DO NOT REMOVE
loadRemotes();

app.mount('#macos-app');
