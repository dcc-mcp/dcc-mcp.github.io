import { dccIntegrations } from '../dcc-integrations.mts'
import { formatMessage, type AddedLocale } from './locales'
import type labels from './ja/guide.json'

export type GuideLabels = typeof labels & { read: string }
export type IntegrationCopy = {
  summary: string
  tasks: string[]
  availability?: string
  vendorCase?: string
  catalogStatus?: string
}

export function controlPaths(locale: AddedLocale, text: GuideLabels, entries: Record<string, IntegrationCopy>) {
  return dccIntegrations.map(integration => {
    const { name, slug, repository, dccType, coreApplicationRoute, marketplacePackage } = integration
    const entry = entries[slug]
    if (!entry || entry.tasks.length !== integration.tasksEn.length) throw new Error(`Missing ${locale} control guide for ${slug}`)
    const title = formatMessage(text.title, { app: name })
    const description = formatMessage(text.description, { app: name })
    const route = dccType ?? coreApplicationRoute
    const sections = [`# ${title}`, entry.summary, `## ${text.tasks}`, entry.tasks.map(task => '- ' + task).join('\n')]
    if (route) {
      sections.push(`## ${formatMessage(text.cliTitle, { app: name })}`, text.cli,
        ['```bash', `dcc-mcp-cli search --query "${integration.tasksEn[0]}" --dcc-type ${route}`, '```'].join('\n'))
    }
    if (entry.vendorCase) sections.push(`## ${text.vendor}`, entry.vendorCase)
    if (slug === 'comfyui') sections.push(`## ${text.models}`, text.gameBody,
      `[${text.gameLink}](https://github.com/dcc-mcp/dcc-mcp-comfyui/blob/main/src/dcc_mcp_comfyui/skills/comfyui-game-assets/references/selection-guide.en.md)`)
    sections.push(`## ${text.workflow}`, text.flow.map((step, i) => `${i + 1}. ${step}`).join('\n'),
      '```bash\ndcc-mcp-cli health\ndcc-mcp-cli dcc-types\ndcc-mcp-cli list\n```',
      `## ${text.promptTitle}`, '```text\n' + formatMessage(text.prompt, { app: name, task: entry.tasks[1] }) + '\n```',
      `## ${text.available}`)
    if (entry.availability) sections.push(entry.availability)
    else if (marketplacePackage) sections.push(text.package, `\`\`\`bash\ndcc-mcp-cli marketplace install ${marketplacePackage} --dcc <host> --reload\n\`\`\``)
    else if (dccType) sections.push(formatMessage(text.catalog, { id: `\`${dccType}\`` }))
    else sections.push(text.independent)
    if (entry.catalogStatus) sections.push(entry.catalogStatus)
    sections.push(`- [${text.source}](https://github.com/dcc-mcp/${repository})\n- [${text.all}](/${locale}/use-cases)\n- [${text.agents}](/${locale}/agents)`)
    return { params: { dcc: slug, title, description }, content: sections.join('\n\n') + '\n' }
  })
}
