import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { Card, Button } from '@material-ui/core';

const BoardCardFront = styled(Card)`
  width: 300px;
  height: 100px;
  margin-bottom: 20px;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  justify-content: center;

  .link {
    font-family: inherit;
    font-size: 20px;
    text-decoration: none;
    color: gray;
  }
`;

const BoardCardBack = styled(Card)`
  width: 300px;
  height: 100px;
  margin-bottom: 20px;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  justify-content: center;

  .link {
    text-decoration: none;
    color: gray;
  }

  .button {
    font-family: inherit;
    font-size: 20px;
    text-decoration: none;
    color: gray;
  }
`;

const BoardCard = ({
  title, id, setOpenDialog, setWillBeDeleted,
}) => {
  const [selected, setSelected] = useState(false);
  console.log('rendering board card, ', id);
  if (!selected) {
    return (
      <BoardCardFront
        onMouseEnter={() => setSelected(true)}
      >
        <h2>{title}</h2>
      </BoardCardFront>
    );
  } return (
    <BoardCardBack
      onMouseLeave={() => setSelected(false)}
    >
      <Button className="button"><NavLink className="link" to={`/boards/${id}/none`}>OPEN</NavLink></Button>
      <Button
        className="button"
        onClick={() => {
          setWillBeDeleted(id);
          setOpenDialog(true);
        }}
      >
        Delete
      </Button>
    </BoardCardBack>
  );
};

export default React.memo(BoardCard);
