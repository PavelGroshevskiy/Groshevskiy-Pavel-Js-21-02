/* Редьюсер для аутентификации */
import produce from 'immer';
import { UserListState } from '../types/state';
import { UsersAction } from '../types/actions';
import {
  USERS_GET,
  USERS_ERROR,
  USERS_LOAD,
  USERS_GET_SUCCESS,
  USERS_LOAD_SUCCESS,
  CREATE_USER,
  USERS_SHOW,
  USERS_HIDE,
  USERS_UPDATE,
  AVATAR_UPLOAD,
} from '../constants/actions';
import { UserPreview, UserType } from '../../types/api/dumMyApiResponses';
import { getDefaultPageSize } from '../../api/utils';
import { USER_URL } from '../../constants/api/dumMyApi';

const initialState: UserListState = {
  error: '',
  user: {} as UserType,
  users: [] as Array<UserPreview>,
  page: 0,
  pageSize: getDefaultPageSize(USER_URL),
  total: 0,
  isLoading: false,
};

const create = (draft: UserListState, edit: boolean = false) => {
  draft.error = '';
  draft.isLoading = true;
  draft.edit = edit;
  return draft;
};

const get = (draft: UserListState) => {
  draft.isLoading = true;
  draft.error && delete draft.error;
  return draft;
};

const getSuccess = (draft: UserListState, user: UserType) => {
  draft.isLoading = false;
  draft.user = user;
  delete draft.error;
  return draft;
};

const loadSuccess = (draft: UserListState, users: UsersAction) => {
  // console.log(users);
  draft.isLoading = false;
  draft.users = users.users || [];
  draft.total = users.total || 0;
  draft.page = users.page || 0;
  draft.pageSize = users.pageSize || getDefaultPageSize(USER_URL);
  delete draft.error;
  return draft;
};

const onError = (draft: UserListState, error: string) => {
  draft.isLoading = false;
  draft.users = [];
  draft.total = 0;
  draft.page = 0;
  draft.pageSize = getDefaultPageSize(USER_URL);
  draft.error = error;
  return draft;
};

const usersReducer = (state = initialState, action: UsersAction) => produce(state, (draft: UserListState) => {
  switch (action.type) {
    case AVATAR_UPLOAD:
      return { ...draft, isLoading: true };
    case USERS_SHOW:
      return { ...draft, edit: true };
    case USERS_HIDE:
      return { ...draft, edit: false };
    case CREATE_USER:
      return create(draft, false);
    case USERS_UPDATE:
      return create(draft, action.edit);
    case USERS_GET:
      return get(draft);
    case USERS_LOAD:
      return get(draft);
    case USERS_GET_SUCCESS:
      return action.user ? getSuccess(draft, action.user) : state;
    case USERS_LOAD_SUCCESS:
      return action.users ? loadSuccess(draft, action) : state;
    case USERS_ERROR:
      return onError(draft, action.error as string);
    default:
      return state;
  }
});

export default usersReducer;
