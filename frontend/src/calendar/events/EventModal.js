import React from 'react';

const EventModal = ({ task }) => {
  console.log('rendering event modal');

  if (!task) {
    return 'no task';
  }
  return (
    <>
      <p>{task.title}</p>
      <p>{task.description}</p>
      <p>{task.todo}</p>
    </>
  );
};

export default EventModal;
