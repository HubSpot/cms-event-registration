import React, { useContext } from 'react';
import EventDetailsRegistration from './EventDetailsRegistration';
import dayjs from 'dayjs';
import location from '../images/location.svg';
import time from '../images/time.svg';
import facebook from '../images/facebook.svg';
import email from '../images/email.svg';
import twitter from '../images/twitter.svg';
import linkedin from '../images/linkedin.svg';
import { useParams } from 'react-router-dom';
import { AppContext } from '../AppContext';
import './EventDetails.scss';

const EventDetails = () => {
  const [state] = useContext(AppContext);
  const { slug } = useParams();
  const eventData = state.events;

  const event = eventData.find(event => event.path === slug);
  const eventImage =
    event && event.values.feature_image ? event.values.feature_image.url : '';

  return (
    typeof event !== 'undefined' && (
      <div className="event-details">
        <h1 className="event-header"> {event.values.name} </h1>
        <div className="event-details__row">
          <div className="event-details__column">
            <div className="event-details__image">
              <img src={eventImage} alt="" />
            </div>
            <div
              className="event-details__description"
              dangerouslySetInnerHTML={{
                __html: event.values.event_description,
              }}
            ></div>
            <div className="event-details__info">
              <div className="event-details__table">
                <div className="column">
                  <img className="time-icon" src={time} />
                  <div className="event-details__meta-copy">
                    <p> {dayjs(event.values.start).format('MMMM D, YYYY')} </p>
                    <p>
                      From {dayjs(event.values.start).format('hh:mm A')} to{' '}
                      {dayjs(event.values.end).format('hh:mm A')}
                    </p>
                  </div>
                </div>
                <div className="column">
                  <img className="location-icon" src={location} />
                  <div className="event-details__meta-copy">
                    <p> {event.values.location_address.split(',')[0]} </p>
                    <p>
                      {' '}
                      {event.values.location_address
                        .split(',')
                        .slice(1, 3)
                        .join(', ')}{' '}
                    </p>
                  </div>
                </div>
              </div>
              <div className="event-details__map">
                <iframe
                  width="100%"
                  height="100%"
                  frameborder="0"
                  src={`https://www.google.com/maps/embed/v1/view?&zoom=18&center=${event
                    .values.location.lat +
                    ',' +
                    event.values.location
                      .long}&key=AIzaSyBAq5eYXUNe50Yu0reaOtqUi_u-C_yW-is`}
                  allowfullscreen
                ></iframe>
              </div>
              <div className="event-details__share">
                Share this
                <span className="event-details__share--table">
                  <div>
                    <a
                      href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img src={facebook} className="share-icon" />
                    </a>
                  </div>
                  <div>
                    <a
                      href={`https://www.linkedin.com/shareArticle?mini=true&url=${window.location.href}&title=&summary=&source=`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img src={linkedin} className="share-icon" />
                    </a>
                  </div>
                  <div>
                    <a
                      href={`https://twitter.com/intent/tweet?text=Check%20out%20this%20event!%20${window.location.href}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img src={twitter} className="share-icon" />
                    </a>
                  </div>
                  <div>
                    <a
                      href={`mailto:?&subject=Check%20out%20this%20event!&body=${window.location.href}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img src={email} className="share-icon" />
                    </a>
                  </div>
                </span>
              </div>
            </div>
          </div>
          <div className="event-details__column event-details__column--sidebar">
            <EventDetailsRegistration
              isFull={
                event.values.event_capacity -
                  event.values.registered_attendee_count <=
                0
              }
              isClosed={event.values.start < Date.now()}
            />
          </div>
        </div>
      </div>
    )
  );
};

export default EventDetails;
