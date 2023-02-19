import { createApp } from 'vue'
import 'highlight.js/styles/devibeans.css'
import hljsVuePlugin from '@highlightjs/vue-plugin'
import './style.css'
import App from './App.vue'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'

const app = createApp(App)
dayjs.extend(customParseFormat)
app.use(hljsVuePlugin)
app.mount('#app')
