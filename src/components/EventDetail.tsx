
import React from 'react';
import { Event, Service, services } from '../data/mockData';
import { Calendar, ChevronLeft, MapPin, Share2, Star, Users } from 'lucide-react';
import ServiceRecommendation from './ServiceRecommendation';

interface EventDetailProps {
  event: Event;
  onBack: () => void;
}

const EventDetail: React.FC<EventDetailProps> = ({ event, onBack }) => {
  const eventServices = services[event.id] || [];

  // Group services by type
  const groupedServices: Record<string, Service[]> = {};
  eventServices.forEach(service => {
    if (!groupedServices[service.type]) {
      groupedServices[service.type] = [];
    }
    groupedServices[service.type].push(service);
  });

  // Service type to display name
  const serviceTypeLabels: Record<string, string> = {
    food: '餐饮推荐',
    accommodation: '住宿推荐',
    transportation: '交通方案',
    entertainment: '娱乐活动'
  };

  return (
    <div className="bg-white animate-fade-in">
      {/* Header */}
      <div className="relative">
        <div className="h-64 overflow-hidden">
          <img 
            src={event.imageUrl} 
            alt={event.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-meituan-blue/90 to-transparent" />
        </div>
        
        <div className="absolute top-4 left-4 right-4 flex justify-between">
          <button 
            onClick={onBack}
            className="p-2 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          
          <button className="p-2 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition">
            <Share2 className="h-5 w-5" />
          </button>
        </div>
        
        <div className="absolute bottom-4 left-6 right-6 text-white">
          <h1 className="text-2xl font-bold mb-2">{event.title}</h1>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              <span className="text-sm">{new Date(event.date).toLocaleDateString('zh-CN')}</span>
            </div>
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-1" />
              <span className="text-sm">{event.location}</span>
            </div>
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-1" />
              <span className="text-sm">预计10000+人参与</span>
            </div>
            <div className="flex items-center">
              <Star className="h-4 w-4 mr-1 fill-yellow-400" />
              <span className="text-sm">{event.popularity / 10}/10 热度</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-6">
        <div className="flex flex-wrap gap-3 mb-8">
          <button className="px-4 py-2 rounded-full bg-meituan-orange text-white font-medium">
            立即报名
          </button>
          <button className="px-4 py-2 rounded-full border border-meituan-blue text-meituan-blue">
            添加日历
          </button>
          <button className="px-4 py-2 rounded-full border border-gray-300 text-gray-600">
            分享赛事
          </button>
        </div>
        
        <div className="mb-8">
          <div className="bg-meituan-gray rounded-xl p-5">
            <h2 className="text-lg font-bold text-meituan-blue mb-3">赛事AI助手推荐</h2>
            <p className="text-gray-600 mb-4">
              根据您的兴趣和历史行为，我们为您定制了以下服务方案，帮助您顺利参与这场赛事。
            </p>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="bg-white p-3 rounded-lg">
                <div className="text-xl font-bold text-meituan-orange mb-1">72%</div>
                <div className="text-sm text-gray-600">赛事匹配度</div>
              </div>
              <div className="bg-white p-3 rounded-lg">
                <div className="text-xl font-bold text-meituan-blue mb-1">98%</div>
                <div className="text-sm text-gray-600">用户满意度</div>
              </div>
              <div className="bg-white p-3 rounded-lg">
                <div className="text-xl font-bold text-green-500 mb-1">85%</div>
                <div className="text-sm text-gray-600">参与意向度</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Service recommendations */}
        {Object.entries(groupedServices).map(([type, serviceList]) => (
          <section key={type} className="mb-8">
            <h2 className="text-lg font-bold text-meituan-blue mb-3">
              {serviceTypeLabels[type] || type}
            </h2>
            <div className="grid grid-cols-1 gap-4">
              {serviceList.map(service => (
                <ServiceRecommendation key={service.id} service={service} />
              ))}
            </div>
          </section>
        ))}
        
        {/* Event description */}
        <section className="mb-8">
          <h2 className="text-lg font-bold text-meituan-blue mb-3">赛事详情</h2>
          <p className="text-gray-600 mb-4">
            {event.title}是一场备受瞩目的体育盛事，将于{new Date(event.date).toLocaleDateString('zh-CN')}在{event.location}举行。
            这场比赛吸引了来自全国各地的体育爱好者和专业运动员参与，现场氛围热烈。
          </p>
          <p className="text-gray-600">
            赛事组织方提供完善的后勤保障和医疗服务，确保参赛者的安全。同时，美团为您精心准备了周边的餐饮、住宿和交通等全方位服务，让您的赛事体验更加便捷舒适。
          </p>
        </section>
        
        <section>
          <h2 className="text-lg font-bold text-meituan-blue mb-3">位置信息</h2>
          <div className="h-48 bg-meituan-gray rounded-lg flex items-center justify-center">
            <div className="text-gray-500 flex flex-col items-center">
              <MapPin className="h-6 w-6 mb-2" />
              <span>{event.location}</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default EventDetail;
