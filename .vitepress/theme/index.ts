import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import TryIt from './TryIt.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('TryIt', TryIt)
  },
} satisfies Theme
