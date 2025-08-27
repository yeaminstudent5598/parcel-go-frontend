// src/components/GuidedTour.tsx
import React, { useState, useEffect } from 'react';
import Joyride, { type Step, type CallBackProps } from 'react-joyride';

const TOUR_STEPS: Step[] = [
  {
    target: '#create-parcel-btn',
    content: 'Click here to start creating a new parcel delivery request.',
    placement: 'bottom',
    disableBeacon: true,
  },
  {
    target: '#parcel-table-card',
    content: 'All your parcels will be listed here. You can view their status and take actions from the menu.',
    placement: 'top',
  },
  {
    target: '#parcel-search-input',
    content: 'Quickly find any parcel by typing its Tracking ID here.',
    placement: 'bottom',
  },
  {
    target: '#parcel-status-filter',
    content: 'Filter your parcels based on their current delivery status.',
    placement: 'bottom',
  },
  {
    target: '#user-profile-menu',
    content: 'Click here to view your profile or log out from your account.',
    placement: 'bottom',
  },
];

const GuidedTour: React.FC = () => {
  const [runTour, setRunTour] = useState(false);

  useEffect(() => {
    const hasSeenTour = localStorage.getItem('parcelgo_tour_completed');
    if (!hasSeenTour) {
      setRunTour(true);
    }
  }, []);

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status } = data;
    const finishedStatuses: string[] = ['finished', 'skipped'];
    if (finishedStatuses.includes(status)) {
      localStorage.setItem('parcelgo_tour_completed', 'true');
      setRunTour(false);
    }
  };

  return (
    <Joyride
      steps={TOUR_STEPS}
      run={runTour}
      callback={handleJoyrideCallback}
      continuous
      showProgress
      showSkipButton
      styles={{
        options: {
          arrowColor: '#ffffff',
          backgroundColor: '#ffffff',
          primaryColor: '#2563EB',
          textColor: '#334155',
          zIndex: 1000,
        },
        tooltip: {
          borderRadius: '8px',
        },
      }}
    />
  );
};

export default GuidedTour;
