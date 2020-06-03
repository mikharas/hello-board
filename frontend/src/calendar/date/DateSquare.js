import React from 'react';
import Event from '../../events/events/EventContainer';

const DateSquare = ({ id, date, eventIds }) => {
  console.log('rendering date square ', id);
  console.log('date is ', date);
  console.log('eventIds', eventIds)
  return (
    <>
      <h1>{date && date.toDateString()}</h1>
      {eventIds.map(eventId => <h3>{eventId}</h3>)}
    </>
  );
};

export default DateSquare;
