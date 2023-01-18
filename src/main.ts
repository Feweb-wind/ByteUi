import { createApp } from 'vue';
import 'highlight.js/styles/atom-one-dark.css'
import 'highlight.js/lib/common'
import hljsVuePlugin from '@highlightjs/vue-plugin'

import './style.css';
import App from './App.vue';
import router from "@/router";

const app = createApp(App);
app.use(router);
app.use(hljsVuePlugin);
app.mount('#app');
