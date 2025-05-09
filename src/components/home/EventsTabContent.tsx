
import React from 'react';
import EventCard from '../EventCard';
import { Event } from '@/data/types';
import { intentCategories } from '@/data';
import { Card, CardContent } from "@/components/ui/card";

interface EventsTabContentProps {
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
  searchQuery: string | null;
  filteredEvents: Event[];
  handleEventClick: (event: Event) => void;
}

const EventsTabContent: React.FC<EventsTabContentProps> = ({
  selectedCategory,
  setSelectedCategory,
  searchQuery,
  filteredEvents,
  handleEventClick
}) => {
  return (
    <>
      {/* User intent categories with improved visuals */}
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#FFD256] to-[#FFB838]">猜你想去</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {intentCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(selectedCategory === category.id ? null : category.id)}
              className={`p-4 rounded-lg flex items-center transition-all ${
                selectedCategory === category.id
                  ? 'bg-gradient-to-r from-[#FFD256] to-[#FFB838] text-white shadow-lg'
                  : 'bg-white text-meituan-darkGray hover:bg-[#FFD256]/10'
              }`}
            >
              <div className={`p-2 rounded-full ${
                selectedCategory === category.id
                  ? 'bg-white/20'
                  : 'bg-meituan-gray'
              }`}>
                <category.icon className={`h-5 w-5 ${
                  selectedCategory === category.id
                    ? 'text-white'
                    : 'text-[#FFD256]'
                }`} />
              </div>
              <div className="ml-3 text-left">
                <h3 className="font-medium">{category.name}</h3>
                <p className={`text-xs ${
                  selectedCategory === category.id
                    ? 'text-white/80'
                    : 'text-gray-500'
                }`}>
                  {category.description}
                </p>
              </div>
            </button>
          ))}
        </div>
      </section>
      
      {/* Events list with improved visual design */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#FFD256] to-[#FFB838]">
            {searchQuery ? `"${searchQuery}"的搜索结果` : 
            selectedCategory ? `${intentCategories.find(c => c.id === selectedCategory)?.name || ''}赛事推荐` : '精选赛事'}
          </h2>
          {(selectedCategory || searchQuery) && (
            <button 
              onClick={() => {
                setSelectedCategory(null);
                // Clear search params from URL
                const urlWithoutParams = window.location.pathname;
                window.history.pushState({}, "", urlWithoutParams);
              }}
              className="text-sm text-[#FFD256] hover:underline flex items-center"
            >
              查看全部
            </button>
          )}
        </div>
        
        {filteredEvents.length === 0 ? (
          <Card className="p-8 text-center">
            <CardContent className="pt-6">
              <p className="text-gray-500">没有匹配的赛事，请调整筛选条件</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map(event => (
              <EventCard 
                key={event.id} 
                event={event}
                onClick={handleEventClick}
              />
            ))}
          </div>
        )}
      </section>
      
      {/* AI-driven personalized suggestions */}
      {!selectedCategory && !searchQuery && filteredEvents.length > 0 && (
        <section className="mt-12">
          <div className="bg-gradient-to-r from-[#FFD256]/10 to-[#FFB838]/10 p-5 rounded-xl border border-[#FFD256]/20">
            <h3 className="font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-[#FFD256] to-[#FFB838]">赛事智能匹配</h3>
            <p className="text-sm text-gray-600 mb-3">
              根据您的浏览习惯和兴趣，系统智能匹配以下赛事
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {filteredEvents.slice(0, 2).map(event => (
                <div 
                  key={`suggestion-${event.id}`}
                  onClick={() => handleEventClick(event)}
                  className="flex bg-white rounded-lg p-3 cursor-pointer hover:shadow-md transition-shadow"
                >
                  <img 
                    src={event.image}
                    alt={event.title}
                    className="w-16 h-16 object-cover rounded-md mr-3" 
                  />
                  <div>
                    <h4 className="font-medium text-sm">{event.title}</h4>
                    <p className="text-xs text-gray-500 mt-1">{event.date}</p>
                    <div className="flex gap-1 mt-1">
                      {event.tags?.slice(0, 1).map(tag => (
                        <span key={tag} className="bg-[#FFD256]/10 text-[#FFD256] px-2 py-0.5 rounded text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default EventsTabContent;
