export interface Posts {
  posts: Post[];
  totalItems: number;
}

export interface Post {
  _id: string | undefined;
  title: string | undefined;
  content: string | undefined;
  category: string | undefined;
  thumbnail: string | undefined; // link to image
  tags: string[] | undefined;
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
  user: User | null;
  accessToken: string | null;
}

export interface AuthLoginRequest {
  username: string;
  password: string;
}
