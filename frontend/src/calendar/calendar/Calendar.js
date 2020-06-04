import React, { useEffect } from 'react';
import { Button } from '@material-ui/core';
import styled from 'styled-components';
import { DragDropContext } from 'react-beautiful-dnd';
import DateSquare from '../date/DateSquareContainer';

const Wrapper = styled.div`
`;

const Calendar = ({
  monthName, yearName, dates, changeMonth, moveEventBetweenDates,
  addEvent, delEvent,
}) => {
  console.log('rendering calendar');

  const onDragEnd = ({ destination, source, draggableId }) => {
    if (!destination) return;
    if (destination.droppableId === source.droppableId) return;
    console.log(draggableId);
    return (
      moveEventBetweenDates(source.droppableId, destination.droppableId,
        source.index, destination.index, draggableId)
    );
  };

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
    height: 100px;
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

  useEffect(() => {
    const todayDate = new Date();
    changeMonth(new Date(todayDate.getFullYear(), todayDate.getMonth(), 1));
  }, []);

  return (
    <Wrapper>
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
        <DragDropContext onDragEnd={onDragEnd}>
          {dates.map(week => (
            <WeekContainer>
              {week.map(day => (
                <DateSquare id={day} />
              ))}
            </WeekContainer>
          ))}
        </DragDropContext>
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
