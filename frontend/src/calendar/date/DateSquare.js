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
    font-size: 20px;
    padding-left: 10px;
    margin: 0;
    margin-top: 15px;
    margin-bottom: 10px;
  }

  .events {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;

  }
`;

const DateSquare = ({ id, date, eventIds }) => {
  console.log('rendering datesquare', date);
  // console.log(eventIds);
  return (
    <Wrapper>
      <div className="circle"><p>{date && date.getDate()}</p></div>
      <div className="events">
        {eventIds.map(eventId => (
          <Event id={eventId} />
        ))}
      </div>
    </Wrapper>
  );
};

export default React.memo(DateSquare);
