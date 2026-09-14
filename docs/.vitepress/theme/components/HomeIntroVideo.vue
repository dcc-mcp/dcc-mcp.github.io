<script setup lang="ts">
import { computed } from 'vue'
import { withBase } from 'vitepress'
import localizedCopy from './HomeIntroVideo.content.json'

const props = withDefaults(defineProps<{ locale?: 'en' | 'zh' }>(), { locale: 'en' })
const mediaRoot = '/videos/dcc-mcp-intro-20260914-v3'
const copy = computed(() => localizedCopy[props.locale])
const mediaUrl = (edition: string, extension: string) =>
  withBase(`${mediaRoot}/${edition}.${props.locale}.${extension}`)
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
    <div class="intro-video-grid">
      <article v-for="edition in copy.editions" :key="edition.id" class="intro-video-edition">
        <h3 :id="`intro-video-title-${edition.id}`">{{ edition.title }}</h3>
        <p class="intro-video-summary">{{ edition.summary }}</p>
        <figure>
          <video
            :key="`${locale}-${edition.id}`"
            controls
            playsinline
            preload="metadata"
            :poster="mediaUrl(edition.id, 'webp')"
            :aria-labelledby="`intro-video-title-${edition.id}`"
            :aria-describedby="`intro-video-caption-${edition.id}`"
            width="1920"
            height="1080"
          >
            <source :src="mediaUrl(edition.id, 'mp4')" type="video/mp4">
            <track
              :src="mediaUrl(edition.id, 'vtt')"
              kind="subtitles"
              :srclang="copy.language"
              :label="copy.captionsLabel"
            >
            <p>{{ copy.fallback }} <a :href="mediaUrl(edition.id, 'mp4')">{{ copy.download }}</a></p>
          </video>
          <figcaption :id="`intro-video-caption-${edition.id}`">{{ edition.caption }}</figcaption>
        </figure>
        <div class="intro-video-links">
          <a :href="mediaUrl(edition.id, 'mp4')" download>{{ copy.download }}</a>
        </div>
        <details class="intro-video-transcript">
          <summary>{{ copy.transcriptLabel }}</summary>
          <p v-for="(paragraph, index) in edition.transcript" :key="index">{{ paragraph }}</p>
        </details>
      </article>
    </div>
    <p class="intro-video-disclosure">{{ copy.disclosure }}</p>
    <div class="intro-video-links">
      <a :href="withBase(copy.marketplaceHref)">{{ copy.marketplaceLabel }}</a>
      <a :href="withBase(`${mediaRoot}/README.md`)">{{ copy.sourcesLabel }}</a>
    </div>
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

.intro-video-heading > p,
.intro-video-summary {
  margin: 0;
  color: var(--dcc-muted);
}

.intro-video-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 36px;
}

.intro-video-edition {
  min-width: 0;
}

.intro-video-edition h3 {
  margin: 0 0 8px;
  color: var(--dcc-ink);
  font-size: 21px;
  line-height: 1.3;
}

.intro-video-summary {
  margin-bottom: 16px;
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
  background: #15191f;
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
  margin-top: 20px;
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

.intro-video-disclosure {
  margin: 24px 0 0;
  color: var(--dcc-muted);
  font-size: 13px;
}

@media (max-width: 960px) {
  .intro-video-grid {
    grid-template-columns: 1fr;
  }
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
