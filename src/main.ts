import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { macOsKernelPinia, useAppStore } from 'tsnh-macos-kernel';
import './style.css';
import App from './App.vue';
import { loadLocalApps, loadRemoteApps } from './helpers/remotes';

// Create app
const app = createApp(App);

// Setup Macos Kernel
app.use(macOsKernelPinia);

// Setup pinia
const pinia = createPinia();
app.use(pinia);

const { installApps } = useAppStore();

// Install and load local apps
loadLocalApps(app);

// Install remote apps
installApps(JSON.parse(import.meta.env.VITE_MACOS_REMOTE_APPS));

// DO NOT REMOVE: load remote apps
loadRemoteApps();

// Mount app
app.mount('#macos-app');
