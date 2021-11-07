export interface ListResponseType<T> {
  data: Array<T>;
  total: number;
  page: number;
  limit: number;
}

export interface OwnerType {
  firstName?: string;
  lastName?: string;
}

export interface CommentType {
  id: string;
  title: string;
  firstName: string;
  lastName: string;
  picture: string;
}

export interface PostListResponse extends ListResponseType<CommentType> {}
