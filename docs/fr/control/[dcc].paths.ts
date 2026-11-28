import { controlPaths } from '../../.vitepress/i18n/control-guides.mts'
import labels from '../../.vitepress/i18n/fr/guide.json'
import entries from '../../.vitepress/i18n/fr/integrations.json'

export default { paths: () => controlPaths('fr', labels, entries) }
