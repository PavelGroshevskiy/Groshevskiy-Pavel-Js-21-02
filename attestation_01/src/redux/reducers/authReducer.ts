/* Редьюсер для аутентификации */
import produce from 'immer';
import { AuthState } from '../types/state';
import { AuthAction } from '../types/actions';
import { AUTH_ERROR, AUTH_LOG_OUT, AUTH_SIGN_IN, AUTH_SUCCESS } from '../constants/actions';
import { UserType } from '../../types/api/dumMyApiResponses';

const initialState: AuthState = {
  isLoading: false,
};

const signIn = (draft: AuthState) => {
  draft.isLoading = true;
  draft.error && delete draft.error;
  return draft;
};

const logout = (draft: AuthState) => {
  delete draft.id;
  delete draft.username;
  delete draft.avatarImg;
  delete draft.error;
  draft.isLoading = false;
  return draft;
};

const onSuccess = (draft: AuthState, user: UserType | undefined) => {
  draft.isLoading = false;
  draft.error && delete draft.error;
  if (user && user.id) {
    draft.id = user?.id;
    draft.avatarImg = user?.picture || undefined;
    draft.username = `${user?.title} ${user?.lastName}  ${user?.firstName}`;
  } else {
    draft.error = 'Ошибка аутентификации пользователя';
  }
  return draft;
};

const onError = (draft: AuthState, error: string) => {
  draft.isLoading = false;
  draft.error = error;
  return draft;
};

const authReducer = (state = initialState, action: AuthAction) =>
  produce(state, (draft: AuthState) => {
    switch (action.type) {
      case AUTH_SIGN_IN:
        return signIn(draft);
      case AUTH_LOG_OUT:
        return logout(draft);
      case AUTH_SUCCESS:
        return onSuccess(draft, action.user);
      case AUTH_ERROR:
        return onError(draft, action.error as string);
      default:
        return state;
    }
  });

export default authReducer;
