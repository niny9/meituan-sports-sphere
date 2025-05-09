import React, { useState, useEffect, useRef } from 'react';
import { toast } from '@/hooks/use-toast';
import AIBubble from './ai-assistant/AIBubble';
import AIPanel from './ai-assistant/AIPanel';
import AIStyles from './ai-assistant/AIStyles';
import { Message, Recommendation } from './ai-assistant/AIAssistantTypes';
// Import types from our declaration file
import type { SpeechRecognition, SpeechRecognitionEvent, SpeechRecognitionErrorEvent } from '../types/web-speech-api';

const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "您好！我是美团体育赛事智能助手，有什么可以帮您的吗？", fromUser: false },
  ]);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isListening, setIsListening] = useState(false);
  
  // Web Speech API recognition
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  
  // Initialize speech recognition
  useEffect(() => {
    // Check if browser supports speech recognition
    const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (SpeechRecognitionAPI) {
      recognitionRef.current = new SpeechRecognitionAPI();
      recognitionRef.current.continuous = false;
      recognitionRef.current.lang = 'zh-CN';
      recognitionRef.current.interimResults = false;
      recognitionRef.current.maxAlternatives = 1;
      
      recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
        const transcript = event.results[0][0].transcript;
        handleSendMessage(transcript);
        setIsListening(false);
      };
      
      recognitionRef.current.onerror = (event: SpeechRecognitionErrorEvent) => {
        console.error('Speech recognition error', event.error);
        setIsListening(false);
        
        toast({
          title: "语音识别失败",
          description: "请重试或使用键盘输入",
        });
      };
      
      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
    
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, []);

  // Toggle voice recognition
  const handleVoiceToggle = () => {
    if (!recognitionRef.current) {
      toast({
        title: "您的浏览器不支持语音识别",
        description: "请使用Chrome或Edge浏览器",
      });
      return;
    }
    
    if (isListening) {
      recognitionRef.current.abort();
      setIsListening(false);
    } else {
      setIsListening(true);
      recognitionRef.current.start();
      
      toast({
        title: "语音识别已启动",
        description: "请说出您的问题",
      });
    }
  };

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
          text: "根据您的需求，我为您���到了赛事附近的优质酒店推荐：", 
          fromUser: false,
          recommendations: [
            {
              type: 'hotel',
              title: '赛事优选酒店',
              description: '距离赛事起点仅500米，提供赛事专属早餐和接驳车服务',
              imageUrl: 'https://picsum.photos/id/42/100/100',
              actionText: '查看详情'
            },
            {
              type: 'hotel',
              title: '经济实惠酒店',
              description: '性价比高，配有健身设施，适合赛前调整',
              imageUrl: 'https://picsum.photos/id/43/100/100',
              actionText: '查看详情'
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
              description: '专为运动员设计的能量补充餐，富含蛋白质和碳水',
              imageUrl: 'https://picsum.photos/id/54/100/100',
              actionText: '查看菜单'
            },
            {
              type: 'restaurant',
              title: '赛后放松茶餐厅',
              description: '提供舒适环境和健康饮食，适合赛后恢复',
              imageUrl: 'https://picsum.photos/id/56/100/100',
              actionText: '查看菜单'
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
              description: '从市中心各点出发，直达赛事现场，避开拥堵',
              imageUrl: 'https://picsum.photos/id/36/100/100',
              actionText: '查看路线'
            },
            {
              type: 'transport',
              title: '共享出行服务',
              description: '预约专车接送，享受赛事参与者专属折扣',
              imageUrl: 'https://picsum.photos/id/37/100/100',
              actionText: '立即预约'
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
              description: '包含参赛名额、官方T恤、完赛奖牌等',
              imageUrl: 'https://picsum.photos/id/20/100/100',
              actionText: '立即报名'
            },
            {
              type: 'ticket',
              title: 'VIP观赛体验',
              description: '专属观赛区域，赛后与选手互动机会，含餐饮服务',
              imageUrl: 'https://picsum.photos/id/21/100/100',
              actionText: '购买门票'
            }
          ]
        }]);
      } else if (inputText.includes('场馆') || inputText.includes('设施')) {
        setMessages(prev => [...prev, { 
          id: userMessageId + 1, 
          text: "以下是赛事相关场馆信息：", 
          fromUser: false,
          recommendations: [
            {
              type: 'venue',
              title: '国家体育场',
              description: '拥有完善的运动设施和观众席位，交通便利',
              imageUrl: 'https://picsum.photos/id/26/100/100',
              actionText: '查看详情'
            },
            {
              type: 'venue',
              title: '奥林匹克公园',
              description: '赛事起点位置，周边配套设施齐全，环境优美',
              imageUrl: 'https://picsum.photos/id/29/100/100',
              actionText: '查看路线'
            }
          ]
        }]);
      } else if (inputText.includes('攻略') || inputText.includes('指南')) {
        setMessages(prev => [...prev, { 
          id: userMessageId + 1, 
          text: "为您提供赛事相关攻略：", 
          fromUser: false,
          recommendations: [
            {
              type: 'guide',
              title: '初次马拉松比赛指南',
              description: '包含训练计划、装备选择、参赛注意事项等全面内容',
              imageUrl: 'https://picsum.photos/id/17/100/100',
              actionText: '阅读全文'
            },
            {
              type: 'guide',
              title: '赛事周边游玩攻略',
              description: '赛后放松、景点推荐、美食指南一应俱全',
              imageUrl: 'https://picsum.photos/id/18/100/100',
              actionText: '阅读全文'
            }
          ]
        }]);
      } else if (inputText.includes('赛事') || inputText.includes('比赛')) {
        setMessages(prev => [...prev, { 
          id: userMessageId + 1, 
          text: "为您推荐近期热门赛事：", 
          fromUser: false,
          recommendations: [
            {
              type: 'event',
              title: '北京国际马拉松',
              description: '9月15日开赛，经过天安门、奥林匹克公园等标志性景点',
              imageUrl: 'https://picsum.photos/id/29/100/100',
              actionText: '查看详情'
            },
            {
              type: 'event',
              title: '城市定向挑战赛',
              description: '10月5日举行，融合运动与城市探索，适合全家参与',
              imageUrl: 'https://picsum.photos/id/26/100/100',
              actionText: '查看详情'
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
        
        // Create some general recommendations
        const generalRecommendations: Recommendation[] = [
          {
            type: 'event',
            title: '热门赛事推荐',
            description: '根据您的兴趣，为您精选了3场即将开始的体育赛事',
            actionText: '查看全部'
          },
          {
            type: 'guide',
            title: '赛事参与指南',
            description: '从报名到完赛的全流程攻略，助您轻松参与',
            actionText: '查看详情'
          }
        ];
        
        setMessages(prev => [...prev, { 
          id: userMessageId + 1, 
          text: randomResponse, 
          fromUser: false,
          recommendations: generalRecommendations
        }]);
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
      <AIBubble 
        isOpen={isOpen} 
        onClick={() => setIsOpen(!isOpen)} 
        isListening={isListening}
        onVoiceToggle={handleVoiceToggle}
      />
      
      {isOpen && (
        <AIPanel 
          messages={messages}
          isExpanded={isExpanded}
          zoomLevel={zoomLevel}
          onSendMessage={handleSendMessage}
          onSuggestionClick={handleSuggestionClick}
          isListening={isListening}
          onVoiceToggle={handleVoiceToggle}
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
