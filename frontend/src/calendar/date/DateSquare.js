import React from 'react';
import Event from '../../events/events/EventContainer';

const DateSquare = ({ id, date }) => {
  console.log('rendering ', id);
  console.log(date);
  return (
    <h1>{date && date.toDateString()}</h1>
  );
};

export default DateSquare;
