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

export enum PostActionTypes {
  FETCH = "F",
  CREATE = "N",
  EDIT = "E",
}
