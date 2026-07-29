<script setup lang="ts">
import { computed, ref } from 'vue'
import { useData } from 'vitepress'

type Copy = { label: string; title: string; prompt: string }
type Showcase = { id: string; image: string; source: string; en: Copy; zh: Copy }

const { lang } = useData()
const copied = ref('')
const isZh = computed(() => lang.value.startsWith('zh'))

const showcases: Showcase[] = [
  {
    id: 'blender-lookdev',
    image: '/showcase/blender-lookdev.webp',
    source: 'https://github.com/dcc-mcp/dcc-mcp-blender',
    en: {
      label: 'BLENDER · PROCEDURAL LOOKDEV',
      title: 'Spiral galaxy, built from typed tools',
      prompt: 'Use the dcc-mcp Skill to connect to Blender. Discover the typed procedural modeling, material, lighting, and render tools needed to create a spiral galaxy in a new collection. Work non-destructively, render a preview, validate the scene, and report the tool calls and output path. Ask before installing anything.',
    },
    zh: {
      label: 'BLENDER · 程序化视觉开发',
      title: '用类型化工具构建螺旋星系',
      prompt: '使用 dcc-mcp Skill 连接 Blender。搜索创建螺旋星系所需的类型化程序化建模、材质、灯光和渲染工具，在新 Collection 中非破坏性构建，渲染预览并验证场景，最后报告工具调用与输出路径。安装任何内容前先征得我的同意。',
    },
  },
  {
    id: 'houdini-portal',
    image: '/showcase/houdini-portal.png',
    source: 'https://github.com/dcc-mcp/dcc-mcp-houdini',
    en: {
      label: 'HOUDINI · FX',
      title: 'A portal system with procedural particles',
      prompt: 'Use the dcc-mcp Skill to connect to Houdini. Discover the typed SOP, POP, material, and preview tools for a procedural energy portal. Build it in a new isolated network, keep parameters editable, cache only when needed, render a preview, and report validation evidence.',
    },
    zh: {
      label: 'HOUDINI · 特效',
      title: '程序化粒子能量门',
      prompt: '使用 dcc-mcp Skill 连接 Houdini。搜索程序化能量门所需的类型化 SOP、POP、材质和预览工具，在新的独立网络中构建并保持参数可编辑，仅在需要时缓存，渲染预览并报告验证证据。',
    },
  },
  {
    id: 'hunyuan3d',
    image: '/showcase/hunyuan3d.webp',
    source: 'https://github.com/dcc-mcp/dcc-ai-hunyuan3d',
    en: {
      label: 'HUNYUAN3D · AI SERVICE',
      title: 'Prompt-to-3D with traceable provenance',
      prompt: 'Inspect the official Marketplace package dcc-ai-hunyuan3d. Ask before installing it or calling a remote service. Generate a production-ready 3D lantern from my description, import it into the selected DCC, validate geometry and materials, and report provenance and output files.',
    },
    zh: {
      label: '混元 3D · AI 服务',
      title: '可追溯来源的提示词生成 3D',
      prompt: '检查官方 Marketplace 软件包 dcc-ai-hunyuan3d。安装或调用远程服务前先征得我的同意。根据我的描述生成可用于生产的 3D 灯笼，导入所选 DCC，验证几何体和材质，并报告来源与输出文件。',
    },
  },
  {
    id: 'geospatial-city',
    image: '/showcase/geospatial-city.webp',
    source: 'https://github.com/dcc-mcp/dcc-asset-geospatial',
    en: {
      label: 'GEOSPATIAL · ASSET PROVIDER',
      title: 'Real-world city data into a DCC scene',
      prompt: 'Inspect the official Marketplace package dcc-asset-geospatial and ask before installing or downloading data. Use a bounded area I provide, preserve CRS and source provenance, create a city layout in my selected DCC, validate object counts and scale, and report the resulting scene path.',
    },
    zh: {
      label: '地理空间 · 资产提供方',
      title: '将真实城市数据带入 DCC 场景',
      prompt: '检查官方 Marketplace 软件包 dcc-asset-geospatial，安装或下载数据前先征得我的同意。使用我提供的有限区域，保留坐标系与数据来源，在所选 DCC 中创建城市布局，验证对象数量和比例，并报告场景输出路径。',
    },
  },
  {
    id: 'maya-architecture',
    image: '/showcase/maya-architecture.jpg',
    source: 'https://github.com/dcc-mcp/dcc-mcp-maya-procedural-architecture',
    en: {
      label: 'MAYA · SPECIALIZED SKILL',
      title: 'Procedural architecture as a reusable workflow',
      prompt: 'Inspect the official Marketplace package dcc-mcp-maya-procedural-architecture and ask before installing it. In a new Maya scene or namespace, create three editable architectural variations from one brief, render a contact sheet, validate scene structure, and report the selected parameters.',
    },
    zh: {
      label: 'MAYA · 专项 SKILL',
      title: '可复用的程序化建筑工作流',
      prompt: '检查官方 Marketplace 软件包 dcc-mcp-maya-procedural-architecture，安装前先征得我的同意。在新的 Maya 场景或 Namespace 中，根据同一需求创建三个可编辑建筑方案，渲染联系表，验证场景结构并报告所选参数。',
    },
  },
  {
    id: 'kenney-assets',
    image: '/showcase/kenney-assets.webp',
    source: 'https://github.com/dcc-mcp/dcc-asset-kenney',
    en: {
      label: 'KENNEY · ASSET PROVIDER',
      title: 'Licensed assets assembled into a playable scene',
      prompt: 'Inspect the official Marketplace package dcc-asset-kenney and ask before installing or downloading assets. Find a coherent pack, preserve license and source provenance, assemble a small playable level in my selected DCC or game engine, validate missing references, and report output paths.',
    },
    zh: {
      label: 'KENNEY · 资产提供方',
      title: '将授权资产组装为可玩场景',
      prompt: '检查官方 Marketplace 软件包 dcc-asset-kenney，安装或下载资产前先征得我的同意。选择风格统一的资产包，保留许可证和来源信息，在所选 DCC 或游戏引擎中组装一个小型可玩关卡，检查丢失引用并报告输出路径。',
    },
  },
]

async function copyPrompt(item: Showcase) {
  await navigator.clipboard.writeText((isZh.value ? item.zh : item.en).prompt)
  copied.value = item.id
  window.setTimeout(() => { copied.value = '' }, 1600)
}
</script>

<template>
  <div class="showcase-gallery">
    <article v-for="item in showcases" :key="item.id" class="showcase-prompt-card">
      <a class="showcase-prompt-media" :href="item.source" target="_blank" rel="noreferrer">
        <img :src="item.image" :alt="(isZh ? item.zh : item.en).title">
        <span>{{ (isZh ? item.zh : item.en).label }}</span>
      </a>
      <div class="showcase-prompt-body">
        <h2>{{ (isZh ? item.zh : item.en).title }}</h2>
        <div class="showcase-prompt-copy">
          <small>{{ isZh ? '交给你的 Agent' : 'GIVE THIS TO YOUR AGENT' }}</small>
          <p>{{ (isZh ? item.zh : item.en).prompt }}</p>
          <button type="button" @click="copyPrompt(item)">
            {{ copied === item.id ? (isZh ? '已复制' : 'Copied') : (isZh ? '复制提示词' : 'Copy prompt') }}
          </button>
        </div>
      </div>
    </article>
  </div>
</template>
