
import { Ticket, MapPin, TrendingUp, Map, Users } from "lucide-react";
import { NaviMenuItem } from "./types";

export const naviMenuItems: NaviMenuItem[] = [
  {
    id: 'events',
    title: '赛事发现',
    icon: Ticket,
    features: ['个性化推荐', '热门赛事', '最新动态']
  },
  {
    id: 'nearby',
    title: '附近赛事',
    icon: MapPin,
    features: ['地理位置筛选', '实时距离计算', '路线规划']
  },
  {
    id: 'popular',
    title: '热门推荐',
    icon: TrendingUp,
    features: ['大数据分析', '用户行为预测', '精准推荐']
  },
  {
    id: 'planning',
    title: '赛事规划',
    icon: Map,
    features: ['个性化行程', '全链路服务', '智能提醒']
  },
  {
    id: 'groups',
    title: '运动社群',
    icon: Users,
    features: ['兴趣匹配', '活动参与', '社交互动']
  }
];
