import React from 'react';
import dayjs from 'dayjs';
import time from '../images/time.svg';
import people from '../images/people.svg';
import location from '../images/location.svg';
import EventSpacesLeft from './EventSpacesLeft';
import './EventCard.scss';

const EventCard = ({ row }) => {
  const featureImage = row.values.feature_image;
  const eventImage = featureImage ? featureImage.url : '';

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
