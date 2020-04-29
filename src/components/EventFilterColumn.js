import React from 'react';
import EventFilterCategories from './EventFilterCategories';
import './EventFilterColumn.scss';

const EventFilterColumn = ({ columns, addEventFilter, removeEventFilter }) => {
  function allTypeOptions() {
    if (columns) {
      return columns
        .filter(column => column.name === 'type')[0]
        .options.map(type => type.name);
    } else {
      return [];
    }
  }

  return (
    <li className="filter-bar__browse--dropdown-row">
      <div class="filter-bar__browse--dropdown-column">
        <h4 className="filter-bar__browse--dropdown-column-header">Type</h4>
        <EventFilterCategories
          properties={allTypeOptions()}
          addEventFilter={addEventFilter}
          removeEventFilter={removeEventFilter}
        />
      </div>
    </li>
  );
};

export default EventFilterColumn;
