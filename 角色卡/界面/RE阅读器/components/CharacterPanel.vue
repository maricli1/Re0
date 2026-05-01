<template>
  <div class="re-panel" v-if="store.parsed?.主角">
    <!-- 角色头部 -->
    <div class="re-char-hero">
      <div class="re-char-hero-name">{{ store.parsed.主角.姓名 || '未知角色' }}</div>
      <div class="re-char-hero-race">{{ store.parsed.主角.种族 }}</div>
    </div>

    <!-- 血条区 -->
    <div class="re-stat-section">
      <div class="re-stat-row">
        <span class="re-stat-label">❤️ 生命值</span>
        <span class="re-stat-value">{{ store.parsed.主角.生命值?.当前值 ?? '-' }} / {{ store.parsed.主角.生命值?.最大值 ?? '-' }}</span>
      </div>
      <div class="re-stat-bar">
        <div class="re-stat-bar-fill health" :style="{ width: store.getPercentage(store.parsed.主角.生命值) + '%' }"></div>
      </div>

      <div class="re-stat-row">
        <span class="re-stat-label">💠 魔法值</span>
        <span class="re-stat-value">{{ store.parsed.主角.魔法值?.当前值 ?? '-' }} / {{ store.parsed.主角.魔法值?.最大值 ?? '-' }}</span>
      </div>
      <div class="re-stat-bar">
        <div class="re-stat-bar-fill mana" :style="{ width: store.getPercentage(store.parsed.主角.魔法值) + '%' }"></div>
      </div>

      <div class="re-stat-row">
        <span class="re-stat-label">⚡ 体力值</span>
        <span class="re-stat-value">{{ store.parsed.主角.体力值?.当前值 ?? '-' }} / {{ store.parsed.主角.体力值?.最大值 ?? '-' }}</span>
      </div>
      <div class="re-stat-bar">
        <div class="re-stat-bar-fill stamina" :style="{ width: store.getPercentage(store.parsed.主角.体力值) + '%' }"></div>
      </div>

      <div class="re-stat-row">
        <span class="re-stat-label">🛡️ 护甲值</span>
        <span class="re-stat-value">{{ store.parsed.主角.护甲值?.当前值 ?? '-' }} / {{ store.parsed.主角.护甲值?.最大值 ?? '-' }}</span>
      </div>
      <div class="re-stat-bar">
        <div class="re-stat-bar-fill armor" :style="{ width: store.getPercentage(store.parsed.主角.护甲值) + '%' }"></div>
      </div>
    </div>

    <!-- 属性面板 -->
    <div class="re-section" v-if="store.parsed.主角.属性列表">
      <div class="re-section-title">📊 属性面板</div>
      <div class="re-attrs">
        <div v-for="(val, attr) in store.parsed.主角.属性列表" :key="attr" class="re-attr-chip">
          <span class="re-attr-name">{{ attr }}</span>
          <span class="re-attr-val">{{ val ?? '-' }}</span>
        </div>
      </div>
    </div>

    <!-- 装备栏 -->
    <div class="re-section" v-if="store.parsed.主角.装备栏">
      <div class="re-section-title">⚔️ 装备栏</div>
      <div class="re-equip-list">
        <div v-for="(equip, slot) in store.parsed.主角.装备栏" :key="slot" class="re-equip-item">
          <div class="re-equip-header">
            <span class="re-equip-slot">{{ slot }}</span>
            <span class="re-equip-name" :class="{ empty: !equip?.name }">{{ equip?.name || '空置' }}</span>
          </div>
          <div v-if="equip?.description" class="re-equip-desc">{{ equip.description }}</div>
          <div class="re-equip-stats" v-if="equip?.attackPower != null || equip?.defenseValue != null">
            <span v-if="equip.attackPower != null">⚔️ 攻击力 {{ equip.attackPower }}</span>
            <span v-if="equip.defenseValue != null">🛡️ 防御值 {{ equip.defenseValue }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 技能列表 -->
    <div class="re-section" v-if="!_.isEmpty(store.parsed.主角.技能列表)">
      <div class="re-section-title">📜 技能列表</div>
      <div class="re-skill-list">
        <div v-for="(skill, name) in store.parsed.主角.技能列表" :key="name" class="re-skill-item" @click="toggleSkill(name as string)">
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
    </div>

    <!-- 死亡回溯 -->
    <div class="re-section re-rewind-section">
      <div class="re-section-title">🔄 死亡回溯</div>
      <div class="re-rewind-count">
        <span class="re-rewind-label">轮回计数</span>
        <span class="re-rewind-value">{{ store.parsed.主角.死亡回溯计数 ?? 0 }}</span>
      </div>
    </div>
  </div>
  <div v-else class="re-panel">
    <div class="re-empty">⏳ 角色数据加载中...</div>
  </div>
</template>

<script setup lang="ts">
import _ from 'lodash';
import { useReaderStore } from '../store';

const store = useReaderStore();
const openSkills = ref<Record<string, boolean>>({});

function toggleSkill(name: string) {
  openSkills.value[name] = !openSkills.value[name];
}
</script>

<style scoped>
.re-panel {
  padding: 12px 16px;
}

/* 英雄头部 */
.re-char-hero {
  text-align: center;
  padding: 16px 0 12px;
}

.re-char-hero-name {
  font-family: 'Orbitron', 'Noto Sans SC', sans-serif;
  font-size: 1.5em;
  font-weight: 700;
  color: #d1b8ff;
  text-shadow: 0 0 5px #fff, 0 0 10px #d1b8ff, 0 0 20px #d1b8ff;
  letter-spacing: 2px;
}

.re-char-hero-race {
  font-size: 0.85em;
  color: #8070a8;
  margin-top: 4px;
}

/* 血条区 */
.re-stat-section {
  margin-bottom: 12px;
}

.re-stat-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.85em;
  margin-bottom: 2px;
}

.re-stat-label {
  color: #a098c0;
}

.re-stat-value {
  color: #d0c0e8;
  font-weight: bold;
  font-family: 'Orbitron', sans-serif;
  font-size: 0.85em;
}

.re-stat-bar {
  height: 7px;
  background: rgba(0, 0, 0, 0.4);
  border-radius: 4px;
  margin-bottom: 10px;
  overflow: hidden;
  border: 1px solid rgba(0, 0, 0, 0.3);
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.5);
}

.re-stat-bar-fill {
  height: 100%;
  border-radius: 3px;
  transition: width 0.5s ease;
  box-shadow: 0 0 6px 1px currentColor;
}

.re-stat-bar-fill.health { background: #f44336; }
.re-stat-bar-fill.mana { background: #9c27b0; }
.re-stat-bar-fill.stamina { background: #00bcd4; }
.re-stat-bar-fill.armor { background: #9e9e9e; }

/* 分区 */
.re-section {
  margin-bottom: 14px;
  padding: 12px;
  background: rgba(30, 22, 50, 0.4);
  border: 1px solid rgba(157, 128, 212, 0.12);
  border-radius: 6px;
}

.re-section-title {
  font-family: 'Orbitron', 'Noto Sans SC', sans-serif;
  font-size: 0.9em;
  color: #d1b8ff;
  text-shadow: 0 0 4px rgba(200, 160, 255, 0.25);
  margin-bottom: 10px;
  padding-bottom: 6px;
  border-bottom: 1px solid rgba(157, 128, 212, 0.18);
}

/* 属性面板 */
.re-attrs {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 6px;
}

.re-attr-chip {
  display: flex;
  justify-content: space-between;
  padding: 6px 8px;
  background: rgba(60, 40, 90, 0.35);
  border: 1px solid rgba(157, 128, 212, 0.12);
  border-radius: 4px;
  font-size: 0.8em;
}

.re-attr-name {
  color: #9080b0;
}

.re-attr-val {
  color: #d0c0e8;
  font-weight: bold;
}

/* 装备 */
.re-equip-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.re-equip-item {
  padding: 8px 10px;
  background: rgba(40, 28, 60, 0.4);
  border: 1px solid rgba(157, 128, 212, 0.1);
  border-radius: 4px;
}

.re-equip-header {
  display: flex;
  align-items: center;
  gap: 8px;
}

.re-equip-slot {
  color: #8070a8;
  font-size: 0.82em;
  min-width: 2.5em;
}

.re-equip-name {
  color: #d0c0e8;
  font-weight: bold;
  font-size: 0.88em;
}

.re-equip-name.empty {
  color: #605870;
  font-style: italic;
}

.re-equip-desc {
  color: #a098c0;
  font-size: 0.78em;
  margin-top: 4px;
}

.re-equip-stats {
  display: flex;
  gap: 12px;
  margin-top: 4px;
  color: #b0a0d0;
  font-size: 0.78em;
}

/* 技能 */
.re-skill-list {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.re-skill-item {
  padding: 8px 10px;
  background: rgba(40, 28, 60, 0.4);
  border: 1px solid rgba(157, 128, 212, 0.1);
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.2s;
}

.re-skill-item:hover {
  background: rgba(60, 40, 90, 0.5);
}

.re-skill-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.re-skill-name {
  color: #d0c0e8;
  font-weight: bold;
  font-size: 0.85em;
}

.re-skill-arrow {
  font-size: 1.3em;
  color: #9080b0;
  transition: transform 0.3s;
  line-height: 1;
}

.re-skill-arrow.open {
  transform: rotate(90deg);
}

.re-skill-details {
  margin-top: 8px;
  padding-top: 8px;
  border-top: 1px solid rgba(157, 128, 212, 0.15);
  color: #a098c0;
  font-size: 0.78em;
}

.re-skill-details p {
  margin: 0 0 4px;
}

.re-skill-costs {
  display: flex;
  gap: 12px;
  color: #9080b0;
  font-size: 0.85em;
}

/* 死亡回溯 */
.re-rewind-section {
  border-color: rgba(255, 45, 85, 0.2);
}

.re-rewind-count {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.re-rewind-label {
  color: #b098b8;
  font-size: 0.88em;
}

.re-rewind-value {
  color: #ff2d55;
  font-weight: bold;
  font-size: 1.2em;
  font-family: 'Orbitron', sans-serif;
  animation: rewindGlitch 2s linear infinite;
}

@keyframes rewindGlitch {
  0%, 90%, 100% { opacity: 1; transform: translateX(0); }
  92% { opacity: 0.8; transform: translateX(1px); }
  94% { opacity: 1; transform: translateX(-1px); }
  96% { opacity: 0.9; transform: translateX(0.5px); }
}

.re-empty {
  text-align: center;
  padding: 30px;
  color: #706888;
  font-style: italic;
  font-size: 0.9em;
}
</style>
