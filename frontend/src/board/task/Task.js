import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import NaturalDragAnimation from 'natural-drag-animation-rbdnd';
import { IconButton, Card, LinearProgress } from '@material-ui/core';
import { Draggable } from 'react-beautiful-dnd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH, faClock, faComment } from '@fortawesome/free-solid-svg-icons';
import TaskModal from '../taskModal/TaskModal';
import EditableTitle from '../subcomponents/editableTitle';

const TaskCard = styled(Card)`
  padding: 10px;
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
  .icon {
    font-size: 20px;
    padding-right: 8px;
    color: red;
  }
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
  fontSize: '14px',
  fontFamily: 'inherit',
  fontWeight: 'bold',
};

const titleEditStyle = {
  width: '100%',
  outline: 'none',
  border: 'none',
  background: 'transparent',
  fontSize: '14px',
  fontFamily: 'inherit',
  fontWeight: 'bold',
};

const Task = ({
  changeTitle, changeDescription, title, description, completed, columnId, taskId, index, delTask, todo, date, addDate, moveTodosInTask, addTodoItem, completedPercentage, selectedTask, getUserBoardsData, saveData, boardId, setSelectedTask, delDate, delAllTodoItem,
}) => {
  console.log('rendering ', taskId);

  console.log(description);
  const [openModal, setOpenModal] = useState(selectedTask === taskId);
  const [hovered, setHovered] = useState(false);

  const changeTaskTitle = useCallback((newTitle) => {
    changeTitle(taskId, newTitle);
  }, [taskId]);

  const changeTaskDescription = useCallback((newDescription) => {
    changeDescription(taskId, newDescription);
  }, [taskId]);

  const toggleModal = useCallback(() => {
    setSelectedTask(null);
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
                delDate={delDate}
                addDate={addDate}
                date={date}
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
                getUserBoardsData={getUserBoardsData}
                saveData={saveData}
                boardId={boardId}
                delAllTodoItem={delAllTodoItem}
              />
              <TaskCard
                elevation={snapshot.isDragging ? 16 : 2}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
              >
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
                  allowEnter
                />
                {description && <FontAwesomeIcon className="icon" icon={faComment} />}
                {date && <FontAwesomeIcon className="icon" icon={faClock} />}
                {hovered && (
                  <IconButton onClick={toggleModal}>
                    <FontAwesomeIcon size="sm" icon={faEllipsisH} />
                  </IconButton>
                )}

              </TaskCard>
            </div>
          )}
        </NaturalDragAnimation>
      )}
    </Draggable>
  );
};

export default React.memo(Task);
