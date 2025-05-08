
import React, { useState } from 'react';
import { Event, Service, services } from '../data/mockData';
import { Calendar, ChevronLeft, MapPin, Share2, Star, Users, Hotel, UtensilsCrossed, Car, Ticket, Clock } from 'lucide-react';
import ServiceRecommendation from './ServiceRecommendation';
import { toast } from '@/components/ui/use-toast';
import { Card, CardContent } from '@/components/ui/card';

interface EventDetailProps {
  event: Event;
  onBack: () => void;
}

const EventDetail: React.FC<EventDetailProps> = ({ event, onBack }) => {
  const eventServices = services[event.id] || [];
  const [activeTab, setActiveTab] = useState<'details' | 'services' | 'planning'>('details');

  // Group services by type
  const groupedServices: Record<string, Service[]> = {};
  eventServices.forEach(service => {
    if (!groupedServices[service.type]) {
      groupedServices[service.type] = [];
    }
    groupedServices[service.type].push(service);
  });

  // Service type to display name and icon
  const serviceTypeLabels: Record<string, {name: string, icon: React.ReactNode}> = {
    food: { name: '餐饮推荐', icon: <UtensilsCrossed className="h-5 w-5" /> },
    accommodation: { name: '住宿推荐', icon: <Hotel className="h-5 w-5" /> },
    transportation: { name: '交通方案', icon: <Car className="h-5 w-5" /> },
    entertainment: { name: '娱乐活动', icon: <Ticket className="h-5 w-5" /> }
  };

  const handleShare = () => {
    toast({
      title: "分享成功",
      description: "赛事信息已复制到剪贴板，您可以分享给好友",
    });
  };

  const handleCreatePlan = () => {
    toast({
      title: "规划已创建",
      description: "已为您创建赛事规划，可在'赛事规划'中查看",
    });
  };

  return (
    <div className="bg-white animate-fade-in">
      {/* Header */}
      <div className="relative">
        <div className="h-64 overflow-hidden">
          <img 
            src={event.image} 
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
          
          <button 
            onClick={handleShare}
            className="p-2 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition"
          >
            <Share2 className="h-5 w-5" />
          </button>
        </div>
        
        <div className="absolute bottom-4 left-6 right-6 text-white">
          <div className="flex justify-between items-end">
            <div>
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
            {event.nearbyServices && (
              <span className="bg-meituan-orange/80 text-white text-xs px-2 py-1 rounded-full">
                本地服务推荐
              </span>
            )}
          </div>
        </div>
      </div>
      
      {/* Tab Navigation */}
      <div className="border-b">
        <div className="flex">
          <button 
            className={`px-4 py-3 text-sm font-medium ${activeTab === 'details' ? 'text-meituan-blue border-b-2 border-meituan-blue' : 'text-gray-500'}`}
            onClick={() => setActiveTab('details')}
          >
            赛事详情
          </button>
          <button 
            className={`px-4 py-3 text-sm font-medium ${activeTab === 'services' ? 'text-meituan-blue border-b-2 border-meituan-blue' : 'text-gray-500'}`}
            onClick={() => setActiveTab('services')}
          >
            周边服务
          </button>
          <button 
            className={`px-4 py-3 text-sm font-medium ${activeTab === 'planning' ? 'text-meituan-blue border-b-2 border-meituan-blue' : 'text-gray-500'}`}
            onClick={() => setActiveTab('planning')}
          >
            赛事规划
          </button>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-6">
        {activeTab === 'details' && (
          <>
            <div className="flex flex-wrap gap-3 mb-8">
              <button className="px-4 py-2 rounded-full bg-meituan-orange text-white font-medium hover:bg-meituan-orange/90 transition">
                立即报名
              </button>
              <button className="px-4 py-2 rounded-full border border-meituan-blue text-meituan-blue hover:bg-meituan-blue/10 transition">
                添加日历
              </button>
              <button 
                className="px-4 py-2 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
                onClick={handleShare}
              >
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
                  <div className="bg-white p-3 rounded-lg shadow-sm">
                    <div className="text-xl font-bold text-meituan-orange mb-1">72%</div>
                    <div className="text-sm text-gray-600">赛事匹配度</div>
                  </div>
                  <div className="bg-white p-3 rounded-lg shadow-sm">
                    <div className="text-xl font-bold text-meituan-blue mb-1">98%</div>
                    <div className="text-sm text-gray-600">用户满意度</div>
                  </div>
                  <div className="bg-white p-3 rounded-lg shadow-sm">
                    <div className="text-xl font-bold text-green-500 mb-1">85%</div>
                    <div className="text-sm text-gray-600">参与意向度</div>
                  </div>
                </div>
              </div>
            </div>
            
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
          </>
        )}

        {activeTab === 'services' && (
          <>
            <div className="mb-6">
              <Card className="mb-4 bg-gradient-to-r from-blue-50 to-green-50 border-none shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-start">
                    <div className="mr-3 mt-1 bg-white p-2 rounded-full">
                      <Clock className="h-5 w-5 text-meituan-blue" />
                    </div>
                    <div>
                      <h3 className="text-meituan-blue font-medium mb-1">智能服务推荐</h3>
                      <p className="text-sm text-gray-600">
                        根据赛事时间和您的位置，我们为您精选了高品质的周边服务，让您的赛事体验更便捷、舒适。
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Service recommendations */}
            {Object.entries(groupedServices).map(([type, serviceList]) => (
              <section key={type} className="mb-8">
                <div className="flex items-center mb-3">
                  {serviceTypeLabels[type]?.icon}
                  <h2 className="text-lg font-bold text-meituan-blue ml-2">
                    {serviceTypeLabels[type]?.name || type}
                  </h2>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  {serviceList.map(service => (
                    <ServiceRecommendation key={service.id} service={service} />
                  ))}
                </div>
              </section>
            ))}
          </>
        )}

        {activeTab === 'planning' && (
          <>
            <div className="mb-6">
              <Card className="mb-4 bg-gradient-to-r from-orange-50 to-yellow-50 border-none shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-start">
                    <div className="mr-3 mt-1 bg-white p-2 rounded-full">
                      <Calendar className="h-5 w-5 text-meituan-orange" />
                    </div>
                    <div>
                      <h3 className="text-meituan-blue font-medium mb-1">赛事参与规划</h3>
                      <p className="text-sm text-gray-600">
                        根据您的偏好和赛事特点，我们可以为您制定个性化的赛事参与计划，包括行程安排、服务预订等。
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="bg-white rounded-xl shadow-sm border p-4 mb-4">
              <h3 className="font-medium text-meituan-blue mb-3">赛前准备 (赛事前3天)</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <UtensilsCrossed className="h-4 w-4 text-meituan-orange mr-2" />
                  <span className="text-sm">参赛者能量餐 - 提前预订</span>
                </div>
                <div className="flex items-center">
                  <Hotel className="h-4 w-4 text-meituan-blue mr-2" />
                  <span className="text-sm">赛事酒店入住 - 赛前一天</span>
                </div>
                <div className="flex items-center">
                  <Ticket className="h-4 w-4 text-green-500 mr-2" />
                  <span className="text-sm">领取参赛物资 - 赛前一天</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border p-4 mb-4">
              <h3 className="font-medium text-meituan-blue mb-3">赛事当天</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 text-meituan-orange mr-2" />
                  <span className="text-sm">早餐时间 - 6:00 AM</span>
                </div>
                <div className="flex items-center">
                  <Car className="h-4 w-4 text-meituan-blue mr-2" />
                  <span className="text-sm">接驳车服务 - 7:00 AM</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 text-red-500 mr-2" />
                  <span className="text-sm">赛事开始时间 - 8:30 AM</span>
                </div>
              </div>
            </div>

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
                className="bg-meituan-blue text-white px-6 py-3 rounded-lg shadow-md hover:bg-meituan-blue/90 transition"
              >
                为我创建个性化赛事规划
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default EventDetail;
