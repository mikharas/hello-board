import React, { useEffect, useState } from 'react';
import { Button } from '@material-ui/core';
import styled from 'styled-components';
import DateSquare from '../date/DateSquareContainer';
import FilterBoardSelector from './FilterBoardSelectorContainer';

const Wrapper = styled.div`
`;

const Header = styled.div`
  width: 100%;
  height 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h1 {
    font-size: 40px;
    color: red;
    margin: 0;
    margin-bottom: 15px;
  }

  h2 {
    margin: 0;
    font-size: 20px;
  }
`;

const weekdays = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];

const Body = styled.div`
  background: #EBECF0;
  padding: 15px;
`;

const WeekContainer = styled.div`
  display: flex;
  margin: 0 auto;
  width: 80%;
  height: 180px;
  justify-content: space-evenly;
  padding: 10px 0;
`;

const DayLabel = styled.div`
  display: flex;
  margin: 0 auto;
  padding-bottom: 20px;
  width: 80%;
  height: 30px;
  justify-content: space-evenly;

  p {
    width: 13%;
    text-align: center;
    font-weight: bold;
    font-size: 18px;
  }
`;

const Calendar = ({
  monthName, yearName, dates, changeMonth, moveEventBetweenDates,
  addEvent, delEvent, boardIds,
}) => {
  console.log('rendering calendar');
  // const [showBoard, setShowBoard] = useState(["5ed23971f9552b7c029e3885"])
  const [showBoard, setShowBoard] = useState(boardIds);

  useEffect(() => {
    const todayDate = new Date();
    changeMonth(new Date(todayDate.getFullYear(), todayDate.getMonth(), 1));
  }, []);

  return (
    <Wrapper>
      <FilterBoardSelector
        boardIds={boardIds}
        showBoard={showBoard}
        setShowBoard={setShowBoard}
      />
      <Header>
        <h1>{monthName}</h1>
        <h2>{yearName}</h2>
      </Header>
      <Body>
        <DayLabel>
          {weekdays.map(day => (
            <p>{day}</p>
          ))}
        </DayLabel>
        {dates.map(week => (
          <WeekContainer>
            {week.map(day => (
              <DateSquare showBoard={showBoard} id={day} />
            ))}
          </WeekContainer>
        ))}
      </Body>
      <Button onClick={() => changeMonth(new Date(2021, 1, 1))}>
        click me
      </Button>
      <Button onClick={() => changeMonth(new Date(2021, 1, 1))}>
        + Add New Event
      </Button>
    </Wrapper>
  );
};

export default React.memo(Calendar);
