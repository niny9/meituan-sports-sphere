
import React from 'react';
import { Avatar } from '@/components/ui/avatar';
import AIStructuredResponse from './AIStructuredResponse';

interface AIMessageProps {
  text: string;
  fromUser: boolean;
  recommendations?: Array<{
    type: 'hotel' | 'restaurant' | 'transport' | 'ticket' | 'event' | 'venue' | 'guide';
    title: string;
    description: string;
    imageUrl?: string;
    actionText?: string;
    actionLink?: string;
  }>;
  zoomLevel: number;
}

const AIMessage: React.FC<AIMessageProps> = ({ 
  text, 
  fromUser, 
  recommendations = [],
  zoomLevel
}) => {
  // Apply zoom level to text
  const textStyle = {
    fontSize: `${14 * zoomLevel}px`,
  };
  
  return (
    <div className={`flex ${fromUser ? 'justify-end' : 'justify-start'} mb-4`}>
      {!fromUser && (
        <Avatar className="w-8 h-8 mr-2 bg-meituan-orange text-white">
          <span className="text-xs">AI</span>
        </Avatar>
      )}
      
      <div 
        className={`max-w-[75%] ${
          fromUser 
            ? 'bg-meituan-blue text-white rounded-tl-lg rounded-tr-lg rounded-bl-lg' 
            : 'bg-gray-100 text-gray-800 rounded-tl-lg rounded-tr-lg rounded-br-lg'
        } px-3 py-2`}
      >
        <p style={textStyle}>{text}</p>
        
        {!fromUser && recommendations.length > 0 && (
          <AIStructuredResponse recommendations={recommendations} />
        )}
      </div>
      
      {fromUser && (
        <Avatar className="w-8 h-8 ml-2 bg-gray-400 text-white">
          <span className="text-xs">您</span>
        </Avatar>
      )}
    </div>
  );
};

export default AIMessage;
