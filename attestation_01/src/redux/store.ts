import { applyMiddleware, combineReducers, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import { all, fork } from 'redux-saga/effects';
import authReducer from './reducers/authReducer';
import authWatcher from './sagas/auth';
import usersWatcher from './sagas/users';
import usersReducer from './reducers/usersReducer';
import commentsReducer from './reducers/commentsReducer';
import commentsWatcher from './sagas/comments';
import postsReducer from './reducers/postsReducers';
import postsWatcher from './sagas/posts';

const sagaMiddleware = createSagaMiddleware(); // Создание прослойки saga

const composeEnhancers = composeWithDevTools({
  // Specify here name, actionsBlacklist, actionsCreators and other options
});

const store = createStore(
  combineReducers({ auth: authReducer, users: usersReducer, comments: commentsReducer, posts: postsReducer }),
  composeEnhancers(applyMiddleware(sagaMiddleware)),
);

// Собираем саги в одну
function* rootSaga() {
  // @ts-ignore
  yield all([fork(authWatcher), fork(usersWatcher), fork(commentsWatcher), fork(postsWatcher)]);
}

sagaMiddleware.run(rootSaga);

export default store;
