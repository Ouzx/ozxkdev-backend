import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { Post } from "../types";

export enum PostAction {
  CREATE,
  UPDATE,
}

export interface PostState {
  postAction: PostAction;
  post: Post | undefined;
}

const initialState: PostState = {
  postAction: PostAction.CREATE,
  post: undefined,
};

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setPost: (state, action: PayloadAction<PostState>) => {
      state.postAction = action.payload.postAction;
      state.post = action.payload.post;
    },
  },
});

export const { setPost } = postSlice.actions;

export const selectPostAction = (state: RootState) => state.post.postAction;
