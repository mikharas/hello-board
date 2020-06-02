import React from 'react';

const Event = ({ id, date, taskTitle, taskDescription }) => {
  console.log('rendering event ', id)
  return(
    <>
      <h3>{taskTitle}</h3>
      <p>{taskDescription}</p>
    </>
  )
}

export default Event;
