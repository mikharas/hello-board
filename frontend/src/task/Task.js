import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import NaturalDragAnimation from 'natural-drag-animation-rbdnd';
import { Button, Card } from '@material-ui/core';
import { Draggable } from 'react-beautiful-dnd';
import TaskModal from '../taskModal/TaskModal';
import EditableTitle from '../subcomponents/editableTitle';

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

const titleStyle = {
  width: '100%',
  outline: 'none',
  border: 'none',
  background: 'transparent',
  fontSize: '18px',
  fontFamily: 'inherit',
  fontWeight: 'normal',
};

const titleEditStyle = {
  width: '100%',
  outline: 'none',
  border: 'none',
  background: 'transparent',
  fontSize: '18px',
  fontFamily: 'inherit',
  fontWeight: 'normal',
};

const Task = ({
  changeTitle, title, description, columnId, taskId, index, delTask, todo,
  moveTodosInTask, addTodoItem,
}) => {
  console.log('rendering ', taskId);

  const [openModal, setOpenModal] = useState(false);

  const changeTaskTitle = useCallback((newTitle) => {
    changeTitle(taskId, newTitle);
  }, [taskId]);

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
                description={description}
                columnId={columnId}
                taskId={taskId}
                openModal={openModal}
                toggleModal={toggleModal}
                todo={todo}
                changeTitle={changeTaskTitle}
                moveTodosInTask={moveTodosInTask}
                addTodoItem={addTodoItem}
              />
              <TaskCard>
                <EditableTitle
                  title={title}
                  changeTitle={changeTaskTitle}
                  style={titleEditStyle}
                  normalStyle={titleStyle}
                />
                <Button onClick={toggleModal}>open</Button>

              </TaskCard>
            </div>
          )}
        </NaturalDragAnimation>
      )}
    </Draggable>
  );
};

export default React.memo(Task);
