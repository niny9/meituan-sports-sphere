
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
      <div className="flex">
        <button 
          className={`px-4 py-3 text-sm font-medium transition-all ${activeTab === 'details' 
            ? 'text-[#FFD256] border-b-2 border-[#FFD256]' 
            : 'text-gray-500 hover:text-[#FFD256]/70'}`}
          onClick={() => handleTabChange('details')}
        >
          赛事详情
        </button>
        <button 
          className={`px-4 py-3 text-sm font-medium transition-all ${activeTab === 'services' 
            ? 'text-[#FFD256] border-b-2 border-[#FFD256]' 
            : 'text-gray-500 hover:text-[#FFD256]/70'}`}
          onClick={() => handleTabChange('services')}
        >
          周边服务
        </button>
        <button 
          className={`px-4 py-3 text-sm font-medium transition-all ${activeTab === 'planning' 
            ? 'text-[#FFD256] border-b-2 border-[#FFD256]' 
            : 'text-gray-500 hover:text-[#FFD256]/70'}`}
          onClick={() => handleTabChange('planning')}
        >
          赛事规划
        </button>
      </div>
    </div>
  );
};

export default EventDetailTabs;
