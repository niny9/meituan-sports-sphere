
import React, { useState } from 'react';
import { Event } from '@/data';
import { useSearchParams } from 'react-router-dom';
import EventDetailHeader from './EventDetailHeader';
import EventDetailTabs from './EventDetailTabs';
import EventDetailsTab from './tabs/EventDetailsTab';
import EventServicesTab from './tabs/EventServicesTab';
import EventPlanningTab from './tabs/EventPlanningTab';

interface EventDetailProps {
  event: Event;
  onBack: () => void;
}

const EventDetail: React.FC<EventDetailProps> = ({ event, onBack }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get('detailTab') || 'details';
  
  const handleTabChange = (tab: string) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('detailTab', tab);
    setSearchParams(newParams);
  };

  return (
    <div className="bg-white animate-fade-in">
      {/* Header section with event image, title, and basic info */}
      <EventDetailHeader event={event} onBack={onBack} />
      
      {/* Tab Navigation */}
      <EventDetailTabs activeTab={activeTab} handleTabChange={handleTabChange} />
      
      {/* Content */}
      <div className="p-6">
        {activeTab === 'details' && <EventDetailsTab event={event} />}
        {activeTab === 'services' && <EventServicesTab eventId={event.id} />}
        {activeTab === 'planning' && <EventPlanningTab event={event} />}
      </div>
    </div>
  );
};

export default EventDetail;
