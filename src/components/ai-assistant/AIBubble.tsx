
import React from 'react';
import { MessageSquare, X, Mic } from 'lucide-react';
import AI3DCharacter from './AI3DCharacter';

interface AIBubbleProps {
  isOpen: boolean;
  onClick: () => void;
  isListening?: boolean;
  onVoiceToggle?: () => void;
}

const AIBubble: React.FC<AIBubbleProps> = ({ 
  isOpen, 
  onClick, 
  isListening = false,
  onVoiceToggle
}) => {
  return (
    <div className="ai-assistant-bubble-container relative">
      {!isOpen && (
        <div className="absolute -top-16 right-0 bg-white px-3 py-2 rounded-full shadow-md text-xs opacity-0 transition-opacity duration-300 hover:opacity-100">
          需要帮助? 点击我!
        </div>
      )}
      
      <button 
        className="ai-assistant-bubble relative"
        onClick={onClick}
        aria-label="AI助手"
      >
        <div className="relative">
          {isOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <>
              <MessageSquare className="h-6 w-6" />
              {/* Notification dot */}
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full animate-pulse"></span>
            </>
          )}
        </div>
      </button>
      
      {/* 3D Character */}
      <div className="absolute">
        <AI3DCharacter isOpen={isOpen} />
      </div>
      
      {isOpen && onVoiceToggle && (
        <button 
          className={`absolute -left-14 bottom-0 w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
            isListening ? 'bg-red-500 text-white' : 'bg-meituan-gray text-meituan-blue'
          }`}
          onClick={onVoiceToggle}
        >
          <Mic className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};

export default AIBubble;
