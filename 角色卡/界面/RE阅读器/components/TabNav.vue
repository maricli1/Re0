<template>
  <nav class="re-tabs">
    <button
      v-for="tab in tabs"
      :key="tab.id"
      class="re-tab-button"
      :class="{ active: model === tab.id }"
      @click="model = model === tab.id ? null : tab.id"
    >
      <span class="re-tab-icon">{{ tab.icon }}</span>
      <span class="re-tab-label">{{ tab.label }}</span>
    </button>
  </nav>
</template>

<script setup lang="ts">
defineProps<{
  tabs: { id: string; label: string; icon: string }[];
}>();

const model = defineModel<string | null>({ required: true });
</script>

<style scoped>
.re-tabs {
  display: flex;
  gap: 2px;
  padding: 4px 8px;
  background: rgba(10, 8, 20, 0.7);
  border-bottom: 1px solid rgba(157, 128, 212, 0.3);
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

.re-tab-button {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 8px 14px;
  border: 1px solid rgba(157, 128, 212, 0.2);
  border-radius: 6px 6px 0 0;
  background: rgba(30, 22, 50, 0.6);
  color: #a098c0;
  font-family: 'Noto Sans SC', sans-serif;
  font-size: 0.85em;
  cursor: pointer;
  transition: all 0.25s ease;
  white-space: nowrap;
  user-select: none;
}

.re-tab-button:hover {
  background: rgba(60, 40, 90, 0.7);
  border-color: rgba(157, 128, 212, 0.45);
  color: #c8b8e8;
}

.re-tab-button.active {
  background: rgba(50, 30, 80, 0.8);
  border-color: rgba(157, 128, 212, 0.6);
  color: #d1b8ff;
  box-shadow: 0 0 10px rgba(157, 128, 212, 0.3);
  text-shadow: 0 0 6px rgba(200, 160, 255, 0.4);
}

.re-tab-icon {
  font-size: 1.1em;
}
</style>
