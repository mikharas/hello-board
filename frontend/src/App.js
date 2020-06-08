import React from 'react';
import { StylesProvider } from '@material-ui/core/styles';
import {
  BrowserRouter as Router, Route, Redirect, Switch,
} from 'react-router-dom';

import Board from './board/board/BoardContainer';
import Auth from './user/pages/Auth';
import UserBoards from './board/userBoard/UserBoardsContainer';
import Calendar from './calendar/calendar/CalendarContainer';

import AuthContext from './shared/context/authContext';
import TimeoutContext from './shared/context/timeoutContext';
import { useAuth } from './shared/hooks/auth-hook';

const App = () => {
  let routes;
  const {
    token, login, logout, resetTimeout, userId,
  } = useAuth();

  if (token && userId) {
    routes = (
      <>
        <Switch>
          <Route
            exact
            path="/:userId/boards"
          >
            <UserBoards />
          </Route>
          <Route
            exact
            path="/boards/:boardId"
            render={({ match }) => (
              <Board boardId={match.params.boardId} />
            )}
          />
          <Route
            exact
            path="/calendar"
          >
            <Calendar />
          </Route>
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
      <AuthContext.Provider value={{
        userId,
        token,
        login,
        logout,
      }}
      >
        <TimeoutContext.Provider value={{
          resetTimeout,
        }}
        >
          <Router>
            <Switch>
              {routes}
            </Switch>
          </Router>
        </TimeoutContext.Provider>
      </AuthContext.Provider>
    </StylesProvider>
  );
};

export default App;
