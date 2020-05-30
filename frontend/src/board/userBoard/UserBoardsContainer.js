import { connect } from 'react-redux';
import {
  postUserBoard,
  delUserBoard,
  getUserBoardsData,
} from '../actions/userBoardsActions';
import UserBoards from './UserBoards';

const mapStateToProps = state => ({
  boardsList: state.userBoards,
});

const mapDispatchToProps = {
  postUserBoard,
  delUserBoard,
  getUserBoardsData,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserBoards);
