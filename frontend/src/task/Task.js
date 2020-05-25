import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import NaturalDragAnimation from 'natural-drag-animation-rbdnd';
import { Button, Card } from '@material-ui/core';
import { Draggable } from 'react-beautiful-dnd';
import TaskModal from './TaskModal';

const TaskCard = styled(Card)`
  padding: 8px;
  position: relative;
  margin-bottom: 8px;
  background: ${({ isDragDisabled }) => {
    if (isDragDisabled) return 'lightgrey';
    return 'white';
  }};
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  min-height: 40px;
`;

const Title = React.memo(({ title }) => {
  console.log('TITLE of task');
  return (
    <h1>{title}</h1>
  );
});

const Task = ({
  title, columnId, taskId, index, delTask, addTask, todo,
}) => {
  console.log('rendering ', taskId);
  const [openModal, setOpenModal] = useState(false);
  const toggleModal = useCallback(() => {
    setOpenModal(!openModal);
  }, [openModal]);
  return (
    <Draggable
      key={taskId}
      draggableId={taskId}
      index={index}
    >
      {(provided, snapshot) => (
        <NaturalDragAnimation
          style={provided.draggableProps.style}
          snapshot={snapshot}
        >
          {style => (
            <div
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              isDragging={snapshot.isDragging}
              ref={provided.innerRef}
              style={style}
            >
              <TaskModal
                title={title}
                columnId={columnId}
                taskId={taskId}
                description={taskId}
                openModal={openModal}
                toggleModal={toggleModal}
                todo={todo}
              />
              <TaskCard onClick={toggleModal}>
                <Title title={title} />
                <Button onClick={() => delTask(columnId, taskId)}>Delete Task</Button>
              </TaskCard>
            </div>
          )}
        </NaturalDragAnimation>
      )}
    </Draggable>
  );
};

export default React.memo(Task);
