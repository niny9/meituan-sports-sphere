
import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import AIMessage from './AIMessage';
import AIHeader from './AIHeader';
import AIMessageInput from './AIMessageInput';
import AISuggestions from './AISuggestions';
import { Message } from './AIAssistantTypes';

interface AIPanelProps {
  messages: Message[];
  isExpanded: boolean;
  zoomLevel: number;
  onSendMessage: (message: string) => void;
  onSuggestionClick: (suggestion: string) => void;
  zoomIn: () => void;
  zoomOut: () => void;
  toggleExpanded: () => void;
  onClose: () => void;
}

const AIPanel: React.FC<AIPanelProps> = ({
  messages,
  isExpanded,
  zoomLevel,
  onSendMessage,
  onSuggestionClick,
  zoomIn,
  zoomOut,
  toggleExpanded,
  onClose
}) => {
  return (
    <div className={`ai-assistant-panel ${isExpanded ? 'expanded' : ''} animate-fade-in`}>
      <AIHeader 
        zoomIn={zoomIn}
        zoomOut={zoomOut}
        toggleExpanded={toggleExpanded}
        isExpanded={isExpanded}
        onClose={onClose}
      />
      
      <ScrollArea className="h-80 overflow-y-auto bg-gray-50">
        <div className="p-4">
          {messages.map((msg) => (
            <AIMessage 
              key={msg.id}
              text={msg.text}
              fromUser={msg.fromUser}
              recommendations={msg.recommendations}
              zoomLevel={zoomLevel}
            />
          ))}
        </div>
      </ScrollArea>
      
      <div className="p-3 border-t">
        <AISuggestions onSuggestionClick={onSuggestionClick} />
        <AIMessageInput onSendMessage={onSendMessage} />
      </div>
    </div>
  );
};

export default AIPanel;
