<template>
  <div class="re-panel">
    <div class="re-panel-title">
      <span class="re-panel-icon">📋</span> 任务列表
      <span class="re-task-progress">{{ completedCount }}/{{ totalCount }}</span>
    </div>
    <div v-if="!_.isEmpty(tasks)" class="re-task-list">
      <div
        v-for="(task, name) in tasks"
        :key="name"
        class="re-task-item"
        :class="{ completed: task.是否完成 }"
      >
        <div class="re-task-checkbox">
          <span v-if="task.是否完成" class="re-task-check">✓</span>
        </div>
        <div class="re-task-info">
          <span class="re-task-name">{{ name }}</span>
          <span v-if="task.描述" class="re-task-desc">{{ task.描述 }}</span>
        </div>
      </div>
    </div>
    <div v-else class="re-empty">暂无任务...</div>
  </div>
</template>

<script setup lang="ts">
import _ from 'lodash';
import { useReaderStore } from '../store';

const store = useReaderStore();

const tasks = computed(() => {
  return store.parsed?.任务列表 ?? {};
});

const totalCount = computed(() => Object.keys(tasks.value).length);
const completedCount = computed(() => Object.values(tasks.value).filter((t: any) => t.是否完成).length);
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

.re-task-progress {
  margin-left: auto;
  font-size: 0.75em;
  color: #a090c0;
  background: rgba(157, 128, 212, 0.15);
  padding: 2px 10px;
  border-radius: 10px;
}

.re-task-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.re-task-item {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 10px 12px;
  background: rgba(40, 28, 60, 0.5);
  border: 1px solid rgba(157, 128, 212, 0.15);
  border-radius: 6px;
  transition: all 0.2s;
}

.re-task-item:hover {
  background: rgba(60, 40, 90, 0.6);
  border-color: rgba(157, 128, 212, 0.35);
}

.re-task-item.completed {
  opacity: 0.55;
  background: rgba(25, 20, 40, 0.5);
}

.re-task-item.completed .re-task-name {
  text-decoration: line-through;
  color: #706888;
}

.re-task-checkbox {
  width: 22px;
  height: 22px;
  border: 2px solid rgba(157, 128, 212, 0.4);
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-top: 1px;
  transition: all 0.2s;
}

.re-task-item.completed .re-task-checkbox {
  background: rgba(157, 128, 212, 0.3);
  border-color: rgba(157, 128, 212, 0.5);
}

.re-task-check {
  color: #d1b8ff;
  font-size: 0.85em;
  font-weight: bold;
}

.re-task-info {
  flex: 1;
  min-width: 0;
}

.re-task-name {
  display: block;
  font-weight: bold;
  color: #d0c0e8;
  font-size: 0.9em;
}

.re-task-desc {
  display: block;
  color: #a098c0;
  font-size: 0.78em;
  margin-top: 2px;
}

.re-empty {
  text-align: center;
  padding: 30px;
  color: #706888;
  font-style: italic;
  font-size: 0.9em;
}
</style>
