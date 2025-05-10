
import React from 'react';
import EventCard from './EventCard';
import { Event } from '@/data';
import { checkTailwindContrast } from '@/utils/contrastChecker';

interface EnhancedEventCardProps {
  event: Event;
  onClick: (event: Event) => void;
}

/**
 * 增强版赛事卡片组件，修正视觉优先级问题
 * 1. 提升报名截止时间的视觉重要性
 * 2. 降低热度值的视觉冲击力
 */
const EnhancedEventCard: React.FC<EnhancedEventCardProps> = ({ event, onClick }) => {
  // 检查对比度 - 实际项目中可用于动态调整颜色
  const hasGoodContrast = checkTailwindContrast('text-gray-500', 'bg-white');

  return (
    <div 
      className="enhanced-card-wrapper relative group hover:transform hover:translate-y-[-5px] transition-all duration-200 hover:shadow-lg rounded-lg overflow-hidden cursor-pointer"
      onClick={() => onClick(event)}
    >
      {/* 使用原始EventCard组件 */}
      <div className="event-card-container">
        <EventCard event={event} onClick={() => onClick(event)} />
      </div>
      
      {/* 优先展示的报名截止信息覆盖层 */}
      {event.date && (
        <div className="absolute top-2 right-2 z-10">
          <span className="event-deadline bg-white/90 px-2 py-1 rounded-md shadow-sm group-hover:bg-amber-50/95 group-hover:-translate-y-0.5 transition-all duration-200">
            截止: {new Date(event.date).toLocaleDateString('zh-CN')}
          </span>
        </div>
      )}
      
      {/* 添加全局样式到组件上 */}
      <style dangerouslySetInnerHTML={{
        __html: `
          /* 使用全局选择器来修改视觉优先级 */
          .enhanced-card-wrapper .event-popularity {
            opacity: 0.7;
            font-size: 0.85rem;
          }
        `
      }} />
    </div>
  );
};

export default EnhancedEventCard;
