
import React from 'react';
import { Star } from 'lucide-react';
import { Event } from '@/data/types';

interface PopularTabContentProps {
  popularEvents: Event[];
  handleEventClick: (event: Event) => void;
}

const PopularTabContent: React.FC<PopularTabContentProps> = ({ popularEvents, handleEventClick }) => {
  return (
    <section>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-meituan-blue flex items-center">
          <Star className="h-5 w-5 mr-2" />
          热门推荐
        </h2>
        <button className="text-sm text-meituan-blue hover:underline">
          查看全部
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {popularEvents.map(event => (
          <div 
            key={`popular-${event.id}`}
            onClick={() => handleEventClick(event)}
            className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
          >
            <img 
              src={event.image} 
              alt={event.title}
              className="w-full h-32 object-cover"
            />
            <div className="p-3">
              <h3 className="font-medium text-meituan-darkGray truncate">{event.title}</h3>
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs bg-meituan-gray text-meituan-blue px-2 py-1 rounded-full">
                  热度 {event.intentScore}%
                </span>
                <span className="text-xs text-gray-500">{event.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-8">
        <h3 className="text-lg font-bold mb-4">全民热搜榜</h3>
        <div className="bg-white rounded-xl p-4">
          {[
            { rank: 1, title: "北京国际马拉松赛", trend: "上升", views: "128.5万" },
            { rank: 2, title: "NBA季后赛", trend: "持平", views: "93.2万" },
            { rank: 3, title: "环法自行车赛", trend: "上升", views: "76.8万" },
            { rank: 4, title: "世界杯预选赛", trend: "下降", views: "65.4万" },
            { rank: 5, title: "全国羽毛球锦标赛", trend: "上升", views: "52.1万" }
          ].map(item => (
            <div key={item.rank} className="flex items-center py-3 border-b last:border-0">
              <span className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${
                item.rank <= 3 ? 'bg-meituan-orange text-white' : 'bg-meituan-gray text-meituan-darkGray'
              }`}>{item.rank}</span>
              <div className="flex-1">
                <p className="font-medium">{item.title}</p>
              </div>
              <div className="text-right">
                <span className={`text-xs ${
                  item.trend === "上升" ? "text-red-500" : 
                  item.trend === "下降" ? "text-green-500" : "text-gray-500"
                }`}>{item.trend}</span>
                <p className="text-sm text-gray-500">{item.views}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularTabContent;
