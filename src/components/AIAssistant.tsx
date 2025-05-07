
import React, { useState } from 'react';
import { MessageSquare, X, Send } from 'lucide-react';
import { aiSuggestions } from '../data/mockData';
import { toast } from '@/components/ui/use-toast';

const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState<{ id: number; text: string; fromUser: boolean }[]>([
    { id: 1, text: "您好！我是美团体育赛事智能助手，有什么可以帮您的吗？", fromUser: false },
  ]);

  const handleSendMessage = () => {
    if (!inputText.trim()) return;
    
    // Add user message
    const userMessageId = Date.now();
    setMessages([...messages, { id: userMessageId, text: inputText, fromUser: true }]);
    setInputText('');
    
    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "好的，正在为您查询相关信息...",
        "已为您找到相关赛事和服务推荐，请查看下方卡片。",
        "根据您的位置和兴趣，我推荐您关注即将到来的北京国际马拉松赛事。",
        "了解更多详情，您可以点击赛事卡片进入详情页面。"
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      setMessages(prev => [...prev, { id: userMessageId + 1, text: randomResponse, fromUser: false }]);
      
      toast({
        title: "AI助手提示",
        description: "已为您生成相关赛事推荐",
      });
    }, 1000);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputText(suggestion);
    // Optionally auto-send the suggestion
    setMessages([...messages, { id: Date.now(), text: suggestion, fromUser: true }]);
    
    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        id: Date.now() + 1, 
        text: "正在为您处理这个请求，请稍候...", 
        fromUser: false 
      }]);
    }, 500);
  };

  return (
    <>
      {/* AI Assistant Bubble */}
      <button 
        className="ai-assistant-bubble"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="AI助手"
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <MessageSquare className="h-6 w-6" />
        )}
      </button>
      
      {/* AI Assistant Panel */}
      {isOpen && (
        <div className="ai-assistant-panel animate-fade-in">
          <div className="bg-gradient-to-r from-meituan-orange to-meituan-blue p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center">
                  <MessageSquare className="h-5 w-5 text-meituan-orange" />
                </div>
                <h3 className="ml-2 font-medium text-white">体育赛事AI助手</h3>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-gray-200"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
          
          <div className="h-80 overflow-y-auto p-4 bg-gray-50">
            {messages.map((msg) => (
              <div 
                key={msg.id}
                className={`mb-4 max-w-[80%] ${msg.fromUser ? 'ml-auto' : 'mr-auto'}`}
              >
                <div 
                  className={`p-3 rounded-lg ${
                    msg.fromUser 
                      ? 'bg-meituan-blue text-white rounded-br-none' 
                      : 'bg-white text-gray-700 shadow-sm rounded-bl-none'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
          
          <div className="p-3 border-t">
            <h4 className="text-xs text-gray-500 mb-2">快速提问:</h4>
            <div className="flex flex-wrap gap-2 mb-3">
              {aiSuggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="text-xs bg-meituan-gray text-meituan-blue px-3 py-1 rounded-full hover:bg-meituan-blue hover:text-white transition-colors"
                >
                  {suggestion}
                </button>
              ))}
            </div>
            
            <div className="flex items-center">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="输入您的问题..."
                className="flex-1 border rounded-l-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-meituan-orange"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputText.trim()}
                className="bg-meituan-orange text-white px-4 py-2 rounded-r-lg disabled:opacity-50"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AIAssistant;
