<script setup lang="ts">
import { computed } from 'vue'
import { withBase } from 'vitepress'

const props = withDefaults(defineProps<{ locale?: 'en' | 'zh' }>(), { locale: 'en' })
const mediaRoot = '/videos/dcc-mcp-intro-20260914-v2'
const copy = computed(() => ({
  en: {
    kicker: 'WATCH THE INTRODUCTION',
    title: 'How Skills and MCP work together.',
    description: 'Reusable workflows and connected creative tools. See how discovery, a Rust core, permissions, and the skill marketplace support creative teams.',
    caption: '63 seconds · English male narration and captions · AI concept visuals',
    captionsLabel: 'English',
    language: 'en',
    fallback: 'Your browser cannot play this video.',
    download: 'Download the video',
    transcriptLabel: 'Read the transcript',
    showcaseLabel: 'Explore the skill marketplace →',
    showcaseHref: '/marketplace',
    transcript: [
      'Why DCC MCP, when AI can write code? Creative teams need workflows they can reuse and manage.',
      'Skills explain how a task works. MCP connects the assistant to software tools. DCC MCP brings them together.',
      'Discover relevant tools and load their instructions. Reusable skills reduce repeated code generation and unnecessary token usage.',
      'Rust handles key routing in compiled code, reducing interpreter overhead. Python remains available for host scripts.',
      'Permission policies define execution boundaries. Audit records help you trace key calls and investigate what went wrong.',
      'The skill marketplace helps you find, inspect, and install workflows, and share reusable skills with your team.',
      'Larger teams can package naming, checking, and export rules as skills, sharing consistent workflows across projects.',
      'DCC MCP. Skills and MCP, working together. Visit our website and start with one reusable creative workflow.',
    ],
  },
  zh: {
    kicker: '项目介绍',
    title: 'Skills + MCP，如何一起工作。',
    description: '把可复用的技能接入创意工具，理解按需发现、Rust 核心、权限审计和技能市场如何支持团队创作。',
    caption: '63 秒 · 中文男声与中文字幕 · AI 概念可视化',
    captionsLabel: '简体中文',
    language: 'zh-CN',
    fallback: '你的浏览器无法播放此视频。',
    download: '下载视频',
    transcriptLabel: '阅读文字稿',
    showcaseLabel: '浏览技能市场 →',
    showcaseHref: '/zh/marketplace',
    transcript: [
      'AI 会写代码，为什么还需要 DCC MCP？因为团队需要的，是能复用、能管理的创作流程。',
      'Skill 像工作手册，说明任务该怎么做；MCP 像连接口，让 AI 调用软件里的工具。',
      '工具按需发现，只加载相关说明。再用技能复用流程，减少重复写代码，帮助节省 token。',
      '关键路由由 Rust 核心处理，减少这部分解释器开销；Python 保留给宿主脚本。',
      '权限策略控制执行范围，审计留下关键调用记录。出错时，可以沿着记录查找原因。',
      '技能市场把现成能力带到项目：查找工作流、检查来源、按需安装，也能共享自己的技能。',
      '大型团队可把命名、检查和导出规范封装成技能，按项目分发，让成员复用同一套流程。',
      'DCC MCP，让 Skills 和 MCP 一起工作。访问官网，从一条可复用的创作流程开始。',
    ],
  },
}[props.locale]))

const videoUrl = computed(() => withBase(`${mediaRoot}/intro.${props.locale}.mp4`))
const posterUrl = computed(() => withBase(`${mediaRoot}/poster.${props.locale}.webp`))
const captionsUrl = computed(() => withBase(`${mediaRoot}/captions.${props.locale}.vtt`))
</script>

<template>
  <section class="home-intro-video" aria-labelledby="intro-video-title">
    <div class="intro-video-heading">
      <div>
        <p class="home-kicker">{{ copy.kicker }}</p>
        <h2 id="intro-video-title">{{ copy.title }}</h2>
      </div>
      <p>{{ copy.description }}</p>
    </div>
    <figure>
      <video
        :key="locale"
        controls
        playsinline
        preload="metadata"
        :poster="posterUrl"
        aria-labelledby="intro-video-title"
        aria-describedby="intro-video-caption"
        width="1920"
        height="1080"
      >
        <source :src="videoUrl" type="video/mp4">
        <track :src="captionsUrl" kind="subtitles" :srclang="copy.language" :label="copy.captionsLabel">
        <p>{{ copy.fallback }} <a :href="videoUrl">{{ copy.download }}</a></p>
      </video>
      <figcaption id="intro-video-caption">{{ copy.caption }}</figcaption>
    </figure>
    <div class="intro-video-links">
      <a :href="withBase(copy.showcaseHref)">{{ copy.showcaseLabel }}</a>
      <a :href="videoUrl" download>{{ copy.download }}</a>
    </div>
    <details class="intro-video-transcript">
      <summary>{{ copy.transcriptLabel }}</summary>
      <p v-for="(paragraph, index) in copy.transcript" :key="index">{{ paragraph }}</p>
    </details>
  </section>
</template>

<style scoped>
.home-intro-video {
  margin-bottom: 144px;
}

.intro-video-heading {
  display: grid;
  grid-template-columns: minmax(0, 1.2fr) minmax(0, 0.8fr);
  gap: 48px;
  align-items: end;
  margin-bottom: 32px;
}

.intro-video-heading h2 {
  margin: 0;
  padding: 0;
  border: 0;
  color: var(--dcc-ink);
  font-size: clamp(30px, 4vw, 48px);
  line-height: 1.12;
  letter-spacing: -0.04em;
}

.intro-video-heading > p {
  margin: 0;
  color: var(--dcc-muted);
}

figure {
  margin: 0;
}

video {
  display: block;
  width: 100%;
  height: auto;
  aspect-ratio: 16 / 9;
  border: 1px solid var(--dcc-line);
  background: #080e1a;
}

figcaption {
  margin-top: 12px;
  color: var(--dcc-muted);
  font-size: 13px;
}

.intro-video-links {
  display: flex;
  flex-wrap: wrap;
  gap: 16px 28px;
  margin-top: 16px;
  font-size: 14px;
}

.intro-video-transcript {
  margin-top: 24px;
  border-top: 1px solid var(--dcc-line);
  padding-top: 16px;
  color: var(--dcc-muted);
}

.intro-video-transcript summary {
  width: fit-content;
  color: var(--dcc-ink);
  cursor: pointer;
}

.intro-video-transcript p {
  max-width: 78ch;
}

@media (max-width: 640px) {
  .home-intro-video {
    margin-bottom: 96px;
  }

  .intro-video-heading {
    grid-template-columns: 1fr;
    gap: 20px;
    margin-bottom: 24px;
  }
}
</style>
