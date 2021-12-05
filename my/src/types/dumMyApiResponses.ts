export interface ListResponseType<T> {
  data: Array<T>;
  total: number;
  page: number;
  limit: number;
}

export interface OwnerType {
  firstName?: string;
  lastName?: string;
  id?: string;
}

export interface CommentType {
  id: string,
  title: string,
  firstName: string,
  lastName: string,
  picture: string
}

export interface UserResponse {
  id?: string;
  title?: string;
  firstName?: string;
  lastName?: string;
  gender?: string;
  email?: string;
  dateOfBirth?: string;
  registerDate?: string;
  phone?: string;
  picture?: string;
}

export interface PostResponseType {
  id: string,
  text: string,
  image: string,
  likes: number,
  tags: Array<string>,
  publishDate: string,
  owner: object
}

export interface PostListResponse extends ListResponseType<CommentType> {
}
export interface PostResponse extends ListResponseType<PostResponseType> {
}

export interface ResponseError {
  error: string;
}
