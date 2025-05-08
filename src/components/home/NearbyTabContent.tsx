
import React from 'react';
import { MapPin } from 'lucide-react';
import { Event } from '@/data/types';

interface NearbyTabContentProps {
  nearbyEvents: Event[];
  handleEventClick: (event: Event) => void;
}

const NearbyTabContent: React.FC<NearbyTabContentProps> = ({ nearbyEvents, handleEventClick }) => {
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
  );
};

export default NearbyTabContent;
