import React, { useContext } from 'react';
import { AppContext } from '../AppContext';
import { Link } from 'react-router-dom';
import EventCard from './EventCard';
import './EventListings.scss';

import _array from 'lodash/array';
import _collection from 'lodash/collection';
import _lang from 'lodash/lang';

const EventListings = ({ events, currentSearch, filteredEventProperties }) => {
  const [state] = useContext(AppContext);
  const { events_root } = state.moduleData;
  const eventsRootPath = new URL(events_root).pathname
  let filteredEvents = events;

  if (currentSearch) {
    filteredEvents = filteredEvents.filter(event =>
      event.values.name.toLowerCase().includes(currentSearch.toLowerCase()),
    );
  }

  if (filteredEventProperties.length > 0) {
    filteredEvents = filteredEvents.filter(
      e =>
        _array.intersectionWith(
          [{ type: 'location', property: e.values.location_address }].concat(
            _collection.map(e.values.type, t => ({
              type: 'type',
              property: t.name,
            })),
          ),
          filteredEventProperties,
          _lang.isEqual,
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
            <Link
              to={`${eventsRootPath}/${obj.path}`}
              className="event-card__link"
            >
              <EventCard key={i} row={obj} />
            </Link>
          );
        })
      )}
    </div>
  );
};

export default EventListings;
