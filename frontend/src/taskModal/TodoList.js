import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import {
  List,
  Paper,
  LinearProgress,
} from '@material-ui/core';
import TodoItem from '../todoitem/TodoItemContainer';

const ListWrapper = styled(Paper)`
  width: 100%;
  max-height: 320px;
  overflow: auto;
`;

const TodoList = ({ todo, taskId, addTodoItem }) => {
  console.log('rendering todolist ', taskId);
  return (
    <div>
      <Droppable droppableId={taskId}>
        {provided => (
          <ListWrapper
            ref={provided.innerRef}
            {...provided.droppableProps}
            elevation={0}
          >
            <List>
              {todo.map((todoItemId, index) => (
                <TodoItem
                  index={index}
                  todoItemId={todoItemId}
                />
              ))}
            </List>
            {provided.placeholder}
          </ListWrapper>
        )}
      </Droppable>
    </div>
  );
};

export default React.memo(TodoList);
