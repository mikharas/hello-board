import React, {
  useEffect, useState, useContext,
} from 'react';
import { useParams, NavLink } from 'react-router-dom';
import styled from 'styled-components';
import FlipMove from 'react-flip-move';
import { IconButton, Button } from '@material-ui/core';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { isMobile } from 'react-device-detect';
import AuthContext from '../../shared/context/authContext';
import TimeoutContext from '../../shared/context/timeoutContext';
import BoardCardMobile from './BoardCardMobile';
import BoardCardDesktop from './BoardCardDesktop';
import WarningDialog from '../../shared/components/WarningDialog';

const Title = styled.h1`
`;

const Wrapper = styled.div`
  margin: 50px 0;
  display: flex;
  flex-direction: column;
  align-items: center;

  .link {
    color: inherit;
  }

  .MuiIconButton-root.icon {
    font-size: 30px;
  }

  .icon {
    position: absolute;
    right: 20px;
    top: 20px;
  }
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
  font-size: 17px;
  left: 30px;
  top: 30px;
  color: red;
`;

const NewBoard = styled(Button)`
`;

const UserBoards = ({
  boardsList, getUserBoardsData, postUserBoard, delUserBoard, logout
}) => {
  const { userId } = useParams();
  const [openDialog, setOpenDialog] = useState(false);
  const { resetTimeout } = useContext(TimeoutContext);
  const [willBeDeleted, setWillBeDeleted] = useState(null);

  const BoardCard = isMobile ? <BoardCardMobile /> : <BoardCardDesktop />;

  const createBoardHandler = () => {
    postUserBoard(userId);
    resetTimeout();
  };

  const deleteBoardHandler = (boardId) => {
    delUserBoard(boardId);
  };

  useEffect(() => {
    getUserBoardsData(userId);
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
        My Boards
      </Title>
      <IconButton className="icon">
        <NavLink className="link" to={`/calendar/${moment(new Date()).format('YYYY-MM')}`}>
          <FontAwesomeIcon icon={faCalendar} />
        </NavLink>
      </IconButton>
      <BoardList>
        <FlipMove typeName={null}>
          {boardsList.map(({ id, title }) => (
            <div key={id}>
              {isMobile
                ? (
                  <BoardCardMobile
                    title={title}
                    id={id}
                    setOpenDialog={setOpenDialog}
                    setWillBeDeleted={setWillBeDeleted}
                  />
                ) : (
                  <BoardCardDesktop
                    title={title}
                    id={id}
                    setOpenDialog={setOpenDialog}
                    setWillBeDeleted={setWillBeDeleted}
                  />
                )}
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
