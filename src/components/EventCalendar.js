import React, { useContext } from 'react';
import DayPicker from 'react-day-picker';
import { AppContext } from '../AppContext';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import { withRouter } from 'react-router-dom';
import './EventCalendar.scss';

const EventCalendar = ({ history }) => {
  const [state] = useContext(AppContext);
  dayjs.extend(isBetween);

  function dateMatch(date, start) {
    return dayjs(date).isSame(dayjs(start), 'day');
  }

  function handleDayClick(day) {
    {
      state.events.map(event => {
        return (
          dateMatch(day, event.values.start) &&
          event.path &&
          history.push(`/events/${event.path}`)
        );
      });
    }
  }
  const hasEvent = day => {
    return state.events.find(event => {
      return dateMatch(day, event.values.start);
    });
  };
  return (
    <div className="eventCalendar">
      <DayPicker
        modifiers={{ hasEvent }}
        onDayClick={handleDayClick}
        showOutsideDays
      />
    </div>
  );
};

export default withRouter(EventCalendar);
