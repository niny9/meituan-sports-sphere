
import React from 'react';
import { Event } from '@/data';
import { Calendar, ChevronLeft, MapPin, Share2, Star, Users } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

interface EventDetailHeaderProps {
  event: Event;
  onBack: () => void;
}

const EventDetailHeader: React.FC<EventDetailHeaderProps> = ({ event, onBack }) => {
  const handleShare = () => {
    toast({
      title: "分享成功",
      description: "赛事信息已复制到剪贴板，您可以分享给好友",
    });
  };

  return (
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
  );
};

export default EventDetailHeader;
