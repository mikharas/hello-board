import React, { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import NaturalDragAnimation from 'natural-drag-animation-rbdnd';
import { IconButton, Card, LinearProgress } from '@material-ui/core';
import { Draggable } from 'react-beautiful-dnd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH, faClock, faComment } from '@fortawesome/free-solid-svg-icons';
import EditableTitle from '../subcomponents/editableTitle';

const TaskCard = styled(Card)`
  border: ${({ isFilterMatched }) => (isFilterMatched ? '3px solid black' : 'none')};
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
    font-size: 15px;
    padding-left: 4px;
    padding-right: 4px;
    color: red;
  }

  .clock {
    top: 50%;
    padding: 0;
  }

  .date-icons {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-left: 4px;
    padding-right: 4px;
  }

  h2 {
    font-size: 14px;
    color: red;
    padding: 0;
    margin: 0;
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
  fontSize: '15px',
  fontFamily: 'inherit',
  fontWeight: 'bold',
};

const titleEditStyle = {
  width: '100%',
  outline: 'none',
  border: 'none',
  background: 'transparent',
  fontSize: '15px',
  fontFamily: 'inherit',
  fontWeight: 'bold',
};

const Task = ({
  changeTitle, title, description, taskId, index, todo, date, completedPercentage, setSelectedTask, filterStr,
}) => {
  const [hovered, setHovered] = useState(false);
  const [filterMatch, setFilterMatch] = useState(false);

  useEffect(() => {
    if (!filterStr) {
      setFilterMatch(false);
      return;
    }
    setFilterMatch(title.toLowerCase().includes(filterStr.toLowerCase()));
  }, [filterStr]);

  const getDaysLeft = useCallback(() => {
    const today = new Date();
    const differenceMS = new Date(date) - today;
    const daysRemaining = Math.floor(differenceMS / 86400000) + 1;
    if (daysRemaining === 0) return 'today';
    return `${daysRemaining}d`;
  }, [date]);

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
              <TaskCard
                elevation={snapshot.isDragging ? 16 : 2}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                isFilterMatched={filterMatch}
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
                  changeTitle={val => changeTitle(taskId, val)}
                  style={titleEditStyle}
                  normalStyle={titleStyle}
                  allowEnter
                />
                {description && <FontAwesomeIcon className="icon" icon={faComment} />}
                {date
                  && (
                  <div className="date-icons">
                    <h2>
                      {getDaysLeft()}
                    </h2>
                    <FontAwesomeIcon className="icon clock" icon={faClock} />
                  </div>
                  )}
                {hovered && (
                  <IconButton onClick={() => setSelectedTask(taskId)}>
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
