import React, {
  useEffect, useState, useContext,
} from 'react';
import { useParams, NavLink } from 'react-router-dom';
import styled from 'styled-components';
import FlipMove from 'react-flip-move';
import { Button } from '@material-ui/core';
import moment from 'moment';
import AuthContext from '../../shared/context/authContext';
import TimeoutContext from '../../shared/context/timeoutContext';
import BoardCard from './BoardCard';
import WarningDialog from '../../shared/components/WarningDialog';

const Title = styled.h1`
`;

const Wrapper = styled.div`
  margin: 50px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BoardList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px;
  border-radius: 15px;
  width: 100%;
  background: #EBECF0;
`;

const LogoutButton = styled(Button)`
  position: absolute;
  left: 15px;
  top: 15px;
  color: red;
`;

const NewBoard = styled(Button)`
`;

const UserBoards = ({
  boardsList, getUserBoardsData, postUserBoard, delUserBoard,
}) => {
  const { userId } = useParams();
  const [openDialog, setOpenDialog] = useState(false);
  const { token, logout } = useContext(AuthContext);
  const { resetTimeout } = useContext(TimeoutContext);
  const [willBeDeleted, setWillBeDeleted] = useState(null);

  const createBoardHandler = () => {
    postUserBoard(userId, token);
    resetTimeout();
  };

  const deleteBoardHandler = (boardId) => {
    delUserBoard(boardId, token);
  };

  useEffect(() => {
    resetTimeout();
    getUserBoardsData(userId, token);
  }, []);

  if (!boardsList) {
    return <h1>Is loading boards...</h1>;
  }

  return (
    <Wrapper>
      <WarningDialog
        open={openDialog}
        onContinue={() => {
          deleteBoardHandler(willBeDeleted);
          setOpenDialog(false);
        }}
        onClose={() => setOpenDialog(false)}
        msg="Are you sure you want to delete this board?"
      />
      <LogoutButton onClick={() => { logout(); }}>
        Logout
      </LogoutButton>
      <Title>
        My boards
      </Title>
      <Button><NavLink className="link" to={`/calendar/${moment(new Date()).format('YYYY-MM')}`}>CALENDAR</NavLink></Button>
      <BoardList>
        <FlipMove typeName={null}>
          {boardsList.map(({ id, title }) => (
            <div key={id}>
              <BoardCard
                title={title}
                id={id}
                setOpenDialog={setOpenDialog}
                setWillBeDeleted={setWillBeDeleted}
              />
            </div>
          ))}
        </FlipMove>
        <NewBoard onClick={createBoardHandler}>
          Create New Board
        </NewBoard>
      </BoardList>
    </Wrapper>
  );
};

export default UserBoards;
