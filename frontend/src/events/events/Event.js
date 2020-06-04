import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

const Event = ({
  id, date, taskTitle, taskDescription, index,
}) => {
  console.log('rendering event ', id);
  return (
    <Draggable
      key={id}
      draggableId={id}
      index={index}
    >
      {provided => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <h3>Event here</h3>
        </div>
      )}
    </Draggable>
  );
};

export default Event;
