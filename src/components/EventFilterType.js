import React, { useState, useEffect } from 'react';
import EventFilterEntry from './EventFilterEntry';
import _ from 'lodash/array';

const EventFilterType = ({ events, addEventFilter, removeEventFilter }) => {
  const eventProperties = ["location", "type"]

  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  function getLocationProperty(event) {
    return [event.values.location_address];
  }

  function getTypeProperty(event) {
    return event.values.type.map(t => t.name );
  }

  const propertyAccessor = {
    "location": getLocationProperty,
    "type": getTypeProperty
  }

  function allEventProperties(property) {
    let arr = [];
    events.forEach((e) => {
      arr.push.apply(arr, propertyAccessor[property](e));
    });
    return _.uniq(arr);
  }

  const propertyList = eventProperties.map((property) =>
    <div class="filter-bar__browse--dropdown-column hsg-nav__dropdown-column">
      <h4 className="hsg-nav__header hsg-nav__header-subheader">
        {capitalize(property)}
      </h4>
      < EventFilterEntry
        properties={allEventProperties(property)}
        propertyType={property}
        addEventFilter={addEventFilter}
        removeEventFilter={removeEventFilter}
        key={property}
      />
    </div>
  )

  return (
    <li className="filter-bar__browse--dropdown-row hsg-nav__dropdown-row hsg-nav__dropdown-row--links">
      {propertyList}
    </li>
  );
};

export default EventFilterType;
