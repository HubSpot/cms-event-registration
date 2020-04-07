import React, { useContext } from 'react';
import ErrorBoundary from './components/ErrorBoundary';
import RegisteredEventListings from './components/RegisteredEventListings';
import AppHero from './components/AppHero';
import { AppContext } from './AppContext';

function RegisteredEventsPage() {
  const [state] = useContext(AppContext);

  return (
    <ErrorBoundary>
      <div className="App">
        <AppHero />
        <div className="event-listings__wrapper registered-events__wrapper">
          <div className="event-listings__content">
            <header className="App-header">
              <h1 className="event-header">My Events</h1>
            </header>
            {state.contact.isLoggedIn ? (
              <RegisteredEventListings />
            ) : (
              <div className="login-message">
                You must{' '}
                <a href="/_hcms/mem/login?redirect_url=/my-events">log in</a> to
                continue.
              </div>
            )}
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
}

export default RegisteredEventsPage;
