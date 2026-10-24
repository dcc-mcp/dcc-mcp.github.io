import DefaultTheme from 'vitepress/theme-without-fonts'
import { defineAsyncComponent } from 'vue'
import Layout from './Layout.vue'
import MarketplaceSearch from './components/MarketplaceSearch.vue'
import ShowcaseGallery from './components/ShowcaseGallery.vue'
import HomeIntroVideo from './components/HomeIntroVideo.vue'
import '@fontsource-variable/geist'
import './styles.css'
import './creative-home.css'

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    app.component('MarketplaceSearch', MarketplaceSearch)
    app.component('ShowcaseGallery', ShowcaseGallery)
    app.component('HomeIntroVideo', HomeIntroVideo)
    app.component('CollectionMasonry', defineAsyncComponent(() => import('./components/CollectionMasonry.vue')))
  },
}
