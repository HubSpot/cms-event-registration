import React, { useState, useContext } from 'react';
import ErrorBoundary from './components/ErrorBoundary';
import EventListings from './components/EventListings';
import EventFilterBar from './components/EventFilterBar';
import { Link } from 'react-router-dom';
import { AppContext } from './AppContext';
import './scss/App.scss';

function App() {
  const [state] = useContext(AppContext);
  const [currentSearch, setCurrentSearch] = useState('');
  const [filteredEventProperties, setEventProperties] = useState([]);
  const events = state.events;
  const { my_events_page } = state.moduleData;
  const myEventsPath = new URL(my_events_page).pathname;

  return (
    <ErrorBoundary>
      <div className="App">
        <EventFilterBar
          filteredEventProperties={filteredEventProperties}
          setEventProperties={setEventProperties}
          currentSearch={currentSearch}
          setCurrentSearch={setCurrentSearch}
        />
        <header className="App-header">
          <h1 className="event-header">Upcoming Events</h1>
          {currentSearch ? (
            <p>Searching for &quot;{currentSearch}&quot;</p>
          ) : (
            ''
          )}
          <div className="my-events-link">
            {state.contact.isLoggedIn ? (
              <Link to={myEventsPath} className="event-button">
                View my Events
              </Link>
            ) : (
              <a
                style={{ textDecoration: 'none' }}
                href={`/_hcms/mem/login?redirect_url=/${my_events_page}`}
              >
                Log in to see your events
              </a>
            )}
          </div>
        </header>
        <div className="event-listings__wrapper">
          <EventListings
            events={events}
            currentSearch={currentSearch}
            filteredEventProperties={filteredEventProperties}
          />
        </div>
      </div>
    </ErrorBoundary>
  );
}

export default App;
