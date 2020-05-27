import React, { useState, useContext } from 'react';
import RegistrationConfirmation from './RegistrationConfirmation';
import { useParams } from 'react-router-dom';
import { AppContext } from '../AppContext';
import Cookies from 'js-cookie';
import EventSpacesLeft from './EventSpacesLeft';
import LoadingSpinner from './LoadingSpinner';
import './EventDetailsRegistration.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers } from '@fortawesome/free-solid-svg-icons';

const RegistrationForm = ({
  isFull,
  isClosed,
  handleRegistration,
  handleLoadingState,
  saveFormData,
  handleFormError,
}) => {
  const [formData, updateFormData] = useState({});
  const [formErrors, updateFormErrors] = useState({
    firstName: false,
    lastName: false,
    email: false,
  });
  const [state, setState] = useContext(AppContext);
  const { slug } = useParams();
  const eventData = state.events;
  const currentEvent = eventData.find(event => event.path === slug);
  const formId = state.moduleData.event_form.event_form_field.form_id;
  console.log(isFull);

  const handleFormValidation = () => {
    return formData.firstName && formData.lastName && formData.email;
  };

  const handleFormSubmit = async event => {
    event.preventDefault();

    const params = {
      rowId: currentEvent.id,
      pageUri: window.location.href,
      pageName: currentEvent.name,
      formId,
      utk: Cookies.get('hubspotutk'),
      ...formData,
    };

    if (isFull) {
      return null;
    }
    if (handleFormValidation()) {
      handleLoadingState();

      const response = await fetch(`/_hcms/api/register`, {
        method: 'POST',
        mode: 'same-origin',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      });
      if (response.status === 200) {
        const responseData = await response.json();
        const newEventData = eventData.map(event => {
          if (event.path === slug) {
            event.values.registered_attendee_count =
              responseData.rowUpdate.values.registered_attendee_count;
          }
          return event;
        });

        // marks event as registered
        handleRegistration();

        setState(state => ({ ...state, events: newEventData }));
        saveFormData(formData);
      } else {
        handleFormError();
      }
    } else {
      // updates the form error property as true if the form field is blank
      updateFormErrors({
        /* eslint-disable no-extra-boolean-cast */
        firstName: !Boolean(formData.firstName),
        lastName: !Boolean(formData.lastName),
        email: !Boolean(formData.email),
        /* eslint-enable no-extra-boolean-cast */
      });
    }
  };

  const FormError = props => {
    return (
      <div className={`form-error ${props.show}`}>
        Please enter your {props.formFieldName}.
      </div>
    );
  };

  return (
    <>
      <div className="event-details__registration--title">
        {isClosed
          ? 'Registration Closed'
          : isFull
          ? 'Join the Waitlist'
          : 'Register to Attend'}
      </div>

      <div className="event-details__spaces-available">
        <FontAwesomeIcon
          icon={faUsers}
          className="people-icon event-details__spaces-available-icon"
        />
        {isClosed ? (
          'Registration is closed.'
        ) : (
          <EventSpacesLeft
            isUnlimited={currentEvent.values.unlimited_event_capacity === 1}
            space_available={
              currentEvent.values.event_capacity -
              currentEvent.values.registered_attendee_count
            }
          />
        )}
      </div>
      <form>
        {isClosed || isFull ? (
          'Thank you for your interest, but this event is no longer accepting registrations or reserving spots on the waitlist'
        ) : (
          <>
            <label className="event-details__registration__label">
              First name
              <input
                className="event-details__registration__input"
                type="text"
                name="firstname"
                onChange={event => {
                  updateFormData({
                    ...formData,
                    firstName: event.target.value,
                  });
                }}
              />
            </label>
            <FormError
              formFieldName="first name"
              show={formErrors.firstName ? 'show' : ''}
            />
            <div className="form-error">Please enter your first name.</div>
            <label className="event-details__registration__label">
              Last name
              <input
                className="event-details__registration__input"
                type="text"
                name="lastname"
                onChange={event => {
                  updateFormData({
                    ...formData,
                    lastName: event.target.value,
                  });
                }}
              />
            </label>
            <FormError
              formFieldName="last name"
              show={formErrors.lastName ? 'show' : ''}
            />
            <label className="event-details__registration__label">
              Email
              <input
                className="event-details__registration__input"
                type="text"
                name="email"
                onChange={event => {
                  updateFormData({
                    ...formData,
                    email: event.target.value,
                  });
                }}
              />
            </label>
            <FormError
              formFieldName="email address"
              show={formErrors.email ? 'show' : ''}
            />
          </>
        )}
      </form>
      <div className="event-details__registration--info">
        <button
          className={`event-button ${isClosed || isFull ? 'disabled' : ''}`}
          onClick={handleFormSubmit}
        >
          {isFull ? '(At capacity)' : 'Register'}
        </button>
      </div>
    </>
  );
};
const Loading = () => (
  <div className="event-details__registration--loading">
    <LoadingSpinner />
    Processing your registration details
  </div>
);

const RegistrationError = () => (
  <div className="event-details__registration--error">
    There was error processing your registration.
  </div>
);

const EventDetailsRegistration = ({ isFull, isClosed }) => {
  const [isRegistered, setRegistration] = useState(false);
  const [isLoading, updateLoadingState] = useState(false);
  const [isError, setIsError] = useState(false);
  const [formData, fetchFormData] = useState({});

  const handleRegistration = () => {
    updateLoadingState(false);
    setRegistration(true);
  };

  const handleLoadingState = () => {
    updateLoadingState(true);
  };

  const handleFormData = data => {
    fetchFormData(data);
  };

  const handleFormError = () => {
    setIsError(true);
  };

  const Registration = () => {
    if (isError) {
      return <RegistrationError />;
    } else if (isRegistered) {
      return <RegistrationConfirmation formData={formData} />;
    } else if (isLoading) {
      return <Loading />;
    } else {
      return (
        <RegistrationForm
          isFull={isFull}
          isClosed={isClosed}
          handleRegistration={handleRegistration}
          handleLoadingState={handleLoadingState}
          saveFormData={handleFormData}
          handleFormError={handleFormError}
        />
      );
    }
  };

  return (
    <div className="event-details__registration">
      <Registration />
    </div>
  );
};

export default EventDetailsRegistration;
