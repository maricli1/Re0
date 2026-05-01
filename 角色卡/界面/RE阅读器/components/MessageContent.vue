<template>
  <div class="re-panel re-message-panel">
    <!-- 搜索栏 -->
    <div class="re-search-bar" @click.stop>
      <div class="re-search-inner">
        <span class="re-search-pill">高亮</span>
        <input
          v-model="query"
          type="text"
          class="re-search-input"
          placeholder="输入关键词以高亮本楼层内容..."
          @click.stop
          @keydown.esc="query = ''"
        />
        <button v-if="query" type="button" class="re-search-clear" @click.stop="query = ''">清除</button>
      </div>
    </div>

    <!-- 消息内容：直接全部显示 -->
    <div class="re-message-body">
      <WordHighlighter :query="query" highlight-class="re-mark" :html-to-highlight="html" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { injectStreamingMessageContext } from '@util/streaming';
import WordHighlighter from 'vue-word-highlighter';

const context = injectStreamingMessageContext();
const query = ref('');

const html = computed(() => {
  return formatAsDisplayedMessage(context.message, {
    message_id: context.message_id,
  });
});

watch(
  () => context.during_streaming,
  () => {
    if (!context.during_streaming) {
      toastr.success(`第 ${context.message_id} 楼流式传输已完成`);
    }
  },
);

onMounted(() => {
  toastr.success(`成功挂载第 ${context.message_id} 条消息的流式楼层界面`);
});
</script>

<style scoped>
.re-message-panel {
  padding: 12px 16px;
}

/* 搜索栏 */
.re-search-bar {
  margin-bottom: 12px;
  padding: 6px 10px;
  border-radius: 10px;
  background: rgba(157, 128, 212, 0.08);
  border: 1px solid rgba(157, 128, 212, 0.2);
}

.re-search-bar:focus-within {
  border-color: rgba(157, 128, 212, 0.5);
  box-shadow: 0 0 8px rgba(157, 128, 212, 0.15);
}

.re-search-inner {
  display: flex;
  align-items: center;
  gap: 8px;
}

.re-search-pill {
  padding: 3px 10px;
  border-radius: 12px;
  font-size: 0.78em;
  color: #a090c0;
  background: rgba(157, 128, 212, 0.18);
  border: 1px solid rgba(157, 128, 212, 0.25);
  flex-shrink: 0;
}

.re-search-input {
  flex: 1;
  min-width: 0;
  padding: 6px 10px;
  border-radius: 6px;
  background: rgba(20, 14, 30, 0.5);
  border: 1px solid rgba(157, 128, 212, 0.2);
  color: #d0c0e8;
  font-size: 0.85em;
  outline: none;
}

.re-search-input::placeholder {
  color: rgba(160, 144, 192, 0.5);
}

.re-search-clear {
  padding: 4px 10px;
  border-radius: 6px;
  background: rgba(157, 128, 212, 0.15);
  border: 1px solid rgba(157, 128, 212, 0.25);
  color: #b0a0d0;
  cursor: pointer;
  font-size: 0.8em;
  flex-shrink: 0;
}

.re-search-clear:hover {
  background: rgba(157, 128, 212, 0.25);
}

/* 消息正文 */
.re-message-body {
  line-height: 1.7;
  font-size: 0.92em;
}
</style>

<!-- 不能 scoped 因为酒馆自己的 mark 样式会影响到 -->
<style>
.re-mark {
  background-color: rgba(187, 134, 252, 0.35);
  color: #e0d0ff;
  border-radius: 2px;
  padding: 0 2px;
}
</style>
