import React from 'react';
import { Button } from '@material-ui/core';
import styled from 'styled-components';
import DateSquare from '../date/DateSquareContainer';

const Wrapper = styled.div`
`;

const Calendar = ({ monthName, dates, changeMonth }) => {
  console.log('rendering calendar');

  return (
    <Wrapper>
      <h1>{monthName}</h1>
      {dates.map(week => (
        <>
          <h2>week</h2>
          {week.map(day => (
            <DateSquare id={day} />
          ))}
        </>
      ))}
      <Button onClick={() => changeMonth(new Date(2021, 1, 1))}>
        click me
      </Button>
    </Wrapper>
  );
};

export default React.memo(Calendar);
