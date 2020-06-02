import React, { useContext } from 'react';
import EventDetailsRegistration from './EventDetailsRegistration';
import dayjs from 'dayjs';
import { Link, useParams } from 'react-router-dom';
import { AppContext } from '../AppContext';
import './EventDetails.scss';
import _array from 'lodash/array';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendarAlt,
  faClock,
  faEnvelope,
  faMapMarkerAlt,
} from '@fortawesome/free-solid-svg-icons';
import {
  faFacebookF,
  faLinkedin,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';

const EventDetails = () => {
  const [state] = useContext(AppContext);
  const { slug } = useParams();
  const eventData = state.events;

  let event, prevEvent, nextEvent;

  eventData.forEach((e, i) => {
    if (e.path === slug) {
      event = e;
      prevEvent = eventData[i - 1];
      nextEvent = eventData[i + 1];
    }
  });

  const eventImage =
    event && event.values.feature_image ? event.values.feature_image.url : '';

  function checkAttendanceType(type) {
    if (event.values.attendance_type) {
      return event.values.attendance_type.some(o => o.name === type);
    }
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
            <div className="event-details__table">
              {event.values.attendance_type && (
                <div className="column">
                  <FontAwesomeIcon
                    icon={faCalendarAlt}
                    className="event-icon"
                  />
                  <div className="event-details__meta-copy">
                    <p> {renderAttendanceType()} </p>
                  </div>
                </div>
              )}
              <div className="column">
                <FontAwesomeIcon icon={faClock} className="time-icon" />
                <div className="event-details__meta-copy">
                  <p> {dayjs(event.values.start).format('MMMM D, YYYY')} </p>
                  <p>
                    From {dayjs(event.values.start).format('hh:mm A')} to{' '}
                    {dayjs(event.values.end).format('hh:mm A')}
                  </p>
                </div>
              </div>
              {checkAttendanceType('in-person') &&
                event.values.location_address && (
                  <div className="column">
                    <FontAwesomeIcon
                      icon={faMapMarkerAlt}
                      className="location-icon"
                    />
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
                )}
            </div>
            <div className="event-details__map-wrapper">
              {checkAttendanceType('in-person') && event.values.location && (
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
              )}
              <div className="event-details__share">
                Share this
                <span className="event-details__share--table">
                  <div>
                    <a
                      href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FontAwesomeIcon
                        icon={faFacebookF}
                        className="share-icon"
                      />
                    </a>
                  </div>
                  <div>
                    <a
                      href={`https://www.linkedin.com/shareArticle?mini=true&url=${window.location.href}&title=&summary=&source=`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FontAwesomeIcon
                        icon={faLinkedin}
                        className="share-icon"
                      />
                    </a>
                  </div>
                  <div>
                    <a
                      href={`https://twitter.com/intent/tweet?text=Check%20out%20this%20event!%20${window.location.href}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FontAwesomeIcon
                        icon={faTwitter}
                        className="share-icon"
                      />
                    </a>
                  </div>
                  <div>
                    <a
                      href={`mailto:?&subject=Check%20out%20this%20event!&body=${window.location.href}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FontAwesomeIcon
                        icon={faEnvelope}
                        className="share-icon"
                      />
                    </a>
                  </div>
                </span>
              </div>
              <div className="event-details__pagination">
                {prevEvent && (
                  <Link to={prevEvent.path} className="event-details__prevLink">
                    &lt; Previous event
                  </Link>
                )}
                {nextEvent && (
                  <Link to={nextEvent.path} className="event-details__nextLink">
                    Next event &gt;
                  </Link>
                )}
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
