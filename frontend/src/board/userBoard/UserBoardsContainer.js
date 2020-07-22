import { connect } from 'react-redux';
import {
  postUserBoard,
  delUserBoard,
  getUserBoardsData,
} from '../actions/userBoardsActions';
import UserBoards from './UserBoards';

const mapStateToProps = (state) => {
  return {
    boardsList: Object.keys(state.userBoards).map(id => ({
      id,
      title: state.userBoards[id].title,
    })),
  };
};

const mapDispatchToProps = {
  postUserBoard,
  delUserBoard,
  getUserBoardsData,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserBoards);
