
import React from 'react';

interface AIStylesProps {
  isExpanded?: boolean;
}

const AIStyles: React.FC<AIStylesProps> = ({ isExpanded }) => {
  return (
    <style>
      {`
        .ai-assistant-bubble {
          position: fixed;
          right: 1rem;
          bottom: 1rem;
          width: 3rem;
          height: 3rem;
          background: #FF9E2C;
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          z-index: 1000;
          transition: all 0.3s ease;
        }
        
        .ai-assistant-bubble:hover {
          transform: scale(1.05);
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
        }
        
        .ai-assistant-bubble-container {
          position: fixed;
          right: 1rem;
          bottom: 1rem;
          z-index: 1000;
        }
        
        .ai-assistant-panel {
          position: fixed;
          right: 1rem;
          bottom: 5rem;
          width: ${isExpanded ? '600px' : '360px'};
          border-radius: 0.75rem;
          background: white;
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.15);
          display: flex;
          flex-direction: column;
          z-index: 999;
          transition: width 0.3s ease, height 0.3s ease, opacity 0.3s ease, transform 0.3s ease;
          resize: both;
          overflow: hidden;
          min-width: 300px;
          min-height: 400px;
          max-width: calc(100vw - 2rem);
          max-height: calc(100vh - 7rem);
        }
        
        .ai-assistant-panel.expanded {
          width: calc(100vw - 2rem);
          height: calc(100vh - 7rem);
        }
        
        .ai-assistant-panel-header {
          padding: 0.75rem 1rem;
          background: #2F455C;
          color: white;
          border-top-left-radius: 0.75rem;
          border-top-right-radius: 0.75rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          cursor: move;
          user-select: none;
        }
        
        .ai-assistant-panel-body {
          flex: 1;
          overflow-y: auto;
          padding: 1rem;
        }
        
        .animate-fade-in {
          animation: fadeIn 0.3s ease-in-out;
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        /* 当AI助手浮窗打开时，调整页面其他元素的交互 */
        body:has(.ai-assistant-panel) {
          overflow: auto;
        }
        
        /* 移动端适配 */
        @media (max-width: 640px) {
          .ai-assistant-panel {
            width: 100%;
            height: 80%;
            right: 0;
            bottom: 0;
            border-radius: 1rem 1rem 0 0;
            max-width: 100%;
          }
          
          .ai-assistant-panel.expanded {
            width: 100%;
            height: 100%;
            border-radius: 0;
          }
        }
      `}
    </style>
  );
};

export default AIStyles;
