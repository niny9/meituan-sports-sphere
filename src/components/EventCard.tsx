import React from 'react';
import { Event } from '@/data';
import { Star, MapPin, Calendar, Tag } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface EventCardProps {
  event: Event;
  onClick: (event: Event) => void;
}

const EventCard: React.FC<EventCardProps> = ({ event, onClick }) => {
  // Format date to be more readable
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div 
      className="event-card bg-white cursor-pointer"
      onClick={() => onClick(event)}
    >
      <div className="relative">
        <img 
          src={event.image} 
          alt={event.title} 
          className="w-full h-40 object-cover"
        />
        
        {/* Intent score badge */}
        <div className="absolute top-2 left-2">
          <Badge 
            className={`
              ${event.intentScore > 75 ? 'intent-high' : 
                event.intentScore > 50 ? 'intent-medium' : 
                'intent-low'}
            `}
          >
            匹配度 {event.intentScore}%
          </Badge>
        </div>
        
        {/* Tags */}
        {event.tags && event.tags.length > 0 && (
          <div className="absolute bottom-2 left-2 flex flex-wrap gap-1">
            {event.tags.map((tag, index) => (
              <span 
                key={index}
                className="bg-black/50 text-white text-xs px-2 py-0.5 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
      
      <div className="p-3">
        <h3 className="font-bold text-meituan-blue mb-1 line-clamp-1">{event.title}</h3>
        
        <div className="flex items-center text-xs text-gray-500 mb-2">
          <Calendar className="h-3 w-3 mr-1" />
          <span>{formatDate(event.date)}</span>
          
          <span className="mx-2">•</span>
          
          <div className="flex items-center event-popularity">
            <Star className="h-3 w-3 mr-1 text-yellow-500" />
            <span>{event.popularity}%</span>
          </div>
        </div>
        
        <div className="flex items-center text-xs text-gray-500">
          <MapPin className="h-3 w-3 mr-1" />
          <span className="line-clamp-1">{event.location}</span>
        </div>
        
        {/* Event deadline - higher visual priority */}
        <div className="mt-2 pt-2 border-t border-gray-100 flex justify-between items-center">
          <span className="text-xs text-gray-500 flex items-center">
            <Tag className="h-3 w-3 mr-1" />
            {event.category}
          </span>
          
          <span className="event-deadline text-xs">
            报名截止: {formatDate(event.date)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
