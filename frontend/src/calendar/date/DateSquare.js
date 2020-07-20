import React from 'react';
import styled from 'styled-components';
import Event from '../events/EventContainer';

const Wrapper = styled.div`
  width: 13%;
  height: 100%;
  background: white;
  border-radius: 10px;

  .circle {
    background: ${(props) => props.circleColor};
    border-radius: 25px;
    width: 35px;
    height 35px;
    margin-left: 5px;
  }

  p {
    font-size: 20px;
    height: 100%;
    width: 100%;
    text-align: center;
    padding-top: 5px;
  }

  .events {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;

  }
`;

const getCircleColor = (date) => {
  if (!date) return 'initial';
  let todayDate = new Date();
  todayDate = new Date(todayDate.getFullYear(), todayDate.getMonth(), todayDate.getDate());
  if (todayDate.toISOString() === date.toISOString()) return 'red';
  return 'initial';
};

const DateSquare = ({ id, date, eventIds }) => {
  console.log('rendering datesquare', date);
  // console.log(eventIds);
  return (
    <Wrapper
      circleColor={getCircleColor(date)}
    >
      <div className="circle">
        <p>{date && date.getDate()}</p>
      </div>
      <div className="events">
        {eventIds.map(eventId => (
          <Event id={eventId} />
        ))}
      </div>
    </Wrapper>
  );
};

export default React.memo(DateSquare);
