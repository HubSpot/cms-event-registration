import React from 'react';
import EventFilterCategories from './EventFilterCategories';
import './EventFilterColumn.scss';
import _ from 'lodash/array';

const EventFilterColumn = ({ events, addEventFilter, removeEventFilter }) => {
  const eventProperties = ['location', 'type'];

  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  function getLocationProperty(event) {
    return [event.values.location_address];
  }

  function getTypeProperty(event) {
    return event.values.type.map(t => t.name);
  }

  const propertyAccessor = {
    location: getLocationProperty,
    type: getTypeProperty,
  };

  function allEventProperties(property) {
    let arr = [];
    events.forEach(e => {
      arr.push.apply(arr, propertyAccessor[property](e));
    });
    return _.uniq(arr);
  }

  const propertyList = eventProperties.map(property => (
    <div class="filter-bar__browse--dropdown-column">
      <h4 className="filter-bar__browse--dropdown-column-header">
        {capitalize(property)}
      </h4>
      <EventFilterCategories
        properties={allEventProperties(property)}
        propertyType={property}
        addEventFilter={addEventFilter}
        removeEventFilter={removeEventFilter}
        key={property}
      />
    </div>
  ));

  return (
    <li className="filter-bar__browse--dropdown-row">
      {propertyList}
    </li>
  );
};

export default EventFilterColumn;
