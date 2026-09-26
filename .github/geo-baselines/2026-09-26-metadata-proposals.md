# 组织仓库元数据补充草案

2026-09-26 再次读取 GitHub API：91 个活跃公开仓库中，2 个没有 description、25 个没有 homepage、24 个没有 topics。此文件只是待审草案，没有修改远端字段。

先补两个完全没有简介的仓库。以下内容依据各仓库当前 README 编写，避免扩大产品能力或发布状态。

| 仓库 | 当前简介 | 建议 description |
| --- | --- | --- |
| [dcc-mcp-openscreen](https://github.com/dcc-mcp/dcc-mcp-openscreen) | 空 | DCC-MCP adapter for OpenScreen with typed CLI tools for recording sources, bounded recording, and export. |
| [dcc-asset-pirate-nation](https://github.com/dcc-mcp/dcc-asset-pirate-nation) | 空 | DCC-MCP Skill to search and download CC0 Pirate Nation game assets and return validated asset descriptors. |

对应中文说明，可用于官网目录或后续中文文档：

- **OpenScreen：**通过类型化命令行工具查询录制来源，在限定范围内录制并导出视频。桌面界面操作仍由 DCC-CUA / UI Control 负责。
- **Pirate Nation Assets：**搜索和下载 CC0 Pirate Nation 游戏素材，返回经过校验的资产描述。仓库只提供 Skill，不镜像原始美术资源；导入游戏引擎或 DCC 由对应适配器完成。

这两个仓库的 homepage 与 topics 当前也为空：

| 仓库 | 建议 homepage | 建议 topics |
| --- | --- | --- |
| dcc-mcp-openscreen | https://dcc-mcp.github.io/control/openscreen | `dcc-mcp`, `mcp`, `openscreen`, `screen-recording` |
| dcc-asset-pirate-nation | https://dcc-mcp.github.io/marketplace | `dcc-mcp`, `game-assets`, `pirate-nation`, `cc0` |

两个候选页面已通过 HTTP 200 检查。OpenScreen 指南继续保留源码预览与发布目录的区别；通用 Marketplace 页面不视为 Pirate Nation 的独立详情页。

其余缺失 homepage/topics 的仓库应逐个核对所属文档、功能和发布状态，再补充；不要批量复制同一套关键词。后续执行更新时，应重新读取旧值，只补仍为空的字段，保留他人新增内容，并读回结果。
