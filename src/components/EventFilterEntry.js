import React, { useState } from 'react';
import EventFilterCheckBox from './EventFilterCheckBox';

const EventFilterEntry = ({ properties, propertyType, addEventFilter, removeEventFilter }) => {
  const propertyList = properties.map((property) =>
    < EventFilterCheckBox
      property={property}
      propertyType={propertyType}
      addEventFilter={addEventFilter}
      removeEventFilter={removeEventFilter}
      key={property}
    />
  )

  return (
    <ul class="filter-bar__browse--dropdown-list-group hsg-nav__link-group">
      {propertyList}
    </ul>
  );
};

export default EventFilterEntry;
