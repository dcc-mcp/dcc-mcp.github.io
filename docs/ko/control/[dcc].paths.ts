import { controlPaths } from '../../.vitepress/i18n/control-guides.mts'
import labels from '../../.vitepress/i18n/ko/guide.json'
import entries from '../../.vitepress/i18n/ko/integrations.json'

export default { paths: () => controlPaths('ko', labels, entries) }
