
import React from 'react';
import { Calendar } from 'lucide-react';
import { Event } from '@/data/types';
import { Button } from '@/components/ui/button';

interface PlanningTabContentProps {
  planningEvents: Event[];
  handleEventClick: (event: Event) => void;
}

const PlanningTabContent: React.FC<PlanningTabContentProps> = ({ planningEvents, handleEventClick }) => {
  return (
    <section>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-meituan-blue flex items-center">
          <Calendar className="h-5 w-5 mr-2" />
          赛事规划
        </h2>
        <button className="text-sm text-meituan-blue hover:underline">
          更多规划
        </button>
      </div>
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h3 className="font-bold mb-4">近期赛事日历</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {planningEvents.map(event => (
            <div 
              key={`planning-${event.id}`} 
              className="border border-gray-100 rounded-lg overflow-hidden hover:border-meituan-orange transition-colors"
              onClick={() => handleEventClick(event)}
            >
              <div className="bg-meituan-blue text-white text-center py-2">
                <p className="text-xs">赛事日期</p>
                <p className="font-bold">{event.date}</p>
              </div>
              <div className="p-4">
                <h3 className="font-medium text-meituan-darkGray line-clamp-2">{event.title}</h3>
                <p className="text-xs text-gray-500 mt-2">{event.location}</p>
                <div className="flex justify-between items-center mt-3">
                  <span className="text-xs bg-meituan-orange/10 text-meituan-orange px-2 py-0.5 rounded-full">
                    制定行程
                  </span>
                  <button className="text-xs text-meituan-blue">添加提醒</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6">
          <h3 className="font-bold mb-4">个性化建议</h3>
          <div className="bg-meituan-gray/30 rounded-lg p-4">
            <div className="flex items-start">
              <div className="p-2 bg-meituan-blue/10 rounded-full mr-3">
                <Calendar className="h-5 w-5 text-meituan-blue" />
              </div>
              <div>
                <h4 className="font-medium">赛前准备计划</h4>
                <p className="text-sm text-gray-600 mt-1">
                  根据您参加的北京国际马拉松赛，我们为您定制了4周训练计划、营养方案和装备清单。
                </p>
                <Button 
                  className="mt-3 text-sm bg-meituan-blue text-white px-4 py-1 rounded-full"
                >
                  查看详情
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlanningTabContent;
