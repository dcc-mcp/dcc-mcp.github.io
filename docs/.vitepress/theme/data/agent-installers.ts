export type AgentInstallerKind = 'skills-cli' | 'native' | 'registry' | 'manual'

export type AgentInstaller = {
  id: string
  name: string
  kind: AgentInstallerKind
  target: string
  command: string
  description: string
  featured?: boolean
  action?: 'copy' | 'link'
}

const skillsCli = (agent: string) =>
  `npx --yes skills@1.5.23 add dcc-mcp/dcc-mcp-agent-plugins --skill dcc-mcp --agent ${agent} --copy --yes`

export const agentInstallers: AgentInstaller[] = [
  {
    id: 'auto',
    name: 'Auto-detect',
    kind: 'skills-cli',
    target: 'Supported Agent Skills hosts',
    command: 'npx --yes skills@1.5.23 add dcc-mcp/dcc-mcp-agent-plugins --skill dcc-mcp',
    description: 'Detect a compatible host in the current workspace and install the canonical Skill.',
  },
  {
    id: 'codex',
    name: 'Codex',
    kind: 'native',
    target: 'Codex plugin marketplace',
    command: 'codex plugin marketplace add dcc-mcp/dcc-mcp-agent-plugins\ncodex plugin add dcc-mcp@dcc-mcp',
    description: 'Install the native Codex plugin from the DCC-MCP marketplace.',
    featured: true,
  },
  {
    id: 'claude-code',
    name: 'Claude Code',
    kind: 'native',
    target: 'Claude Code plugin marketplace',
    command: '/plugin marketplace add dcc-mcp/dcc-mcp-agent-plugins\n/plugin install dcc-mcp@dcc-mcp',
    description: 'Run these commands inside Claude Code to add the canonical Skill.',
    featured: true,
  },
  {
    id: 'cursor',
    name: 'Cursor',
    kind: 'skills-cli',
    target: 'Cursor workspace',
    command: skillsCli('cursor'),
    description: 'Install into the current Cursor workspace.',
    featured: true,
  },
  {
    id: 'gemini-cli',
    name: 'Gemini CLI',
    kind: 'skills-cli',
    target: 'Gemini CLI workspace',
    command: skillsCli('gemini-cli'),
    description: 'Install into the current Gemini CLI workspace.',
    featured: true,
  },
  {
    id: 'github-copilot',
    name: 'GitHub Copilot',
    kind: 'skills-cli',
    target: 'GitHub Copilot workspace',
    command: skillsCli('github-copilot'),
    description: 'Install the Skill where GitHub Copilot can discover workspace instructions.',
    featured: true,
  },
  {
    id: 'windsurf',
    name: 'Windsurf',
    kind: 'skills-cli',
    target: 'Windsurf workspace',
    command: skillsCli('windsurf'),
    description: 'Install into the current Windsurf workspace.',
    featured: true,
  },
  {
    id: 'opencode',
    name: 'OpenCode',
    kind: 'skills-cli',
    target: 'OpenCode workspace',
    command: skillsCli('opencode'),
    description: 'Install into the current OpenCode workspace.',
    featured: true,
  },
  {
    id: 'cline',
    name: 'Cline',
    kind: 'skills-cli',
    target: 'Cline workspace',
    command: skillsCli('cline'),
    description: 'Install into the current Cline workspace.',
    featured: true,
  },
  {
    id: 'roo',
    name: 'Roo Code',
    kind: 'skills-cli',
    target: 'Roo Code workspace',
    command: skillsCli('roo'),
    description: 'Install into the current Roo Code workspace.',
    featured: true,
  },
  {
    id: 'kiro-cli',
    name: 'Kiro',
    kind: 'skills-cli',
    target: 'Kiro workspace',
    command: skillsCli('kiro-cli'),
    description: 'Install into the current Kiro workspace.',
    featured: true,
  },
  {
    id: 'amp',
    name: 'Amp',
    kind: 'skills-cli',
    target: 'Amp workspace',
    command: skillsCli('amp'),
    description: 'Install into the current Amp workspace.',
  },
  {
    id: 'codebuddy',
    name: 'CodeBuddy',
    kind: 'native',
    target: 'CodeBuddy plugin marketplace',
    command: 'codebuddy plugin marketplace add dcc-mcp/dcc-mcp-agent-plugins\ncodebuddy plugin install dcc-mcp@dcc-mcp',
    description: 'Install the native CodeBuddy plugin from the DCC-MCP marketplace.',
  },
  {
    id: 'openhands',
    name: 'OpenHands',
    kind: 'skills-cli',
    target: 'OpenHands workspace',
    command: skillsCli('openhands'),
    description: 'Install into the current OpenHands workspace.',
  },
  {
    id: 'continue',
    name: 'Continue',
    kind: 'skills-cli',
    target: 'Continue workspace',
    command: skillsCli('continue'),
    description: 'Install into the current Continue workspace.',
  },
  {
    id: 'replit',
    name: 'Replit Agent',
    kind: 'skills-cli',
    target: 'Replit workspace',
    command: skillsCli('replit'),
    description: 'Install into the current Replit workspace.',
  },
  {
    id: 'openclaw',
    name: 'OpenClaw',
    kind: 'registry',
    target: 'ClawHub registry',
    command: 'npx --yes clawhub@0.23.1 install @loonghao/dcc-mcp',
    description: 'Install the published DCC-MCP Skill from ClawHub.',
  },
  {
    id: 'workbuddy',
    name: 'WorkBuddy',
    kind: 'manual',
    target: 'GitHub Release archive',
    command: 'https://github.com/dcc-mcp/dcc-mcp-agent-plugins/releases/latest',
    description: "Download the Skill ZIP and add it from WorkBuddy's Skills panel.",
    action: 'link',
  },
]

export const featuredAgentInstallers = agentInstallers.filter((agent) => agent.featured)
