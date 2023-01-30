import { createApp } from 'vue';
import 'highlight.js/styles/atom-one-dark.css';
import 'highlight.js/lib/common';
// import hljsVuePlugin from '@highlightjs/vue-plugin';
import './style.css';
import App from './App.vue';

const app = createApp(App);
// app.component("hljsVuePlugin", hljsVuePlugin);
app.mount('#app');
