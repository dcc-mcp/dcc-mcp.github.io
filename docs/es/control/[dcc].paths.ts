import { controlPaths } from '../../.vitepress/i18n/control-guides.mts'
import labels from '../../.vitepress/i18n/es/guide.json'
import entries from '../../.vitepress/i18n/es/integrations.json'

export default { paths: () => controlPaths('es', labels, entries) }
