export interface Posts {
  posts: Post[];
  totalItems: number;
}

export interface Post {
  _id: string | undefined;
  title: string | undefined;
  content: string | undefined;
  category: string | undefined;
  tags: string[] | undefined;
  coverImage: string | undefined;
  createdAt: string | undefined;
  updatedAt: string | undefined;
  __v: number | undefined;
}

export interface PostQueryResult {
  data: Posts;
  isLoading: boolean;
  isError: boolean;
}

export enum PostActionTypes {
  FETCH = "F",
  CREATE = "N",
  EDIT = "E",
}

export interface User {
  _id: string;
  name: string;
  surname: string;
  email: string;
}

export interface AuthLoginResponse {
  user: User;
  token: string;
}

export interface AuthLoginRequest {
  username: string;
  password: string;
}
