
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import EventCard from '@/components/EventCard';
import { events, Event, intentCategories } from '@/data';
import AIAssistant from '@/components/AIAssistant';
import EventDetail from '@/components/EventDetail';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useUserProfile } from '@/contexts/UserProfileContext';
import IntentQuizModal from '@/components/intent/IntentQuizModal';
import IntentBasedRecommendation from '@/components/intent/IntentBasedRecommendation';

// Import our new components
import HeroSection from '@/components/home/HeroSection';
import EventsTabContent from '@/components/home/EventsTabContent';
import NearbyTabContent from '@/components/home/NearbyTabContent';
import PopularTabContent from '@/components/home/PopularTabContent';
import PlanningTabContent from '@/components/home/PlanningTabContent';
import GroupsTabContent from '@/components/home/GroupsTabContent';

const Index = () => {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search');
  const activeTab = searchParams.get('tab') || 'events';
  const [quizModalOpen, setQuizModalOpen] = useState(false);
  const { toast } = useToast();
  const { userProfile, isNewUser } = useUserProfile();

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

  const handleExploreClick = () => {
    if (isNewUser) {
      // Show intent quiz for new users
      setQuizModalOpen(true);
    } else {
      // Directly scroll to recommendations for returning users
      document.getElementById('recommendations')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Mock data for the different tabs
  const nearbyEvents = events.slice(0, 3);
  const popularEvents = [...events].sort((a, b) => b.intentScore - a.intentScore).slice(0, 4);
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
            <HeroSection handleExploreClick={handleExploreClick} />
            
            {/* Intent-based recommendations section */}
            <section id="recommendations" className="mb-10">
              {userProfile.intentLevel && (
                <IntentBasedRecommendation 
                  intentLevel={userProfile.intentLevel} 
                  onEventClick={handleEventClick} 
                />
              )}
            </section>
            
            {/* Tabs content based on navigation selection */}
            <Tabs defaultValue={activeTab} value={activeTab} className="mb-8">
              <TabsContent value="events" className="mt-0">
                <EventsTabContent 
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                  searchQuery={searchQuery}
                  filteredEvents={filteredEvents}
                  handleEventClick={handleEventClick}
                />
              </TabsContent>
              
              <TabsContent value="nearby" className="mt-0">
                <NearbyTabContent 
                  nearbyEvents={nearbyEvents} 
                  handleEventClick={handleEventClick} 
                />
              </TabsContent>
              
              <TabsContent value="popular" className="mt-0">
                <PopularTabContent 
                  popularEvents={popularEvents}
                  handleEventClick={handleEventClick}
                />
              </TabsContent>
              
              <TabsContent value="planning" className="mt-0">
                <PlanningTabContent 
                  planningEvents={planningEvents}
                  handleEventClick={handleEventClick}
                />
              </TabsContent>
              
              <TabsContent value="groups" className="mt-0">
                <GroupsTabContent 
                  sportsCommunities={sportsCommunities} 
                />
              </TabsContent>
            </Tabs>
          </>
        )}
      </main>
      
      <AIAssistant />
      
      {/* Intent Quiz Modal */}
      <IntentQuizModal
        open={quizModalOpen}
        onOpenChange={setQuizModalOpen}
        onComplete={() => {
          // Scroll to recommendations after completing the quiz
          setTimeout(() => {
            document.getElementById('recommendations')?.scrollIntoView({ behavior: 'smooth' });
          }, 500);
        }}
      />
    </div>
  );
};

export default Index;
