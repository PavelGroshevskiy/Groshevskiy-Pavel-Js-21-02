import {
  CommentType, PostPreview, UserPreview, UserType,
} from '../../types/api/dumMyApiResponses';

export interface Action {
  type: string;
  isLoading: boolean;
}

export interface CreateUserAction extends Action {
  id?: string;
  entity?: UserType;
  error?: string;
}

export interface AuthAction extends Action {
  id?: string;
  user?: UserType;
  error?: string;
}

export interface UsersAction extends Action {
  avatar?: Blob;
  users?: Array<UserPreview>;
  user?: UserType;
  id?: string;
  total?: number;
  page?: number;
  pageSize?: number;
  error?: string;
  edit?: boolean;
}

export interface CommentsAction extends Action {
  postId?: string;
  userid?: string;
  comments?: Array<CommentType>;
  total?: number;
  page?: number;
  pageSize?: number;
  error?: string;
}

export interface PostsAction extends Action {
  userid?: string;
  postId?: string;
  post?: PostPreview;
  posts?: Array<PostPreview>;
  total?: number;
  page?: number;
  pageSize?: number;
  error?: string;
}

export interface ISignInAction {
  (id: string): AuthAction;
}

export interface IAuthErrorAction {
  (error: string): AuthAction;
}

export interface ILogOutAction {
  (): AuthAction;
}

export interface IUsersGetAction {
  (id: string): UsersAction;
}

export interface IUsersLoadAction {
  (page: number | undefined, pageSize: number | undefined): UsersAction;
}

export interface IUsersErrorAction {
  (error: string): UsersAction;
}

export interface ICommentsLoadByPostAction {
  (postId: string, page: number | undefined, pageSize: number | undefined): CommentsAction;
}

export interface ICommentsErrorAction {
  (error: string): CommentsAction;
}

export interface IPostsLoadAction {
  (page: number | undefined, pageSize: number | undefined): PostsAction;
}

export interface IPostsGetAction {
  (postId: string): PostsAction;
}

export interface IPostsGetByUserAction {
  (id: string, page: number | undefined, pageSize: number | undefined): PostsAction;
}

export interface IPostsShowPostAction {
  (post: PostPreview): PostsAction;
}

export interface IPostsHidePostAction {
  (): PostsAction;
}

export interface IPostsErrorAction {
  (error: string): PostsAction;
}

export interface ICreateUserAction {
  (user: UserType, edit: boolean): CreateUserAction;
}

export interface ICreateUserSuccessAction {
  (id: string): CreateUserAction;
}

export interface ICreateUserErrorAction {
  (error: string): CreateUserAction;
}
