import 'core-js/stable';
import 'regenerator-runtime/runtime';
import React, { useContext } from 'react';
import ReactDOM from 'react-dom';
import { AppContext, AppProvider } from './AppContext';
import EventCard from './components/EventCard';
import './scss/upcoming-events.scss';

function UpcomingEvents({appRoot}) {
  const [state] = useContext(AppContext);
  const upcomingEvents = state.events.reverse().slice(0, 3);

  return (
    <div className="event-card__wrapper">
      {upcomingEvents.map(function(obj, i) {
        return (
          <a href={`${appRoot}/${obj.path}`} className="event-card__wrapper--link">
            <EventCard key={i} row={obj} />
          </a>
        );
      })}
    </div>
  );
}

const root = document.querySelectorAll('.upcoming-events__module');

root.forEach((el) => {
  const APP_CONFIG = window[el.dataset.config];
  ReactDOM.render(
    <AppProvider portalId={APP_CONFIG.portalId}>
      <UpcomingEvents appRoot={APP_CONFIG.appRoot} />
    </AppProvider>,
    el,
  );
})


