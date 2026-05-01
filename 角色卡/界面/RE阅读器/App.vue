<template>
  <div v-if="store.parsed" class="re-reader-container">
    <!-- 背景装饰层 -->
    <div class="re-bg-grid"></div>
    <div class="re-magic-glyph"></div>
    <div class="re-corner-decoration re-corner-tl"></div>
    <div class="re-corner-decoration re-corner-tr"></div>
    <div class="re-corner-decoration re-corner-bl"></div>
    <div class="re-corner-decoration re-corner-br"></div>
    <div class="re-mote" style="left: 8%; top: 15%"></div>
    <div class="re-mote" style="left: 90%; top: 75%"></div>
    <div class="re-mote" style="left: 15%; top: 85%"></div>
    <div class="re-sparkle" style="top: 18px; right: 40px; background: radial-gradient(circle, white 20%, #f48fb1 60%, transparent 80%)"></div>
    <div class="re-sparkle" style="bottom: 30px; left: 30px; background: radial-gradient(circle, white 20%, #90caf9 60%, transparent 80%)"></div>

    <!-- 内容区域 -->
    <div class="re-content-box">
      <!-- 顶部信息栏 -->
      <StatusHeader />

      <!-- 标签导航 -->
      <TabNav v-model="activeTab" :tabs="tabs" />

      <!-- 标签内容 -->
      <div class="re-tab-content">
        <div v-if="activeTab === '正文'" class="re-tab-pane active">
          <MessageContent />
        </div>
        <div v-else-if="activeTab === '角色'" class="re-tab-pane active">
          <CharacterPanel />
        </div>
        <div v-else-if="activeTab === '背包'" class="re-tab-pane active">
          <InventoryPanel />
        </div>
        <div v-else-if="activeTab === '任务'" class="re-tab-pane active">
          <TaskPanel />
        </div>
        <div v-else-if="activeTab === '技能'" class="re-tab-pane active">
          <SkillsPanel />
        </div>
        <div v-else-if="activeTab === '关系'" class="re-tab-pane active">
          <RelationsPanel />
        </div>
        <div v-else-if="activeTab === '敌人'" class="re-tab-pane active">
          <EnemiesPanel />
        </div>
      </div>
    </div>
  </div>
  <div v-else class="re-reader-container">
    <div class="re-content-box">
      <div class="re-loading">⏳ 正在读取异世界数据...</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CharacterPanel from './components/CharacterPanel.vue';
import EnemiesPanel from './components/EnemiesPanel.vue';
import InventoryPanel from './components/InventoryPanel.vue';
import MessageContent from './components/MessageContent.vue';
import RelationsPanel from './components/RelationsPanel.vue';
import SkillsPanel from './components/SkillsPanel.vue';
import StatusHeader from './components/StatusHeader.vue';
import TabNav from './components/TabNav.vue';
import TaskPanel from './components/TaskPanel.vue';
import { useReaderStore } from './store';

const store = useReaderStore();

const tabs = [
  { id: '正文', label: '正文', icon: '📖' },
  { id: '角色', label: '角色', icon: '⚜️' },
  { id: '背包', label: '背包', icon: '🎒' },
  { id: '任务', label: '任务', icon: '📋' },
  { id: '技能', label: '技能', icon: '📜' },
  { id: '关系', label: '关系', icon: '💖' },
  { id: '敌人', label: '敌人', icon: '☠️' },
];

const activeTab = useLocalStorage<string | null>('re_reader:active_tab', '正文');
</script>

<style>
/* ====== 全局字体 ====== */
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;700&family=Orbitron:wght@400;700&family=Noto+Serif+JP:wght@400;700&family=Shippori+Mincho&display=swap');

/* ====== RE:Zero 暗色主题容器 ====== */
.re-reader-container {
  width: 100%;
  max-width: 900px;
  margin: 12px auto;
  position: relative;
  overflow: hidden;
  padding: 20px;
  background: linear-gradient(165deg, #100f14, #211e2b);
  border: 10px solid;
  border-image: linear-gradient(135deg, #5c4a7d, #bb86fc) 1;
  border-radius: 6px;
  box-shadow:
    0 0 25px rgba(187, 134, 252, 0.22),
    inset 0 0 18px rgba(0, 0, 0, 0.4);
  color: #dcd1ff;
  font-family: 'Noto Sans SC', 'Noto Serif JP', serif;
  animation: reGlow 8s infinite alternate ease-in-out;
}

@keyframes reGlow {
  from {
    box-shadow: 0 0 22px rgba(187, 134, 252, 0.18), inset 0 0 16px rgba(0, 0, 0, 0.4);
  }
  to {
    box-shadow: 0 0 32px rgba(187, 134, 252, 0.3), inset 0 0 22px rgba(0, 0, 0, 0.5);
  }
}

/* ====== 背景网格 ====== */
.re-bg-grid {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background:
    repeating-linear-gradient(45deg, transparent, transparent 15px, rgba(138, 107, 190, 0.06) 15px, rgba(138, 107, 190, 0.06) 16px),
    repeating-linear-gradient(-45deg, transparent, transparent 15px, rgba(138, 107, 190, 0.06) 15px, rgba(138, 107, 190, 0.06) 16px);
  pointer-events: none;
  opacity: 0.45;
  z-index: 0;
}

/* ====== 魔法符文光效 ====== */
.re-magic-glyph {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 250px;
  height: 250px;
  transform: translate(-50%, -50%);
  background: radial-gradient(circle, rgba(28, 23, 40, 0) 0%, rgba(187, 134, 252, 0.1) 60%, rgba(187, 134, 252, 0.18) 65%, transparent 70%);
  border-radius: 50%;
  z-index: 0;
  pointer-events: none;
  animation: magicPulse 12s infinite ease-in-out;
}

@keyframes magicPulse {
  0%, 100% { opacity: 0.4; transform: translate(-50%, -50%) scale(0.96); }
  50% { opacity: 0.65; transform: translate(-50%, -50%) scale(1.04); }
}

/* ====== 角装饰 ====== */
.re-corner-decoration {
  position: absolute;
  width: 40px;
  height: 40px;
  pointer-events: none;
  z-index: 2;
}
.re-corner-decoration::before,
.re-corner-decoration::after {
  content: '';
  position: absolute;
  border-style: solid;
  border-color: #7d6b9c;
}

.re-corner-tl { top: 18px; left: 18px; }
.re-corner-tl::before { top: 0; left: 0; width: 15px; height: 15px; border-width: 2px 0 0 2px; }
.re-corner-tl::after { top: 5px; left: 5px; width: 8px; height: 8px; border-width: 1px 0 0 1px; }

.re-corner-tr { top: 18px; right: 18px; }
.re-corner-tr::before { top: 0; right: 0; width: 15px; height: 15px; border-width: 2px 2px 0 0; }
.re-corner-tr::after { top: 5px; right: 5px; width: 8px; height: 8px; border-width: 1px 1px 0 0; }

.re-corner-bl { bottom: 18px; left: 18px; }
.re-corner-bl::before { bottom: 0; left: 0; width: 15px; height: 15px; border-width: 0 0 2px 2px; }
.re-corner-bl::after { bottom: 5px; left: 5px; width: 8px; height: 8px; border-width: 0 0 1px 1px; }

.re-corner-br { bottom: 18px; right: 18px; }
.re-corner-br::before { bottom: 0; right: 0; width: 15px; height: 15px; border-width: 0 2px 2px 0; }
.re-corner-br::after { bottom: 5px; right: 5px; width: 8px; height: 8px; border-width: 0 1px 1px 0; }

/* ====== 浮游粒子 ====== */
.re-mote {
  position: absolute;
  width: 3px;
  height: 3px;
  background-color: rgba(187, 134, 252, 0.5);
  border-radius: 50%;
  box-shadow: 0 0 4px 1px rgba(187, 134, 252, 0.5);
  pointer-events: none;
  z-index: 1;
  animation: etherealFloat 9s infinite ease-in-out;
}
.re-mote:nth-child(1) { animation-delay: 0s; }
.re-mote:nth-child(2) { animation-delay: -3s; }
.re-mote:nth-child(3) { animation-delay: -6s; }

@keyframes etherealFloat {
  0%, 100% { transform: translateY(0) translateX(0); opacity: 0; }
  25% { opacity: 0.55; }
  75% { opacity: 0.55; }
  50% { transform: translateY(-22px) translateX(12px); }
}

/* ====== 闪烁星光 ====== */
.re-sparkle {
  position: absolute;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  opacity: 0.65;
  z-index: 1;
  animation: reSparkle 5s infinite ease-in-out;
}
.re-sparkle:nth-child(2) { animation-delay: 1.5s; }

@keyframes reSparkle {
  0%, 100% { transform: scale(0.85); opacity: 0.65; }
  50% { transform: scale(1.25); opacity: 1; }
}

/* ====== 内容框 ====== */
.re-content-box {
  position: relative;
  background: rgba(20, 16, 28, 0.92);
  border: 1px solid rgba(187, 134, 252, 0.28);
  border-radius: 6px;
  backdrop-filter: blur(3px);
  z-index: 1;
  overflow: hidden;
}

/* ====== 标签内容区域 ====== */
.re-tab-content {
  min-height: 180px;
  max-height: 70vh;
  overflow-y: auto;
  overflow-x: hidden;
}

.re-tab-pane {
  display: none;
  animation: reFadeIn 0.35s ease;
}

.re-tab-pane.active {
  display: block;
}

@keyframes reFadeIn {
  from {
    opacity: 0;
    transform: translateY(6px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* ====== 滚动条美化 ====== */
.re-tab-content::-webkit-scrollbar {
  width: 5px;
}
.re-tab-content::-webkit-scrollbar-track {
  background: rgba(20, 14, 30, 0.4);
  border-radius: 3px;
}
.re-tab-content::-webkit-scrollbar-thumb {
  background: rgba(157, 128, 212, 0.4);
  border-radius: 3px;
}
.re-tab-content::-webkit-scrollbar-thumb:hover {
  background: rgba(157, 128, 212, 0.6);
}

/* ====== 加载状态 ====== */
.re-loading {
  text-align: center;
  padding: 50px 20px;
  color: #a090c0;
  font-family: 'Orbitron', 'Noto Sans SC', sans-serif;
  font-size: 1em;
  animation: reFadeIn 1s ease;
}
</style>
