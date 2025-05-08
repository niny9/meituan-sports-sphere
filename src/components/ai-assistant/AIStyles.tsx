
import React from 'react';

interface AIStylesProps {
  isExpanded: boolean;
}

const AIStyles: React.FC<AIStylesProps> = ({ isExpanded }) => {
  return (
    <style>
      {`
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
        transition: all 0.3s ease;
      }

      .ai-assistant-panel.expanded {
        width: 450px;
        max-height: 600px;
        bottom: 40px;
      }
      `}
    </style>
  );
};

export default AIStyles;
