
import React from 'react';
import { MessageSquare, ZoomIn, ZoomOut, Maximize, Minimize, X } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
    <div className="bg-gradient-to-r from-meituan-orange to-meituan-blue p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center">
            <MessageSquare className="h-5 w-5 text-meituan-orange" />
          </div>
          <h3 className="ml-2 font-medium text-white">体育赛事AI助手</h3>
        </div>
        <div className="flex items-center space-x-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    zoomOut();
                  }}
                  className="text-white hover:text-gray-200 p-1"
                  aria-label="缩小"
                >
                  <ZoomOut className="h-4 w-4" />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>缩小</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    zoomIn();
                  }}
                  className="text-white hover:text-gray-200 p-1"
                  aria-label="放大"
                >
                  <ZoomIn className="h-4 w-4" />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>放大</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleExpanded();
                  }}
                  className="text-white hover:text-gray-200 p-1"
                  aria-label={isExpanded ? "收起" : "展开"}
                >
                  {isExpanded ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{isExpanded ? "收起" : "展开"}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <button 
            onClick={onClose}
            className="text-white hover:text-gray-200 p-1"
            aria-label="关闭"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIHeader;
