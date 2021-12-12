import { AUTH_SIGN_IN, AUTH_LOG_OUT, AUTH_SUCCESS, AUTH_ERROR } from '../constants/actions';
import { UserType } from '../../types/api/dumMyApiResponses';
import { AuthAction, IAuthErrorAction, ILogOutAction, ISignInAction } from '../types/actions';

export const signInAction:ISignInAction = (id) => ({
  type: AUTH_SIGN_IN,
  id,
  isLoading: true,
});

export const logOutAction: ILogOutAction = () => ({
  type: AUTH_LOG_OUT,
  isLoading: true,
});

export const authSuccessAction = (user:UserType):AuthAction => ({
  type: AUTH_SUCCESS,
  id: user.id,
  user,
  error: '',
  isLoading: false,
});

export const authErrorAction: IAuthErrorAction = (error) => ({
  type: AUTH_ERROR,
  error,
  isLoading: false,
});
