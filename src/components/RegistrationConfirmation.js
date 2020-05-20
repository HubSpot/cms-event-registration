import React, { useContext } from 'react';
import { AppContext } from '../AppContext';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import EventSpacesLeft from './EventSpacesLeft';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers } from '@fortawesome/free-solid-svg-icons';

const RegistrationConfirmation = ({ formData }) => {
  const [state] = useContext(AppContext);
  const { slug } = useParams();
  const eventData = state.events;
  const currentEvent = eventData.find(event => event.path === slug);

  return (
    <div className="registration-confirmation">
      <div className="event-details__registration--title">Registered</div>
      <div className="event-details__spaces-available">
        <FontAwesomeIcon icon={faUsers} className="people-icon" className="event-details__spaces-available-icon" />
        <EventSpacesLeft
          space_available={
            currentEvent.values.event_capacity -
            currentEvent.values.registered_attendee_count
          }
        />
      </div>
      <p className="registration-confirmation__label">First name</p>
      <p className="registration-confirmation__info">{formData.firstName}</p>
      <p className="registration-confirmation__label">Last name</p>
      <p className="registration-confirmation__info">{formData.lastName}</p>
      <p className="registration-confirmation__label">Email</p>
      <p className="registration-confirmation__info">{formData.email}</p>
      <div className="event-details__registration--info">
        {state.contact.isLoggedIn ? (
          <Link to="/my-events" className="event-button">
            View All My Events
          </Link>
        ) : (
          <p>
            You will receive an email enabling you to register for an account.
          </p>
        )}
      </div>
    </div>
  );
};

export default RegistrationConfirmation;
