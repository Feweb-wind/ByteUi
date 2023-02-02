import { createApp } from 'vue';
import 'highlight.js/styles/devibeans.css';
import hljsVuePlugin from '@highlightjs/vue-plugin';
import './style.css';
import App from './App.vue';

const app = createApp(App);
app.use(hljsVuePlugin);
app.mount('#app');
