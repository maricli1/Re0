import { mountStreamingMessages } from '@util/streaming';
import App from './App.vue';

$(() => {
  // 只挂载 AI 输出楼层的流式界面，从 floor 2（第三条 AI 消息，从 0 开始计数）开始
  const { unmount } = mountStreamingMessages(
    () => {
      return createApp(App).use(createPinia());
    },
    {
      // 只从 floor 2 开始挂载（跳过 floor 0 和 floor 1）
      filter: (message_id) => message_id >= 2,
    },
  );
  $(window).on('pagehide', () => unmount());
});
