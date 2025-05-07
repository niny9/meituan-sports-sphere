
import { Calendar, Flag, Map, MapPin, Star, Ticket, TrendingUp, Users } from "lucide-react";

export interface Event {
  id: string;
  title: string;
  category: string;
  date: string;
  location: string;
  imageUrl: string;
  popularity: number; // 1-100
  intentScore: number; // 1-100, higher means stronger user intent
}

export interface Service {
  id: string;
  type: 'food' | 'accommodation' | 'transportation' | 'entertainment';
  title: string;
  description: string;
  price: string;
  rating: number;
  distance: string;
  imageUrl: string;
}

export interface IntentCategory {
  id: string;
  name: string;
  description: string;
  icon: any;
}

export const events: Event[] = [
  {
    id: '1',
    title: '北京国际马拉松',
    category: '马拉松',
    date: '2025-09-15',
    location: '北京市天安门广场',
    imageUrl: 'https://picsum.photos/id/1081/600/400',
    popularity: 95,
    intentScore: 85
  },
  {
    id: '2',
    title: 'CBA 北京首钢 vs 广东宏远',
    category: '篮球',
    date: '2025-06-10',
    location: '北京五棵松体育馆',
    imageUrl: 'https://picsum.photos/id/1071/600/400',
    popularity: 88,
    intentScore: 70
  },
  {
    id: '3',
    title: '中超联赛：北京国安 vs 上海申花',
    category: '足球',
    date: '2025-07-20',
    location: '北京工人体育场',
    imageUrl: 'https://picsum.photos/id/1084/600/400',
    popularity: 82,
    intentScore: 75
  },
  {
    id: '4',
    title: '杭州亚运会',
    category: '综合运动会',
    date: '2025-08-05',
    location: '杭州奥体中心',
    imageUrl: 'https://picsum.photos/id/1067/600/400',
    popularity: 90,
    intentScore: 60
  },
  {
    id: '5',
    title: 'ATP中国网球公开赛',
    category: '网球',
    date: '2025-10-03',
    location: '国家网球中心',
    imageUrl: 'https://picsum.photos/id/1072/600/400',
    popularity: 75,
    intentScore: 65
  },
  {
    id: '6',
    title: '环海南岛自行车赛',
    category: '自行车',
    date: '2025-11-25',
    location: '海南省环岛赛道',
    imageUrl: 'https://picsum.photos/id/1076/600/400',
    popularity: 70,
    intentScore: 55
  }
];

export const services: Record<string, Service[]> = {
  '1': [
    {
      id: 's1',
      type: 'food',
      title: '能量补给站',
      description: '专为马拉松选手准备的能量餐，富含碳水和蛋白质',
      price: '¥88/人',
      rating: 4.8,
      distance: '500米',
      imageUrl: 'https://picsum.photos/id/292/200/200'
    },
    {
      id: 's2',
      type: 'accommodation',
      title: '赛事选手酒店',
      description: '距离比赛起点仅5分钟步行，提供早餐及赛事接送',
      price: '¥580/晚',
      rating: 4.7,
      distance: '0.8公里',
      imageUrl: 'https://picsum.photos/id/164/200/200'
    },
    {
      id: 's3',
      type: 'transportation',
      title: '赛事专车',
      description: '从市区到赛事起点的专线服务，避免拥堵',
      price: '¥60/趟',
      rating: 4.5,
      distance: '市区各点',
      imageUrl: 'https://picsum.photos/id/1072/200/200'
    },
    {
      id: 's4',
      type: 'entertainment',
      title: '赛后放松按摩',
      description: '专业运动按摩，帮助肌肉恢复',
      price: '¥239/次',
      rating: 4.9,
      distance: '1.2公里',
      imageUrl: 'https://picsum.photos/id/437/200/200'
    }
  ],
  // More services for other events...
};

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

export const naviMenuItems = [
  {
    id: 'events',
    title: '赛事发现',
    icon: Ticket
  },
  {
    id: 'nearby',
    title: '附近赛事',
    icon: MapPin
  },
  {
    id: 'popular',
    title: '热门推荐',
    icon: TrendingUp
  },
  {
    id: 'planning',
    title: '赛事规划',
    icon: Map
  },
  {
    id: 'groups',
    title: '运动社群',
    icon: Users
  }
];

export const aiSuggestions = [
  "查看北京国际马拉松比赛日的住宿推荐",
  "帮我规划前往五棵松体育馆的交通方案",
  "推荐赛后适合团队聚餐的餐厅",
  "我需要参加马拉松的训练计划"
];
