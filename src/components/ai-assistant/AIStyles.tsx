
import React from 'react';

interface AIStylesProps {
  isExpanded: boolean;
}

const AIStyles: React.FC<AIStylesProps> = ({ isExpanded }) => {
  return (
    <style>
      {`
      .ai-assistant-bubble-container {
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 1000;
      }
      
      .ai-assistant-bubble {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(45deg, #ff9800, #1eaedb);
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
        border: none;
        cursor: pointer;
        transition: transform 0.2s;
      }
      
      .ai-assistant-bubble:hover {
        transform: scale(1.1);
      }
      
      .ai-character-container {
        transition: all 0.3s ease;
      }
      
      .ai-character-container.active {
        transform: translateX(-50%) translateY(-20px);
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
        transition: all 0.3s ease;
      }

      .ai-assistant-panel.expanded {
        width: 450px;
        max-height: 600px;
        bottom: 40px;
      }

      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
      }

      .animate-fade-in {
        animation: fadeIn 0.3s ease-out forwards;
      }
      `}
    </style>
  );
};

export default AIStyles;
