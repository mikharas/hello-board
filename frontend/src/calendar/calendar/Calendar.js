import React, { useEffect, useState } from 'react';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import DateSquare from '../date/DateSquareContainer';
import FilterBoardSelector from './FilterBoardSelectorContainer';
import Header from './Header';

const BackButton = styled(Button)`
  position: absolute;
  left: 10px;
  top: 10px;
  font-size: 20px;
  color: red;
`;

const Wrapper = styled.div`
  position: relative;

  .MuiButton-root.button {
    color: red;
    font-size: 20px;
  }

  .topRight {
    display: flex;
    align-items: center;
    position: absolute;
    right: 30px;
    top: 30px;
  }

  .topLeft {
    display: flex;
    align-items: center;
    position: absolute;
    left: 30px;
    top: 30px;
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
  addEvent, delEvent, boardIds, getEvents, yearMonth, userBoards,
}) => {
  console.log('rendering calendar');

  const [showBoard, setShowBoard] = useState(boardIds);

  const goToday = () => {
    const todayDate = new Date();
    changeMonth(new Date(todayDate.getFullYear(), todayDate.getMonth(), 1));
  };
  const goToDate = (date) => {
    changeMonth(new Date(date));
  };

  useEffect(() => {
    getEvents();
    goToDate(yearMonth);
  }, [userBoards]);

  return (
    <Wrapper>
      <div className="topLeft">
        <BackButton
          component={Link}
          to="/"
        >
          BACK
        </BackButton>
      </div>
      <div className="topRight">
        <Button
          onClick={goToday}
          style={{ marginRight: '20px' }}
        >
          Today
        </Button>
        <FilterBoardSelector
          boardIds={boardIds}
          showBoard={showBoard}
          setShowBoard={setShowBoard}
        />
      </div>
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
