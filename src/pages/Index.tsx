
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import EventCard from '@/components/EventCard';
import { events, Event, intentCategories } from '@/data/mockData';
import AIAssistant from '@/components/AIAssistant';
import EventDetail from '@/components/EventDetail';

const Index = () => {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Filter events based on selected category
  const filteredEvents = selectedCategory 
    ? events.filter(event => {
        if (selectedCategory === 'high') return event.intentScore > 75;
        if (selectedCategory === 'medium') return event.intentScore > 50 && event.intentScore <= 75;
        if (selectedCategory === 'low') return event.intentScore <= 50;
        return true;
      })
    : events;

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-meituan-gray">
      <Navbar />
      
      <main className="container mx-auto px-4 py-6">
        {selectedEvent ? (
          <EventDetail 
            event={selectedEvent} 
            onBack={() => setSelectedEvent(null)} 
          />
        ) : (
          <>
            {/* Hero section */}
            <section className="mb-10">
              <div className="relative rounded-2xl overflow-hidden">
                <img 
                  src="https://picsum.photos/id/1083/1200/400" 
                  alt="Sports hero" 
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-meituan-blue/80 to-transparent flex items-center">
                  <div className="p-8 text-white max-w-lg">
                    <h1 className="text-3xl font-bold mb-2">体育赛事智能推荐</h1>
                    <p className="mb-4">
                      基于AI技术，为您精准匹配赛事与周边服务，打造完美赛事体验
                    </p>
                    <button className="px-5 py-2 bg-meituan-orange text-white rounded-full hover:bg-opacity-90 transition">
                      探索赛事
                    </button>
                  </div>
                </div>
              </div>
            </section>
            
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
                  {selectedCategory ? `${intentCategories.find(c => c.id === selectedCategory)?.name || ''}赛事推荐` : '全部赛事'}
                </h2>
                {selectedCategory && (
                  <button 
                    onClick={() => setSelectedCategory(null)}
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
        )}
      </main>
      
      <AIAssistant />
    </div>
  );
};

export default Index;
