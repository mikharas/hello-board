import React from 'react';
import styled from 'styled-components';
import Event from '../events/EventContainer';

const Wrapper = styled.div`
  width: 13%;
  height: 100%;
  background: white;
  border-radius: 10px;
  margin: 0 5px;

  p {
    font-size: 16px;
    padding-left: 10px;
  }

  .circle {

  }
`;

const DateSquare = ({ id, date, eventIds }) => {
  console.log('rendering datesquare', date);
  return (
    <Wrapper>
      <div className="circle"><p>{date && date.getDate()}</p></div>
      {eventIds.map((eventId) => (
        <Event id={eventId} />
      ))}
    </Wrapper>
  );
};

export default React.memo(DateSquare);
