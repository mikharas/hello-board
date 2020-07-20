import React, { useEffect, useState } from 'react';
import { Button } from '@material-ui/core';
import styled from 'styled-components';
import DateSquare from '../date/DateSquareContainer';
import FilterBoardSelector from './FilterBoardSelectorContainer';
import Header from './Header';

const Wrapper = styled.div`
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
  addEvent, delEvent, boardIds, getEvents, yearMonth,
}) => {
  console.log('rendering calendar');

  const [showBoard, setShowBoard] = useState(boardIds);

  const goToday = () => {
    const todayDate = new Date();
    changeMonth(new Date(todayDate.getFullYear(), todayDate.getMonth(), 1));
  };
  const goToDate = (date) => {
    // const todayDate = new Date();
    changeMonth(new Date(date));
  };

  useEffect(() => {
    goToDate(yearMonth);
    getEvents();
  }, []);

  useEffect(() => {
    goToDate(yearMonth);
    getEvents();
  }, [yearMonth]);

  return (
    <Wrapper>
      <FilterBoardSelector
        boardIds={boardIds}
        showBoard={showBoard}
        setShowBoard={setShowBoard}
      />
      <Button
        onClick={goToday}
      >
        Today
      </Button>
      <Header
        changeMonth={changeMonth}
        monthName={monthName}
        yearName={yearName}
      />
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

export default Calendar;
