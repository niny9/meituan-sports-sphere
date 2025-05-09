
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Info, ShoppingBag, User } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

interface RecommendationCard {
  type: 'hotel' | 'restaurant' | 'transport' | 'ticket' | 'event' | 'venue' | 'guide';
  title: string;
  description: string;
  imageUrl?: string;
  actionText?: string;
  actionLink?: string;
}

interface AIStructuredResponseProps {
  recommendations?: RecommendationCard[];
  loading?: boolean;
}

const AIStructuredResponse: React.FC<AIStructuredResponseProps> = ({ 
  recommendations = [], 
  loading = false 
}) => {
  if (loading) {
    return (
      <div className="space-y-2">
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-20 w-full" />
      </div>
    );
  }
  
  if (recommendations.length === 0) return null;
  
  const getIcon = (type: string) => {
    switch (type) {
      case 'hotel': return <User className="h-4 w-4" />;
      case 'restaurant': return <ShoppingBag className="h-4 w-4" />;
      case 'transport': return <MapPin className="h-4 w-4" />;
      case 'ticket': return <Calendar className="h-4 w-4" />;
      case 'event': return <Calendar className="h-4 w-4" />;
      case 'venue': return <MapPin className="h-4 w-4" />;
      case 'guide': return <Info className="h-4 w-4" />;
      default: return <Info className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-2 mt-2">
      {recommendations.map((card, index) => (
        <Card key={index} className="p-3 hover:shadow-md transition-shadow">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 bg-meituan-orange/10 p-2 rounded-full">
              {getIcon(card.type)}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium mb-1 truncate">{card.title}</h4>
              <p className="text-xs text-gray-500 line-clamp-2">{card.description}</p>
              
              {card.actionText && (
                <Button 
                  variant="link" 
                  className="h-auto p-0 text-xs text-meituan-orange mt-1"
                >
                  {card.actionText}
                </Button>
              )}
            </div>
            {card.imageUrl && (
              <div className="flex-shrink-0 ml-2">
                <img 
                  src={card.imageUrl} 
                  alt={card.title} 
                  className="w-16 h-16 rounded object-cover"
                />
              </div>
            )}
          </div>
        </Card>
      ))}
    </div>
  );
};

export default AIStructuredResponse;
