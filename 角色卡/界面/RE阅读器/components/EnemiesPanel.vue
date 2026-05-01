<template>
  <div class="re-panel">
    <div class="re-panel-title">
      <span class="re-panel-icon">☠️</span> 敌人列表
    </div>
    <div v-if="!_.isEmpty(enemies)" class="re-enemy-list">
      <div v-for="(enemy, name) in enemies" :key="name" class="re-enemy-card" @click="toggleEnemy(name as string)">
        <div class="re-enemy-header">
          <span class="re-enemy-name">{{ enemy.姓名 || name }}</span>
          <span class="re-enemy-arrow" :class="{ open: openEnemies[name as string] }">›</span>
        </div>
        <div v-if="openEnemies[name as string]" class="re-enemy-details">
          <p v-if="enemy.外貌"><span class="re-detail-label">外貌：</span>{{ enemy.外貌 }}</p>
          <p v-if="enemy.性别"><span class="re-detail-label">性别：</span>{{ enemy.性别 }}</p>
          <p v-if="enemy.种族"><span class="re-detail-label">种族：</span>{{ enemy.种族 }}</p>
          <p v-if="enemy.敌人描述"><span class="re-detail-label">描述：</span>{{ enemy.敌人描述 }}</p>
          <!-- 属性 -->
          <div v-if="enemy.属性列表" class="re-enemy-attrs">
            <span v-for="(val, attr) in enemy.属性列表" :key="attr" class="re-attr-chip">
              {{ attr }}: {{ val ?? '-' }}
            </span>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="re-empty">暂无敌人记录...</div>
  </div>
</template>

<script setup lang="ts">
import _ from 'lodash';
import { useReaderStore } from '../store';

const store = useReaderStore();
const openEnemies = ref<Record<string, boolean>>({});

const enemies = computed(() => {
  return store.parsed?.敌人列表 ?? {};
});

function toggleEnemy(name: string) {
  openEnemies.value[name] = !openEnemies.value[name];
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

.re-enemy-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.re-enemy-card {
  padding: 10px 12px;
  background: rgba(50, 20, 30, 0.5);
  border: 1px solid rgba(200, 80, 80, 0.2);
  border-radius: 6px;
  transition: all 0.2s;
  cursor: pointer;
}

.re-enemy-card:hover {
  background: rgba(70, 25, 35, 0.6);
  border-color: rgba(200, 80, 80, 0.4);
}

.re-enemy-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.re-enemy-name {
  font-weight: bold;
  color: #e0b0b0;
  font-size: 0.95em;
}

.re-enemy-arrow {
  font-size: 1.4em;
  color: #b08080;
  transition: transform 0.3s;
  line-height: 1;
}

.re-enemy-arrow.open {
  transform: rotate(90deg);
}

.re-enemy-details {
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px solid rgba(200, 80, 80, 0.2);
  color: #c0a0a0;
  font-size: 0.8em;
}

.re-enemy-details p {
  margin: 0 0 4px;
}

.re-detail-label {
  color: #906868;
}

.re-enemy-attrs {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 8px;
}

.re-attr-chip {
  font-size: 0.75em;
  color: #c0a0a0;
  background: rgba(200, 80, 80, 0.12);
  padding: 2px 8px;
  border-radius: 4px;
  border: 1px solid rgba(200, 80, 80, 0.15);
}

.re-empty {
  text-align: center;
  padding: 30px;
  color: #706888;
  font-style: italic;
  font-size: 0.9em;
}
</style>
