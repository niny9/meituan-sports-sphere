
import React from 'react';
import { Service } from '../data';
import { Star, ArrowRight, MapPin, Clock } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

interface ServiceRecommendationProps {
  service: Service;
}

const ServiceRecommendation: React.FC<ServiceRecommendationProps> = ({ service }) => {
  // Service type to icon/color mapping
  const typeConfig: Record<Service['type'], { label: string; bgColor: string; textColor: string; icon: React.FC<any> }> = {
    food: { 
      label: '餐饮', 
      bgColor: 'bg-amber-100', 
      textColor: 'text-amber-700',
      icon: () => <div className="p-1 bg-amber-100 rounded-full"><Star className="h-3 w-3 text-amber-700" /></div>
    },
    accommodation: { 
      label: '住宿', 
      bgColor: 'bg-blue-100', 
      textColor: 'text-blue-700',
      icon: () => <div className="p-1 bg-blue-100 rounded-full"><MapPin className="h-3 w-3 text-blue-700" /></div>
    },
    transportation: { 
      label: '交通', 
      bgColor: 'bg-green-100', 
      textColor: 'text-green-700',
      icon: () => <div className="p-1 bg-green-100 rounded-full"><Clock className="h-3 w-3 text-green-700" /></div>
    },
    entertainment: { 
      label: '娱乐', 
      bgColor: 'bg-purple-100', 
      textColor: 'text-purple-700',
      icon: () => <div className="p-1 bg-purple-100 rounded-full"><Star className="h-3 w-3 text-purple-700" /></div>
    }
  };

  const { label, bgColor, textColor, icon: IconComponent } = typeConfig[service.type];

  const handleBookNow = () => {
    toast({
      title: "预订成功",
      description: `您已成功预订 ${service.title}，详情已发送至您的手机`,
    });
  };

  const handleViewDetails = () => {
    toast({
      title: "正在查看详情",
      description: `正在加载 ${service.title} 的详细信息`,
    });
  };

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="flex">
        <div className="flex-shrink-0 w-24 h-24">
          <img 
            src={service.imageUrl} 
            alt={service.title} 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-3 flex-1">
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-medium text-meituan-blue">{service.title}</h3>
            <span className={`text-xs px-2 py-0.5 rounded-full ${bgColor} ${textColor} flex items-center`}>
              <IconComponent />
              <span className="ml-1">{label}</span>
            </span>
          </div>
          
          <p className="text-xs text-gray-500 line-clamp-2 mb-2">{service.description}</p>
          
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center">
              <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
              <span className="ml-1">{service.rating}</span>
              <span className="mx-2 text-gray-300">|</span>
              <span className="text-gray-500">{service.distance}</span>
            </div>
            <span className="font-medium text-meituan-orange">{service.price}</span>
          </div>

          <div className="flex justify-between mt-2 pt-2 border-t border-gray-100">
            <button 
              onClick={handleViewDetails}
              className="text-xs text-meituan-blue flex items-center"
            >
              查看详情
              <ArrowRight className="ml-1 h-3 w-3" />
            </button>
            <button 
              onClick={handleBookNow}
              className="text-xs bg-meituan-orange text-white px-2 py-1 rounded"
            >
              立即预订
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceRecommendation;
