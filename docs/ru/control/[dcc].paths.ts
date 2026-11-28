import { controlPaths } from '../../.vitepress/i18n/control-guides.mts'
import labels from '../../.vitepress/i18n/ru/guide.json'
import entries from '../../.vitepress/i18n/ru/integrations.json'

export default { paths: () => controlPaths('ru', labels, entries) }
