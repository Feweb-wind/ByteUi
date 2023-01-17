import { createApp } from 'vue';
import hljs from "highlight.js";
import "highlight.js/styles/color-brewer.css";

import './style.css';
import App from './App.vue';
import router from "@/router";

const app = createApp(App);
app.use(router);
app.directive('highlight', function(el) {
    const blocks = el.querySelectorAll("pre code");
    blocks.forEach(block => {
        hljs.highlightBlock(block);
    })
})
app.mount('#app');
