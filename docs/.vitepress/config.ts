import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'zh_CN',
  title: 'byteUI文档',
  description: 'Vite & Vue powered static site generator.',
  // 外貌
  appearance: true,
  // 最近更新时间
  lastUpdated: true,
  markdown: {
    theme: 'material-palenight',
    lineNumbers: true,
  },
})
