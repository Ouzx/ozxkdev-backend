import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

interface PageState {
  pageNum: number;
}

const initialState: PageState = {
  pageNum: 0,
};

export const pageSlice = createSlice({
  name: "page",
  initialState,
  reducers: {
    setPageNum: (state, action: PayloadAction<number>) => {
      state.pageNum = action.payload;
    },
  },
});

export const { setPageNum } = pageSlice.actions;

export const selectPageNum = (state: RootState) => state.page.pageNum;
