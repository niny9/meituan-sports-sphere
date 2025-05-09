
import React, { useState, useEffect } from 'react';
import { Event } from '@/data';
import { Calendar, UtensilsCrossed, Clock, Ticket } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';

interface EventPlanningTabProps {
  event: Event;
}

interface PlanData {
  preparation: string[];
  eventDay: string[];
}

const EventPlanningTab: React.FC<EventPlanningTabProps> = ({ event }) => {
  const [planData, setPlanData] = useState<PlanData | null>(null);

  const handleCreatePlan = () => {
    toast({
      title: "规划已创建",
      description: "已为您创建赛事规划，可在'赛事规划'中查看",
    });
  };

  useEffect(() => {
    // Dynamic content loading based on event type
    // In a real app, this would be an API call
    const mockPlanData = {
      '马拉松': {
        preparation: ['能量补给', '马拉松装备', '体能训练'],
        eventDay: ['集合时间', '补给站', '完赛奖励']
      },
      '足球': {
        preparation: ['门票购买', '交通规划', '观赛装备'],
        eventDay: ['入场时间', '补给站', '餐饮推荐']
      },
      '篮球': {
        preparation: ['球馆信息', '比赛时间', '球队阵容'],
        eventDay: ['现场活动', '明星球员', '赛后聚会']
      }
    };
    
    // Determine event type from title or category
    const eventType = event.title.includes('马拉松') ? '马拉松' : 
                      event.title.includes('足球') ? '足球' : 
                      event.title.includes('篮球') ? '篮球' : '通用';
    
    // Set plan data based on event type or use default
    setPlanData(mockPlanData[eventType as keyof typeof mockPlanData] || {
      preparation: ['赛事准备', '交通规划', '装备准备'],
      eventDay: ['赛事时间', '地点导航', '相关活动']
    });
  }, [event]);

  return (
    <>
      <div className="mb-6">
        <Card className="mb-4 bg-gradient-to-r from-orange-50 to-yellow-50 border-none shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-start">
              <div className="mr-3 mt-1 bg-white p-2 rounded-full">
                <Calendar className="h-5 w-5 text-meituan-orange" />
              </div>
              <div>
                <h3 className="text-meituan-blue font-medium mb-1">嗨赛智荐 | 赛事参与规划</h3>
                <p className="text-sm text-gray-600">
                  根据您的偏好和赛事特点，我们为您制定个性化的赛事参与计划，包括行程安排、服务预订等。
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Dynamic plan content based on event type */}
      {planData && (
        <>
          <div className="bg-white rounded-xl shadow-sm border p-4 mb-4">
            <h3 className="font-medium text-meituan-blue mb-3">赛前准备 (赛事前3天)</h3>
            <div className="space-y-3">
              {planData.preparation.map((item: string, index: number) => (
                <div key={index} className="flex items-center">
                  <UtensilsCrossed className={`h-4 w-4 mr-2 ${
                    index % 3 === 0 ? 'text-meituan-orange' :
                    index % 3 === 1 ? 'text-meituan-blue' : 'text-green-500'
                  }`} />
                  <span className="text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border p-4 mb-6">
            <h3 className="font-medium text-meituan-blue mb-3">赛事当天</h3>
            <div className="space-y-3">
              {planData.eventDay.map((item: string, index: number) => (
                <div key={index} className="flex items-center">
                  <Clock className={`h-4 w-4 mr-2 ${
                    index % 3 === 0 ? 'text-meituan-orange' :
                    index % 3 === 1 ? 'text-meituan-blue' : 'text-green-500'
                  }`} />
                  <span className="text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      <div className="bg-white rounded-xl shadow-sm border p-4 mb-6">
        <h3 className="font-medium text-meituan-blue mb-3">赛后服务</h3>
        <div className="space-y-3">
          <div className="flex items-center">
            <UtensilsCrossed className="h-4 w-4 text-green-500 mr-2" />
            <span className="text-sm">赛后恢复餐 - 参赛者专享</span>
          </div>
          <div className="flex items-center">
            <Ticket className="h-4 w-4 text-purple-500 mr-2" />
            <span className="text-sm">赛后娱乐活动 - 可选</span>
          </div>
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
  );
};

export default EventPlanningTab;
