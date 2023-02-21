import CodePreview from '../../../src/components/CodePreview/index.vue'
import DefaultTheme from 'vitepress/theme'
import { App } from 'vue'
import ByteUI from 'byte-ui'

export default {
  ...DefaultTheme,
  enhanceApp: async ({ app }: { app: App }) => {
    app.use(ByteUI)
    app.component('CodePreview', CodePreview)
  },
}
