import React, { useState } from 'react';
import './EventFilterCheckBox.scss';

const EventFilterCheckBox = ({
  property,
  addEventFilter,
  removeEventFilter,
}) => {
  const [check, setCheck] = useState(false);

  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const handleClick = property => {
    setCheck(!check);

    if (check) {
      removeEventFilter(property);
    } else {
      addEventFilter(property);
    }
  };

  return (
    <li className="filter-bar__browse--dropdown-list-item">
      <input
        type="checkbox"
        id={property}
        checked={check}
        onClick={() => handleClick(property)}
      />
      <label for={property} data-content={capitalize(property)}></label>
    </li>
  );
};

export default EventFilterCheckBox;
