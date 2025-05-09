
import React from 'react';
import { Calendar, ChevronRight, Clock, MapPin, Users, Award } from 'lucide-react';
import { Event } from '@/data/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

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
        <button className="text-sm text-meituan-blue hover:underline flex items-center">
          更多规划
          <ChevronRight className="h-4 w-4 ml-1" />
        </button>
      </div>
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h3 className="font-bold mb-4 flex items-center">
          <Calendar className="h-4 w-4 mr-2 text-meituan-orange" />
          近期赛事日历
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {planningEvents.map(event => (
            <Card 
              key={`planning-${event.id}`} 
              className="border border-gray-100 overflow-hidden hover:border-meituan-orange transition-colors cursor-pointer"
              onClick={() => handleEventClick(event)}
            >
              <div className="bg-gradient-to-r from-meituan-blue to-meituan-blue/80 text-white text-center py-3 relative">
                <p className="text-xs uppercase tracking-wide opacity-80">赛事日期</p>
                <p className="font-bold text-lg">{event.date}</p>
                
                <div className="absolute top-3 right-3 bg-white/20 rounded-full p-1">
                  <Award className="h-4 w-4" />
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="font-medium text-meituan-darkGray line-clamp-2">{event.title}</h3>
                <div className="flex items-center mt-2 text-xs text-gray-500">
                  <MapPin className="h-3 w-3 mr-1" /> 
                  {event.location}
                </div>
                <div className="flex justify-between items-center mt-3">
                  <span className="text-xs bg-meituan-orange/10 text-meituan-orange px-2 py-0.5 rounded-full">
                    制定行程
                  </span>
                  <button className="text-xs text-meituan-blue flex items-center">
                    添加提醒
                    <Clock className="h-3 w-3 ml-1" />
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-8">
          <h3 className="font-bold mb-4 flex items-center">
            <Users className="h-4 w-4 mr-2 text-meituan-blue" />
            个性化建议
          </h3>
          
          <Card className="bg-gradient-to-br from-meituan-gray/30 to-meituan-gray/10 border-0">
            <CardContent className="p-6">
              <div className="flex items-start">
                <div className="p-3 bg-meituan-blue/10 rounded-full mr-4 shrink-0">
                  <Calendar className="h-6 w-6 text-meituan-blue" />
                </div>
                <div>
                  <CardTitle className="text-lg font-medium mb-2">赛前准备计划</CardTitle>
                  <CardDescription className="text-gray-600">
                    根据您参加的北京国际马拉松赛，我们为您定制了4周训练计划、营养方案和装备清单。
                  </CardDescription>
                  <div className="mt-4 grid grid-cols-3 gap-2">
                    <div className="bg-white p-2 rounded-md text-center">
                      <div className="text-meituan-orange text-xl font-bold">4</div>
                      <div className="text-xs text-gray-500">周训练</div>
                    </div>
                    <div className="bg-white p-2 rounded-md text-center">
                      <div className="text-meituan-orange text-xl font-bold">12</div>
                      <div className="text-xs text-gray-500">营养餐</div>
                    </div>
                    <div className="bg-white p-2 rounded-md text-center">
                      <div className="text-meituan-orange text-xl font-bold">8</div>
                      <div className="text-xs text-gray-500">装备清单</div>
                    </div>
                  </div>
                  <Button 
                    className="mt-4 bg-meituan-blue text-white hover:bg-meituan-blue/90"
                  >
                    查看详情
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Additional personalized recommendation */}
          <Card className="mt-4 border border-dashed border-meituan-blue/30 bg-meituan-blue/5">
            <CardHeader>
              <CardTitle className="text-sm font-medium flex items-center">
                <Award className="h-4 w-4 mr-2 text-meituan-blue" />
                赛事成就目标
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="text-xs text-gray-500 mb-1">完成进度</div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-meituan-blue to-meituan-orange h-2 rounded-full" 
                      style={{width: '65%'}}
                    ></div>
                  </div>
                </div>
                <span className="text-lg font-bold ml-3 text-meituan-blue">65%</span>
              </div>
            </CardContent>
            <CardFooter className="text-xs text-gray-600">
              距离您的首个马拉松完赛奖章还差1场比赛
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default PlanningTabContent;
