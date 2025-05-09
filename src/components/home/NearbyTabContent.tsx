
import React, { useState } from 'react';
import { MapPin, Navigation, Coffee, Car } from 'lucide-react';
import { Event } from '@/data/types';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface NearbyTabContentProps {
  nearbyEvents: Event[];
  handleEventClick: (event: Event) => void;
}

interface Venue {
  name: string;
  distance: string;
  image: string;
  description?: string;
  facilities?: string[];
  address?: string;
  rating?: number;
}

const NearbyTabContent: React.FC<NearbyTabContentProps> = ({ nearbyEvents, handleEventClick }) => {
  const [selectedVenue, setSelectedVenue] = useState<Venue | null>(null);
  const [venueDialogOpen, setVenueDialogOpen] = useState(false);

  const venues: Venue[] = [
    { 
      name: "国家体育场", 
      distance: "1.2公里", 
      image: "https://picsum.photos/id/43/300/150",
      description: "国家体育场（鸟巢）是2008年北京奥运会的主场馆，可容纳91,000观众，是举办大型体育赛事和文化活动的理想场所。",
      facilities: ["停车场", "餐厅", "更衣室", "观众席"],
      address: "北京市朝阳区国家体育场南路1号",
      rating: 4.8
    },
    { 
      name: "奥林匹克公园", 
      distance: "2.5公里", 
      image: "https://picsum.photos/id/42/300/150",
      description: "奥林匹克公园是2008年奥运会的中心区域，包含多个体育场馆和休闲设施，是举办户外运动赛事的理想场地。",
      facilities: ["公共厕所", "餐饮区", "自行车道", "休息区"],
      address: "北京市朝阳区北辰东路15号",
      rating: 4.6
    },
    { 
      name: "五棵松体育馆", 
      distance: "3.8公里", 
      image: "https://picsum.photos/id/26/300/150",
      description: "五棵松体育馆是北京最现代化的室内体育馆之一，主要用于篮球比赛和演唱会，设施一流。",
      facilities: ["VIP包厢", "餐厅", "停车场", "公共交通"],
      address: "北京市海淀区复兴路69号",
      rating: 4.7
    },
    { 
      name: "水立方", 
      distance: "4.2公里", 
      image: "https://picsum.photos/id/29/300/150",
      description: "国家游泳中心（水立方）是2008年奥运会游泳比赛场馆，独特的外观和先进的设施使其成为北京标志性建筑之一。",
      facilities: ["更衣室", "餐厅", "停车场", "游泳池"],
      address: "北京市朝阳区天辰东路11号",
      rating: 4.9
    }
  ];

  const handleVenueClick = (venue: Venue) => {
    setSelectedVenue(venue);
    setVenueDialogOpen(true);
  };

  return (
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
          {venues.map((venue, idx) => (
            <div 
              key={idx} 
              className="flex bg-meituan-gray/50 rounded-lg overflow-hidden hover:bg-meituan-gray/70 transition-colors cursor-pointer"
              onClick={() => handleVenueClick(venue)}
            >
              <img src={venue.image} alt={venue.name} className="w-24 h-24 object-cover" />
              <div className="p-3 flex-1">
                <h4 className="font-medium">{venue.name}</h4>
                <p className="text-sm text-gray-500 mt-1">距离约 {venue.distance}</p>
                <div className="mt-2">
                  <span className="text-xs bg-meituan-blue/10 text-meituan-blue px-2 py-0.5 rounded-full">
                    查看详情
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Venue Detail Dialog */}
      <Dialog open={venueDialogOpen} onOpenChange={setVenueDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl">{selectedVenue?.name}</DialogTitle>
          </DialogHeader>
          
          <div className="mt-2">
            <img 
              src={selectedVenue?.image} 
              alt={selectedVenue?.name} 
              className="w-full h-48 object-cover rounded-md"
            />
            
            <Tabs defaultValue="info" className="mt-4">
              <TabsList className="grid grid-cols-3">
                <TabsTrigger value="info">场馆信息</TabsTrigger>
                <TabsTrigger value="facilities">设施服务</TabsTrigger>
                <TabsTrigger value="nearby">周边推荐</TabsTrigger>
              </TabsList>
              
              <TabsContent value="info" className="mt-4">
                <div className="space-y-3">
                  <p className="text-sm text-gray-600">{selectedVenue?.description}</p>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 text-gray-500 mr-1" />
                    <span className="text-sm">{selectedVenue?.address}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm font-medium mr-2">评分:</span>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span 
                          key={star}
                          className={`text-sm ${star <= (selectedVenue?.rating || 0) ? 'text-yellow-500' : 'text-gray-300'}`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                    <span className="ml-1 text-sm">{selectedVenue?.rating}</span>
                  </div>
                  <button className="flex items-center text-sm text-white bg-meituan-blue px-3 py-1 rounded-full">
                    <Navigation className="h-3 w-3 mr-1" />
                    查看路线
                  </button>
                </div>
              </TabsContent>
              
              <TabsContent value="facilities" className="mt-4">
                <div className="grid grid-cols-2 gap-2">
                  {selectedVenue?.facilities?.map((facility, idx) => (
                    <div key={idx} className="flex items-center p-2 bg-gray-50 rounded">
                      {facility.includes('停车') && <Car className="h-4 w-4 mr-2 text-meituan-blue" />}
                      {facility.includes('餐') && <Coffee className="h-4 w-4 mr-2 text-meituan-blue" />}
                      {!facility.includes('停车') && !facility.includes('餐') && (
                        <div className="w-4 h-4 rounded-full bg-meituan-blue/20 mr-2" />
                      )}
                      <span className="text-sm">{facility}</span>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="nearby" className="mt-4">
                <div className="space-y-3">
                  <div className="p-2 border rounded flex items-start">
                    <img 
                      src="https://picsum.photos/id/62/60/60" 
                      alt="餐厅" 
                      className="w-12 h-12 rounded mr-3" 
                    />
                    <div>
                      <h5 className="font-medium text-sm">运动员餐厅</h5>
                      <p className="text-xs text-gray-500">提供健康餐饮，距离场馆200米</p>
                      <div className="flex mt-1">
                        <span className="text-xs bg-meituan-orange/10 text-meituan-orange px-2 py-0.5 rounded-full">
                          4.8分
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-2 border rounded flex items-start">
                    <img 
                      src="https://picsum.photos/id/64/60/60" 
                      alt="咖啡店" 
                      className="w-12 h-12 rounded mr-3" 
                    />
                    <div>
                      <h5 className="font-medium text-sm">体育主题咖啡</h5>
                      <p className="text-xs text-gray-500">赛后放松好去处，距离场馆350米</p>
                      <div className="flex mt-1">
                        <span className="text-xs bg-meituan-orange/10 text-meituan-orange px-2 py-0.5 rounded-full">
                          4.6分
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default NearbyTabContent;
