import './App.scss';
import React, { useContext, useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ThemeContext, ThemeContextState } from './contexts/ThemeContext';
import Header from './forms/Header/Header';
import Footer from './forms/Footer/Footer';
import Login from './forms/Login/Login';
import Register from './forms/Register/Register';
import UserList from './forms/UserList/UserList';
import PostList from './forms/PostList/PostList';
import UserProfile from './forms/UserProfile/UserProfile';
import { AuthState, State } from './redux/types/state';
import { getAuthId } from './api/utils';
import { authSuccessAction } from './redux/actions/auth';

import { UsersAction } from './redux/types/actions';
import { UserType } from './types/api/dumMyApiResponses';

interface Props {
  auth: AuthState;
  authUser: (user: UserType) => UsersAction;
}
const App = ({ auth, authUser }: Props) => {
  const themeContext: Partial<ThemeContextState> = useContext(ThemeContext);
  useEffect(() => {
    if (!auth.id) {
      const user = getAuthId();
      user && authUser(user);
    }
  }, []);
  return (
    <div className={`App ${themeContext.darkTheme && 'App_dark'}`}>
      <Header />
      <main className="App__container">
        <Routes>
          <Route path="" element={<Navigate to="/page/0" />} />
          {auth.id && <Route path="/user/register" element={<Navigate to={`/user/profile/${auth.id}`} />} />}
          <Route path="/user/list" element={<Navigate to="/user/list/page/0" />} />
          <Route path="/user/list/page/:page/" element={<UserList />} />
          <Route path="/user/profile/:userId" element={<UserProfile />} />
          <Route path="/user/profile/:userId/page/:page" element={<UserProfile />} />
          <Route path="/page/:page/" element={<PostList />} />
          <Route path="/user/login" element={<Login />} />
          {!auth.id && <Route path="/user/register" element={<Register />} />}
          <Route path="*" element={<div />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default connect(
  (state: State) => ({
    auth: state.auth,
  }),
  (dispatch) => ({
    authUser: bindActionCreators(authSuccessAction, dispatch),
  }),
)(App);
