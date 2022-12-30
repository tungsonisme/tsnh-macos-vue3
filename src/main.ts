import { createApp } from 'vue';
import { macOsKernelPinia } from 'tsnh-macos-kernel';
import './style.css';
import App from './App.vue';
import { loadRemotes } from './helpers/remotes';

const app = createApp(App);

app.use(macOsKernelPinia);

// DO NOT REMOVE
loadRemotes();

app.mount('#macos-app');
