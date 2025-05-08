
import React from 'react';
import { Event, Service, IntentLevel } from '../../data/types';
import { events, services } from '../../data';
import EventCard from '../EventCard';
import ServiceRecommendation from '../ServiceRecommendation';

interface IntentBasedRecommendationProps {
  intentLevel: IntentLevel;
  onEventClick: (event: Event) => void;
}

const IntentBasedRecommendation: React.FC<IntentBasedRecommendationProps> = ({ intentLevel, onEventClick }) => {
  const getFilteredEvents = (): Event[] => {
    switch (intentLevel) {
      case 'high':
        // High intent users get upcoming events with registration deadlines
        return events
          .filter(event => event.intentScore > 75)
          .slice(0, 3);
      case 'medium':
        // Medium intent users get popular events
        return events
          .filter(event => event.intentScore > 50 && event.intentScore <= 75)
          .slice(0, 3);
      case 'low':
        // Low intent users get introductory/popular events
        return events
          .filter(event => event.intentScore <= 50)
          .slice(0, 3);
      default:
        // Default recommendation for users without intent level
        return events.slice(0, 3);
    }
  };

  const getRelevantServices = (): Service[] => {
    // Get all services by flattening the services object values
    const allServices = Object.values(services).flat();
    
    switch (intentLevel) {
      case 'high':
        // High intent users get registration services, accommodations
        return allServices.filter(s => ['accommodation', 'transportation'].includes(s.type)).slice(0, 2);
      case 'medium':
        // Medium intent users get equipment rentals, guides
        return allServices.filter(s => ['entertainment'].includes(s.type)).slice(0, 2);
      case 'low':
        // Low intent users get introductory information
        return allServices.filter(s => ['food'].includes(s.type)).slice(0, 2);
      default:
        return allServices.slice(0, 2);
    }
  };

  const recommendedEvents = getFilteredEvents();
  const recommendedServices = getRelevantServices();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-meituan-blue mb-4">
          {intentLevel === 'high' 
            ? '您的专属赛事推荐' 
            : intentLevel === 'medium'
              ? '热门赛事推荐'
              : '发现体育赛事'}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recommendedEvents.map(event => (
            <EventCard 
              key={event.id} 
              event={event} 
              onClick={onEventClick}
            />
          ))}
        </div>
      </div>

      {intentLevel === 'high' && (
        <div>
          <h2 className="text-xl font-bold text-meituan-blue mb-4">赛事配套服务</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recommendedServices.map(service => (
              <ServiceRecommendation key={service.id} service={service} />
            ))}
          </div>
        </div>
      )}

      {intentLevel === 'medium' && (
        <div className="bg-white p-6 rounded-xl">
          <h2 className="text-lg font-bold mb-4">即将截止报名</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 border-b">
              <div>
                <p className="font-medium">北京国际马拉松</p>
                <p className="text-sm text-gray-500">报名截止时间：3天后</p>
              </div>
              <Button className="bg-meituan-orange hover:bg-meituan-orange/90">
                立即报名
              </Button>
            </div>
            <div className="flex items-center justify-between p-3">
              <div>
                <p className="font-medium">城市定向挑战赛</p>
                <p className="text-sm text-gray-500">报名截止时间：7天后</p>
              </div>
              <Button className="bg-meituan-orange hover:bg-meituan-orange/90">
                立即报名
              </Button>
            </div>
          </div>
        </div>
      )}

      {intentLevel === 'low' && (
        <div className="bg-white p-6 rounded-xl">
          <h2 className="text-lg font-bold mb-4">体育赛事指南</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium mb-2">初次参赛须知</h3>
              <p className="text-sm text-gray-500">
                为首次参加体育赛事的爱好者提供全面的准备指南，包括训练计划和装备选择。
              </p>
              <Button variant="link" className="text-meituan-blue p-0 h-auto mt-2">
                查看详情
              </Button>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium mb-2">如何选择适合的赛事</h3>
              <p className="text-sm text-gray-500">
                根据个人体能和爱好，帮助您找到最适合的赛事类型和级别。
              </p>
              <Button variant="link" className="text-meituan-blue p-0 h-auto mt-2">
                查看详情
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Import Button component to avoid reference error
import { Button } from '@/components/ui/button';

export default IntentBasedRecommendation;
