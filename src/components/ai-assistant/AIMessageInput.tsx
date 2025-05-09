
import React, { useState, useEffect, useRef } from 'react';
import { Send, Mic, MicOff } from 'lucide-react';

interface AIMessageInputProps {
  onSendMessage: (message: string) => void;
  isListening?: boolean;
  onVoiceToggle?: () => void;
}

const AIMessageInput: React.FC<AIMessageInputProps> = ({ 
  onSendMessage, 
  isListening = false,
  onVoiceToggle 
}) => {
  const [inputText, setInputText] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Focus input when listening state changes
  useEffect(() => {
    if (!isListening && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isListening]);
  
  const handleSend = () => {
    if (!inputText.trim()) return;
    onSendMessage(inputText);
    setInputText('');
  };

  return (
    <div className="flex items-center">
      {onVoiceToggle && (
        <button
          type="button"
          onClick={onVoiceToggle}
          className={`mr-2 p-2 rounded-full transition-colors ${
            isListening ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-600'
          }`}
        >
          {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
        </button>
      )}
      
      <input
        ref={inputRef}
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
        placeholder={isListening ? "正在聆听..." : "输入您的问题..."}
        disabled={isListening}
        className="flex-1 border rounded-l-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-meituan-orange"
      />
      
      <button
        onClick={handleSend}
        disabled={!inputText.trim() || isListening}
        className="bg-meituan-orange text-white px-4 py-2 rounded-r-lg disabled:opacity-50"
      >
        <Send className="h-4 w-4" />
      </button>
    </div>
  );
};

export default AIMessageInput;
