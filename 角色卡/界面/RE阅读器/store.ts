import { Schema } from '../../schema';

// ====== Store ======
export const useReaderStore = defineStore('re-reader', () => {
  // 从流式楼层上下文中获取当前楼层号
  // mountStreamingMessages 创建的 iframe 内 getCurrentMessageId() 不可用
  const ctx = inject<{ message_id: number }>('streaming_message_context')!;
  const message_id = ctx.message_id;

  const raw = ref<Record<string, any>>({ stat_data: {} });
  const parsed = computed(() => {
    try {
      return Schema.parse(_.get(raw.value, 'stat_data', {}));
    } catch {
      return null;
    }
  });

  // 安全地检查 message_id 是否在有效范围内
  const isValidMessageId = computed(() => {
    try {
      const chat_length = SillyTavern.chat?.length ?? 0;
      return message_id >= 0 && message_id < chat_length;
    } catch {
      return false;
    }
  });

  // 初始化加载当前楼层的 MVU 变量（仅在 message_id 有效时）
  if (isValidMessageId.value) {
    try {
      raw.value = Mvu.getMvuData({ type: 'message', message_id });
    } catch (e) {
      console.warn('[RE阅读器] 无法加载楼层变量:', e);
    }
  }

  // 监听变量更新（包裹 try-catch 防止越界）
  eventOn(Mvu.events.VARIABLE_UPDATE_ENDED, (variables: Record<string, any>) => {
    try {
      // 仅当变量属于当前楼层或全局时才更新
      raw.value = variables;
    } catch (e) {
      console.warn('[RE阅读器] 变量更新失败:', e);
    }
  });

  // 辅助计算：获取百分比
  const getPercentage = (valuePair: { 当前值?: number | null; 最大值?: number | null } | null | undefined): number => {
    if (!valuePair || !valuePair.当前值 || !valuePair.最大值 || valuePair.最大值 === 0) return 0;
    return Math.min(100, Math.round((valuePair.当前值 / valuePair.最大值) * 100));
  };

  return { raw, parsed, getPercentage, message_id };
});
