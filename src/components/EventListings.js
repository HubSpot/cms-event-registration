import React from 'react';
import { Link } from 'react-router-dom';
import EventCard from './EventCard';
import './EventListings.scss';

const EventListings = ({ events, currentSearch }) => {
  let filteredEvents = events;

  if (currentSearch) {
    filteredEvents = filteredEvents.filter(event =>
      event.values.name.toLowerCase().includes(currentSearch.toLowerCase()),
    );
  }

  return (
    <div className="event-listings">
      {currentSearch && filteredEvents.length === 0 ? (
        <h2>No events found</h2>
      ) : (
        filteredEvents.map(function(obj, i) {
          return (
            <Link to={`${APP_CONFIG.appRoot}/${obj.path}`} className="event-card__link">
              <EventCard key={i} row={obj} />
            </Link>
          );
        })
      )}
    </div>
  );
};

export default EventListings;
