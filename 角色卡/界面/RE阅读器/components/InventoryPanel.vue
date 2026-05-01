<template>
  <div class="re-panel">
    <div class="re-panel-title">
      <span class="re-panel-icon">🎒</span> 物品栏
    </div>
    <div v-if="!_.isEmpty(items)" class="re-inventory-grid">
      <div v-for="(item, name) in items" :key="name" class="re-item-row">
        <div class="re-item-icon">{{ getItemIcon(name as string) }}</div>
        <div class="re-item-info">
          <span class="re-item-name">{{ name }}</span>
          <span v-if="item.描述" class="re-item-desc">{{ item.描述 }}</span>
        </div>
        <span class="re-item-count">×{{ item.数量 }}</span>
      </div>
    </div>
    <div v-else class="re-empty">背包空空如也...</div>
  </div>
</template>

<script setup lang="ts">
import _ from 'lodash';
import { useReaderStore } from '../store';

const store = useReaderStore();

const items = computed(() => {
  return store.parsed?.主角?.物品列表 ?? {};
});

function getItemIcon(name: string): string {
  if (name.includes('剑') || name.includes('刀')) return '⚔️';
  if (name.includes('药') || name.includes('水') || name.includes('剂')) return '🧪';
  if (name.includes('币') || name.includes('钱')) return '💰';
  if (name.includes('书') || name.includes('卷')) return '📖';
  if (name.includes('石') || name.includes('晶') || name.includes('魔')) return '💎';
  if (name.includes('食') || name.includes('果') || name.includes('肉')) return '🍖';
  if (name.includes('衣') || name.includes('袍') || name.includes('甲')) return '👘';
  return '📦';
}
</script>

<style scoped>
.re-panel {
  padding: 12px 16px;
}

.re-panel-title {
  font-family: 'Orbitron', 'Noto Sans SC', sans-serif;
  font-size: 1.1em;
  color: #d1b8ff;
  padding-bottom: 10px;
  margin-bottom: 10px;
  border-bottom: 1px solid rgba(157, 128, 212, 0.25);
  text-shadow: 0 0 5px rgba(200, 160, 255, 0.3);
  display: flex;
  align-items: center;
  gap: 6px;
}

.re-panel-icon {
  font-size: 1.1em;
}

.re-inventory-grid {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.re-item-row {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  background: rgba(40, 28, 60, 0.5);
  border: 1px solid rgba(157, 128, 212, 0.15);
  border-radius: 6px;
  transition: all 0.2s;
}

.re-item-row:hover {
  background: rgba(60, 40, 90, 0.6);
  border-color: rgba(157, 128, 212, 0.35);
  transform: scale(1.01);
}

.re-item-icon {
  font-size: 1.4em;
  flex-shrink: 0;
}

.re-item-info {
  flex: 1;
  min-width: 0;
}

.re-item-name {
  display: block;
  font-weight: bold;
  color: #d0c0e8;
  font-size: 0.9em;
}

.re-item-desc {
  display: block;
  color: #a098c0;
  font-size: 0.78em;
  margin-top: 2px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.re-item-count {
  color: #b0a0d0;
  font-weight: bold;
  font-size: 0.9em;
  flex-shrink: 0;
}

.re-empty {
  text-align: center;
  padding: 30px;
  color: #706888;
  font-style: italic;
  font-size: 0.9em;
}
</style>
