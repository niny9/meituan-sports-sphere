
import React from 'react';
import { Service } from '../data/mockData';
import { Star } from 'lucide-react';

interface ServiceRecommendationProps {
  service: Service;
}

const ServiceRecommendation: React.FC<ServiceRecommendationProps> = ({ service }) => {
  // Service type to icon/color mapping
  const typeConfig: Record<Service['type'], { label: string; bgColor: string; textColor: string }> = {
    food: { 
      label: '餐饮', 
      bgColor: 'bg-amber-100', 
      textColor: 'text-amber-700' 
    },
    accommodation: { 
      label: '住宿', 
      bgColor: 'bg-blue-100', 
      textColor: 'text-blue-700' 
    },
    transportation: { 
      label: '交通', 
      bgColor: 'bg-green-100', 
      textColor: 'text-green-700' 
    },
    entertainment: { 
      label: '娱乐', 
      bgColor: 'bg-purple-100', 
      textColor: 'text-purple-700' 
    }
  };

  const { label, bgColor, textColor } = typeConfig[service.type];

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
            <span className={`text-xs px-2 py-0.5 rounded-full ${bgColor} ${textColor}`}>
              {label}
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
        </div>
      </div>
    </div>
  );
};

export default ServiceRecommendation;
