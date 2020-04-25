import React from 'react';
import EventFilterCheckBox from './EventFilterCheckBox';
import './EventFilterCategories.scss';

const EventFilterCategories = ({
  properties,
  propertyType,
  addEventFilter,
  removeEventFilter,
}) => {
  const propertyList = properties.map(property => (
    <EventFilterCheckBox
      property={property}
      propertyType={propertyType}
      addEventFilter={addEventFilter}
      removeEventFilter={removeEventFilter}
      key={property}
    />
  ));

  return (
    <ul class="filter-bar__browse--dropdown-list-group">{propertyList}</ul>
  );
};

export default EventFilterCategories;
