import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import NaturalDragAnimation from 'natural-drag-animation-rbdnd';
import { Button, Card, LinearProgress } from '@material-ui/core';
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

const ProgressBar = styled(LinearProgress)`
  width: 100%;
  height: 10px;
  position: absolute;
  top: 0;
  left: 0;
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
  changeTitle, changeDescription, title, description, completed, columnId, taskId, index, delTask, todo,
  moveTodosInTask, addTodoItem, completedPercentage,
}) => {
  console.log('rendering ', taskId);

  const [openModal, setOpenModal] = useState(false);

  const changeTaskTitle = useCallback((newTitle) => {
    changeTitle(taskId, newTitle);
  }, [taskId]);

  const changeTaskDescription = useCallback((newDescription) => {
    changeDescription(taskId, newDescription);
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
                completed={completed}
                columnId={columnId}
                taskId={taskId}
                openModal={openModal}
                toggleModal={toggleModal}
                todo={todo}
                changeTitle={changeTaskTitle}
                changeDescription={changeTaskDescription}
                completedPercentage={completedPercentage}
                moveTodosInTask={moveTodosInTask}
                addTodoItem={addTodoItem}
                delTask={delTask}
              />
              <TaskCard>
                {todo.length !== 0 && (
                  <ProgressBar
                    variant="determinate"
                    color="secondary"
                    value={completedPercentage}
                  />
                )}
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
