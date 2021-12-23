export const PAGE_SIZES: Array<string> = ['6', '10', '20', '30', '50'];

export interface DateTimeType {
  date: string;
  time: string;
}

export interface ListResponseType<T> {
  data: Array<T>;
  total: number;
  page: number;
  limit: number;
}

export interface UserError {
  error: string;
  data: Object;
}

export interface UserType {
  id?: string;
  title?: string;
  firstName?: string;
  lastName?: string;
  gender?: string;
  email?: string;
  dateOfBirth?: DateTimeType;
  registerDate?: DateTimeType;
  phone?: string;
  picture?: string;
}
export interface UserPreview {
  id: string;
  title?: string;
  firstName?: string;
  lastName?: string;
  picture?: string;
}

export interface OwnerType {
  firstName?: string;
  lastName?: string;
  id?: string;
  picture?: string;
}

export interface CommentType {
  id?: string;
  message?: string;
  post?: string;
  publishDate?: DateTimeType;
  owner?: OwnerType;
}

export interface PostPreview {
  id?: string;
  text?: string;
  image?: string;
  likes: number;
  tags: Array<string>;
  publishDate: DateTimeType;
  owner: UserPreview;
}

export interface PostType {
  id?: string;
  text?: string;
  image?: string;
  likes: number;
  link: string;
  tags: Array<string>;
  publishDate: DateTimeType;
  owner: UserPreview;
}

export interface CommentListResponse extends ListResponseType<CommentType> {}
export interface PostListResponse extends ListResponseType<PostPreview> {}
export interface UserListResponse extends ListResponseType<UserPreview> {}
