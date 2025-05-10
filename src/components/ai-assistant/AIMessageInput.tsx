
import React, { useState, KeyboardEvent } from 'react';
import { Send, Mic } from 'lucide-react';

interface AIMessageInputProps {
  onSendMessage: (message: string) => void;
  isListening?: boolean;
  onVoiceToggle?: () => void;
}

const AIMessageInput: React.FC<AIMessageInputProps> = ({ 
  onSendMessage,
  isListening,
  onVoiceToggle 
}) => {
  const [inputMessage, setInputMessage] = useState('');

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && inputMessage.trim()) {
      handleSend();
    }
  };

  const handleSend = () => {
    if (inputMessage.trim()) {
      onSendMessage(inputMessage);
      setInputMessage('');
    }
  };

  return (
    <div className="flex items-center bg-white border rounded-lg overflow-hidden">
      {onVoiceToggle && (
        <button 
          className={`p-2 ${isListening ? 'text-red-500' : 'text-meituan-blue/70'} hover:bg-gray-100`}
          onClick={onVoiceToggle}
        >
          <Mic className="h-5 w-5" />
        </button>
      )}
      <input
        type="text"
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="问我任何赛事相关问题..."
        className="flex-1 px-4 py-2 outline-none text-sm"
      />
      <button 
        className={`p-2 ${inputMessage.trim() ? 'text-meituan-orange' : 'text-gray-400'} hover:bg-gray-100`}
        onClick={handleSend}
        disabled={!inputMessage.trim()}
      >
        <Send className="h-5 w-5" />
      </button>
    </div>
  );
};

export default AIMessageInput;
