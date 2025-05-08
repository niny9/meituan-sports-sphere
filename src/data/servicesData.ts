
import { Service } from "./types";

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
  ]
};
