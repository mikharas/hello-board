import React, {
  useEffect, useState, useContext, useCallback,
} from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from '@material-ui/core';
import { useHttpClient } from '../../shared/hooks/http-hook';
import AuthContext from '../../shared/context/authContext';
import { TimeoutContext } from '../../shared/context/timeoutContext';
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

const UserBoards = () => {
  const {
    isLoading, error, sendRequest, clearError,
  } = useHttpClient();
  const { userId } = useParams();
  const [fetchedBoards, setFetchedBoards] = useState();
  const [openDialog, setOpenDialog] = useState(false);
  const auth = useContext(AuthContext);
  const { resetTimeout } = useContext(TimeoutContext);
  const [willBeDeleted, setWillBeDeleted] = useState(null);

  const fetchUserBoards = async () => {
    try {
      const responseData = await sendRequest(
        `http://localhost:3000/api/boards/user/${userId}`,
        'GET',
        null,
        {
          Authorization: `Bearer: ${auth.token}`,
        },
      );
      setFetchedBoards(responseData.boards);
    } catch (err) {}
  };

  const createBoardHandler = async () => {
    try {
      const responseData = await sendRequest(
        'http://localhost:3000/api/boards/',
        'POST',
        JSON.stringify({
          creator: userId,
          title: 'New Board',
        }),
        {
          'Content-Type': 'application/json',
          Authorization: `Bearer: ${auth.token}`,
        },
      );
      fetchUserBoards();
    } catch (err) {}
  };

  const deleteBoardHandler = useCallback(async (boardId) => {
    try {
      const responseData = await sendRequest(
        `http://localhost:3000/api/boards/${boardId}`,
        'DELETE',
        null,
        {
          Authorization: `Bearer: ${auth.token}`,
        },
      );
      fetchUserBoards();
    } catch (err) {}
  }, []);

  useEffect(() => {
    fetchUserBoards();
  }, [sendRequest, userId]);

  useEffect(() => {
    resetTimeout();
  }, [fetchedBoards]);

  if (isLoading) {
    return <h1>loading data...</h1>;
  }

  if (!fetchedBoards && !error) {
    return <h1>No boards were found</h1>;
  }

  if (error) {
    return <h1>{error}</h1>;
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
      <LogoutButton onClick={() => { auth.logout(); }}>
        Logout
      </LogoutButton>
      <Title>
        My boards
      </Title>
      <BoardList>
        {fetchedBoards.map(b => (
          <BoardCard
            title={b.title}
            id={b.id}
            setOpenDialog={setOpenDialog}
            setWillBeDeleted={setWillBeDeleted}
          />
        ))}
        <NewBoard onClick={createBoardHandler}>
          Create New Board
        </NewBoard>
      </BoardList>
    </Wrapper>
  );
};

export default UserBoards;
