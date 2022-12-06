import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { Post } from "../types";

enum PostAction {
  NEW,
  UPDATE,
}

interface PostState {
  postAction: PostAction;
  post: Post | undefined;
}

const initialState: PostState = {
  postAction: PostAction.NEW,
  post: undefined,
};

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setPostType: (state, action: PayloadAction<PostState>) => {
      state.postAction = action.payload.postAction;
      state.post = action.payload.post;
    },
  },
});

export const { setPostType } = postSlice.actions;

export const selectPostAction = (state: RootState) => state.post.postAction;
