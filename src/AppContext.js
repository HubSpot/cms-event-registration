import React, { useState, useEffect } from 'react';

const AppContext = React.createContext([{}, () => {}]);

const eventLoadingStatus = {
    UNINITIALIZED: 'uninitialized',
    FETCHING: 'fetching',
    SUCCEEDED: 'succeeded',
    FAILED: 'failed'
}

const AppProvider = props => {
  const [state, setState] = useState({
    contact: {},
    events: [],
    eventsLoaded: eventLoadingStatus.UNINITIALIZED,
  });

  const getEvents = async () => {
    let response = await fetch(
      `https://api.hubspot.com/cms/v3/hubdb/tables/events/rows?sort=start&portalId=${props.portalId}`,
    );
    response = await response.json();
    setState(state => ({ ...state, events: response.results }));
    setState(state => ({ ...state, eventsLoaded: eventLoadingStatus.SUCCEEDED }));
  };

  const getUserDetails = async () => {
    // This function POSTs in order to pass cookies to the API and recieves a contact object
    let response = await fetch(`/_hcms/api/registration`, {
      method: 'POST',
      mode: 'same-origin',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    });
    response = await response.json();

    const contact = response.contact || { isLoggedIn: false };
    setState(state => ({ ...state, contact: contact }));
  };

  useEffect(() => {
    getEvents();
    getUserDetails();
  }, []);

  return (
    <AppContext.Provider value={[state, setState]}>
      {props.children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider, eventLoadingStatus };
