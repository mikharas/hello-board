import React, { useCallback, useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import {
  Checkbox,
  ClickAwayListener,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  Button,
} from '@material-ui/core';
import EditableTitle from '../subcomponents/editableTitle';

const ItemStyled = styled(ListItem)`
  background: ${({ isHovered }) => isHovered && '#EBECF0'};
  text-decoration: ${({ isChecked }) => isChecked && 'line-through'};
  color: ${({ isChecked }) => isChecked && 'red'};
  height: 50px;
`;

const titleStyle = {
  width: '100%',
  outline: 'none',
  border: 'none',
  fontWeight: 'normal',
  fontSize: '15px',
  fontFamily: 'inherit',
};

const TodoItem = ({
  key, index, todoItemId, title, isCompleted, changeTitle, toggleIsCompleted, taskId, incrementCompleted, decrementCompleted, delTodoItem
}) => {
  console.log('rendering todoitem ', todoItemId);

  const [isHovered, setIsHovered] = useState(false);

  const changeTodoItemTitle = useCallback((newTitle) => {
    changeTitle(todoItemId, newTitle);
  }, [todoItemId]);

  return (
    <Draggable
      key={todoItemId}
      draggableId={todoItemId}
      index={index}
    >
      {provided => (
        <ItemStyled
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isHovered={isHovered}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Checkbox
            checked={isCompleted}
            edge="start"
            tabIndex={-1}
            onClick={(e) => {
              e.stopPropagation();
              toggleIsCompleted(todoItemId);
              if (isCompleted) decrementCompleted(taskId);
              else incrementCompleted(taskId);
            }}
          />
          <EditableTitle
            title={title}
            changeTitle={changeTodoItemTitle}
            style={titleStyle}
            normalStyle={titleStyle}
          />
          <Button
            onClick={() => delTodoItem(taskId, todoItemId)}
          >
            Del
          </Button>
        </ItemStyled>
      )}
    </Draggable>
  );
};

export default React.memo(TodoItem);
