<template>
  <div class="re-panel">
    <div class="re-panel-title">
      <span class="re-panel-icon">📜</span> 技能列表
    </div>
    <div v-if="!_.isEmpty(skills)" class="re-skill-list">
      <div v-for="(skill, name) in skills" :key="name" class="re-skill-item" @click="toggleSkill(name as string)">
        <div class="re-skill-header">
          <span class="re-skill-name">{{ name }}</span>
          <span class="re-skill-arrow" :class="{ open: openSkills[name as string] }">›</span>
        </div>
        <div v-if="openSkills[name as string]" class="re-skill-details">
          <p v-if="skill.description">📝 {{ skill.description }}</p>
          <div class="re-skill-costs">
            <span v-if="skill.manaCost != null">💠 魔法消耗: {{ skill.manaCost }}</span>
            <span v-if="skill.staminaCost != null">⚡ 体力消耗: {{ skill.staminaCost }}</span>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="re-empty">暂未习得技能...</div>
  </div>
</template>

<script setup lang="ts">
import _ from 'lodash';
import { useReaderStore } from '../store';

const store = useReaderStore();
const openSkills = ref<Record<string, boolean>>({});

const skills = computed(() => {
  return store.parsed?.主角?.技能列表 ?? {};
});

function toggleSkill(name: string) {
  openSkills.value[name] = !openSkills.value[name];
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

.re-skill-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.re-skill-item {
  padding: 10px 12px;
  background: rgba(40, 28, 60, 0.5);
  border: 1px solid rgba(157, 128, 212, 0.15);
  border-radius: 6px;
  transition: all 0.2s;
  cursor: pointer;
}

.re-skill-item:hover {
  background: rgba(60, 40, 90, 0.6);
  border-color: rgba(157, 128, 212, 0.35);
}

.re-skill-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.re-skill-name {
  font-weight: bold;
  color: #d0c0e8;
  font-size: 0.9em;
}

.re-skill-arrow {
  font-size: 1.4em;
  color: #9080b0;
  transition: transform 0.3s;
  line-height: 1;
}

.re-skill-arrow.open {
  transform: rotate(90deg);
}

.re-skill-details {
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px solid rgba(157, 128, 212, 0.2);
  color: #a098c0;
  font-size: 0.8em;
}

.re-skill-details p {
  margin: 0 0 6px;
}

.re-skill-costs {
  display: flex;
  gap: 12px;
  color: #9080b0;
}

.re-empty {
  text-align: center;
  padding: 30px;
  color: #706888;
  font-style: italic;
  font-size: 0.9em;
}
</style>
