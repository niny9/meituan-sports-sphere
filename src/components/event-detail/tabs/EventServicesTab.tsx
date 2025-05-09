
import React from 'react';
import { Service, services } from '@/data';
import { Clock, UtensilsCrossed, Hotel, Car, Ticket } from 'lucide-react';
import ServiceRecommendation from '@/components/ServiceRecommendation';
import { Card, CardContent } from '@/components/ui/card';

interface EventServicesTabProps {
  eventId: string;
}

const EventServicesTab: React.FC<EventServicesTabProps> = ({ eventId }) => {
  const eventServices = services[eventId] || [];
  
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

  return (
    <>
      <div className="mb-6">
        <Card className="mb-4 bg-gradient-to-r from-blue-50 to-green-50 border-none shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-start">
              <div className="mr-3 mt-1 bg-white p-2 rounded-full">
                <Clock className="h-5 w-5 text-meituan-blue" />
              </div>
              <div>
                <h3 className="text-meituan-blue font-medium mb-1">嗨赛智荐 | 智能服务推荐</h3>
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
  );
};

export default EventServicesTab;
