export const setupPrompts = {
  en: `Set up DCC-MCP on this machine for agent-driven creative workflows.

1. Use the dcc-mcp Skill installed through this Agent host's supported installation route and follow it exactly. If the Skill is not available in this turn, stop and ask me to start a new turn.
2. Verify dcc-mcp-cli. If it is missing, explain the official installer and ask for permission before running it. Then run update check, health, dcc-types, and list.
3. Detect the creative applications I use. Propose only matching official adapters, and ask before installing software or changing system state.
4. Verify gateway readiness and one safe search → load/describe → call path without modifying my current scene or document.
5. Preserve request IDs. On failure, use doctor, failure-filtered stats, and the discovered dcc_feedback__report workflow; never publish evidence or create an external issue without my approval.
6. If a new adapter is required, route through @loonghao/dcc-mcp-creator. If a focused workflow Skill is required, route through @loonghao/dcc-mcp-skills-creator.
7. Finish with installed versions, connected instances, validation evidence, and any action still required from me.`,
  zh: `请在这台机器上配置 DCC-MCP，用于 Agent 驱动的创意工作流。

1. 使用通过当前 Agent 客户端支持的安装方式接入的 dcc-mcp Skill，并严格遵循它。如果本轮还不能使用该 Skill，请停止并提醒我开启一个新会话。
2. 验证 dcc-mcp-cli。如果尚未安装，先解释官方安装方式并获得我的许可；然后依次运行 update check、health、dcc-types 和 list。
3. 检测我使用的创意软件，只建议匹配的官方适配器；安装软件或改变系统状态前必须先征得我的同意。
4. 验证 Gateway 就绪状态，并完成一次安全的 search → load/describe → call，不得修改我当前的场景或文档。
5. 保留 request_id。失败时使用 doctor、按失败筛选的 stats，以及搜索发现的 dcc_feedback__report；未经我批准，不得公开证据或创建外部 Issue。
6. 如需新建适配器，使用 @loonghao/dcc-mcp-creator；如需创建专项工作流 Skill，使用 @loonghao/dcc-mcp-skills-creator。
7. 最后报告已安装版本、已连接实例、验证证据，以及仍需我处理的事项。`,
} as const
