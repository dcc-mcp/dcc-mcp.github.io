<script setup lang="ts">
import { computed } from 'vue'
import { withBase } from 'vitepress'

const props = withDefaults(defineProps<{ locale?: 'en' | 'zh' }>(), { locale: 'en' })
const mediaRoot = '/videos/dcc-mcp-intro-20260914'
const copy = computed(() => ({
  en: {
    kicker: 'WATCH THE INTRODUCTION',
    title: 'Meet DCC-MCP in one minute.',
    description: 'Connect AI assistants to creative software. Discover tools, work with editable projects, and check the results.',
    caption: '60 seconds · English male narration and captions',
    captionsLabel: 'English',
    language: 'en',
    fallback: 'Your browser cannot play this video.',
    download: 'Download the video',
    transcriptLabel: 'Read the transcript',
    showcaseLabel: 'Explore the examples →',
    showcaseHref: '/showcase',
    transcript: [
      "Your next idea is ready. But you're still switching apps, hunting through menus, and repeating the same steps.",
      'DCC MCP connects AI assistants to creative software, bringing your instructions into the tools you use.',
      'Model in Blender. Build procedural effects in Houdini. Assemble scenes in Maya.',
      'Your assistant discovers available tools, reads the application state, takes action, and checks the result.',
      'The output can be an editable scene, material, or project, ready for your next creative decision.',
      'An open source ecosystem. One shared connection across applications, with reusable skills for familiar workflows.',
      'See what ran. Check what changed. Keep your focus on the shot, the details, and the idea.',
      'DCC MCP. Connect AI to creation. Explore the examples on our website, and start your first workflow.',
    ],
  },
  zh: {
    kicker: '项目介绍',
    title: '一分钟认识 DCC-MCP。',
    description: '让 AI 助手接入创意软件：发现工具、处理可编辑工程，并检查实际结果。',
    caption: '60 秒 · 中文男声与中文字幕',
    captionsLabel: '简体中文',
    language: 'zh-CN',
    fallback: '你的浏览器无法播放此视频。',
    download: '下载视频',
    transcriptLabel: '阅读文字稿',
    showcaseLabel: '浏览案例 →',
    showcaseHref: '/zh/showcase',
    transcript: [
      '想法已经到了，操作还没跟上。切换软件、重复点选，让创作一次次停下来。',
      'DCC MCP，把 AI 助手接入创意软件，让一句需求，进入实际制作流程。',
      '从 Blender 的建模材质，到 Houdini 的程序化特效，再到 Maya 的场景搭建。',
      '助手先了解软件状态，再调用清晰的工具，执行任务，并检查实际结果。',
      '你拿到的，可以是继续编辑的场景、材质和工程，让每次迭代接得上。',
      '开放的生态，同一套连接方式，串起不同软件。常用经验，沉淀成可复用的技能。',
      '连接、执行、检查，每一步都更清楚。把注意力，留给镜头、质感和创意。',
      'DCC MCP，连接 AI 与创作。访问官网，看看案例，开始你的第一条工作流。',
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
