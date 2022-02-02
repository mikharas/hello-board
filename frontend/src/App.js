import React from "react";
import { connect } from "react-redux";
import { StylesProvider } from "@material-ui/core/styles";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import Board from "./board/board/BoardContainer";
// import Auth from './user/pages/Auth';
import Auth from "./auth/index";
import UserBoards from "./board/userBoard/UserBoardsContainer";
import Calendar from "./calendar/calendar/CalendarContainer";

import AuthContext from "./shared/context/authContext";
import TimeoutContext from "./shared/context/timeoutContext";
import { useAuth } from "./shared/hooks/auth-hook";

const App = ({ isLoggedIn, userId }) => {
  let routes;

  console.log(userId)
  if (isLoggedIn) {
    routes = (
      <>
        <Switch>
          <Route exact path="/:userId/boards">
            <UserBoards />
          </Route>
          <Route
            exact
            path="/boards/:boardId"
            render={({ match }) => <Board boardId={match.params.boardId} />}
          />
          <Route
            exact
            path="/calendar/:yearMonth"
            render={({ match }) => (
              <Calendar yearMonth={match.params.yearMonth} />
            )}
          />
          <Redirect to={`/${userId}/boards`} />
        </Switch>
      </>
    );
  } else {
    routes = (
      <>
        <Route exact path="/">
          <Auth />
        </Route>
        <Redirect to="/" />
      </>
    );
  }
  return (
    <StylesProvider injectFirst>
      <Router>
        <Switch>{routes}</Switch>
      </Router>
    </StylesProvider>
  );
};

const mapStateToProps = (state) => ({
  isLoggedIn: state.auth.isLoggedIn,
  userId: state.auth.user && state.auth.user.userId
});

export default connect(mapStateToProps)(App);
