
import React from 'react';
import AIStructuredResponse from './AIStructuredResponse';
import { Message } from './AIAssistantTypes';

interface AIMessageProps {
  text: string;
  fromUser: boolean;
  recommendations?: any[];
  zoomLevel?: number;
}

const AIMessage: React.FC<AIMessageProps> = ({ 
  text, 
  fromUser, 
  recommendations,
  zoomLevel = 1
}) => {
  return (
    <div 
      className={`mb-4 flex ${fromUser ? 'justify-end' : 'justify-start'}`}
      style={{ zoom: zoomLevel }}
    >
      <div 
        className={`max-w-[80%] p-3 rounded-lg ${
          fromUser 
            ? 'bg-meituan-blue/80 text-white rounded-br-none' 
            : 'bg-white border border-gray-100 rounded-bl-none'
        }`}
      >
        <p className="text-sm whitespace-pre-wrap">{text}</p>
        
        {!fromUser && recommendations && recommendations.length > 0 && (
          <AIStructuredResponse 
            recommendations={recommendations.map(rec => ({
              ...rec,
              actionLink: rec.type === 'event' ? `/event/${rec.id}?from=ai` : undefined
            }))} 
          />
        )}
      </div>
    </div>
  );
};

export default AIMessage;
