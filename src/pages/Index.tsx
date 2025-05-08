
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import EventCard from '@/components/EventCard';
import { events, Event, intentCategories } from '@/data';
import AIAssistant from '@/components/AIAssistant';
import EventDetail from '@/components/EventDetail';
import { MapPin, Calendar, Star, Users } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Index = () => {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search');
  const activeTab = searchParams.get('tab') || 'events';
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
             (event.description && event.description.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    
    return true;
  });

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
    window.scrollTo(0, 0);
  };

  // Mock data for the different tabs
  const nearbyEvents = events.slice(0, 3);
  const popularEvents = [...events].sort((a, b) => b.intentScore - a.intentScore).slice(0, 4);
  const recommendedEvents = events.filter(e => e.tags && e.tags.includes("推荐")).slice(0, 3);
  const planningEvents = events.slice(2, 5);
  
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
            
            {/* Tabs content based on navigation selection */}
            <Tabs defaultValue={activeTab} value={activeTab} className="mb-8">
              <TabsContent value="events" className="mt-0">
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
              </TabsContent>
              
              <TabsContent value="nearby" className="mt-0">
                {/* Nearby Events Section */}
                <section>
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

                  <div className="mt-8 p-6 bg-white rounded-xl shadow-sm">
                    <h3 className="text-lg font-bold mb-4">附近热门场馆</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        { name: "国家体育场", distance: "1.2公里", image: "https://picsum.photos/id/43/300/150" },
                        { name: "奥林匹克公园", distance: "2.5公里", image: "https://picsum.photos/id/42/300/150" },
                        { name: "五棵松体育馆", distance: "3.8公里", image: "https://picsum.photos/id/26/300/150" },
                        { name: "水立方", distance: "4.2公里", image: "https://picsum.photos/id/29/300/150" }
                      ].map((venue, idx) => (
                        <div key={idx} className="flex bg-meituan-gray/50 rounded-lg overflow-hidden">
                          <img src={venue.image} alt={venue.name} className="w-24 h-24 object-cover" />
                          <div className="p-3">
                            <h4 className="font-medium">{venue.name}</h4>
                            <p className="text-sm text-gray-500 mt-1">距离约 {venue.distance}</p>
                            <div className="mt-2">
                              <span className="text-xs bg-meituan-blue/10 text-meituan-blue px-2 py-0.5 rounded-full">
                                查看路线
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              </TabsContent>
              
              <TabsContent value="popular" className="mt-0">
                {/* Popular Recommendations Section */}
                <section>
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
                  
                  <div className="mt-8">
                    <h3 className="text-lg font-bold mb-4">全民热搜榜</h3>
                    <div className="bg-white rounded-xl p-4">
                      {[
                        { rank: 1, title: "北京国际马拉松赛", trend: "上升", views: "128.5万" },
                        { rank: 2, title: "NBA季后赛", trend: "持平", views: "93.2万" },
                        { rank: 3, title: "环法自行车赛", trend: "上升", views: "76.8万" },
                        { rank: 4, title: "世界杯预选赛", trend: "下降", views: "65.4万" },
                        { rank: 5, title: "全国羽毛球锦标赛", trend: "上升", views: "52.1万" }
                      ].map(item => (
                        <div key={item.rank} className="flex items-center py-3 border-b last:border-0">
                          <span className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${
                            item.rank <= 3 ? 'bg-meituan-orange text-white' : 'bg-meituan-gray text-meituan-darkGray'
                          }`}>{item.rank}</span>
                          <div className="flex-1">
                            <p className="font-medium">{item.title}</p>
                          </div>
                          <div className="text-right">
                            <span className={`text-xs ${
                              item.trend === "上升" ? "text-red-500" : 
                              item.trend === "下降" ? "text-green-500" : "text-gray-500"
                            }`}>{item.trend}</span>
                            <p className="text-sm text-gray-500">{item.views}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              </TabsContent>
              
              <TabsContent value="planning" className="mt-0">
                {/* Event Planning Section */}
                <section>
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-meituan-blue flex items-center">
                      <Calendar className="h-5 w-5 mr-2" />
                      赛事规划
                    </h2>
                    <button className="text-sm text-meituan-blue hover:underline">
                      更多规划
                    </button>
                  </div>
                  <div className="bg-white rounded-xl p-6 shadow-sm">
                    <h3 className="font-bold mb-4">近期赛事日历</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {planningEvents.map(event => (
                        <div 
                          key={`planning-${event.id}`} 
                          className="border border-gray-100 rounded-lg overflow-hidden hover:border-meituan-orange transition-colors"
                          onClick={() => handleEventClick(event)}
                        >
                          <div className="bg-meituan-blue text-white text-center py-2">
                            <p className="text-xs">赛事日期</p>
                            <p className="font-bold">{event.date}</p>
                          </div>
                          <div className="p-4">
                            <h3 className="font-medium text-meituan-darkGray line-clamp-2">{event.title}</h3>
                            <p className="text-xs text-gray-500 mt-2">{event.location}</p>
                            <div className="flex justify-between items-center mt-3">
                              <span className="text-xs bg-meituan-orange/10 text-meituan-orange px-2 py-0.5 rounded-full">
                                制定行程
                              </span>
                              <button className="text-xs text-meituan-blue">添加提醒</button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-6">
                      <h3 className="font-bold mb-4">个性化建议</h3>
                      <div className="bg-meituan-gray/30 rounded-lg p-4">
                        <div className="flex items-start">
                          <div className="p-2 bg-meituan-blue/10 rounded-full mr-3">
                            <Calendar className="h-5 w-5 text-meituan-blue" />
                          </div>
                          <div>
                            <h4 className="font-medium">赛前准备计划</h4>
                            <p className="text-sm text-gray-600 mt-1">
                              根据您参加的北京国际马拉松赛，我们为您定制了4周训练计划、营养方案和装备清单。
                            </p>
                            <button className="mt-3 text-sm bg-meituan-blue text-white px-4 py-1 rounded-full">
                              查看详情
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </TabsContent>
              
              <TabsContent value="groups" className="mt-0">
                {/* Sports Community Section */}
                <section>
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
                  
                  <div className="mt-8">
                    <h3 className="text-lg font-bold mb-4">即将开始的活动</h3>
                    <div className="bg-white rounded-xl p-4">
                      {[
                        { title: "周末五公里晨跑", date: "5月10日 06:30", group: "北京跑步俱乐部", participants: 28 },
                        { title: "篮球友谊赛", date: "5月11日 15:00", group: "篮球爱好者联盟", participants: 16 },
                        { title: "环颐和园骑行", date: "5月12日 09:00", group: "自行车骑行团", participants: 42 }
                      ].map((activity, idx) => (
                        <div key={idx} className="flex py-3 border-b last:border-0">
                          <div className="p-2 mr-3 bg-meituan-gray rounded-lg h-min">
                            <Calendar className="h-5 w-5 text-meituan-blue" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium">{activity.title}</h4>
                            <p className="text-xs text-gray-500 mt-1">举办方: {activity.group}</p>
                            <div className="flex justify-between items-center mt-2">
                              <span className="text-xs text-meituan-darkGray">{activity.date}</span>
                              <div className="flex items-center">
                                <Users className="h-3 w-3 text-gray-400 mr-1" />
                                <span className="text-xs text-gray-500">{activity.participants}人参与</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              </TabsContent>
            </Tabs>
            
            {/* We've removed the individual sections that were previously here, as they're now part of the TabsContent components above */}
          </>
        )}
      </main>
      
      <AIAssistant />
    </div>
  );
};

export default Index;
