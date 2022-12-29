import { createApp, defineAsyncComponent } from 'vue';
import './style.css';
import App from './App.vue';

const app = createApp(App);

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const PokemonApp = defineAsyncComponent(() => import('pokemon/App'));
app.component('PokemonApp', PokemonApp);

app.mount('#macos-app');
