import DefaultTheme from 'vitepress/theme'
import Layout from './Layout.vue'
import MarketplaceSearch from './components/MarketplaceSearch.vue'
import ShowcaseGallery from './components/ShowcaseGallery.vue'
import './styles.css'

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    app.component('MarketplaceSearch', MarketplaceSearch)
    app.component('ShowcaseGallery', ShowcaseGallery)
  },
}
