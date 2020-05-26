import React from 'react';
import styled from 'styled-components';
import {
  Paper,
  Modal,
  Fade,
  Backdrop,
  IconButton,
} from '@material-ui/core';
import EditableTitle from '../subcomponents/editableTitle';
import TodoItem from '../todoitem/TodoItem';

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
  }
`;

const TaskModal = ({
  title, columnId, description, taskId, openModal, toggleModal, todo, changeTitle
}) => {
  console.log('rendering taskModal of ', taskId);
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
          {todo.map(todoItemId => (
            <h1>{todoItemId}</h1>
          ))}
        </Paper>
      </Fade>
    </TaskModalStyled>
  );
};

export default React.memo(TaskModal);
