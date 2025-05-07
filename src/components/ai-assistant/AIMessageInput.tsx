
import React, { useState } from 'react';
import { Send } from 'lucide-react';

interface AIMessageInputProps {
  onSendMessage: (message: string) => void;
}

const AIMessageInput: React.FC<AIMessageInputProps> = ({ onSendMessage }) => {
  const [inputText, setInputText] = useState('');
  
  const handleSend = () => {
    if (!inputText.trim()) return;
    onSendMessage(inputText);
    setInputText('');
  };

  return (
    <div className="flex items-center">
      <input
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
        placeholder="输入您的问题..."
        className="flex-1 border rounded-l-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-meituan-orange"
      />
      <button
        onClick={handleSend}
        disabled={!inputText.trim()}
        className="bg-meituan-orange text-white px-4 py-2 rounded-r-lg disabled:opacity-50"
      >
        <Send className="h-4 w-4" />
      </button>
    </div>
  );
};

export default AIMessageInput;
