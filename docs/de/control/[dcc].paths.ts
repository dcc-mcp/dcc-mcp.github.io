import { controlPaths } from '../../.vitepress/i18n/control-guides.mts'
import labels from '../../.vitepress/i18n/de/guide.json'
import entries from '../../.vitepress/i18n/de/integrations.json'

export default { paths: () => controlPaths('de', labels, entries) }
