
import React, { useState, useEffect } from 'react';
import { MessageSquare, X, Send, Hotel, MapPin, Car, UtensilsCrossed } from 'lucide-react';
import { aiSuggestions, services } from '../data/mockData';
import { toast } from '@/components/ui/use-toast';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';

interface Message {
  id: number;
  text: string;
  fromUser: boolean;
  recommendations?: Array<{
    type: 'hotel' | 'restaurant' | 'transport' | 'ticket';
    title: string;
    description: string;
  }>;
}

const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "您好！我是美团体育赛事智能助手，有什么可以帮您的吗？", fromUser: false },
  ]);

  // Automatically pulse notification to engage users
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen) {
        toast({
          title: "体育赛事推荐",
          description: "北京国际马拉松赛事报名即将截止，点击查看详情",
        });
      }
    }, 10000);
    return () => clearTimeout(timer);
  }, [isOpen]);

  const handleSendMessage = () => {
    if (!inputText.trim()) return;
    
    // Add user message
    const userMessageId = Date.now();
    setMessages([...messages, { id: userMessageId, text: inputText, fromUser: true }]);
    setInputText('');
    
    // Simulate AI response
    setTimeout(() => {
      // Check if the message contains keywords to trigger specific responses
      if (inputText.includes('住宿') || inputText.includes('酒店')) {
        setMessages(prev => [...prev, { 
          id: userMessageId + 1, 
          text: "根据您的需求，我为您找到了赛事附近的优质酒店推荐：", 
          fromUser: false,
          recommendations: [
            {
              type: 'hotel',
              title: '赛事优选酒店',
              description: '距离赛事起点仅500米，提供赛事专属早餐和接驳车服务'
            },
            {
              type: 'hotel',
              title: '经济实惠酒店',
              description: '性价比高，配有健身设施，适合赛前调整'
            }
          ]
        }]);
      } else if (inputText.includes('餐饮') || inputText.includes('餐厅')) {
        setMessages(prev => [...prev, { 
          id: userMessageId + 1, 
          text: "为您推荐赛事周边的餐饮服务：", 
          fromUser: false,
          recommendations: [
            {
              type: 'restaurant',
              title: '运动能量餐厅',
              description: '专为运动员设计的能量补充餐，富含蛋白质和碳水'
            },
            {
              type: 'restaurant',
              title: '赛后放松茶餐厅',
              description: '提供舒适环境和健康饮食，适合赛后恢复'
            }
          ]
        }]);
      } else if (inputText.includes('交通') || inputText.includes('到达')) {
        setMessages(prev => [...prev, { 
          id: userMessageId + 1, 
          text: "以下是赛事交通方案推荐：", 
          fromUser: false,
          recommendations: [
            {
              type: 'transport',
              title: '赛事专线大巴',
              description: '从市中心各点出发，直达赛事现场，避开拥堵'
            },
            {
              type: 'transport',
              title: '共享出行服务',
              description: '预约专车接送，享受赛事参与者专属折扣'
            }
          ]
        }]);
      } else if (inputText.includes('票') || inputText.includes('报名')) {
        setMessages(prev => [...prev, { 
          id: userMessageId + 1, 
          text: "关于赛事报名和门票信息：", 
          fromUser: false,
          recommendations: [
            {
              type: 'ticket',
              title: '标准参赛套餐',
              description: '包含参赛名额、官方T恤、完赛奖牌等'
            },
            {
              type: 'ticket',
              title: 'VIP观赛体验',
              description: '专属观赛区域，赛后与选手互动机会，含餐饮服务'
            }
          ]
        }]);
      } else {
        const responses = [
          "好的，正在为您查询相关信息...",
          "已为您找到相关赛事和服务推荐，请查看下方卡片。",
          "根据您的位置和兴趣，我推荐您关注即将到来的北京国际马拉松赛事。",
          "了解更多详情，您可以点击赛事卡片进入详情页面。"
        ];
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        setMessages(prev => [...prev, { id: userMessageId + 1, text: randomResponse, fromUser: false }]);
      }
      
      toast({
        title: "AI助手提示",
        description: "已为您生成相关推荐",
      });
    }, 1000);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputText(suggestion);
    // Auto-send the suggestion
    setTimeout(() => {
      handleSendMessage();
    }, 100);
  };

  // Get recommendation icon by type
  const getRecommendationIcon = (type: string) => {
    switch(type) {
      case 'hotel':
        return <Hotel className="h-4 w-4 text-blue-500" />;
      case 'restaurant':
        return <UtensilsCrossed className="h-4 w-4 text-amber-500" />;
      case 'transport':
        return <Car className="h-4 w-4 text-green-500" />;
      case 'ticket':
        return <MapPin className="h-4 w-4 text-purple-500" />;
      default:
        return <MessageSquare className="h-4 w-4" />;
    }
  };

  return (
    <>
      {/* AI Assistant Bubble with notification dot */}
      <button 
        className="ai-assistant-bubble relative"
        onClick={() => setIsOpen(!isOpen)}
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
                className={`mb-4 max-w-[90%] ${msg.fromUser ? 'ml-auto' : 'mr-auto'}`}
              >
                <div 
                  className={`p-3 rounded-lg ${
                    msg.fromUser 
                      ? 'bg-meituan-blue text-white rounded-br-none' 
                      : 'bg-white text-gray-700 shadow-sm rounded-bl-none'
                  }`}
                >
                  {msg.text}
                  
                  {/* Show recommendations if available */}
                  {msg.recommendations && (
                    <div className="mt-3 space-y-2">
                      {msg.recommendations.map((rec, idx) => (
                        <Card key={idx} className="bg-white border-gray-200">
                          <CardContent className="p-3">
                            <div className="flex items-center gap-2">
                              {getRecommendationIcon(rec.type)}
                              <div>
                                <h5 className="text-sm font-medium text-meituan-blue">{rec.title}</h5>
                                <p className="text-xs text-gray-500">{rec.description}</p>
                              </div>
                            </div>
                            <div className="flex justify-end mt-2">
                              <button 
                                onClick={() => {
                                  toast({
                                    title: "查看详情",
                                    description: `正在跳转到${rec.title}详情页面`
                                  });
                                }}
                                className="text-xs text-meituan-blue hover:underline"
                              >
                                查看详情 →
                              </button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
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

      <style>{`
        .ai-assistant-bubble {
          position: fixed;
          bottom: 20px;
          right: 20px;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: linear-gradient(45deg, #ff9800, #1eaedb);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
          z-index: 1000;
          border: none;
          cursor: pointer;
          transition: transform 0.2s;
        }
        
        .ai-assistant-bubble:hover {
          transform: scale(1.1);
        }
        
        .ai-assistant-panel {
          position: fixed;
          bottom: 80px;
          right: 20px;
          width: 350px;
          max-height: 500px;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
          z-index: 1000;
          display: flex;
          flex-direction: column;
          background-color: white;
        }
      `}</style>
    </>
  );
};

export default AIAssistant;
