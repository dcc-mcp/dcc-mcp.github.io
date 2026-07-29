import DefaultTheme from 'vitepress/theme'
import MarketplaceSearch from './components/MarketplaceSearch.vue'
import './styles.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('MarketplaceSearch', MarketplaceSearch)
  },
}
