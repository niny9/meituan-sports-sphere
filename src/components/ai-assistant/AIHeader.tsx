
import React from 'react';
import { X, ZoomIn, ZoomOut, Maximize2, Minimize2 } from 'lucide-react';

interface AIHeaderProps {
  zoomIn: () => void;
  zoomOut: () => void;
  toggleExpanded: () => void;
  isExpanded: boolean;
  onClose: () => void;
}

const AIHeader: React.FC<AIHeaderProps> = ({
  zoomIn,
  zoomOut,
  toggleExpanded,
  isExpanded,
  onClose
}) => {
  return (
    <div className="ai-assistant-panel-header flex justify-between items-center bg-gradient-to-r from-meituan-blue to-meituan-blue/80 text-white px-4 py-3 cursor-move">
      <div className="text-sm font-medium">美团体育赛事智能助手</div>
      <div className="flex items-center space-x-2">
        <button 
          onClick={zoomOut}
          className="text-white/70 hover:text-white transition-colors"
          aria-label="缩小"
        >
          <ZoomOut className="h-4 w-4" />
        </button>
        <button 
          onClick={zoomIn}
          className="text-white/70 hover:text-white transition-colors"
          aria-label="放大"
        >
          <ZoomIn className="h-4 w-4" />
        </button>
        <button 
          onClick={toggleExpanded}
          className="text-white/70 hover:text-white transition-colors"
          aria-label={isExpanded ? "收起" : "展开"}
        >
          {isExpanded ? (
            <Minimize2 className="h-4 w-4" />
          ) : (
            <Maximize2 className="h-4 w-4" />
          )}
        </button>
        <button 
          onClick={onClose}
          className="text-white/70 hover:text-white transition-colors"
          aria-label="关闭"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default AIHeader;
