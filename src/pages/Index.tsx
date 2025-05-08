
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import EventCard from '@/components/EventCard';
import { events, Event, intentCategories } from '@/data/mockData';
import AIAssistant from '@/components/AIAssistant';
import EventDetail from '@/components/EventDetail';
import { MapPin, Calendar, Star, Users } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const Index = () => {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search');
  const { toast } = useToast();

  // Filter events based on selected category and search query
  const filteredEvents = events.filter(event => {
    // First filter by category if selected
    if (selectedCategory) {
      if (selectedCategory === 'high') return event.intentScore > 75;
      if (selectedCategory === 'medium') return event.intentScore > 50 && event.intentScore <= 75;
      if (selectedCategory === 'low') return event.intentScore <= 50;
    }
    
    // Then filter by search query if provided
    if (searchQuery) {
      return event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
             event.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
             event.description.toLowerCase().includes(searchQuery.toLowerCase());
    }
    
    return true;
  });

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
    window.scrollTo(0, 0);
  };

  // Mock data for the new sections
  const nearbyEvents = events.slice(0, 3);
  const popularEvents = [...events].sort((a, b) => b.intentScore - a.intentScore).slice(0, 4);
  const recommendedEvents = events.filter(e => e.tags.includes("推荐")).slice(0, 3);
  
  const sportsCommunities = [
    { id: 1, name: "北京跑步俱乐部", members: 1289, image: "https://picsum.photos/id/26/300/200" },
    { id: 2, name: "篮球爱好者联盟", members: 856, image: "https://picsum.photos/id/29/300/200" },
    { id: 3, name: "自行车骑行团", members: 643, image: "https://picsum.photos/id/17/300/200" },
    { id: 4, name: "瑜伽生活圈", members: 1102, image: "https://picsum.photos/id/96/300/200" },
  ];

  // Show notification on load
  useEffect(() => {
    setTimeout(() => {
      toast({
        title: "体育赛事推荐",
        description: "北京国际马拉松赛事报名即将截止，点击查看详情",
      });
    }, 2000);
  }, [toast]);

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
            
            {/* Nearby Events Section */}
            <section className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-meituan-blue flex items-center">
                  <MapPin className="h-5 w-5 mr-2" />
                  附近赛事
                </h2>
                <button className="text-sm text-meituan-blue hover:underline">
                  查看全部
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {nearbyEvents.map(event => (
                  <div 
                    key={`nearby-${event.id}`}
                    className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="relative">
                      <img 
                        src={event.image} 
                        alt={event.title}
                        className="w-full h-40 object-cover"
                      />
                      <div className="absolute bottom-0 left-0 bg-gradient-to-t from-black/70 to-transparent w-full p-3">
                        <span className="text-white text-sm font-medium">{event.location}</span>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-meituan-blue mb-1 truncate">{event.title}</h3>
                      <p className="text-gray-500 text-sm mb-3">{event.date}</p>
                      <button 
                        onClick={() => handleEventClick(event)}
                        className="text-meituan-orange text-sm hover:underline"
                      >
                        查看详情
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
            
            {/* Popular Recommendations Section */}
            <section className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-meituan-blue flex items-center">
                  <Star className="h-5 w-5 mr-2" />
                  热门推荐
                </h2>
                <button className="text-sm text-meituan-blue hover:underline">
                  查看全部
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {popularEvents.map(event => (
                  <div 
                    key={`popular-${event.id}`}
                    onClick={() => handleEventClick(event)}
                    className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                  >
                    <img 
                      src={event.image} 
                      alt={event.title}
                      className="w-full h-32 object-cover"
                    />
                    <div className="p-3">
                      <h3 className="font-medium text-meituan-darkGray truncate">{event.title}</h3>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs bg-meituan-gray text-meituan-blue px-2 py-1 rounded-full">
                          热度 {event.intentScore}%
                        </span>
                        <span className="text-xs text-gray-500">{event.date}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
            
            {/* Event Recommendations Section */}
            <section className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-meituan-blue flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  赛事推荐
                </h2>
                <button className="text-sm text-meituan-blue hover:underline">
                  更多推荐
                </button>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {recommendedEvents.map(event => (
                    <div 
                      key={`recommended-${event.id}`} 
                      className="flex border border-gray-100 rounded-lg overflow-hidden hover:border-meituan-orange transition-colors"
                      onClick={() => handleEventClick(event)}
                    >
                      <img 
                        src={event.image} 
                        alt={event.title}
                        className="w-24 h-24 object-cover"
                      />
                      <div className="p-3 flex-1">
                        <h3 className="font-medium text-meituan-darkGray text-sm line-clamp-2">{event.title}</h3>
                        <p className="text-xs text-gray-500 mt-1">{event.date}</p>
                        <div className="mt-2">
                          <span className="text-xs bg-meituan-orange/10 text-meituan-orange px-2 py-0.5 rounded-full">
                            强力推荐
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
            
            {/* Sports Community Section */}
            <section className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-meituan-blue flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  运动社群
                </h2>
                <button className="text-sm text-meituan-blue hover:underline">
                  发现更多
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {sportsCommunities.map(community => (
                  <div 
                    key={community.id} 
                    className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="relative">
                      <img 
                        src={community.image} 
                        alt={community.name}
                        className="w-full h-32 object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-3">
                        <h3 className="font-bold text-white">{community.name}</h3>
                      </div>
                    </div>
                    <div className="p-3 flex items-center justify-between">
                      <span className="text-sm text-gray-500">
                        <Users className="h-4 w-4 inline mr-1" />
                        {community.members} 成员
                      </span>
                      <button className="text-xs bg-meituan-blue text-white px-3 py-1 rounded-full">
                        加入
                      </button>
                    </div>
                  </div>
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
        )}
      </main>
      
      <AIAssistant />
    </div>
  );
};

export default Index;
