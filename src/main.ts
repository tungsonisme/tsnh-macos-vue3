import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import { loadRemotes } from './helpers/remotes';

const app = createApp(App);

// DO NOT REMOVE
loadRemotes();

app.mount('#macos-app');
