import React from 'react';
import styled from 'styled-components';
import {
  Button,
  Paper,
  Modal,
  Fade,
  Backdrop,
  IconButton,
} from '@material-ui/core';
import { DragDropContext } from 'react-beautiful-dnd';
import { v4 as uuidv4 } from 'uuid';
import EditableTitle from '../subcomponents/editableTitle';
import TodoList from './TodoList';

const TaskModalStyled = styled(Modal)`
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 15px;

  .card {
    width: 70%;
    height: 70%;
    border-radius: 15px;
    padding: 10px;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const descriptionStyle = {
  width: '100%',
  outline: 'none',
  border: 'none',
  background: 'transparent',
  fontSize: '18px',
  fontFamily: 'inherit',
  fontWeight: 'normal',
};

const TaskModal = ({
  boardId, title, columnId, description, taskId, openModal, toggleModal, todo, changeTitle, changeDescription, addTodoItem, delTask, moveTodosInTask, completedPercentage, makeEvent, eventId,
}) => {
  console.log('rendering taskModal of ', taskId);

  const onDragEnd = ({ destination, source }) => {
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId
      && destination.index === source.index
    ) return;

    moveTodosInTask(source.droppableId, source.index, destination.index);
  };

  return (
    <TaskModalStyled
      BackdropComponent={Backdrop}
      open={openModal}
      onClose={toggleModal}
    >
      <Fade in={openModal}>
        <Paper className="card">
          <Header>
            <EditableTitle
              title={title}
              changeTitle={changeTitle}
            />
            <Button
              onClick={() => {
                delTask(columnId, taskId);
                toggleModal();
              }}
            >
              Delete task
            </Button>
            {console.log('I am an event yes', eventId)}
            {!eventId

            && (
            <Button
              onClick={() => makeEvent(boardId, uuidv4(), taskId, new Date(2021, 1, 15))}
            >
              Make Event
            </Button>
            )}

            <h3>{eventId && 'Is an event.'}</h3>
          </Header>
          {description
            ? (
              <EditableTitle
                title={description}
                changeTitle={changeDescription}
                style={descriptionStyle}
                normalStyle={descriptionStyle}
              />
            )
            : (
              <Button onClick={() => changeDescription('New description')}>
                Add a description
              </Button>
            )}
          <DragDropContext
            onDragEnd={onDragEnd}
          >
            <TodoList
              todo={todo}
              taskId={taskId}
              columnId={columnId}
              boardId={boardId}
              addTodoItem={addTodoItem}
              completedPercentage={completedPercentage}
            />
          </DragDropContext>
        </Paper>
      </Fade>
    </TaskModalStyled>
  );
};

export default React.memo(TaskModal);
