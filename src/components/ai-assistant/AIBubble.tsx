
import React from 'react';
import { MessageSquare, X } from 'lucide-react';

interface AIBubbleProps {
  isOpen: boolean;
  onClick: () => void;
}

const AIBubble: React.FC<AIBubbleProps> = ({ isOpen, onClick }) => {
  return (
    <button 
      className="ai-assistant-bubble relative"
      onClick={onClick}
      aria-label="AI助手"
    >
      {isOpen ? (
        <X className="h-6 w-6" />
      ) : (
        <>
          <MessageSquare className="h-6 w-6" />
          {/* Notification dot */}
          <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full animate-pulse"></span>
        </>
      )}
    </button>
  );
};

export default AIBubble;
