import { controlPaths } from '../../.vitepress/i18n/control-guides.mts'
import labels from '../../.vitepress/i18n/pt/guide.json'
import entries from '../../.vitepress/i18n/pt/integrations.json'

export default { paths: () => controlPaths('pt', labels, entries) }
