import React from 'react';
import styled from 'styled-components';
import {
  Paper,
  Modal,
  Fade,
  Backdrop,
  IconButton,
} from '@material-ui/core';
import { DragDropContext } from 'react-beautiful-dnd';
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

const TaskModal = ({
  title, columnId, description, taskId, openModal, toggleModal, todo, changeTitle, addTodoItem, moveTodosInTask,
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
          <EditableTitle
            title={title}
            changeTitle={changeTitle}
          />
          <p>{description}</p>
          <DragDropContext
            onDragEnd={onDragEnd}
          >
            <TodoList
              todo={todo}
              taskId={taskId}
              addTodoItem={addTodoItem}
            />
          </DragDropContext>
        </Paper>
      </Fade>
    </TaskModalStyled>
  );
};

export default React.memo(TaskModal);
