
import { Service } from "./types";

// 包含地域特性的服务数据
export const services: Record<string, Service[]> = {
  '1': [ // 北京国际马拉松
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
      discount: '参赛者享8折优惠',
      region: '北京',
      regionFeatures: ['提供特色北京小吃', '可容纳大型团队']
    },
    {
      id: 's2',
      type: 'accommodation',
      title: '赛事选手酒店',
      description: '距离天安门广场起点仅5分钟步行，提供早餐及赛事接送',
      price: '¥580/晚',
      rating: 4.7,
      distance: '0.8公里',
      imageUrl: 'https://picsum.photos/id/164/200/200',
      availability: '赛事期间余房紧张',
      features: ['免费接驳车', '赛事资讯', '健身设施'],
      discount: '提前30天预订享9折优惠',
      region: '北京',
      regionFeatures: ['毗邻故宫', '地铁1号线附近', '历史建筑群']
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
      discount: '团体预订享8.5折',
      region: '北京',
      regionFeatures: ['熟悉北京交通路况', '可绕行拥堵路段', '提供市区地标介绍']
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
      discount: '参赛完成者享首次8.8折',
      region: '北京',
      regionFeatures: ['传统中医推拿', '提供当地特色茶饮', '可安排四合院体验']
    }
  ],
  '2': [ // CBA 北京首钢 vs 广东宏远 - 北京特色
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
      discount: '持票观众享9折优惠',
      region: '北京',
      regionFeatures: ['北京卤煮火烧小吃', '首钢主题装饰', '工业风设计']
    },
    {
      id: 's6',
      type: 'accommodation',
      title: '五棵松体育馆旁酒店',
      description: '五棵松体育馆旁高级酒店，步行可达比赛场地',
      price: '¥680/晚',
      rating: 4.8,
      distance: '300米',
      imageUrl: 'https://picsum.photos/id/430/200/200',
      features: ['豪华客房', '健身中心', '商务中心'],
      discount: '连住3晚以上享8.5折',
      region: '北京',
      regionFeatures: ['周边商圈便利', '海淀区地标', '科技企业云集']
    },
    {
      id: 's7',
      type: 'transportation',
      title: '北京地铁+赛事接驳',
      description: '从各主要地铁站到五棵松体育馆的接驳服务',
      price: '¥20/人',
      rating: 4.4,
      distance: '各地铁站',
      imageUrl: 'https://picsum.photos/id/1071/200/200',
      availability: '比赛日当天提供',
      features: ['准点发车', '避免拥堵', '安全舒适'],
      discount: '5人以上团体票8折',
      region: '北京',
      regionFeatures: ['覆盖1/10号线', '北京公交专线', '电子支付便捷']
    }
  ],
  '3': [ // 中超联赛：北京国安 vs 上海申花 - 两地特色
    {
      id: 's8',
      type: 'food',
      title: '京沪球迷美食广场',
      description: '集合北京与上海两地特色美食的主题餐厅',
      price: '¥158/人',
      rating: 4.7,
      distance: '400米',
      imageUrl: 'https://picsum.photos/id/429/200/200',
      availability: '比赛日座位有限',
      features: ['两地特色菜', '足球主题装饰', '大屏直播'],
      discount: '球衣穿戴可享85折',
      region: '北京',
      regionFeatures: ['烤鸭与生煎并存', '京沪球迷交流区', '国安绿主题区']
    },
    {
      id: 's9',
      type: 'entertainment',
      title: '赛后球迷派对',
      description: '工体周边特色酒吧，提供赛后狂欢活动',
      price: '¥198/人起',
      rating: 4.5,
      distance: '800米',
      imageUrl: 'https://picsum.photos/id/425/200/200',
      availability: '比赛日当晚',
      features: ['现场乐队', '足球互动游戏', '球星见面会'],
      discount: '赢球当天额外优惠',
      region: '北京',
      regionFeatures: ['三里屯夜生活圈', '工人体育场特色', '国际化氛围']
    }
  ],
  '4': [ // 杭州亚运会 - 浙江杭州特色
    {
      id: 's10',
      type: 'food',
      title: '西湖醋鱼主题餐厅',
      description: '亚运特供杭帮菜，体验地道杭州美食',
      price: '¥168/人',
      rating: 4.9,
      distance: '1公里',
      imageUrl: 'https://picsum.photos/id/428/200/200',
      availability: '建议提前预订',
      features: ['杭帮菜系', '亚运主题', '湖景位置'],
      discount: '亚运志愿者7折优惠',
      region: '杭州',
      regionFeatures: ['西湖景观', '茶文化体验', '江南水乡特色']
    }
  ],
  '5': [ // ATP中国网球公开赛 - 北京特色
    {
      id: 's11',
      type: 'accommodation',
      title: '国家网球中心酒店',
      description: '赛事官方合作酒店，可能与参赛选手同住',
      price: '¥1280/晚',
      rating: 4.8,
      distance: '50米',
      imageUrl: 'https://picsum.photos/id/427/200/200',
      availability: '赛事期间紧俏',
      features: ['球员餐厅', '网球场景观房', '赛事直通车'],
      discount: '早鸟价9折优惠',
      region: '北京',
      regionFeatures: ['奥林匹克公园区域', '鸟巢水立方周边', '现代化设施']
    }
  ],
  '6': [ // 环海南岛自行车赛 - 海南特色
    {
      id: 's12',
      type: 'food',
      title: '海南特色补给站',
      description: '以当地热带水果和海鲜为主的运动营养补给',
      price: '¥98/人',
      rating: 4.7,
      distance: '沿途设点',
      imageUrl: 'https://picsum.photos/id/426/200/200',
      availability: '赛事期间提供',
      features: ['热带水果', '椰子补水', '当地海鲜'],
      discount: '参赛选手专享价',
      region: '海南',
      regionFeatures: ['热带风情', '滨海特色', '椰子文化']
    },
    {
      id: 's13',
      type: 'accommodation',
      title: '三亚海景赛事酒店',
      description: '环岛赛官方推荐住宿，拥有绝美海景',
      price: '¥880/晚',
      rating: 4.9,
      distance: '终点附近',
      imageUrl: 'https://picsum.photos/id/424/200/200',
      availability: '需提前1个月预订',
      features: ['海景房', '自行车存放', '维修服务'],
      discount: '连住3晚立减300',
      region: '海南',
      regionFeatures: ['热带度假风', '椰林沙滩', '海南岛特色服务']
    }
  ]
};
