
import React from 'react';
import { Calendar, MapPin } from 'lucide-react';
import { Event } from '../data';
import { formatDistance } from 'date-fns';
import { zhCN } from 'date-fns/locale';

interface EventCardProps {
  event: Event;
  onClick: (event: Event) => void;
}

const EventCard: React.FC<EventCardProps> = ({ event, onClick }) => {
  const eventDate = new Date(event.date);
  const today = new Date();
  const timeUntil = formatDistance(eventDate, today, { addSuffix: true, locale: zhCN });

  // Determine intent level badge
  const getIntentBadge = () => {
    if (event.intentScore > 75) {
      return <span className="absolute top-3 right-3 px-2 py-1 text-xs font-medium rounded-full bg-meituan-success text-white">强匹配</span>;
    } else if (event.intentScore > 50) {
      return <span className="absolute top-3 right-3 px-2 py-1 text-xs font-medium rounded-full bg-meituan-warning text-meituan-darkGray">中等匹配</span>;
    }
    return null;
  };

  return (
    <div 
      className="event-card cursor-pointer bg-white"
      onClick={() => onClick(event)}
    >
      <div className="relative">
        <img 
          src={event.image} 
          alt={event.title} 
          className="w-full h-48 object-cover"
        />
        {getIntentBadge()}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-meituan-blue/80 to-transparent px-4 py-3 text-white">
          <h3 className="text-lg font-bold truncate">{event.title}</h3>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="bg-meituan-gray text-meituan-blue px-2 py-1 rounded-full text-xs">
            {event.category}
          </span>
          <div className="text-sm font-medium text-meituan-orange">
            {timeUntil}
          </div>
        </div>
        
        <div className="flex flex-col space-y-2 text-sm text-gray-600">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-1 text-meituan-blue" />
            <span>{new Date(event.date).toLocaleDateString('zh-CN')}</span>
          </div>
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-1 text-meituan-blue" />
            <span className="truncate">{event.location}</span>
          </div>
        </div>
        
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="inline-block h-8 w-8 rounded-full overflow-hidden bg-gray-100">
              <div className="h-full w-full flex items-center justify-center bg-meituan-blue/10 text-meituan-blue text-xs">
                {Math.floor(event.popularity / 10)}
              </div>
            </span>
            <span className="text-sm text-gray-500">热度</span>
          </div>
          
          <button className="px-3 py-1.5 rounded-md bg-meituan-orange text-white text-sm hover:bg-opacity-90 transition">
            了解详情
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
