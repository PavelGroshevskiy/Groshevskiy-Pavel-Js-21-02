import {
  CommentType, PostPreview, UserPreview, UserType,
} from '../../types/api/dumMyApiResponses';

export interface State {
  auth: AuthState;
  users: UserListState;
  comments: CommentListState;
  posts: PostListState;
}

export interface AuthState {
  error?: string;
  id?: string;
  title?: string;
  username?: string;
  avatarImg?: string;
  isLoading: boolean;
}

export interface UserListState {
  error?: string;
  edit?: boolean;
  user: UserType;
  users: Array<UserPreview>;
  page: number;
  pageSize: number;
  total: number;
  isLoading: boolean;
}

export interface CommentListState {
  error?: string;
  postId: string;
  comments: Array<CommentType>;
  page: number;
  pageSize: number;
  total: number;
  isLoading: boolean;
}

export interface PostListState {
  error?: string;
  post: PostPreview;
  posts: Array<PostPreview>;
  page: number;
  pageSize: number;
  total: number;
  isLoading: boolean;
}

export interface UserCreateState {
  id: string;
  error: string;
  isLoading: boolean;
}
