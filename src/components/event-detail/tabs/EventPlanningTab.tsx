
import React, { useState, useEffect } from 'react';
import { Event } from '@/data';
import { Calendar, UtensilsCrossed, Clock, Ticket, Award, Star, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';

interface EventPlanningTabProps {
  event: Event;
}

interface PlanData {
  preparation?: string[];
  eventDay?: string[];
  pre_game?: {
    task: string;
    time?: string;
    vendor?: string;
    items?: string[];
    priority?: number;
    tips?: string;
    material?: string[];
  }[];
  on_site?: {
    must_do?: string[];
    avoid?: string[];
    timeline?: {
      time: string;
      action: string;
    }[];
  };
  post_event?: {
    activities: string[];
  };
}

const EventPlanningTab: React.FC<EventPlanningTabProps> = ({ event }) => {
  const [planData, setPlanData] = useState<PlanData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleCreatePlan = () => {
    toast({
      title: "规划已创建",
      description: "已为您创建赛事规划，可在'赛事规划'中查看",
    });
  };

  useEffect(() => {
    setIsLoading(true);
    
    // 模拟API调用获取赛事规划数据
    setTimeout(() => {
      // 动态内容加载基于赛事类型
      // 模拟后端数据返回
      const getEventType = () => {
        const title = event.title.toLowerCase();
        if (title.includes('马拉松')) return 'marathon';
        if (title.includes('篮球') || title.includes('cba')) return 'basketball';
        if (title.includes('足球') || title.includes('中超')) return 'soccer';
        return 'general';
      };
      
      const eventType = getEventType();
      
      const mockPlanData: Record<string, PlanData> = {
        'marathon': {
          preparation: ['能量补给', '马拉松装备', '体能训练'],
          eventDay: ['集合时间', '补给站', '完赛奖励'],
          pre_game: [
            { task: "健康体检", time: "赛前1个月", priority: 1 },
            { task: "配速练习", time: "赛前2周", priority: 2 },
            { task: "装备准备", items: ["专业跑鞋", "排汗速干衣物", "能量胶"] }
          ],
          on_site: {
            must_do: ["热身活动", "佩戴号码布", "检查芯片计时器"],
            avoid: ["尝试新装备", "暴饮暴食", "剧烈拉伸"]
          },
          post_event: {
            activities: ["拉伸放松", "补充蛋白质", "领取完赛奖牌"]
          }
        },
        'basketball': {
          pre_game: [
            { task: "购买球票", time: "赛前3天", vendor: "大麦网", priority: 1 },
            { task: "准备应援物", items: ["手幅", "球队围巾", "加油棒"], priority: 2 },
            { task: "了解球队阵容", time: "赛前1天", tips: "关注首发名单" }
          ],
          on_site: {
            must_do: ["领取球迷礼包", "参加赛前投篮游戏", "拍照留念"],
            avoid: ["携带专业相机", "穿客队球衣", "带玻璃瓶饮料"],
            timeline: [
              { time: "比赛前2小时", action: "抵达场馆" },
              { time: "比赛前90分钟", action: "现场购买周边" },
              { time: "比赛前30分钟", action: "观看球员热身" }
            ]
          },
          post_event: {
            activities: ["参加球星见面会", "尝试场馆周边美食", "分享赛事照片"]
          }
        },
        'soccer': {
          pre_game: [
            { task: "关注阵容", time: "赛前1周", tips: "留意伤停情况" },
            { task: "订购球票", time: "赛前5天", vendor: "足球之家APP" },
            { task: "规划交通路线", time: "赛前1天", tips: "地铁8号线直达" }
          ],
          on_site: {
            must_do: ["参加球迷嘉年华", "合影队旗", "加入助威区"],
            avoid: ["携带超大旗帜", "大声吹哨", "穿对手球衣"],
            timeline: [
              { time: "比赛前3小时", action: "到达球场外广场" },
              { time: "比赛前1小时", action: "入场找座位" },
              { time: "比赛后", action: "有序离场" }
            ]
          },
          post_event: {
            activities: ["等待球员出口", "收集比赛门票", "分享观赛体验"]
          }
        },
        'general': {
          preparation: ['赛事准备', '交通规划', '装备准备'],
          eventDay: ['赛事时间', '地点导航', '相关活动'],
          pre_game: [
            { task: "了解赛事规则", time: "赛前1周" },
            { task: "准备观赛装备", items: ["望远镜", "便携座椅"] }
          ],
          on_site: {
            must_do: ["遵守场馆规定", "保管好随身物品", "关注比赛动态"],
            avoid: ["使用闪光灯", "干扰运动员", "随意走动"]
          }
        }
      };
      
      // 设置赛事类型对应的规划数据
      setPlanData(mockPlanData[eventType] || mockPlanData.general);
      setIsLoading(false);
      
    }, 500); // 模拟加载时间
  }, [event]);

  // 根据赛事类型生成顶部渲染图标
  const getEventIcon = () => {
    const title = event.title.toLowerCase();
    if (title.includes('马拉松')) return <Calendar className="h-5 w-5 text-meituan-orange" />;
    if (title.includes('篮球') || title.includes('cba')) return <Star className="h-5 w-5 text-meituan-orange" />;
    if (title.includes('足球') || title.includes('中超')) return <MapPin className="h-5 w-5 text-meituan-orange" />;
    return <Calendar className="h-5 w-5 text-meituan-orange" />;
  };

  // 生成本地化赛事名称
  const getLocalizedEventName = () => {
    const title = event.title;
    return title;
  };

  return (
    <>
      <div className="mb-6">
        <Card className="mb-4 bg-gradient-to-r from-orange-50 to-yellow-50 border-none shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-start">
              <div className="mr-3 mt-1 bg-white p-2 rounded-full">
                {getEventIcon()}
              </div>
              <div>
                <h3 className="text-meituan-blue font-medium mb-1">嗨赛智荐 | {getLocalizedEventName()}参与规划</h3>
                <p className="text-sm text-gray-600">
                  根据您的偏好和赛事特点，我们为您制定个性化的赛事参与计划，包括行程安排、服务预订等。
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-10">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-meituan-orange"></div>
        </div>
      ) : planData ? (
        <>
          {/* 赛前准备部分 */}
          <div className="bg-white rounded-xl shadow-sm border p-4 mb-4">
            <h3 className="font-medium text-meituan-blue mb-3">赛前准备</h3>
            <div className="space-y-3">
              {planData.pre_game ? (
                planData.pre_game.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <UtensilsCrossed className={`h-4 w-4 mr-2 ${
                        index % 3 === 0 ? 'text-meituan-orange' :
                        index % 3 === 1 ? 'text-meituan-blue' : 'text-green-500'
                      }`} />
                      <span className="text-sm">{item.task}</span>
                    </div>
                    {item.time && <span className="text-xs text-gray-500">{item.time}</span>}
                  </div>
                ))
              ) : planData.preparation ? (
                planData.preparation.map((item: string, index: number) => (
                  <div key={index} className="flex items-center">
                    <UtensilsCrossed className={`h-4 w-4 mr-2 ${
                      index % 3 === 0 ? 'text-meituan-orange' :
                      index % 3 === 1 ? 'text-meituan-blue' : 'text-green-500'
                    }`} />
                    <span className="text-sm">{item}</span>
                  </div>
                ))
              ) : null}
            </div>
          </div>

          {/* 赛事当天部分 */}
          <div className="bg-white rounded-xl shadow-sm border p-4 mb-4">
            <h3 className="font-medium text-meituan-blue mb-3">赛事当天</h3>
            <div className="space-y-3">
              {planData.on_site?.timeline ? (
                planData.on_site.timeline.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Clock className={`h-4 w-4 mr-2 ${
                        index % 3 === 0 ? 'text-meituan-orange' :
                        index % 3 === 1 ? 'text-meituan-blue' : 'text-green-500'
                      }`} />
                      <span className="text-sm">{item.action}</span>
                    </div>
                    <span className="text-xs bg-meituan-orange/10 px-2 py-1 rounded-full">
                      {item.time}
                    </span>
                  </div>
                ))
              ) : planData.eventDay ? (
                planData.eventDay.map((item: string, index: number) => (
                  <div key={index} className="flex items-center">
                    <Clock className={`h-4 w-4 mr-2 ${
                      index % 3 === 0 ? 'text-meituan-orange' :
                      index % 3 === 1 ? 'text-meituan-blue' : 'text-green-500'
                    }`} />
                    <span className="text-sm">{item}</span>
                  </div>
                ))
              ) : null}
            </div>
          </div>

          {/* 注意事项部分 */}
          {planData.on_site?.avoid && (
            <div className="bg-white rounded-xl shadow-sm border p-4 mb-4">
              <h3 className="font-medium text-meituan-blue mb-3">注意事项</h3>
              <div className="space-y-3">
                {planData.on_site.avoid.map((item, index) => (
                  <div key={index} className="flex items-center">
                    <svg className="h-4 w-4 text-red-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 赛后服务部分 */}
          <div className="bg-white rounded-xl shadow-sm border p-4 mb-6">
            <h3 className="font-medium text-meituan-blue mb-3">赛后服务</h3>
            <div className="space-y-3">
              {planData.post_event?.activities ? (
                planData.post_event.activities.map((item, index) => (
                  <div key={index} className="flex items-center">
                    <UtensilsCrossed className={`h-4 w-4 ${
                      index % 3 === 0 ? 'text-green-500' :
                      index % 3 === 1 ? 'text-purple-500' : 'text-meituan-blue'
                    } mr-2`} />
                    <span className="text-sm">{item}</span>
                  </div>
                ))
              ) : (
                <>
                  <div className="flex items-center">
                    <UtensilsCrossed className="h-4 w-4 text-green-500 mr-2" />
                    <span className="text-sm">赛后恢复餐 - 参赛者专享</span>
                  </div>
                  <div className="flex items-center">
                    <Ticket className="h-4 w-4 text-purple-500 mr-2" />
                    <span className="text-sm">赛后娱乐活动 - 可选</span>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="flex justify-center">
            <button 
              onClick={handleCreatePlan}
              className="bg-gradient-to-r from-[#FFD256] to-[#FFB838] text-white px-6 py-3 rounded-lg shadow-md hover:opacity-90 transition"
            >
              为我创建个性化赛事规划
            </button>
          </div>
        </>
      ) : (
        <div className="text-center py-10 text-gray-500">
          暂无赛事规划数据
        </div>
      )}
    </>
  );
};

export default EventPlanningTab;
