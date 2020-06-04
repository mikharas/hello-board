import React, { forwardRef } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import Event from '../../events/events/EventContainer';

const EventList = styled.div`
  background: red;
  width: 100%;
`;

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

const DateSquare = forwardRef(({ id, date, eventIds }, ref) => {
  console.log('rendering datesquare', date);
  return (
    <Wrapper>
      <div className="circle"><p>{date && date.getDate()}</p></div>
      <Droppable droppableId={id}>
        {provided => (
          <EventList
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {eventIds.map((eventId, index) => {
              return (
                <Event
                  id={eventId}
                  index={index}
                />
              );
            })}
            { provided.placeholder }
          </EventList>
        )}
      </Droppable>
    </Wrapper>
  );
});

export default React.memo(DateSquare);
