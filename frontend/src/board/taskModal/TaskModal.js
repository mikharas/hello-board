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
import {
  faTrash, faCalendar, faAlignJustify, faComment, faCheckSquare,
} from '@fortawesome/free-solid-svg-icons';
import { v4 as uuidv4 } from 'uuid';
import EditableTitle from '../subcomponents/editableTitle';
import TodoList from './TodoList';
import AuthContext from '../../shared/context/authContext';

const TaskModalStyled = styled(Modal)`
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;

  .card {
    width: 550px;
    height: 80%;
    padding: 50px 25px;
  }

  .row {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    width: 100%;
  }

  .icon {
    color: teal;
    height: 20px;
    width: 20px;
    margin-right: 20px;
  }

  h1 {
    font-size: 18px;
    font-family: inherit;
    font-weight: bold;
    margin: 6px 8px;
    margin-right: 15px;
    color: black;
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

const normalDescriptionStyle = {
  width: '100%',
  outline: 'none',
  border: '0',
  fontSize: '15px',
  fontFamily: 'inherit',
  fontWeight: 'normal',
};

const editDescriptionStyle = {
  width: '100%',
  outline: 'none',
  border: 'solid 1px teal',
  fontSize: '15px',
  fontFamily: 'inherit',
  fontWeight: 'normal',
};

const normalTitleStyle = {
  width: '100%',
  outline: 'none',
  border: 'none',
  margin: '6px 8px',
  background: 'transparent',
  fontSize: '18px',
  fontFamily: 'inherit',
  fontWeight: 'bold',
};

const editTitleStyle = {
  width: '100%',
  outline: 'none',
  margin: '6px 8px',
  border: 'solid 1px teal',
  background: 'transparent',
  fontSize: '18px',
  fontFamily: 'inherit',
  fontWeight: 'bold',
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
            </div>
          </Header>
          <div className="row">
            <FontAwesomeIcon className="icon" icon={faAlignJustify} />
            <EditableTitle
              title={title}
              changeTitle={changeTitle}
              normalStyle={normalTitleStyle}
              style={editTitleStyle}
            />
          </div>
          <div className="row">
            <FontAwesomeIcon className="icon" icon={faComment} />
            {description
              ? (
                <EditableTitle
                  title={description}
                  changeTitle={changeDescription}
                  style={editDescriptionStyle}
                  normalStyle={normalDescriptionStyle}
                  allowEmpty
                />
              )
              : (
                <Button onClick={() => changeDescription('New description')}>
                  Add a description
                </Button>
              )}
          </div>
          <div className="row">
            <FontAwesomeIcon className="icon" icon={faCalendar} />
            {date
              ? (
                <>
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
                  <NavLink
                    to={`/calendar/${moment(date).format('YYYY-MM')}`}
                    onClick={saveHandler}
                  >
                    <h1>go to calendar</h1>
                  </NavLink>
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
          <div className="row">
            <FontAwesomeIcon className="icon" icon={faCheckSquare} />
            {todo.length > 0
              ? (
                <h1>Todo list</h1>
              )
              : (
                <Button onClick={() => addTodoItem(taskId, uuidv4(), 'New item')}>
                  Add todo list
                </Button>
              )}
          </div>
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
