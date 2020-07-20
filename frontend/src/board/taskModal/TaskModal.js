import React, { useContext } from 'react';
import styled from 'styled-components';
import DatePicker from 'react-date-picker';
import {
  Button,
  Paper,
  Modal,
  Fade,
  Backdrop,
  IconButton,
} from '@material-ui/core';
import { DragDropContext } from 'react-beautiful-dnd';
import { NavLink } from 'react-router-dom';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faCalendar } from '@fortawesome/free-solid-svg-icons';
import EditableTitle from '../subcomponents/editableTitle';
import TodoList from './TodoList';
import AuthContext from '../../shared/context/authContext';

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
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  .icons {
    position: absolute;
    right: 0;
  }

  .item {
    margin-left: 0px;
    padding: 10px;
  }
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
  title, columnId, description, taskId, openModal, toggleModal, todo, changeTitle, changeDescription, addTodoItem, delTask, moveTodosInTask, completedPercentage, date, addDate, getUserBoardsData, saveData, boardId, delDate,
}) => {
  console.log('rendering taskModal of ', taskId);

  const { userId, token } = useContext(AuthContext);

  const onDragEnd = ({ destination, source }) => {
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId
      && destination.index === source.index
    ) return;

    moveTodosInTask(source.droppableId, source.index, destination.index);
  };

  const saveHandler = () => {
    saveData(boardId, token);
    getUserBoardsData(userId, token);
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
            <div className="icons">
              <IconButton
                className="item"
                onClick={() => {
                  delTask(columnId, taskId);
                  toggleModal();
                }}
              >
                <FontAwesomeIcon icon={faTrash} />
              </IconButton>
              {date
                ? (
                  <>
                    <IconButton className="item" onClick={saveHandler}>
                      <NavLink
                        to={`/calendar/${moment(date).format('YYYY-MM')}`}
                      >
                        <FontAwesomeIcon icon={faCalendar} />
                      </NavLink>
                    </IconButton>
                    <DatePicker
                      className="item"
                      onChange={(val) => {
                        if (!val) {
                          delDate(taskId);
                        } else {
                          addDate(taskId, val.toISOString());
                        }
                      }}
                      value={new Date(date)}
                    />
                  </>
                )
                : (
                  <Button
                    onClick={() => {
                      const today = new Date();
                      addDate(taskId, today.toISOString());
                    }}
                  >
                    Add Due Date
                  </Button>
                )}
            </div>
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
