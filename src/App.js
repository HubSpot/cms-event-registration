import React, { useState, useContext } from 'react';
import ErrorBoundary from './components/ErrorBoundary';
import EventListings from './components/EventListings';
import EventCalendar from './components/EventCalendar';
import EventFilterColumn from './components/EventFilterColumn';
import { Link } from 'react-router-dom';
import { AppContext } from './AppContext';
import down from './images/left.svg';
import './scss/App.scss';
import _ from 'lodash/collection';

function App() {
  const [state] = useContext(AppContext);
  const [currentSearch, setCurrentSearch] = useState('');
  const events = state.events;
  const [filteredEventProperties, setEventProperties] = useState([]);

  function addEventFilter(type, property) {
    setEventProperties(filteredEventProperties.concat([{type: type, property: property}]));
  }

  function removeEventFilter(type, property) {
      setEventProperties(_.filter(filteredEventProperties, function(i) { return !(i.type == type && i.property == property) }));
  }

  return (
    <ErrorBoundary>
      <div className="App">
        <div className="filter-bar">
          <div className="filter-bar__wrapper">
            <div className="filter-bar__browse">
              <div className="filter-bar__browse--dropdown hsg-nav__group-item--has-dropdown">
                <div className="filter-bar__browse--link-wrapper hsg-nav__link-wrapper">
                  <a href="#" className="hsg-nav__link">
                     <span className="hsg-nav__link-label">Browse By</span>
                     <img src={down} alt="" className="filter-bar__browse--arrow" />
                  </a>
                </div>
                <ul className="filter-bar__browse--dropdown-list hsg-nav__dropdown-list">
                  <li className="filter-bar__browse--dropdown-list-title hsg-nav__dropdown-list-title"> Browse By 2 </li>
                  < EventFilterColumn
                    events={state.events}
                    addEventFilter={addEventFilter}
                    removeEventFilter={removeEventFilter}
                  />
                </ul>
              </div>
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
          <EventListings
           events={events}
           currentSearch={currentSearch}
           filteredEventProperties={filteredEventProperties} />
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
