
import React from 'react';
import EventCard from '../EventCard';
import { Event } from '@/data/types';
import { intentCategories } from '@/data';

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
      {/* User intent categories */}
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4 text-meituan-blue">智能匹配推荐</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {intentCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(selectedCategory === category.id ? null : category.id)}
              className={`p-4 rounded-lg flex items-center transition-all ${
                selectedCategory === category.id
                  ? 'bg-meituan-blue text-white shadow-lg'
                  : 'bg-white text-meituan-darkGray hover:bg-meituan-blue/10'
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
                    : 'text-meituan-blue'
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
      
      {/* Events list */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-meituan-blue">
            {searchQuery ? `"${searchQuery}"的搜索结果` : 
            selectedCategory ? `${intentCategories.find(c => c.id === selectedCategory)?.name || ''}赛事推荐` : '全部赛事'}
          </h2>
          {(selectedCategory || searchQuery) && (
            <button 
              onClick={() => {
                setSelectedCategory(null);
                window.history.pushState({}, "", window.location.pathname);
              }}
              className="text-sm text-meituan-blue hover:underline"
            >
              查看全部
            </button>
          )}
        </div>
        
        {filteredEvents.length === 0 ? (
          <div className="bg-white rounded-lg p-8 text-center">
            <p className="text-gray-500">没有匹配的赛事，请调整筛选条件</p>
          </div>
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
    </>
  );
};

export default EventsTabContent;
