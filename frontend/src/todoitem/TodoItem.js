import React from 'react';

const TodoItem = ({ todoItemId }) => (
  <h1>{todoItemId}</h1>
);

export default React.memo(TodoItem);
