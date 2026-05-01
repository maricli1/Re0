<template>
  <div class="re-panel">
    <div class="re-panel-title">
      <span class="re-panel-icon">💖</span> 关系列表
    </div>
    <div v-if="!_.isEmpty(relations)" class="re-relation-list">
      <div v-for="(char, name) in relations" :key="name" class="re-relation-card" @click="toggleChar(name as string)">
        <div class="re-relation-header">
          <div class="re-relation-main">
            <span class="re-relation-name">{{ char.姓名 || name }}</span>
            <span class="re-relation-gender">{{ char.性别 }}</span>
          </div>
          <span class="re-relation-arrow" :class="{ open: openChars[name as string] }">›</span>
        </div>
        <!-- 好感度条 -->
        <div class="re-affection-bar" v-if="char.好感度 != null">
          <span class="re-affection-label">好感度</span>
          <div class="re-affection-track">
            <div class="re-affection-fill" :style="{ width: Math.min(100, Math.max(0, char.好感度)) + '%' }"></div>
          </div>
          <span class="re-affection-value">{{ char.好感度 }}</span>
        </div>
        <!-- 详情 -->
        <div v-if="openChars[name as string]" class="re-relation-details">
          <p v-if="char.外貌"><span class="re-detail-label">外貌：</span>{{ char.外貌 }}</p>
          <p v-if="char.关系描述"><span class="re-detail-label">关系：</span>{{ char.关系描述 }}</p>
          <p v-if="char.对你态度"><span class="re-detail-label">态度：</span>{{ char.对你态度 }}</p>
          <p v-if="char.所处地点"><span class="re-detail-label">位置：</span>{{ char.所处地点 }}</p>
          <p v-if="char.种族"><span class="re-detail-label">种族：</span>{{ char.种族 }}</p>

          <!-- 属性 -->
          <div v-if="char.属性列表" class="re-relation-attrs">
            <span v-for="(val, attr) in char.属性列表" :key="attr" class="re-attr-chip">
              {{ attr }}: {{ val ?? '-' }}
            </span>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="re-empty">暂无已知关系...</div>
  </div>
</template>

<script setup lang="ts">
import _ from 'lodash';
import { useReaderStore } from '../store';

const store = useReaderStore();
const openChars = ref<Record<string, boolean>>({});

const relations = computed(() => {
  return store.parsed?.关系列表 ?? {};
});

function toggleChar(name: string) {
  openChars.value[name] = !openChars.value[name];
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

.re-relation-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.re-relation-card {
  padding: 10px 12px;
  background: rgba(40, 28, 60, 0.5);
  border: 1px solid rgba(157, 128, 212, 0.15);
  border-radius: 6px;
  transition: all 0.2s;
  cursor: pointer;
}

.re-relation-card:hover {
  background: rgba(60, 40, 90, 0.6);
  border-color: rgba(157, 128, 212, 0.35);
}

.re-relation-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.re-relation-main {
  display: flex;
  align-items: center;
  gap: 8px;
}

.re-relation-name {
  font-weight: bold;
  color: #d0c0e8;
  font-size: 0.95em;
}

.re-relation-gender {
  font-size: 0.75em;
  color: #8070a8;
  background: rgba(157, 128, 212, 0.15);
  padding: 1px 8px;
  border-radius: 8px;
}

.re-relation-arrow {
  font-size: 1.4em;
  color: #9080b0;
  transition: transform 0.3s;
  line-height: 1;
}

.re-relation-arrow.open {
  transform: rotate(90deg);
}

.re-affection-bar {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
}

.re-affection-label {
  font-size: 0.72em;
  color: #9080b0;
  flex-shrink: 0;
}

.re-affection-track {
  flex: 1;
  height: 5px;
  background: rgba(0, 0, 0, 0.4);
  border-radius: 3px;
  overflow: hidden;
  border: 1px solid rgba(0, 0, 0, 0.3);
}

.re-affection-fill {
  height: 100%;
  background: linear-gradient(90deg, #f44336, #ff9800, #ffeb3b, #4caf50, #e91e94);
  border-radius: 3px;
  transition: width 0.5s ease;
}

.re-affection-value {
  font-size: 0.8em;
  color: #d0c0e8;
  font-weight: bold;
  flex-shrink: 0;
  min-width: 2em;
}

.re-relation-details {
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px solid rgba(157, 128, 212, 0.2);
  color: #a098c0;
  font-size: 0.8em;
}

.re-relation-details p {
  margin: 0 0 4px;
}

.re-detail-label {
  color: #8070a8;
}

.re-relation-attrs {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 8px;
}

.re-attr-chip {
  font-size: 0.75em;
  color: #a098c0;
  background: rgba(157, 128, 212, 0.12);
  padding: 2px 8px;
  border-radius: 4px;
  border: 1px solid rgba(157, 128, 212, 0.15);
}

.re-empty {
  text-align: center;
  padding: 30px;
  color: #706888;
  font-style: italic;
  font-size: 0.9em;
}
</style>
