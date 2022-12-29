import { createApp, defineAsyncComponent } from 'vue';
import './style.css';
import App from './App.vue';

const app = createApp(App);

const PokemonApp = defineAsyncComponent(() => import('pokemon/App'));
app.component('PokemonApp', PokemonApp);

app.mount('#macos-app');
