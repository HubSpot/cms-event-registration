import React, { useState, useContext } from 'react';
import ErrorBoundary from './components/ErrorBoundary';
import EventListings from './components/EventListings';
import EventCalendar from './components/EventCalendar';
import { Link } from 'react-router-dom';
import { AppContext } from './AppContext';
import down from './images/left.svg';
import './scss/App.scss';

function App() {
  const [state] = useContext(AppContext);
  const [currentSearch, setCurrentSearch] = useState('');
  const events = state.events;

  return (
    <ErrorBoundary>
      <div className="App">
        <div className="filter-bar">
          <div className="filter-bar__wrapper">
            <div className="filter-bar__browse">
              Browse By
              <img src={down} alt="" className="filter-bar__browse--arrow" />
              <span className="filter-bar__browse--event-filter">
                All Events
              </span>
            </div>
            <div className="filter-bar__search">
              <input
                type="text"
                className="filter-bar__search-input"
                placeholder="Search Events"
                value={currentSearch}
                onChange={e => setCurrentSearch(e.target.value)}
              />
            </div>
          </div>
        </div>
        <header className="App-header">
          <h1 className="event-header">Upcoming Events</h1>
          {currentSearch ? (
            <p>Searching for &quot;{currentSearch}&quot;</p>
          ) : (
            ''
          )}
          <div className="event-description"></div>
        </header>
        <div className="event-listings__wrapper">
          <EventListings events={events} currentSearch={currentSearch} />
          <div>
            <EventCalendar />
            {state.contact.isLoggedIn ? (
              <Link to="/my-events" className="event-button">
                View my Events
              </Link>
            ) : (
              <a
                style={{ textDecoration: 'none' }}
                href="/_hcms/mem/login?redirect_url=/my-events"
              >
                Log in to see your events
              </a>
            )}
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
}

export default App;
