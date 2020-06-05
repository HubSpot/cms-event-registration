import 'core-js/stable';
import 'regenerator-runtime/runtime';
import React, { useContext } from 'react';
import ReactDOM from 'react-dom';
import { AppContext, AppProvider, eventLoadingStatus } from './AppContext';
import EventCard from './components/EventCard';
import LoadingSpinner from './components/LoadingSpinner';
import './scss/upcoming-events.scss';

function UpcomingEvents() {
  const [state] = useContext(AppContext);
  const { events_root } = state.moduleData;
  const upcomingEvents = state.events.slice(0, 3);
  const eventsLoaded = state.eventsLoaded;

  return eventsLoaded === eventLoadingStatus.SUCCEEDED ? (
    <div className="event-listings--upcoming">
      {upcomingEvents.length === 0 ? (
        <h3 class="no-event-message">There are no upcoming events.</h3>
      ) : (
        upcomingEvents.map(function(obj, i) {
          return (
            <a href={`${events_root}/${obj.path}`} className="event-card__link">
              <EventCard key={i} row={obj} />
            </a>
          );
        })
      )}
    </div>
  ) : (
    <LoadingSpinner />
  );
}

const preRenderedDataNodes = document.querySelectorAll(
  '.upcoming-events > script[type="application/json"]',
);

preRenderedDataNodes.forEach(({ dataset, textContent }) => {
  const root = document.getElementById(
    `upcoming-events__module--${dataset.moduleInstance}`,
  );
  const __MODULE_DATA__ = JSON.parse(textContent);
  return ReactDOM.render(
    <AppProvider
      portalId={Number(dataset.portalId)}
      moduleData={__MODULE_DATA__}
    >
      <UpcomingEvents />
    </AppProvider>,
    root,
  );
});
