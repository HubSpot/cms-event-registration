import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';

const AppContext = React.createContext([{}, () => {}]);

const eventLoadingStatus = {
  UNINITIALIZED: 'uninitialized',
  FETCHING: 'fetching',
  SUCCEEDED: 'succeeded',
  FAILED: 'failed',
};

const AppProvider = props => {
  const [state, setState] = useState({
    contact: {},
    events: [],
    eventsLoaded: eventLoadingStatus.UNINITIALIZED,
    moduleData: props.moduleData,
  });

  const filterPastEvents = eventList => {
    let eventArray = [];
    let currentDate = dayjs(new Date());

    eventList.forEach(e => {
      let eventDate = dayjs(e.values.start);
      if (eventDate.isAfter(currentDate)) {
        eventArray.push(e);
      }
    });
    return eventArray;
  };

  const getEvents = async () => {
    let response = await fetch(
      `https://api.hubspot.com/cms/v3/hubdb/tables/events/rows?sort=start&portalId=${props.portalId}`,
    );
    response = await response.json();
    setState(state => ({
      ...state,
      events: filterPastEvents(response.results),
    }));
    setState(state => ({
      ...state,
      eventsLoaded: eventLoadingStatus.SUCCEEDED,
    }));
  };

  const getUserDetails = async () => {
    // This function POSTs in order to pass cookies to the API and recieves a contact object
    let response = await fetch(`/_hcms/api/authenticate`, {
      method: 'GET',
      mode: 'same-origin',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    response = await response.json();

    const contact = response.contact || { isLoggedIn: false };
    setState(state => ({ ...state, contact: contact }));
  };

  const getEventColumns = async () => {
    let response = await fetch(
      `https://api.hubspot.com/cms/v3/hubdb/tables/events?portalId=${props.portalId}`,
    );
    response = await response.json();
    setState(state => ({ ...state, columns: response.columns }));
  };

  useEffect(() => {
    getEvents();
    getUserDetails();
    getEventColumns();
  }, []);

  return (
    <AppContext.Provider value={[state, setState]}>
      {props.children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider, eventLoadingStatus };
