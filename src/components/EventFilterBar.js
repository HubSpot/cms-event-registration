import React, { useState, useContext } from 'react';
import { AppContext } from '../AppContext';
import EventFilterColumn from './EventFilterColumn';
import './EventFilterBar.scss';
import _array from 'lodash/array';
import _collection from 'lodash/collection';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

const EventFilterBar = ({
  filteredEventProperties,
  setEventProperties,
  currentSearch,
  setCurrentSearch,
}) => {
  const [state] = useContext(AppContext);
  const [isToggle, setToggle] = useState(false);

  function addEventFilter(property) {
    setEventProperties(
      filteredEventProperties.concat([{ type: 'type', property: property }]),
    );
  }

  function removeEventFilter(property) {
    setEventProperties(
      _collection.filter(filteredEventProperties, function(i) {
        return !(i.type == 'type' && i.property == property);
      }),
    );
  }

  function renderFilterTitle() {
    let properties = filteredEventProperties.map(property => property.property);
    return _array.join(properties, ', ');
  }

  return (
    <div className="filter-bar">
      <div className="filter-bar__wrapper">
        <div className="filter-bar__browse">
          <div
            className={
              'filter-bar__browse--menu-wrapper' +
              (isToggle ? ' filter-bar__browse--menu-wrapper-open' : '')
            }
          >
            <div className="filter-bar__browse--menu">
              <div className="filter-bar__browse--title-wrapper">
                <span className="filter-bar__browse--title">Browse By</span>
                <div className="filter-bar__browse--arrow-wrapper">
                  <FontAwesomeIcon
                    icon={faChevronLeft}
                    className="filter-bar__browse--arrow"
                    onClick={() => setToggle(!isToggle)}
                  />
                </div>
                <span
                  className="filter-bar__browse--event-filter"
                  onClick={() => setToggle(!isToggle)}
                >
                  {filteredEventProperties.length > 0
                    ? renderFilterTitle()
                    : 'All Events'}
                </span>
              </div>
            </div>
            <ul className="filter-bar__browse--dropdown">
              <EventFilterColumn
                columns={state.columns}
                addEventFilter={addEventFilter}
                removeEventFilter={removeEventFilter}
              />
            </ul>
          </div>
        </div>
        <div className="filter-bar__search">
          <input
            type="text"
            className="filter-bar__search-input"
            placeholder="Search Events"
            value={currentSearch}
            onChange={e => setCurrentSearch(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default EventFilterBar;
