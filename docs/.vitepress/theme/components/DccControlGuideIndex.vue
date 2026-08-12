<script setup lang="ts">
import { dccIntegrations } from '../../dcc-integrations.mts'

defineProps<{ language: 'en' | 'zh' }>()
</script>

<template>
  <div class="dcc-control-guide-index">
    <section v-for="integration in dccIntegrations" :key="integration.slug">
      <h3 :id="`control-${integration.slug}-with-ai`">
        {{ language === 'zh'
          ? `AI 怎么控制 ${integration.name}？`
          : `How do I control ${integration.name} with AI?` }}
      </h3>
      <p>
        {{ language === 'zh'
          ? `DCC-MCP 可以${integration.summaryZh}。`
          : `DCC-MCP can ${integration.summaryEn}.` }}
        <a :href="`${language === 'zh' ? '/zh' : ''}/control/${integration.slug}`">
          {{ language === 'zh' ? `查看 ${integration.name} 控制指南` : `Read the ${integration.name} control guide` }}
        </a>
      </p>
      <p>
        <template v-if="integration.marketplacePackage">
          {{ language === 'zh'
            ? `Host-neutral Marketplace Skill：${integration.marketplacePackage}；安装时需指定实际 Host。`
            : `Host-neutral Marketplace Skill: ${integration.marketplacePackage}; choose a concrete host when installing.` }}
        </template>
        <template v-else-if="integration.dccType">
          {{ language === 'zh'
            ? `当前发布 Host 标识：${integration.dccType}。`
            : `Current release host id: ${integration.dccType}.` }}
        </template>
        <template v-else>
          {{ language === 'zh'
            ? '这是公开适配器；请在操作前检查当前 CLI 发布目录。'
            : 'This is a public adapter; check the current CLI release catalog before operating.' }}
        </template>
      </p>
    </section>
  </div>
</template>
