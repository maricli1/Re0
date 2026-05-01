// ====== MVU 变量结构定义 ======
// 本文件只负责定义 Schema，不包含任何副作用
// z (zod 4.x) 和 _ (lodash) 在酒馆助手中全局可用

const ValuePairSchema = z.object({
  当前值: z.coerce.number().nullable(),
  最大值: z.coerce.number().nullable(),
}).prefault({ 当前值: null, 最大值: null });

const EquipmentSchema = z.object({
  name: z.string().prefault(''),
  description: z.string().prefault(''),
});

const BaseCharacterSchema = z.object({
  种族: z.string().prefault(''),
  生命值: ValuePairSchema,
  魔法值: ValuePairSchema,
  体力值: ValuePairSchema,
  护甲值: ValuePairSchema,
  属性列表: z.object({
    力量: z.coerce.number().nullable(),
    敏捷: z.coerce.number().nullable(),
    智力: z.coerce.number().nullable(),
    耐力: z.coerce.number().nullable(),
    精神: z.coerce.number().nullable(),
    魅力: z.coerce.number().nullable(),
  }).prefault({ 力量: null, 敏捷: null, 智力: null, 耐力: null, 精神: null, 魅力: null }),
  装备栏: z.object({
    武器: EquipmentSchema.extend({ attackPower: z.coerce.number().nullable() }).prefault({ name: '', description: '', attackPower: null }),
    上身: EquipmentSchema.extend({ defenseValue: z.coerce.number().nullable() }).prefault({ name: '', description: '', defenseValue: null }),
    下身: EquipmentSchema.extend({ defenseValue: z.coerce.number().nullable() }).prefault({ name: '', description: '', defenseValue: null }),
    饰品: EquipmentSchema.prefault({ name: '', description: '' }),
  }).prefault({}),
  技能列表: z.record(z.string().describe('技能名称'), z.object({
    description: z.string().prefault(''),
    manaCost: z.coerce.number().nullable(),
    staminaCost: z.coerce.number().nullable(),
  })).prefault({}),
});

export const Schema = z.object({
  chapter: z.object({
    is_changed_chapter: z.string().prefault('NO'),
  }).prefault({ is_changed_chapter: 'NO' }),
  时间: z.object({
    年月日: z.string().prefault('0001年01月01日'),
    时间: z.string().prefault('8:00'),
  }).prefault({ 年月日: '0001年01月01日', 时间: '8:00' }),
  主角: BaseCharacterSchema.extend({
    姓名: z.string().prefault(''),
    物品列表: z.record(z.string().describe('物品名称'), z.object({
      description: z.string().prefault(''),
      quantity: z.coerce.number().prefault(1),
    })).prefault({}),
    死亡回溯计数: z.coerce.number().prefault(0),
  }).prefault({}),
  关系列表: z.record(z.string().describe('角色姓名'), BaseCharacterSchema.extend({
    姓名: z.string(),
    性别: z.string().prefault(''),
    外貌: z.string().prefault(''),
    关系描述: z.string().prefault(''),
    好感度: z.coerce.number().prefault(0),
    对你态度: z.string().prefault(''),
    所处地点: z.string().prefault(''),
  })).prefault({}),
  敌人列表: z.record(z.string().describe('敌人姓名或类型'), BaseCharacterSchema.extend({
    姓名: z.string(),
    性别: z.string().prefault(''),
    外貌: z.string().prefault(''),
    敌人描述: z.string().prefault(''),
  })).prefault({}),
  任务列表: z.record(z.string().describe('任务名'), z.object({
    描述: z.string().prefault(''),
    是否完成: z.boolean().prefault(false),
  })).prefault({}),
});
