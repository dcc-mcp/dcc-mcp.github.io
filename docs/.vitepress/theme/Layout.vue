<script setup lang="ts">
import DefaultTheme from 'vitepress/theme-without-fonts'
import { useData } from 'vitepress'
import CreativeHero from './components/CreativeHero.vue'

const { Layout } = DefaultTheme
const { lang } = useData()
</script>

<template>
  <Layout>
    <template #home-hero-before><CreativeHero :locale="lang === 'zh-CN' ? 'zh' : 'en'" /></template>
  </Layout>
</template>
