import React from 'react';
import dayjs from 'dayjs';
import time from '../images/time.svg';
import people from '../images/people.svg';
import location from '../images/location.svg';
import link from '../images/link.svg';
import type from '../images/type.svg';
import EventSpacesLeft from './EventSpacesLeft';
import './EventCard.scss';
import _array from 'lodash/array';

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
            <img src={time} className="location-icon" />
            <div>
              <div>{dayjs(row.values.start).format('dddd, MMMM D, YYYY')}</div>
              <div>{dayjs(row.values.start).format('h:mm A')}</div>
            </div>
          </div>
          {checkAttendanceType('virtual') && row.values.link && (
            <div className="event-card__virtual-link">
              <img src={link} className="link-icon" />
              <div> {row.values.link}</div>
            </div>
          )}
          {checkAttendanceType('in-person') && row.values.location_address && (
            <div className="event-card__address">
              <img src={location} className="location-icon" />
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
          {row.values.attendance_type && (
            <div className="event-card__event-type">
              <img src={type} className="event-icon" />
              <div>{renderAttendanceType()}</div>
            </div>
          )}
          <div className="event-card__capacity">
            <img src={people} className="people-icon" />
            <EventSpacesLeft
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
