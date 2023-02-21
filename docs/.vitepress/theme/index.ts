import CodePreview from '../../../src/components/CodePreview/index.vue'
import DefaultTheme from 'vitepress/theme'
import ByteUI from 'byte-ui'
import { EnhanceAppContext } from 'vitepress'

export default {
  ...DefaultTheme,
  enhanceApp(ctx: EnhanceAppContext) {
    DefaultTheme.enhanceApp(ctx)
    ctx.app.use(ByteUI)
    ctx.app.component('CodePreview', CodePreview)
  },
}
