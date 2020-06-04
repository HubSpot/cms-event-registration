import React from 'react';
import dayjs from 'dayjs';
import EventSpacesLeft from './EventSpacesLeft';
import './EventCard.scss';
import _array from 'lodash/array';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendarAlt,
  faClock,
  faMapMarkerAlt,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';

const EventCard = ({ row }) => {
  const featureImage = row.values.feature_image;
  const eventImage = featureImage ? featureImage.url : '';

  function checkAttendanceType(type) {
    return row.values.attendance_type.some(o => o.name === type);
  }

  function renderAttendanceType() {
    let label = [];
    if (checkAttendanceType('virtual')) {
      label.push('Virtual');
    }
    if (checkAttendanceType('in-person')) {
      label.push('In-Person');
    }
    return _array.join(label, ' and ') + ' Event';
  }

  return (
    <div className="event-card">
      <h2 className="event-card__title">{row.values.name}</h2>
      <div className="event-card__row">
        <figure
          className="event-card__image"
          style={{ backgroundImage: `url('${eventImage}')` }}
        ></figure>
        <div className="event-card__column">
          <div className="event-card__date">
            <FontAwesomeIcon icon={faClock} className="location-icon" />
            <div>
              <div>{dayjs(row.values.start).format('dddd, MMMM D, YYYY')}</div>
              <div>{dayjs(row.values.start).format('h:mm A')}</div>
            </div>
          </div>
          {checkAttendanceType('in-person') && row.values.location_address && (
            <div className="event-card__address">
              <FontAwesomeIcon
                icon={faMapMarkerAlt}
                className="location-icon"
              />
              <div>
                <div> {row.values.location_address.split(',')[0]} </div>
                <div>
                  {' '}
                  {row.values.location_address
                    .split(',')
                    .slice(1, 3)
                    .join(', ')}{' '}
                </div>
              </div>
            </div>
          )}
          <div className="event-card__event-type">
            <FontAwesomeIcon icon={faCalendarAlt} className="event-icon" />
            <div>{renderAttendanceType()}</div>
          </div>
          <div className="event-card__capacity">
            {row.values.limited_event_capacity === 1 && (
              <FontAwesomeIcon icon={faUsers} className="people-icon" />
            )}
            <EventSpacesLeft
              isLimited={row.values.limited_event_capacity === 1}
              space_available={
                row.values.event_capacity - row.values.registered_attendee_count
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
