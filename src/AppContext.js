import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import _object from 'lodash/object';

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

  const filterFutureEvents = eventList => {
    let currentDate = dayjs(new Date());
    return eventList.filter(
      e =>
        undefined === e.values.start ||
        dayjs(e.values.start).isAfter(currentDate),
    );
  };

  const setDefaultValues = eventList => {
    let filteredEvents = filterFutureEvents(eventList);
    return filteredEvents.map(e => {
      e.values = _object.defaults(e.values, {
        name: 'Untitled event',
        event_description: 'Missing event description',
        event_capacity: 25,
        registered_attendee_count: 0,
        attendance_type: [
          { id: '1', name: 'virtual', type: 'option', order: 0 },
        ],
      });
      return e;
    });
  };

  const getEvents = async () => {
    let response = await fetch(
      `https://api.hubspot.com/cms/v3/hubdb/tables/events/rows?sort=start&portalId=${props.portalId}`,
    );
    response = await response.json();
    setState(state => ({
      ...state,
      events: setDefaultValues(response.results),
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
    setState(state => ({
      ...state,
      columns: response.columns,
      portalId: props.portalId,
      tableId: response.id,
    }));
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
