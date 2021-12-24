import {
  USERS_GET,
  USERS_LOAD,
  USERS_GET_SUCCESS,
  USERS_LOAD_SUCCESS,
  USERS_ERROR,
  CREATE_USER,
  USERS_SHOW,
  USERS_HIDE,
  USERS_UPDATE,
  AVATAR_UPLOAD,
} from '../constants/actions';
import { UserListResponse, UserType } from '../../types/api/dumMyApiResponses';
import {
  ICreateUserAction, IUsersErrorAction, IUsersGetAction, IUsersLoadAction, UsersAction,
} from '../types/actions';
import { getDefaultPageSize } from '../../api/utils';
import { USER_URL } from '../../constants/api/dumMyApi';

export const uploadAvatarAction = (id: string, avatar: Blob): UsersAction => ({
  type: AVATAR_UPLOAD,
  id,
  avatar,
  isLoading: true,
});

export const createUserAction: ICreateUserAction = (user) => ({
  type: CREATE_USER,
  user,
  isLoading: true,
});

export const updateUserAction: ICreateUserAction = (user, edit = false) => ({
  type: USERS_UPDATE,
  user,
  edit,
  isLoading: true,
});

export const usersGetAction: IUsersGetAction = (id) => ({
  type: USERS_GET,
  id,
  isLoading: true,
});

export const usersLoadAction: IUsersLoadAction = (page, pageSize) => ({
  type: USERS_LOAD,
  page: page || 0,
  pageSize: pageSize || getDefaultPageSize(USER_URL),
  isLoading: true,
});

export const usersLoadSuccessAction = (resp: UserListResponse): UsersAction => ({
  type: USERS_LOAD_SUCCESS,
  total: resp.total,
  page: resp.page,
  pageSize: resp.limit,
  users: resp.data,
  error: '',
  isLoading: false,
});

export const usersGetSuccessAction = (user: UserType): UsersAction => ({
  type: USERS_GET_SUCCESS,
  user,
  error: '',
  isLoading: false,
});

export const usersErrorAction: IUsersErrorAction = (error) => ({
  type: USERS_ERROR,
  error,
  isLoading: false,
});

export const usersShowEditorAction = (): UsersAction => ({
  type: USERS_SHOW,
  isLoading: false,
});

export const usersHideEditorAction = (): UsersAction => ({
  type: USERS_HIDE,
  isLoading: false,
});
