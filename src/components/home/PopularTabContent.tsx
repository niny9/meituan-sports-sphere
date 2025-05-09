
import React, { useState } from 'react';
import { Star, ArrowRight, Flame, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { Event } from '@/data/types';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from '@/components/ui/button';

interface PopularTabContentProps {
  popularEvents: Event[];
  handleEventClick: (event: Event) => void;
}

const PopularTabContent: React.FC<PopularTabContentProps> = ({ popularEvents, handleEventClick }) => {
  const [showAllEvents, setShowAllEvents] = useState(false);
  
  // Get top events for display
  const displayEvents = showAllEvents ? popularEvents : popularEvents.slice(0, 3);

  return (
    <section id="popular-section">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-meituan-blue flex items-center">
          <Star className="h-5 w-5 mr-2 text-[#FFD256]" />
          热门推荐
        </h2>
        <Button 
          variant="ghost" 
          className="text-sm text-meituan-blue hover:bg-meituan-blue/10 flex items-center gap-1"
          onClick={() => setShowAllEvents(!showAllEvents)}
        >
          {showAllEvents ? '收起' : '查看全部'}
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Featured event with gradient card */}
      {!showAllEvents && popularEvents.length > 0 && (
        <Card className="mb-6 overflow-hidden bg-gradient-to-r from-[#FFD256] to-[#FFB838] border-none shadow-md">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-2/5 relative">
              <img 
                src={popularEvents[0].image} 
                alt={popularEvents[0].title}
                className="w-full h-60 md:h-full object-cover"
              />
              <div className="absolute top-0 right-0 bg-[#FFD256] text-white px-3 py-1 rounded-bl-lg flex items-center">
                <Flame className="h-4 w-4 mr-1" />
                <span>最热赛事</span>
              </div>
            </div>
            <CardContent className="md:w-3/5 p-6 text-white flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-bold mb-2">{popularEvents[0].title}</h3>
                <p className="mb-4 opacity-90">{popularEvents[0].description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {popularEvents[0].tags?.map(tag => (
                    <span key={tag} className="bg-white/20 text-white px-3 py-1 rounded-full text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <p className="text-white/70 text-sm">举办地点</p>
                    <p className="font-medium">{popularEvents[0].location}</p>
                  </div>
                  <div>
                    <p className="text-white/70 text-sm">赛事日期</p>
                    <p className="font-medium">{popularEvents[0].date}</p>
                  </div>
                </div>
              </div>
              <Button 
                className="bg-white text-[#FFB838] hover:bg-white/90 w-full md:w-auto"
                onClick={() => handleEventClick(popularEvents[0])}
              >
                查看详情
              </Button>
            </CardContent>
          </div>
        </Card>
      )}

      {/* Grid of other popular events */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {displayEvents.map((event, index) => (
          <div 
            key={`popular-${event.id}`}
            onClick={() => handleEventClick(event)}
            className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer transform hover:-translate-y-1"
          >
            <div className="relative">
              <img 
                src={event.image} 
                alt={event.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-0 right-0 bg-[#FFD256] text-white px-2 py-1 text-xs rounded-bl-lg">
                热度 {event.intentScore}%
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-medium text-meituan-darkGray">{event.title}</h3>
              <div className="flex items-center justify-between mt-2">
                <span className="text-sm text-gray-500">{event.location}</span>
                <span className="text-sm text-gray-500">{event.date}</span>
              </div>
              <div className="mt-3 flex justify-between items-center">
                <div className="flex flex-wrap gap-1">
                  {event.tags?.slice(0, 2).map(tag => (
                    <span key={tag} className="bg-meituan-gray text-meituan-blue px-2 py-0.5 rounded-full text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
                <ArrowRight className="h-4 w-4 text-[#FFD256]" />
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Trending events ranking */}
      <div className="mt-8">
        <h3 className="text-lg font-bold mb-4 flex items-center">
          <TrendingUp className="h-5 w-5 mr-2 text-[#FFD256]" />
          全民热搜榜
        </h3>
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            {[
              { rank: 1, title: "北京国际马拉松赛", trend: "上升", views: "128.5万" },
              { rank: 2, title: "NBA季后赛", trend: "持平", views: "93.2万" },
              { rank: 3, title: "环法自行车赛", trend: "上升", views: "76.8万" },
              { rank: 4, title: "世界杯预选赛", trend: "下降", views: "65.4万" },
              { rank: 5, title: "全国羽毛球锦标赛", trend: "上升", views: "52.1万" }
            ].map(item => (
              <div key={item.rank} className="flex items-center py-4 px-5 border-b last:border-0 hover:bg-gray-50 cursor-pointer transition-colors">
                <span className={`w-7 h-7 rounded-full flex items-center justify-center mr-3 ${
                  item.rank <= 3 ? 'bg-[#FFD256] text-white' : 'bg-meituan-gray text-meituan-darkGray'
                }`}>{item.rank}</span>
                <div className="flex-1">
                  <p className="font-medium">{item.title}</p>
                </div>
                <div className="text-right flex items-center">
                  {item.trend === "上升" && <TrendingUp className="h-4 w-4 text-red-500 mr-1" />}
                  {item.trend === "下降" && <TrendingDown className="h-4 w-4 text-green-500 mr-1" />}
                  {item.trend === "持平" && <Minus className="h-4 w-4 text-gray-500 mr-1" />}
                  <span className={`text-xs ${
                    item.trend === "上升" ? "text-red-500" : 
                    item.trend === "下降" ? "text-green-500" : "text-gray-500"
                  }`}>{item.trend}</span>
                  <p className="text-sm text-gray-500 ml-3">{item.views}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default PopularTabContent;
