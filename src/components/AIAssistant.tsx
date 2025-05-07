
import React, { useState, useEffect } from 'react';
import { toast } from '@/hooks/use-toast';
import AIBubble from './ai-assistant/AIBubble';
import AIPanel from './ai-assistant/AIPanel';
import AIStyles from './ai-assistant/AIStyles';
import { Message } from './ai-assistant/AIAssistantTypes';

const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "您好！我是美团体育赛事智能助手，有什么可以帮您的吗？", fromUser: false },
  ]);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isExpanded, setIsExpanded] = useState(false);

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

  const handleSendMessage = (inputText: string) => {
    if (!inputText.trim()) return;
    
    // Add user message
    const userMessageId = Date.now();
    setMessages([...messages, { id: userMessageId, text: inputText, fromUser: true }]);
    
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
    // Auto-send the suggestion
    handleSendMessage(suggestion);
  };

  // Handle zoom in
  const zoomIn = () => {
    if (zoomLevel < 1.5) {
      setZoomLevel(prevZoom => prevZoom + 0.1);
    }
  };

  // Handle zoom out
  const zoomOut = () => {
    if (zoomLevel > 0.8) {
      setZoomLevel(prevZoom => prevZoom - 0.1);
    }
  };

  // Toggle expanded view
  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      <AIBubble isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
      
      {isOpen && (
        <AIPanel 
          messages={messages}
          isExpanded={isExpanded}
          zoomLevel={zoomLevel}
          onSendMessage={handleSendMessage}
          onSuggestionClick={handleSuggestionClick}
          zoomIn={zoomIn}
          zoomOut={zoomOut}
          toggleExpanded={toggleExpanded}
          onClose={() => setIsOpen(false)}
        />
      )}

      <AIStyles isExpanded={isExpanded} />
    </>
  );
};

export default AIAssistant;
