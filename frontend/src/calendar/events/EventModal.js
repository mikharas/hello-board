import React from 'react';

const EventModal = ({ title, description, todo }) => {
  if (!title) {
    return 'no task';
  }

  return (
    <>
      <p>{title}</p>
      <p>{description}</p>
      <p>{todo}</p>
    </>
  );
};

export default EventModal;
