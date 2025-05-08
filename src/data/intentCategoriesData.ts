
import { Star, Flag, Calendar } from "lucide-react";
import { IntentCategory } from "./types";

export const intentCategories: IntentCategory[] = [
  {
    id: 'high',
    name: '强意图用户',
    description: '已有明确赛事参与或观看计划',
    icon: Star
  },
  {
    id: 'medium',
    name: '中等意图用户',
    description: '对赛事表现出兴趣，但尚未确定计划',
    icon: Flag
  },
  {
    id: 'low',
    name: '弱意图用户',
    description: '曾浏览相关内容，但无明确意图',
    icon: Calendar
  }
];
