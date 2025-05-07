
import React from 'react';
import { Hotel, UtensilsCrossed, Car, MapPin, MessageSquare } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';

interface Recommendation {
  type: 'hotel' | 'restaurant' | 'transport' | 'ticket';
  title: string;
  description: string;
}

interface AIMessageProps {
  text: string;
  fromUser: boolean;
  recommendations?: Recommendation[];
  zoomLevel: number;
}

const AIMessage: React.FC<AIMessageProps> = ({ text, fromUser, recommendations, zoomLevel }) => {
  // Get recommendation icon by type
  const getRecommendationIcon = (type: string) => {
    switch(type) {
      case 'hotel':
        return <Hotel className="h-4 w-4 text-blue-500" />;
      case 'restaurant':
        return <UtensilsCrossed className="h-4 w-4 text-amber-500" />;
      case 'transport':
        return <Car className="h-4 w-4 text-green-500" />;
      case 'ticket':
        return <MapPin className="h-4 w-4 text-purple-500" />;
      default:
        return <MessageSquare className="h-4 w-4" />;
    }
  };

  return (
    <div 
      className={`mb-4 ${fromUser ? 'ml-auto' : 'mr-auto'} ${fromUser ? 'max-w-[90%]' : 'max-w-[95%]'}`}
      style={{ transform: `scale(${zoomLevel})`, transformOrigin: fromUser ? 'right bottom' : 'left bottom', transition: 'transform 0.2s ease' }}
    >
      <div 
        className={`p-3 rounded-lg ${
          fromUser 
            ? 'bg-meituan-blue text-white rounded-br-none' 
            : 'bg-white text-gray-700 shadow-sm rounded-bl-none'
        }`}
      >
        {text}
        
        {/* Show recommendations if available */}
        {recommendations && (
          <div className="mt-3 space-y-2">
            {recommendations.map((rec, idx) => (
              <Card key={idx} className="bg-white border-gray-200">
                <CardContent className="p-3">
                  <div className="flex items-center gap-2">
                    {getRecommendationIcon(rec.type)}
                    <div>
                      <h5 className="text-sm font-medium text-meituan-blue">{rec.title}</h5>
                      <p className="text-xs text-gray-500">{rec.description}</p>
                    </div>
                  </div>
                  <div className="flex justify-end mt-2">
                    <button 
                      onClick={() => {
                        toast({
                          title: "查看详情",
                          description: `正在跳转到${rec.title}详情页面`
                        });
                      }}
                      className="text-xs text-meituan-blue hover:underline"
                    >
                      查看详情 →
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AIMessage;
