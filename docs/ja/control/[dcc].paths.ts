import { controlPaths } from '../../.vitepress/i18n/control-guides.mts'
import labels from '../../.vitepress/i18n/ja/guide.json'
import entries from '../../.vitepress/i18n/ja/integrations.json'

export default { paths: () => controlPaths('ja', labels, entries) }
