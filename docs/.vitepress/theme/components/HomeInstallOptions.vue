<script setup lang="ts">
defineProps<{ locale: 'en' | 'zh' }>()
</script>
<template>
<div class="home-install-options">
<template v-if="locale === 'en'">
  <div class="install-cards" aria-label="DCC-MCP install options">
    <article class="install-card install-card-featured">
      <p class="install-card-eyebrow">Most agents</p>
      <h3>Skills CLI</h3>
      <p>Use the universal Agent Skills CLI from the workspace opened by Cursor, Codex, Claude Code, Gemini CLI, Windsurf, or another compatible host.</p>
      <pre class="install-code"><code>npx --yes skills@1.5.23 add dcc-mcp/dcc-mcp-agent-plugins --skill dcc-mcp</code></pre>
    </article>
    <article class="install-card">
      <p class="install-card-eyebrow">Native marketplace</p>
      <h3>Codex</h3>
      <p>Use Codex's plugin marketplace when you want the host-native install path for the same canonical Skills.</p>
      <pre class="install-code"><code>codex plugin marketplace add dcc-mcp/dcc-mcp-agent-plugins
codex plugin add dcc-mcp@dcc-mcp</code></pre>
    </article>
    <article class="install-card">
      <p class="install-card-eyebrow">Native plugin</p>
      <h3>Claude Code</h3>
      <p>Use Claude Code's plugin commands when installing from inside Claude Code instead of a shell installer.</p>
      <pre class="install-code"><code>/plugin marketplace add dcc-mcp/dcc-mcp-agent-plugins
/plugin install dcc-mcp@dcc-mcp</code></pre>
    </article>
  </div>
  <div class="install-followup">
    <p class="install-followup-label">Then start with a short prompt:</p>
    <pre class="install-code install-prompt-code"><code>Use the dcc-mcp Skill to set up DCC-MCP for the creative applications on this machine. Ask before installing or changing system state, and finish with verification evidence.</code></pre>
    <p class="install-note">Run the Skills CLI command from your Agent workspace; use <code>--global</code> for user-level installation. <a href="/agents#native-plugin-marketplaces">See Agent host install notes</a> or <a href="/use-cases">choose a task →</a></p>
  </div>
</template>
<template v-else>
  <div class="install-cards" aria-label="DCC-MCP 安装方式">
    <article class="install-card install-card-featured">
      <p class="install-card-eyebrow">大多数 Agent</p>
      <h3>Skills CLI</h3>
      <p>在 Cursor、Codex、Claude Code、Gemini CLI、Windsurf 或其他兼容 Agent Skills 的客户端当前工作区中运行通用安装命令。</p>
      <pre class="install-code"><code>npx --yes skills@1.5.23 add dcc-mcp/dcc-mcp-agent-plugins --skill dcc-mcp</code></pre>
    </article>
    <article class="install-card">
      <p class="install-card-eyebrow">原生插件市场</p>
      <h3>Codex</h3>
      <p>如果使用 Codex 的原生插件市场，可通过 Host 自带命令安装同一套官方 Skills。</p>
      <pre class="install-code"><code>codex plugin marketplace add dcc-mcp/dcc-mcp-agent-plugins
codex plugin add dcc-mcp@dcc-mcp</code></pre>
    </article>
    <article class="install-card">
      <p class="install-card-eyebrow">原生插件</p>
      <h3>Claude Code</h3>
      <p>在 Claude Code 内安装时，可使用 Claude Code 的插件命令，而不必先切换到通用 shell 安装器。</p>
      <pre class="install-code"><code>/plugin marketplace add dcc-mcp/dcc-mcp-agent-plugins
/plugin install dcc-mcp@dcc-mcp</code></pre>
    </article>
  </div>
  <div class="install-followup">
    <p class="install-followup-label">然后用一句简短提示词开始：</p>
    <pre class="install-code install-prompt-code"><code>使用 dcc-mcp Skill 为这台机器上的创意应用配置 DCC-MCP。安装软件或改变系统状态前先询问我，完成后提供验证证据。</code></pre>
    <p class="install-note">Skills CLI 命令请在 Agent 的工作目录运行；如需供当前用户的所有项目使用，可追加 <code>--global</code>。<a href="/zh/agents#原生插件市场">查看 Agent 客户端安装说明</a>或<a href="/zh/use-cases">选择一个任务 →</a></p>
  </div>
</template>
</div>
</template>
