import React from 'react';
import ErrorBoundary from './components/ErrorBoundary';
import EventDetails from './components/EventDetails';

import AppHero from './components/AppHero';

function EventDetailPage() {
  return (
    <ErrorBoundary>
      <div className="App">
        <AppHero />
        <EventDetails />
      </div>
    </ErrorBoundary>
  );
}

export default EventDetailPage;
