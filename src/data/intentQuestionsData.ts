
import { IntentQuestion } from './types';

export const intentQuestions: IntentQuestion[] = [
  {
    id: 1,
    text: "您是否有明确的参赛/观赛计划？",
    options: [
      { text: "有具体日期", value: 'high' },
      { text: "正在考虑", value: 'medium' },
      { text: "随便看看", value: 'low' }
    ]
  },
  {
    id: 2,
    text: "您近期搜索过哪些赛事相关内容？",
    options: [
      { text: "赛事报名", value: 'high' },
      { text: "装备购买", value: 'medium' },
      { text: "攻略浏览", value: 'low' }
    ]
  },
  {
    id: 3,
    text: "您参加过体育赛事吗？",
    options: [
      { text: "经常参加", value: 'high' },
      { text: "偶尔参加", value: 'medium' },
      { text: "从未参加", value: 'low' }
    ]
  }
];
