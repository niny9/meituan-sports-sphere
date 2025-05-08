import { Calendar, Flag, Map, MapPin, Star, Ticket, TrendingUp, Users } from "lucide-react";

export interface Event {
  id: string;
  title: string;
  category: string;
  date: string;
  location: string;
  image: string;  // Changed from imageUrl to image
  description: string;  // Added description
  popularity: number; // 1-100
  intentScore: number; // 1-100, higher means stronger user intent
  latitude?: number; // For geolocation features
  longitude?: number; // For geolocation features
  nearbyServices?: boolean; // Indicator if event has nearby service recommendations
  tags: string[];  // Added tags
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
  availability?: string; // Added for service availability information
  features?: string[]; // Added for highlighting special features
  discount?: string; // Added for discount information
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
    image: 'https://picsum.photos/id/1081/600/400',
    description: '北京国际马拉松是中国最具影响力的马拉松赛事之一，路线经过天安门、故宫等北京地标建筑。',
    popularity: 95,
    intentScore: 85,
    latitude: 39.9042,
    longitude: 116.4074,
    nearbyServices: true,
    tags: ['推荐', '马拉松', '国际赛事']
  },
  {
    id: '2',
    title: 'CBA 北京首钢 vs 广东宏远',
    category: '篮球',
    date: '2025-06-10',
    location: '北京五棵松体育馆',
    image: 'https://picsum.photos/id/1071/600/400',
    description: 'CBA联赛强队对决，北京首钢主场迎战卫冕冠军广东宏远。',
    popularity: 88,
    intentScore: 70,
    latitude: 39.9125,
    longitude: 116.2747,
    nearbyServices: true,
    tags: ['篮球', 'CBA', '对决']
  },
  {
    id: '3',
    title: '中超联赛：北京国安 vs 上海申花',
    category: '足球',
    date: '2025-07-20',
    location: '北京工人体育场',
    image: 'https://picsum.photos/id/1084/600/400',
    description: '中超联赛焦点战，北京国安对阵上海申花，两支老牌劲旅的对决。',
    popularity: 82,
    intentScore: 75,
    latitude: 39.9339,
    longitude: 116.4452,
    nearbyServices: true,
    tags: ['推荐', '足球', '中超']
  },
  {
    id: '4',
    title: '杭州亚运会',
    category: '综合运动会',
    date: '2025-08-05',
    location: '杭州奥体中心',
    image: 'https://picsum.photos/id/1067/600/400',
    description: '第20届亚洲运动会，汇集亚洲各国顶尖运动员的综合性体育盛会。',
    popularity: 90,
    intentScore: 60,
    latitude: 30.2741,
    longitude: 120.1551,
    nearbyServices: true,
    tags: ['亚运会', '综合赛事', '国际赛事']
  },
  {
    id: '5',
    title: 'ATP中国网球公开赛',
    category: '网球',
    date: '2025-10-03',
    location: '国家网球中心',
    image: 'https://picsum.photos/id/1072/600/400',
    description: 'ATP巡回赛中国站，世界顶级网球选手争夺中国公开赛冠军。',
    popularity: 75,
    intentScore: 65,
    latitude: 39.9917,
    longitude: 116.3935,
    nearbyServices: false,
    tags: ['网球', 'ATP', '国际赛事']
  },
  {
    id: '6',
    title: '环海南岛自行车赛',
    category: '自行车',
    date: '2025-11-25',
    location: '海南省环岛赛道',
    image: 'https://picsum.photos/id/1076/600/400',
    description: '中国最具影响力的公路自行车赛事，选手将环绕美丽的海南岛进行比赛。',
    popularity: 70,
    intentScore: 55,
    latitude: 20.0200,
    longitude: 110.3456,
    nearbyServices: false,
    tags: ['推荐', '自行车', '环岛赛']
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
      imageUrl: 'https://picsum.photos/id/292/200/200',
      availability: '需提前1天预订',
      features: ['运动营养餐', '能量补充', '赛前准备'],
      discount: '参赛者享8折优惠'
    },
    {
      id: 's2',
      type: 'accommodation',
      title: '赛事选手酒店',
      description: '距离比赛起点仅5分钟步行，提供早餐及赛事接送',
      price: '¥580/晚',
      rating: 4.7,
      distance: '0.8公里',
      imageUrl: 'https://picsum.photos/id/164/200/200',
      availability: '赛事期间余房紧张',
      features: ['免费接驳车', '赛事资讯', '健身设施'],
      discount: '提前30天预订享9折优惠'
    },
    {
      id: 's3',
      type: 'transportation',
      title: '赛事专车',
      description: '从市区到赛事起点的专线服务，避免拥堵',
      price: '¥60/趟',
      rating: 4.5,
      distance: '市区各点',
      imageUrl: 'https://picsum.photos/id/1072/200/200',
      availability: '需提前预约',
      features: ['准时发车', '舒适空间', '行李寄存'],
      discount: '团体预订享8.5折'
    },
    {
      id: 's4',
      type: 'entertainment',
      title: '赛后放松按摩',
      description: '专业运动按摩，帮助肌肉恢复',
      price: '¥239/次',
      rating: 4.9,
      distance: '1.2公里',
      imageUrl: 'https://picsum.photos/id/437/200/200',
      availability: '建议提前预约',
      features: ['专业理疗', '运动康复', '肌肉放松'],
      discount: '参赛完成者享首次8.8折'
    }
  ],
  '2': [
    {
      id: 's5',
      type: 'food',
      title: '球迷餐吧',
      description: '篮球主题餐厅，赛前赛后的聚会首选',
      price: '¥128/人',
      rating: 4.6,
      distance: '200米',
      imageUrl: 'https://picsum.photos/id/431/200/200',
      availability: '比赛日需提前预订',
      features: ['现场直播', '球星签名墙', '特色套餐'],
      discount: '持票观众享9折优惠'
    },
    {
      id: 's6',
      type: 'accommodation',
      title: '体育馆旁酒店',
      description: '五棵松体育馆旁高级酒店，步行可达比赛场地',
      price: '¥680/晚',
      rating: 4.8,
      distance: '300米',
      imageUrl: 'https://picsum.photos/id/430/200/200',
      features: ['豪华客房', '健身中心', '商务中心'],
      discount: '连住3晚以上享8.5折'
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

export const aiSuggestions = [
  "查看北京国际马拉松比赛日的住宿推荐",
  "帮我规划前往五棵松体育馆的交通方案",
  "推荐赛后适合团队聚餐的餐厅",
  "我需要参加马拉松的训练计划",
  "查询赛事附近的停车场",
  "推荐性价比高的观赛套餐"
];
