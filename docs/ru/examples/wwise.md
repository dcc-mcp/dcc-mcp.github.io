---
title: "Интерактивный звук в Wwise"
description: "Прослушайте эффекты и музыкальную петлю, проверенные в Wwise через WAAPI. Откройте исходный код и протокол испытаний."
pageClass: wwise-audio-page
---

# Интерактивный звук в Wwise

<p class="wwise-audio-lockup">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="/brand/dcc-mcp-wwise-dark.svg">
    <source media="(prefers-color-scheme: light)" srcset="/brand/dcc-mcp-wwise.svg">
    <img src="/brand/dcc-mcp-wwise.svg" alt="DCC-MCP · WWISE">
  </picture>
</p>

Введенные в формате WAAPI данные сохраняются в локальном тестовом проекте Wwise. Эти файлы WAV преобразуются, организуются, а затем сохраняются в нужном формате. Проект не публикуется; на этой странице находятся аудиофайлы, а также ссылка на запись проверки.

<section id="ui-confirm">
  <h2>UI Confirm</h2>
  <p>Компактный звук подтверждения работы интерфейса.</p>
  <audio controls preload="metadata" src="/showcase-media/wwise/ui-confirm.wav">
    <a href="/showcase-media/wwise/ui-confirm.wav">Скачайте UI Confirm WAV</a>
  </audio>
</section>

<section id="sci-fi-impact">
  <h2>Sci-Fi Impact</h2>
  <p>Слоистый подход к обработке информации, связанной с переходами, способностями и драматическими моментами.</p>
  <audio controls preload="metadata" src="/showcase-media/wwise/sci-fi-impact.wav">
    <a href="/showcase-media/wwise/sci-fi-impact.wav">Скачайте документ “Sci-Fi Impact WAV”.</a>
  </audio>
</section>

<section id="neon-circuit-bgm">
  <h2>Neon Circuit BGM</h2>
  <p>Краткий электронный фоновый звук для меню и прототипов игрового процесса.</p>
  <audio controls preload="metadata" src="/showcase-media/wwise/neon-circuit-bgm.wav">
    <a href="/showcase-media/wwise/neon-circuit-bgm.wav">Скачайте фоновую музыку в формате WAV для проекта “Neon Circuit”.</a>
  </audio>
</section>

[Просмотрите адаптер, скрипт для генерации данных и доказательства их корректности.](https://github.com/dcc-mcp/dcc-mcp-wwise)
