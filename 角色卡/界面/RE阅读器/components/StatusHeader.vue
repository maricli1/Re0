<template>
  <div class="re-header" v-if="store.parsed">
    <div class="re-header-item">
      <span class="re-header-icon">📜</span>
      <span class="re-header-text">{{ chapterName }}</span>
    </div>
    <div class="re-header-item">
      <span class="re-header-icon">⏳</span>
      <span class="re-header-text">{{ timeText }}</span>
    </div>
    <div class="re-header-item re-header-rewind">
      <span class="re-header-icon">🔄</span>
      <span class="re-header-text rewind-text">轮回: {{ rewindCount }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useReaderStore } from '../store';

const store = useReaderStore();

const chapterName = computed(() => {
  const data = window.localStorage.getItem(SillyTavern.getCurrentChatId());
  if (data) {
    const parsed = JSON.parse(data);
    return parsed.chapter_name || '未知章节';
  }
  return '未知章节';
});

const timeText = computed(() => {
  const t = store.parsed?.时间;
  if (!t) return '----';
  return `${t.年月日 || '----'}  ${t.时间 || '--:--'}`;
});

const rewindCount = computed(() => {
  return store.parsed?.主角?.死亡回溯计数 ?? 0;
});
</script>

<style scoped>
.re-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 16px;
  background: rgba(20, 14, 30, 0.55);
  border-bottom: 1px solid rgba(157, 128, 212, 0.25);
  font-family: 'Orbitron', 'Noto Sans SC', sans-serif;
  font-size: 0.82em;
  color: #c0b0d8;
  flex-wrap: wrap;
  gap: 8px;
  backdrop-filter: blur(4px);
}

.re-header-item {
  display: flex;
  align-items: center;
  gap: 5px;
}

.re-header-icon {
  font-size: 1em;
}

.re-header-text {
  text-shadow: 0 0 3px rgba(180, 160, 220, 0.4);
}

.re-header-rewind .rewind-text {
  color: #ff2d55;
  font-weight: bold;
  animation: rewindGlitch 2s linear infinite;
}

@keyframes rewindGlitch {
  0%, 90%, 100% { opacity: 1; transform: translateX(0); }
  92% { opacity: 0.8; transform: translateX(1px); }
  94% { opacity: 1; transform: translateX(-1px); }
  96% { opacity: 0.9; transform: translateX(0.5px); }
}
</style>
