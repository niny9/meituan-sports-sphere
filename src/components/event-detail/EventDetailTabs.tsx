
import React from 'react';
import { useSearchParams } from 'react-router-dom';

interface EventDetailTabsProps {
  activeTab: string;
  handleTabChange: (tab: string) => void;
}

const EventDetailTabs: React.FC<EventDetailTabsProps> = ({ 
  activeTab,
  handleTabChange
}) => {
  return (
    <div className="border-b sticky top-0 bg-white z-10">
      <nav aria-label="Event detail navigation">
        <div className="flex">
          <button 
            className={`px-4 py-3 text-sm font-medium transition-all ${activeTab === 'details' 
              ? 'text-[#FFD256] border-b-2 border-[#FFD256]' 
              : 'text-gray-500 hover:text-[#FFD256]/70'}`}
            onClick={() => handleTabChange('details')}
            aria-current={activeTab === 'details' ? 'page' : undefined}
            aria-label="赛事详情"
          >
            赛事详情
          </button>
          <button 
            className={`px-4 py-3 text-sm font-medium transition-all ${activeTab === 'services' 
              ? 'text-[#FFD256] border-b-2 border-[#FFD256]' 
              : 'text-gray-500 hover:text-[#FFD256]/70'}`}
            onClick={() => handleTabChange('services')}
            aria-current={activeTab === 'services' ? 'page' : undefined}
            aria-label="周边服务"
          >
            周边服务
          </button>
          <button 
            className={`px-4 py-3 text-sm font-medium transition-all ${activeTab === 'planning' 
              ? 'text-[#FFD256] border-b-2 border-[#FFD256]' 
              : 'text-gray-500 hover:text-[#FFD256]/70'}`}
            onClick={() => handleTabChange('planning')}
            aria-current={activeTab === 'planning' ? 'page' : undefined}
            aria-label="赛事规划"
          >
            赛事规划
          </button>
        </div>
      </nav>
    </div>
  );
};

export default EventDetailTabs;
