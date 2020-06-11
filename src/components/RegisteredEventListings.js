import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../AppContext';
import EventCard from './EventCard';
import LoadingSpinner from './LoadingSpinner';

function RegisteredEventListings() {
  const [state] = useContext(AppContext);
  const [registeredEventSlugs, setRegisteredEventSlugs] = useState([]);
  const [registeredEventSlugsLoaded, setRegisteredEventSlugsLoaded] = useState(
    false,
  );
  const { events_root } = state.moduleData;
  const eventsRootPath = new URL(events_root).pathname;

  const getRegisteredEvents = async () => {
    // This function fetchs same-origin in order to pass cookies to the API and recieves a formSubmissions object
    let response = await fetch(`/_hcms/api/authenticate`, {
      method: 'GET',
      mode: 'same-origin',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    response = await response.json();
    setRegisteredEventSlugsLoaded(true);
    setRegisteredEventSlugs(response.slugs);
  };

  useEffect(() => {
    getRegisteredEvents();
  }, []);

  return registeredEventSlugsLoaded ? (
    <div className="registered-events">
      {registeredEventSlugs.length > 0 ? (
        <>
          {state.events.map(
            (event, i) =>
              registeredEventSlugs.indexOf(event.path) != -1 && (
                <Link
                  to={`${eventsRootPath}/${event.path}`}
                  className="event-card__link"
                >
                  <EventCard key={i} row={event} />
                </Link>
              ),
          )}
        </>
      ) : (
        <div className="registered-events__event--empty header">
          <h3>No event registrations found</h3>
        </div>
      )}
    </div>
  ) : (
    <LoadingSpinner />
  );
}

export default RegisteredEventListings;
