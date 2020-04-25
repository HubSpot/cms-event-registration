import React from 'react';
import { Link } from 'react-router-dom';
import EventCard from './EventCard';
import './EventListings.scss';

import _a from 'lodash/array';
import _c from 'lodash/collection';
import _l from 'lodash/lang';

const EventListings = ({ events, currentSearch, filteredEventProperties }) => {
  let filteredEvents = events;

  if (currentSearch) {
    filteredEvents = filteredEvents.filter(event =>
      event.values.name.toLowerCase().includes(currentSearch.toLowerCase()),
    );
  }

  if (filteredEventProperties.length > 0) {
    filteredEvents = filteredEvents.filter(
      e =>
        _a.intersectionWith(
          [{ type: 'location', property: e.values.location_address }].concat(
            _c.map(e.values.type, t => ({ type: 'type', property: t.name })),
          ),
          filteredEventProperties,
          _l.isEqual,
        ).length > 0,
    );
  }

  return (
    <div className="event-listings">
      {currentSearch && filteredEvents.length === 0 ? (
        <h2>No events found</h2>
      ) : (
        filteredEvents.map(function(obj, i) {
          return (
            <Link to={`/events/${obj.path}`} className="event-card__link">
              <EventCard key={i} row={obj} />
            </Link>
          );
        })
      )}
    </div>
  );
};

export default EventListings;
