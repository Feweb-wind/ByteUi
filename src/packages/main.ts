import type { App } from 'vue'
import byteButton from '../components/byte-button.vue'
const byteui = {
    install: (app: App<Element>) => {
        app.component('byte-button', byteButton)
    }
}
export default byteui